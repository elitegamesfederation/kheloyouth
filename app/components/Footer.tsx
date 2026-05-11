"use client";

import {
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaFacebookF,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,115,0,0.12),transparent_55%)]"></div>

      {/* MAIN SECTION */}
      <section className="relative py-20 md:py-24">

        <div className="max-w-7xl mx-auto px-5 md:px-6">

          {/* TOP CONTENT */}
          <div className="text-center">

            <p className="text-orange-500 uppercase tracking-[0.35em] text-xs md:text-sm font-semibold">
              Elite Games Federation
            </p>

            <h2 className="mt-5 text-4xl md:text-6xl font-black uppercase leading-tight">
              Say No, To Drugs,
            </h2>

            <h3 className="mt-3 text-3xl md:text-5xl font-black uppercase text-orange-500">
              Yes, To Sports!
            </h3>

            <p className="mt-6 text-gray-400 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
              Elite Games Federation is committed to building a healthier,
              stronger, and sports-driven India by empowering youth,
              athletes, academies, and fitness communities.
            </p>

          </div>

          {/* SOCIAL CARDS */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {/* INSTAGRAM */}
            <a
              href="https://www.instagram.com/elitegamesfederation/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-orange-500/40 hover:bg-orange-500/10 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center shadow-[0_0_30px_rgba(255,115,0,0.4)]">
                <FaInstagram size={24} className="text-white" />
              </div>

              <div>
                <h4 className="text-white font-bold text-lg">
                  Instagram
                </h4>

                <p className="text-gray-400 text-sm">
                  @elitegamesfederation
                </p>
              </div>
            </a>

            {/* LINKEDIN */}
            <a
              href="https://linkedin.com/company/elitegamesfederation"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-orange-500/40 hover:bg-orange-500/10 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center shadow-[0_0_30px_rgba(255,115,0,0.4)]">
                <FaLinkedin size={24} className="text-white" />
              </div>

              <div>
                <h4 className="text-white font-bold text-lg">
                  LinkedIn
                </h4>

                <p className="text-gray-400 text-sm">
                  Elite Games Federation
                </p>
              </div>
            </a>

            {/* FACEBOOK */}
            <a
              href="https://www.facebook.com/elitegamesfederation"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-orange-500/40 hover:bg-orange-500/10 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center shadow-[0_0_30px_rgba(255,115,0,0.4)]">
                <FaFacebookF size={22} className="text-white" />
              </div>

              <div>
                <h4 className="text-white font-bold text-lg">
                  Facebook
                </h4>

                <p className="text-gray-400 text-sm">
                  Elite Games Federation
                </p>
              </div>
            </a>

            {/* X / TWITTER */}
            <a
              href="https://x.com/kheloyouth"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-orange-500/40 hover:bg-orange-500/10 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center shadow-[0_0_30px_rgba(255,115,0,0.4)]">
                <FaXTwitter size={24} className="text-white" />
              </div>

              <div>
                <h4 className="text-white font-bold text-lg">
                  X / Twitter
                </h4>

                <p className="text-gray-400 text-sm">
                  @kheloyouth
                </p>
              </div>
            </a>

          </div>

        </div>

      </section>

      {/* COPYRIGHT */}
      <div className="relative border-t border-white/10 py-6 px-5">

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-gray-500 text-xs md:text-sm tracking-[0.25em] uppercase text-center md:text-left">
            Copyright © 2023 Elite Games Federation
          </p>

          <p className="text-gray-600 text-xs uppercase tracking-[0.2em] text-center md:text-right">
            Built For India’s Sports Future
          </p>

        </div>

      </div>

    </footer>
  );
}