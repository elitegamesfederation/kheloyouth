import type { Metadata } from "next";
import Link from "next/link";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

const links = [
  { href: "/academies/list", label: "Find an academy" },
  { href: "/academies/affiliation", label: "Join the network" },
  { href: "/fitstreak", label: "FitStreak app" },
  { href: "/shop", label: "Meera's Picks" },
];

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <Navbar />

      <section className="relative pt-40 md:pt-52 pb-24">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-500/10 blur-[140px] rounded-full" />

        <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
          <p className="uppercase tracking-[0.4em] text-orange-500 text-sm font-semibold">
            Error 404
          </p>

          <h1 className="mt-5 text-4xl md:text-6xl font-black leading-tight">
            This page is <span className="text-orange-500">out of play</span>
          </h1>

          <p className="mt-5 text-lg text-gray-300 leading-relaxed">
            The page you are looking for does not exist, has moved, or the
            academy is not live yet.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="rounded-full bg-orange-500 px-6 py-3 text-sm font-black text-black transition hover:bg-orange-400"
            >
              Go to home
            </Link>

            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold transition hover:border-orange-500 hover:bg-orange-500/10"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
