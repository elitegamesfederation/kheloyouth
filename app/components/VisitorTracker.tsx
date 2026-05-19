"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { db } from "@/app/lib/firebase";

import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

const getBrowserId = (storageKey: string) => {
  const existingId = window.localStorage.getItem(storageKey);

  if (existingId) return existingId;

  const newId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  window.localStorage.setItem(storageKey, newId);
  return newId;
};

const getSessionId = () => {
  const existingId = window.sessionStorage.getItem(
    "kheloyouthVisitSessionId"
  );

  if (existingId) return existingId;

  const newId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  window.sessionStorage.setItem("kheloyouthVisitSessionId", newId);
  return newId;
};

export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/dashboard")) return;

    const trackVisit = async () => {
      try {
        const visitorId = getBrowserId("kheloyouthVisitorId");
        const sessionId = getSessionId();
        const today = new Date().toISOString().slice(0, 10);

        await addDoc(collection(db, "pageViews"), {
          path: pathname,
          day: today,
          visitorId,
          sessionId,
          referrer: document.referrer || "",
          userAgent: navigator.userAgent.slice(0, 180),
          createdAt: serverTimestamp(),
        });
      } catch (error) {
        console.warn("Visitor tracking skipped", error);
      }
    };

    trackVisit();
  }, [pathname]);

  return null;
}
