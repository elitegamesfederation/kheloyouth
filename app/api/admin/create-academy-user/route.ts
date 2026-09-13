import { NextRequest, NextResponse } from "next/server";

import { adminAuth } from "@/app/lib/firebase-admin";

export const runtime = "nodejs";

const ADMIN_EMAIL = "jameelhawati@gmail.com";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization") || "";
    const idToken = authHeader.startsWith("Bearer ")
      ? authHeader.slice("Bearer ".length)
      : "";

    if (!idToken) {
      return NextResponse.json(
        { error: "Missing admin session token" },
        { status: 401 }
      );
    }

    const decodedToken = await adminAuth.verifyIdToken(idToken);

    if (decodedToken.email !== ADMIN_EMAIL) {
      return NextResponse.json(
        { error: "Not authorized" },
        { status: 403 }
      );
    }

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing email or password" },
        { status: 400 }
      );
    }

    const userRecord = await adminAuth.createUser({ email, password });

    return NextResponse.json({ uid: userRecord.uid });
  } catch (error: any) {
    const message =
      error?.code === "auth/email-already-exists"
        ? "An account with this email already exists."
        : error?.message || "Could not create academy login.";

    console.error("admin create-academy-user failed", error);

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
