import { renderOgCard } from "@/app/lib/ogCard";

export const alt = "Meera's Picks - activewear and gym gear under Rs 1K";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgCard({
    eyebrow: "Elite Games Federation Shop",
    title: "Meera's Picks",
    subtitle: "Activewear and gym gear under 1K, linked to Amazon.in",
  });
}
