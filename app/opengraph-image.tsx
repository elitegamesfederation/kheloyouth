import { renderOgCard } from "@/app/lib/ogCard";

export const alt =
  "KheloYouth by Elite Games Federation - India's grassroots sports network";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgCard({
    eyebrow: "Elite Games Federation",
    title: "KheloYouth",
    subtitle:
      "India's grassroots sports network for academies, athletes and the FitStreak app",
  });
}
