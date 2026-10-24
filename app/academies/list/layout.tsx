import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "List of Sports Academies in India by State & Sport",
  description:
    "Browse affiliated sports academies across India. Filter by sport, state and district to see students, coaches, photos and contact details.",
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
