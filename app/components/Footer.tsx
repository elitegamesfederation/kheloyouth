import {
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
} from "lucide-react";

export default function Footer() {

  return (
    <footer className="relative border-t border-white/10 bg-black overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,115,0,0.12),transparent_55%)]"></div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-orange-500/10 blur-[140px] rounded-full"></div>

      {/* MAIN SECTION */}
      <section className="relative z-10 py-16 md:py-24">

        <div className="max-w-7xl mx-auto px-5 md:px-6">

          {/* TOP */}
          <div className="flex flex-col items-center text-center">

            {/* LOGO */}
            <div className="relative mb-8">

              <img
                src="/elite-logo.png"
                alt="Elite Games Federation"
                className="w-20 h-20 md:w-24 md:h-24 object-contain relative z-10 drop-shadow-[0_0_40px_rgba(255,115,0,0.7)]"
              />

              <div className="absolute inset-0 bg-orange-500/30 blur-[60px] rounded-full"></div>

            </div>

            {/* TITLE */}
            <h2 className="text-3xl md:text-6xl font-black uppercase text-white leading-tight">

              Say No To Drugs

            </h2>

            <h3 className="mt-3 text-2xl md:text-5xl font-black uppercase text-orange-500 leading-tight">

              Yes To Sports!

            </h3>

            {/* DESCRIPTION */}
            <p className="mt-6 text-gray-400 text-base md:text-xl leading-relaxed max-w-3xl">

              Elite Games Federation is committed to building a healthier,
              disciplined, and sports-driven youth culture across India
              through fitness, sports, and positive transformation.

            </p>

            {/* SOCIAL MEDIA */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">

              {/* INSTAGRAM */}
              <a
                href="https://www.instagram.com/elitegamesfederation"
                target="_blank"
                className="group flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/40 hover:bg-orange-500/10 transition-all duration-300 backdrop-blur-xl"
              >

                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center shadow-[0_0_25px_rgba(255,115,0,0.45)]">

                  <Instagram size={20} className="text-white" />

                </div>

                <div className="text-left">

                  <p className="text-white font-semibold text-sm">
                    Instagram
                  </p>

                  <p className="text-gray-400 text-xs">
                    @elitegamesfederation
                  </p>

                </div>

              </a>

              {/* LINKEDIN */}
              <a
                href="https://linkedin.com/company/elitegamesfederation"
                target="_blank"
                className="group flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/40 hover:bg-orange-500/10 transition-all duration-300 backdrop-blur-xl"
              >

                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center shadow-[0_0_25px_rgba(255,115,0,0.45)]">

                  <Linkedin size={20} className="text-white" />

                </div>

                <div className="text-left">

                  <p className="text-white font-semibold text-sm">
                    LinkedIn
                  </p>

                  <p className="text-gray-400 text-xs">
                    Elite Games Federation
                  </p>

                </div>

              </a>

              {/* X / TWITTER */}
              <a
                href="https://x.com/kheloyouth"
                target="_blank"
                className="group flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/40 hover:bg-orange-500/10 transition-all duration-300 backdrop-blur-xl"
              >

                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center shadow-[0_0_25px_rgba(255,115,0,0.45)]">

                  <Twitter size={20} className="text-white" />

                </div>

                <div className="text-left">

                  <p className="text-white font-semibold text-sm">
                    X / Twitter
                  </p>

                  <p className="text-gray-400 text-xs">
                    @kheloyouth
                  </p>

                </div>

              </a>

              {/* FACEBOOK */}
              <a
                href="https://www.facebook.com/elitegamesfederation"
                target="_blank"
                 rel="noopener noreferrer"
                className="group flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/40 hover:bg-orange-500/10 transition-all duration-300 backdrop-blur-xl"
              >

                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center shadow-[0_0_25px_rgba(255,115,0,0.45)]">

                  <Facebook size={20} className="text-white" />

                </div>

                <div className="text-left">

                  <p className="text-white font-semibold text-sm">
                    Facebook
                  </p>

                  <p className="text-gray-400 text-xs">
                    Elite Games Federation
                  </p>

                </div>

              </a>

            </div>

          </div>

        </div>

      </section>

      {/* COPYRIGHT */}
      <div className="relative z-10 border-t border-white/10 py-6 md:py-8">

        <div className="max-w-7xl mx-auto px-5 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-gray-500 text-xs md:text-sm tracking-[0.2em] uppercase text-center">

            Copyright © 2023 Elite Games Federation

          </p>

          <p className="text-orange-500 text-xs md:text-sm uppercase tracking-[0.25em] text-center">

            Built For India’s Sports Future

          </p>

        </div>

      </div>

    </footer>
  );
}