import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Affiliate Your Sports Academy in India",
  description:
    "Affiliate your sports academy with Elite Games Federation: academy webpage, athlete features, federation ID cards, PAN India listing and promotion.",
  alternates: {
    canonical: "/academies/affiliation",
  },
};

export default function AcademyAffiliationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Razorpay checkout is only used on this page, so it is not loaded site-wide. */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
      {children}
    </>
  );
}
