import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Elite Games Federation",
  description:
    "Contact Elite Games Federation for partnerships, academy support, sponsorships, athlete support, events, media and CSR queries.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
