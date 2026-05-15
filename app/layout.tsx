import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://kheloyouth.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "KheloYouth | Elite Games Federation",
    template: "%s | KheloYouth",
  },
  description:
    "KheloYouth by Elite Games Federation is India's growing grassroots sports network connecting academies, athletes, donors, events, fitness communities, and sports opportunities.",
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
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "KheloYouth",
    title: "KheloYouth | Elite Games Federation",
    description:
      "India's growing grassroots sports network for academies, athlete visibility, donations, FitStreak, events, and elite opportunities.",
    images: [
      {
        url: "/elite-logo.png",
        width: 512,
        height: 512,
        alt: "Elite Games Federation logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KheloYouth | Elite Games Federation",
    description:
      "India's growing grassroots sports network for academies, athlete visibility, donations, FitStreak, events, and elite opportunities.",
    images: ["/elite-logo.png"],
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
    logo: `${siteUrl}/elite-logo.png`,
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
    url: siteUrl,
    publisher: {
      "@type": "SportsOrganization",
      name: "Elite Games Federation",
    },
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />

        <Script
          id="kheloyouth-structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema, websiteSchema]),
          }}
        />

        {children}
      </body>
    </html>
  );
}
