import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/app/lib/site";
import { slugify } from "@/app/lib/slug";

// Rebuilt at most once an hour so newly affiliated academies show up quickly.
export const revalidate = 3600;

const staticRoutes = [
  { path: "/", priority: 1 },
  { path: "/academies", priority: 0.9 },
  { path: "/academies/list", priority: 0.9 },
  { path: "/academies/affiliation", priority: 0.9 },
  { path: "/fitstreak", priority: 0.8 },
  { path: "/donation", priority: 0.8 },
  { path: "/shop", priority: 0.7 },
  { path: "/contact", priority: 0.6 },
  { path: "/fitstreakprivacypolicy", priority: 0.2 },
  { path: "/form-privacy-policy", priority: 0.2 },
];

// Live academy profiles (paid academies only, the same rule the profile page
// uses). They are the pages that can rank for "<sport> academy in <city>".
async function getAcademyEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const { adminDb } = await import("@/app/lib/firebase-admin");

    const snapshot = await Promise.race([
      adminDb
        .collection("academies")
        .where("paymentDone", "==", true)
        .select("academySlug", "academyName")
        .get(),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("academy lookup timed out")), 8000)
      ),
    ]);

    return snapshot.docs.flatMap((academyDoc) => {
      const data = academyDoc.data();
      const slug = data.academySlug || slugify(String(data.academyName || ""));

      if (!slug) return [];

      return [
        {
          url: absoluteUrl(`/academy/${slug}`),
          lastModified: academyDoc.updateTime?.toDate(),
          priority: 0.7,
        },
      ];
    });
  } catch (error) {
    // A Firestore hiccup must never take the whole sitemap down.
    console.warn("sitemap: skipping academy profiles", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // lastModified is left out of the static pages on purpose: Google ignores
  // a lastmod that changes on every build.
  const pages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    priority: route.priority,
  }));

  return [...pages, ...(await getAcademyEntries())];
}
