import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { doc, getDoc } from "firebase/firestore";

import { db } from "@/app/lib/firebase";

export const runtime = "nodejs";

const affiliationFees: Record<number, number> = {
  1: 999,
  2: 1799,
  3: 2499,
};

export async function POST(request: NextRequest) {
  try {
    const { academyId, selectedYears } = await request.json();

    if (!academyId || typeof academyId !== "string") {
      return NextResponse.json(
        { error: "Missing academyId" },
        { status: 400 }
      );
    }

    const years = Number(selectedYears);
    const fee = affiliationFees[years];

    if (!fee) {
      return NextResponse.json(
        { error: "Invalid selectedYears" },
        { status: 400 }
      );
    }

    const snap = await getDoc(doc(db, "academies", academyId));

    if (!snap.exists()) {
      return NextResponse.json(
        { error: "Academy not found" },
        { status: 404 }
      );
    }

    const amount = snap.data()?.paymentDone ? 0 : fee;

    if (amount <= 0) {
      return NextResponse.json(
        { error: "Nothing payable for this academy" },
        { status: 400 }
      );
    }

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: "Razorpay is not configured" },
        { status: 500 }
      );
    }

    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `academy_${academyId}_${Date.now()}`,
      notes: { academyId, selectedYears: String(years) },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
    });
  } catch (error: any) {
    console.error("create-order failed", error);
    return NextResponse.json(
      { error: error?.message || "Could not create order" },
      { status: 500 }
    );
  }
}
