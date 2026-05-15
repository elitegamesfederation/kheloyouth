import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "List Of Affiliated Sports Academies",
  description:
    "Browse verified academies in the Elite Games Federation grassroots sports network by sport, state, and district on KheloYouth.",
  alternates: {
    canonical: "/academies/list",
  },
};

export default function AcademiesListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
