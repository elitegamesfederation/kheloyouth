import type { MetadataRoute } from "next";

const siteUrl = "https://kheloyouth.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/academies",
    "/academies/list",
    "/academies/affiliation",
    "/donation",
    "/fitstreak",
    "/contact",
    "/fitstreakprivacypolicy",
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.includes("academies") ? 0.9 : 0.7,
  }));
}
