"use client";

import { useEffect } from "react";

const playStoreUrl =
  "https://play.google.com/store/apps/details?id=com.kheloyouth.fitstreakofficial";

export default function RedirectClient() {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      window.location.href = playStoreUrl;
    }, 1400);

    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
