import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import JsonLd from "./components/JsonLd";
import VisitorTracker from "./components/VisitorTracker";
import { absoluteUrl, siteUrl } from "./lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "KheloYouth",
  title: {
    default: "KheloYouth | Elite Games Federation - India's Grassroots Sports Network",
    template: "%s | KheloYouth",
  },
  description:
    "KheloYouth by Elite Games Federation is India's grassroots sports network connecting sports academies, athletes, donors, events, the FitStreak fitness app, and sports opportunities.",
  keywords: [
    "KheloYouth",
    "Elite Games Federation",
    "grassroots sports network India",
    "sports academy network",
    "sports academies in India",
    "athlete profiles",
    "grassroots sports India",
    "FitStreak",
    "para athletes India",
  ],
  authors: [{ name: "Elite Games Federation" }],
  creator: "Elite Games Federation",
  publisher: "Elite Games Federation",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "KheloYouth",
    title: "KheloYouth | Elite Games Federation - India's Grassroots Sports Network",
    description:
      "India's grassroots sports network for sports academies, athlete visibility, donations, the FitStreak app, events, and elite opportunities.",
    // The share image comes from app/opengraph-image.tsx.
  },
  twitter: {
    card: "summary_large_image",
    title: "KheloYouth | Elite Games Federation - India's Grassroots Sports Network",
    description:
      "India's grassroots sports network for sports academies, athlete visibility, donations, the FitStreak app, events, and elite opportunities.",
    // The share image comes from app/twitter-image.tsx.
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/elite-logo.png",
    apple: "/elite-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    name: "Elite Games Federation",
    alternateName: "KheloYouth",
    url: siteUrl,
    logo: absoluteUrl("/elite-logo.png"),
    image: absoluteUrl("/elite-logo.png"),
    description:
      "Elite Games Federation runs KheloYouth, India's grassroots sports network for sports academies, athletes, donors and the FitStreak fitness app.",
    areaServed: { "@type": "Country", name: "India" },
    email: "contact@elitegamesfederation.com",
    sameAs: [
      "https://www.instagram.com/elitegamesfederation/",
      "https://www.facebook.com/elitegamesfederation",
      "https://linkedin.com/company/elitegamesfederation",
      "https://x.com/kheloyouth",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "KheloYouth",
    alternateName: "Elite Games Federation",
    url: siteUrl,
    inLanguage: "en-IN",
    publisher: {
      "@type": "SportsOrganization",
      name: "Elite Games Federation",
    },
  };

  return (
    <html
      lang="en-IN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={[organizationSchema, websiteSchema]} />

        <VisitorTracker />

        {children}
      </body>
    </html>
  );
}
