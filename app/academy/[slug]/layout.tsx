import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliated Academy Profile",
  description:
    "View an Elite Games Federation affiliated academy profile with sports, students, elite athletes, coaches, photos, and contact details.",
};

export default function AcademyProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
