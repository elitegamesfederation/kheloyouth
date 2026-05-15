import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join India's Grassroots Sports Network",
  description:
    "Join KheloYouth, India's growing grassroots sports network for academy webpages, athlete features, federation ID, social promotion, PAN India listing, events, and collaboration.",
  alternates: {
    canonical: "/academies/affiliation",
  },
};

export default function AcademyAffiliationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
