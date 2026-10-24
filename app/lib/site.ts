// Vercel serves the site on www and redirects the bare domain to it, so every
// canonical URL, sitemap entry and structured-data URL must use the www host.
// Mixing the two makes Google see canonicals that point at a redirect.
export const siteUrl = "https://www.kheloyouth.com";

export const siteName = "KheloYouth";
export const organizationName = "Elite Games Federation";

export const absoluteUrl = (path = "/") =>
  `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
