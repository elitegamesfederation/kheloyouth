"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {

  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-black/80 backdrop-blur-2xl">

      {/* ORANGE GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,115,0,0.15),transparent_60%)]"></div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-5 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-5">

          <img
            src="/elite-logo.png"
            alt="Elite Games Federation"
            className="w-12 h-12 md:w-16 md:h-16 object-contain drop-shadow-[0_0_30px_rgba(255,115,0,0.8)]"
          />

          <div className="flex flex-col items-center justify-center">

            <h1 className="text-3xl md:text-5xl font-black tracking-[0.18em] text-orange-500 uppercase leading-none">
              Elite
            </h1>

            <p className="text-[10px] md:text-sm tracking-[0.28em] md:tracking-[0.35em] text-white uppercase mt-1 text-center">
              Games Federation
            </p>

          </div>

        </Link>

        {/* NAVIGATION */}
        <div className="
flex items-center gap-2 md:gap-3
overflow-x-auto scrollbar-hide
w-full md:w-auto
max-w-full
bg-white/5 border border-white/10
rounded-full px-3 py-3
backdrop-blur-xl
shadow-[0_0_50px_rgba(255,115,0,0.08)]
">

          {/* HOME */}
          <Link
            href="/"
            className={`px-5 md:px-7 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
              pathname === "/"
                ? "bg-orange-500 text-white shadow-[0_0_30px_rgba(255,115,0,0.55)]"
                : "text-gray-300 hover:text-white hover:bg-white/5"
            }`}
          >
            Home
          </Link>

          {/* ACADEMIES DROPDOWN */}
<div className="relative group flex flex-col items-center">

  {/* BUTTON */}
  <button
    className={`relative px-5 md:px-7 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
      pathname.includes("/academies")
        ? "bg-orange-500 text-white shadow-[0_0_30px_rgba(255,115,0,0.55)]"
        : "text-gray-300 hover:text-white hover:bg-white/5"
    }`}
  >
    Academies

    {/* CONNECTOR DOT */}
    <span className="absolute left-1/2 -translate-x-1/2 -bottom-5 w-2 h-2 rounded-full bg-orange-500 opacity-0 group-hover:opacity-100 transition"></span>
  </button>

  {/* DROPDOWN */}
  <div className="absolute top-[58px] left-1/2 -translate-x-1/2 pt-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">

    {/* CONNECTOR LINE */}
    <div className="w-[2px] h-5 bg-orange-500/60 mx-auto"></div>

    {/* MENU */}
    <div className="w-72 bg-zinc-950/95 backdrop-blur-2xl border border-orange-500/20 rounded-[28px] p-3 shadow-[0_0_60px_rgba(255,115,0,0.18)]">

      <Link
        href="/academies/affiliation"
        className={`block px-5 py-4 rounded-2xl transition-all duration-300 font-medium ${
          pathname === "/academies/affiliation"
            ? "bg-orange-500/15 text-orange-500 border border-orange-500/20"
            : "hover:bg-orange-500/10 hover:text-orange-500 text-gray-300"
        }`}
      >
        Academy Affiliation
      </Link>

      <Link
        href="/academies/list"
        className={`block px-5 py-4 rounded-2xl transition-all duration-300 font-medium ${
          pathname === "/academies/list"
            ? "bg-orange-500/15 text-orange-500 border border-orange-500/20"
            : "hover:bg-orange-500/10 hover:text-orange-500 text-gray-300"
        }`}
      >
        List Of Academies
      </Link>

    </div>

  </div>

</div>

          {/* DONATION */}
          <Link
            href="/donation"
            className={`px-5 md:px-7 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
              pathname === "/donation"
                ? "bg-orange-500 text-white shadow-[0_0_30px_rgba(255,115,0,0.55)]"
                : "text-gray-300 hover:text-white hover:bg-white/5"
            }`}
          >
            Donation
          </Link>

          {/* FITSTREAK */}
          <Link
            href="/fitstreak"
            className={`px-5 md:px-7 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
              pathname === "/fitstreak"
                ? "bg-orange-500 text-white shadow-[0_0_30px_rgba(255,115,0,0.55)]"
                : "text-gray-300 hover:text-white hover:bg-white/5"
            }`}
          >
            FitStreak
          </Link>

          {/* CONTACT */}
          <Link
            href="/contact"
            className={`px-5 md:px-7 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
              pathname === "/contact"
                ? "bg-orange-500 text-white shadow-[0_0_30px_rgba(255,115,0,0.55)]"
                : "text-gray-300 hover:text-white hover:bg-white/5"
            }`}
          >
            Contact
          </Link>

        </div>

      </div>

    </nav>
  );
}