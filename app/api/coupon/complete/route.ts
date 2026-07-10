import { NextRequest, NextResponse } from "next/server";

import { adminDb } from "@/app/lib/firebase-admin";
import {
  affiliationFees,
  getAffiliationNumber,
  getCertificateVerificationId,
} from "@/app/lib/academyPricing";

export const runtime = "nodejs";

const academyCouponCodes = [
  "ELITE100-01",
  "ELITE100-02",
  "ELITE100-03",
  "ELITE100-04",
  "ELITE100-05",
];

export async function POST(request: NextRequest) {
  try {
    const { academyId, couponCode, selectedYears } = await request.json();

    if (!academyId || !couponCode) {
      return NextResponse.json(
        { completed: false, error: "Missing details" },
        { status: 400 }
      );
    }

    const normalizedCoupon = String(couponCode).trim().toUpperCase();

    if (!academyCouponCodes.includes(normalizedCoupon)) {
      return NextResponse.json(
        { completed: false, error: "Invalid coupon code" },
        { status: 400 }
      );
    }

    const existingSnap = await adminDb
      .collection("academies")
      .where("couponCode", "==", normalizedCoupon)
      .get();

    const usedByAnotherAcademy = existingSnap.docs.some(
      (doc) => doc.id !== academyId && doc.data().paymentDone
    );

    if (usedByAnotherAcademy) {
      return NextResponse.json(
        { completed: false, error: "This coupon code has already been used" },
        { status: 400 }
      );
    }

    const academyRef = adminDb.collection("academies").doc(academyId);
    const snap = await academyRef.get();

    if (!snap.exists) {
      return NextResponse.json(
        { completed: false, error: "Academy not found" },
        { status: 404 }
      );
    }

    const data = snap.data() || {};
    const years = Number(selectedYears) || 1;
    const fee = affiliationFees[years] || affiliationFees[1];

    const today = new Date();
    const endDate = new Date();
    endDate.setFullYear(today.getFullYear() + years);

    const affiliationNumber = getAffiliationNumber(
      data.affiliationNumber,
      data.state || "",
      academyId
    );
    const certificateVerificationId = getCertificateVerificationId(
      data.certificateVerificationId,
      affiliationNumber
    );
    const studentsCount = Array.isArray(data.students)
      ? data.students.length
      : data.studentsCount || 0;

    await academyRef.update({
      paymentDone: true,
      paymentMode: "coupon",
      couponCode: normalizedCoupon,
      couponDiscountAmount: fee,
      payableAmount: 0,
      amountPaid: 0,
      affiliationNumber,
      certificateVerificationId,
      affiliationStartDate: data.paymentDone
        ? data.affiliationStartDate
        : today.toDateString(),
      affiliationEndDate: data.paymentDone
        ? data.affiliationEndDate
        : endDate.toDateString(),
      paidStudentsCount: studentsCount,
      totalAmount: fee,
    });

    return NextResponse.json({ completed: true });
  } catch (error: any) {
    console.error("coupon complete failed", error);
    return NextResponse.json(
      { completed: false, error: error?.message || "Could not complete" },
      { status: 500 }
    );
  }
}
