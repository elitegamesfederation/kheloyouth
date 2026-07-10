import { NextRequest, NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = await request.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { verified: false, error: "Missing payment details" },
        { status: 400 }
      );
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      return NextResponse.json(
        { verified: false, error: "Razorpay is not configured" },
        { status: 500 }
      );
    }

    const verified = validatePaymentVerification(
      { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
      razorpay_signature,
      keySecret
    );

    return NextResponse.json({ verified });
  } catch (error: any) {
    console.error("verify-payment failed", error);
    return NextResponse.json(
      { verified: false, error: error?.message || "Could not verify payment" },
      { status: 500 }
    );
  }
}
