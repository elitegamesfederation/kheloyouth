import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

type OgCardOptions = {
  eyebrow: string;
  title: string;
  subtitle: string;
  // File inside /public, drawn on the left.
  logoFile?: string;
};

// 1200x630 share card (the shape Google, WhatsApp, LinkedIn, Facebook and X
// all use), drawn in the site's black and orange.
export async function renderOgCard({
  eyebrow,
  title,
  subtitle,
  logoFile = "elite-logo.png",
}: OgCardOptions) {
  const logo = await readFile(path.join(process.cwd(), "public", logoFile));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 80px",
          color: "white",
          background:
            "radial-gradient(circle at 15% 20%, rgba(255,115,0,0.35), transparent 55%), #000",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={260} height={260} alt="" />

        <div style={{ display: "flex", flexDirection: "column", marginLeft: 64 }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 8,
              color: "#f97316",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            {eyebrow}
          </div>
          <div style={{ fontSize: 78, fontWeight: 900, lineHeight: 1.05, marginTop: 18 }}>
            {title}
          </div>
          <div style={{ fontSize: 36, lineHeight: 1.3, marginTop: 20, color: "#d4d4d8" }}>
            {subtitle}
          </div>
        </div>
      </div>
    ),
    ogSize
  );
}
