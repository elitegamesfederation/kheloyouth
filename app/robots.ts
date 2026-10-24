import type { MetadataRoute } from "next";

import { siteUrl } from "./lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Private tools and per-person verification pages have no search value.
        disallow: ["/dashboard", "/api/", "/id-card/", "/certificate/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
