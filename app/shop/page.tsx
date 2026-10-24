import type { Metadata } from "next";
import { FaInstagram } from "react-icons/fa6";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { getShopCategories, getShopProducts } from "@/app/lib/shopProducts";

import ShopCatalog from "./ShopCatalog";

const instagramUrl = "https://www.instagram.com/elite.meera";

const pageTitle = "Meera's Picks | Elite Games Federation Shop";
const pageDescription =
  "Budget activewear and gym gear under ₹1K recommended by Meera, linked to Amazon.in. Elite Games Federation earns from qualifying purchases, which support grassroots sports in India.";

export const metadata: Metadata = {
  // absolute: skips the site-wide " | KheloYouth" title template so the
  // title is exactly this string.
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: {
    canonical: "/shop",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/shop",
    siteName: "KheloYouth",
    title: pageTitle,
    description: pageDescription,
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
    card: "summary",
    title: pageTitle,
    description: pageDescription,
    images: ["/elite-logo.png"],
  },
};

export default function ShopPage() {
  const products = getShopProducts();
  const categories = getShopCategories(products);

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <Navbar />

      <section className="relative pt-32 md:pt-44 pb-20 md:pb-28 overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-500/10 blur-[140px] rounded-full" />
        <div className="absolute top-20 right-0 w-[450px] h-[450px] bg-orange-500/10 blur-[130px] rounded-full" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <p className="uppercase tracking-[0.4em] text-orange-500 text-sm font-semibold">
            Elite Games Federation Shop
          </p>

          <h1 className="mt-5 text-4xl md:text-6xl font-black leading-tight">
            Meera&apos;s Picks:{" "}
            <span className="text-orange-500">
              Activewear &amp; Gym Gear Under ₹1K
            </span>
          </h1>

          <p className="mt-5 text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed">
            Budget-friendly activewear and gym gear recommended by Meera,
            Elite Games Federation&apos;s virtual creator. Tap a look to see
            the exact product on Amazon.
          </p>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold transition hover:border-orange-500 hover:bg-orange-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <FaInstagram aria-hidden="true" className="text-orange-500" />
            Follow @elite.meera on Instagram
          </a>

          <div className="mt-8 rounded-3xl border border-orange-500/40 bg-orange-500/10 p-5 md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-orange-500">
              Affiliate disclosure
            </p>
            <p className="mt-2 text-sm md:text-base font-semibold leading-relaxed text-white">
              As an Amazon Associate, Elite Games Federation earns from
              qualifying purchases. Every purchase supports grassroots sports
              in India.
            </p>
          </div>

          <div className="mt-10">
            <ShopCatalog products={products} categories={categories} />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
