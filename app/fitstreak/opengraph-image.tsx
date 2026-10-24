import { renderOgCard } from "@/app/lib/ogCard";

export const alt = "FitStreak - fitness challenges and daily streak tracking app";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgCard({
    eyebrow: "FitStreak by Elite Games Federation",
    title: "FitStreak App",
    subtitle: "75 Hard, 45 Hard, 5 KM and 2 KM challenges. Build your daily streak.",
    logoFile: "fitstreaklogo.png",
  });
}
