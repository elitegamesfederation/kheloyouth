"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {

  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [academyOpen, setAcademyOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-black/80 backdrop-blur-2xl">

        {/* ORANGE GLOW */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,115,0,0.15),transparent_60%)]"></div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-5 flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 md:gap-5 z-50">

            <img
              src="/elite-logo.png"
              alt="Elite Games Federation"
              className="w-12 h-12 md:w-16 md:h-16 object-contain drop-shadow-[0_0_30px_rgba(255,115,0,0.8)]"
            />

            <div className="flex flex-col items-center text-center">

              <h1 className="text-3xl md:text-5xl font-black tracking-[0.18em] text-orange-500 uppercase leading-none">
                Elite
              </h1>

              <p className="text-[10px] md:text-sm tracking-[0.28em] md:tracking-[0.35em] text-white uppercase mt-1">
                Games Federation
              </p>

            </div>

          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden lg:flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-3 py-3 backdrop-blur-xl shadow-[0_0_50px_rgba(255,115,0,0.08)]">

            {/* HOME */}
            <Link
              href="/"
              className={`px-7 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                pathname === "/"
                  ? "bg-orange-500 text-white shadow-[0_0_30px_rgba(255,115,0,0.55)]"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              Home
            </Link>

            {/* ACADEMIES */}
            <div className="relative group">

              <button
                className={`px-7 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  pathname.includes("/academies")
                    ? "bg-orange-500 text-white shadow-[0_0_30px_rgba(255,115,0,0.55)]"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                Academies
              </button>

              {/* DROPDOWN */}
              <div className="absolute top-[65px] left-1/2 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">

                <div className="w-72 bg-zinc-950/95 backdrop-blur-2xl border border-orange-500/20 rounded-[28px] p-3 shadow-[0_0_60px_rgba(255,115,0,0.18)]">

                  <Link
                    href="/academies/affiliation"
                    className="block px-5 py-4 rounded-2xl hover:bg-orange-500/10 hover:text-orange-500 text-gray-300 transition"
                  >
                    Join Network
                  </Link>

                  <Link
                    href="/academies/list"
                    className="block px-5 py-4 rounded-2xl hover:bg-orange-500/10 hover:text-orange-500 text-gray-300 transition"
                  >
                    List Of Academies
                  </Link>

                </div>

              </div>

            </div>

            {/* DONATION */}
            <Link
              href="/donation"
              className={`px-7 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
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
              className={`px-7 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
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
              className={`px-7 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                pathname === "/contact"
                  ? "bg-orange-500 text-white shadow-[0_0_30px_rgba(255,115,0,0.55)]"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              Contact
            </Link>

          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden flex flex-col gap-1.5 z-50"
          >

            <span className="w-7 h-[3px] bg-orange-500 rounded-full"></span>
            <span className="w-7 h-[3px] bg-orange-500 rounded-full"></span>
            <span className="w-7 h-[3px] bg-orange-500 rounded-full"></span>

          </button>

        </div>

      </nav>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-500 ${
          menuOpen
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
      >

        {/* BACKDROP */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        ></div>

        {/* SIDEBAR */}
        <div
          className={`absolute top-0 right-0 h-full w-[85%] max-w-[340px] bg-zinc-950 border-l border-orange-500/20 shadow-[0_0_80px_rgba(255,115,0,0.15)] transition-transform duration-500 ${
            menuOpen
              ? "translate-x-0"
              : "translate-x-full"
          }`}
        >

          {/* HEADER */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">

            <div>

              <h1 className="text-3xl font-black text-orange-500 tracking-[0.18em]">
                ELITE
              </h1>

              <p className="text-[10px] tracking-[0.3em] text-gray-400 uppercase">
                Games Federation
              </p>

            </div>

            <button
              onClick={() => setMenuOpen(false)}
              className="text-4xl text-orange-500"
            >
              ×
            </button>

          </div>

          {/* MENU */}
          <div className="p-5 space-y-3">

            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className={`block px-5 py-4 rounded-2xl font-semibold transition ${
                pathname === "/"
                  ? "bg-orange-500 text-white"
                  : "text-gray-300 bg-white/5"
              }`}
            >
              Home
            </Link>

            {/* MOBILE ACADEMIES */}
            <div className="bg-white/5 rounded-2xl overflow-hidden">

              <button
                onClick={() => setAcademyOpen(!academyOpen)}
                className={`w-full flex items-center justify-between px-5 py-4 font-semibold transition ${
                  pathname.includes("/academies")
                    ? "bg-orange-500 text-white"
                    : "text-gray-300"
                }`}
              >
                Academies

                <span className={`transition ${academyOpen ? "rotate-45" : ""}`}>
                  +
                </span>

              </button>

              {academyOpen && (

                <div className="p-3 space-y-2">

                  <Link
                    href="/academies/affiliation"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl bg-black/40 text-gray-300"
                  >
                    Join Network
                  </Link>

                  <Link
                    href="/academies/list"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl bg-black/40 text-gray-300"
                  >
                    List Of Academies
                  </Link>

                </div>

              )}

            </div>

            <Link
              href="/donation"
              onClick={() => setMenuOpen(false)}
              className={`block px-5 py-4 rounded-2xl font-semibold transition ${
                pathname === "/donation"
                  ? "bg-orange-500 text-white"
                  : "text-gray-300 bg-white/5"
              }`}
            >
              Donation
            </Link>

            <Link
              href="/fitstreak"
              onClick={() => setMenuOpen(false)}
              className={`block px-5 py-4 rounded-2xl font-semibold transition ${
                pathname === "/fitstreak"
                  ? "bg-orange-500 text-white"
                  : "text-gray-300 bg-white/5"
              }`}
            >
              FitStreak
            </Link>

            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className={`block px-5 py-4 rounded-2xl font-semibold transition ${
                pathname === "/contact"
                  ? "bg-orange-500 text-white"
                  : "text-gray-300 bg-white/5"
              }`}
            >
              Contact
            </Link>

          </div>

        </div>

      </div>
    </>
  );
}
