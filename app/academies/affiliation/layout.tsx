import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academy Affiliation Form",
  description:
    "Apply for Elite Games Federation academy affiliation, submit academy details, upload student and coach profiles, and get an affiliation certificate.",
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
