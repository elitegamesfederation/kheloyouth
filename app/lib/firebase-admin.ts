import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

function getAdminApp() {
  const existing = getApps();

  if (existing.length) {
    return existing[0];
  }

  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!raw) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY is not configured");
  }

  const serviceAccount = JSON.parse(raw);

  return initializeApp({
    credential: cert(serviceAccount),
  });
}

export const adminDb = getFirestore(getAdminApp());
export const adminAuth = getAuth(getAdminApp());
