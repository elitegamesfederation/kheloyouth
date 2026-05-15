import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KheloYouth | Elite Games Federation",
    short_name: "KheloYouth",
    description:
      "Sports academy affiliation, athlete profiles, donations, and FitStreak by Elite Games Federation.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#ff6b00",
    icons: [
      {
        src: "/elite-logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
