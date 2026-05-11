"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {

  const pathname = usePathname();

  return (
  <header className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">

    <div className="max-w-7xl mx-auto px-4 md:px-6">

      <div className="flex items-center justify-between h-[90px] md:h-[110px]">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 shrink-0">

          <img
            src="/elite-logo.png"
            alt="Elite Games Federation"
            className="w-12 md:w-16 object-contain"
          />

          <div>

            <h1 className="text-3xl md:text-5xl font-black tracking-[0.2em] text-orange-500 leading-none">
              ELITE
            </h1>

            <p className="text-[10px] md:text-sm tracking-[0.35em] text-white/90 mt-1">
              GAMES FEDERATION
            </p>

          </div>

        </Link>

        {/* NAVIGATION */}
        <nav className="hidden md:flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-full px-4 py-3 backdrop-blur-xl">

          {[
            ["Home", "/"],
            ["Academies", "/academies"],
            ["Donation", "/donation"],
            ["FitStreak", "/fitstreak"],
            ["Contact", "/contact"],
          ].map(([label, href]) => (

            <Link
              key={label}
              href={href}
              className="
                px-6 py-3 rounded-full
                text-sm font-semibold
                text-white/90
                hover:bg-orange-500
                hover:text-white
                transition
              "
            >
              {label}
            </Link>

          ))}

        </nav>

      </div>

      {/* MOBILE NAVIGATION */}
      <div className="md:hidden pb-4 overflow-x-auto scrollbar-hide">

        <div className="flex gap-3 min-w-max">

          {[
            ["Home", "/"],
            ["Academies", "/academies"],
            ["Donation", "/donation"],
            ["FitStreak", "/fitstreak"],
            ["Contact", "/contact"],
          ].map(([label, href]) => (

            <Link
              key={label}
              href={href}
              className="
                px-5 py-3 rounded-full
                bg-white/5 border border-white/10
                text-sm font-semibold whitespace-nowrap
                hover:bg-orange-500 transition
              "
            >
              {label}
            </Link>

          ))}

        </div>

      </div>

    </div>

  </header>
);
}