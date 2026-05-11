export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">

      {/* CAMPAIGN */}
      <section className="relative py-14 overflow-hidden">

        {/* GLOW */}
        <div className="absolute inset-0 bg-orange-500/5 blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">

          {/* CAMPAIGN TEXT */}
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white">
            Say No To Drugs
          </h2>

          <h3 className="mt-3 text-2xl md:text-4xl font-black uppercase text-orange-500">
            Yes To Sports!
          </h3>

          <p className="mt-5 text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Elite Games Federation is committed to promoting healthy,
            disciplined, and sports-driven youth culture across India.
          </p>

          {/* SOCIAL BUTTONS */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">

            <a
              href="#"
              className="px-5 py-3 rounded-xl bg-zinc-900 border border-white/10 hover:bg-orange-500 transition"
            >
              Instagram
            </a>

            <a
              href="#"
              className="px-5 py-3 rounded-xl bg-zinc-900 border border-white/10 hover:bg-orange-500 transition"
            >
              LinkedIn
            </a>

            <a
              href="#"
              className="px-5 py-3 rounded-xl bg-zinc-900 border border-white/10 hover:bg-orange-500 transition"
            >
              Twitter
            </a>

            <a
              href="#"
              className="px-5 py-3 rounded-xl bg-zinc-900 border border-white/10 hover:bg-orange-500 transition"
            >
              Facebook
            </a>

          </div>

        </div>

      </section>

      {/* COPYRIGHT */}
      <div className="border-t border-white/10 py-6">

        <p className="text-center text-gray-500 text-sm tracking-[0.25em] uppercase">
          Copyright © 2023 Elite Games Federation — All Rights Reserved
        </p>

      </div>

    </footer>
  );
}