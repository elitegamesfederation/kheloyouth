import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Link from "next/link";


export default function Home() {
  return (
    <main className="bg-black text-white">

        <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center">

        {/* BACKGROUND GLOW */}
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-orange-500/20 blur-[140px] rounded-full"></div>

        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-400/10 blur-[120px] rounded-full"></div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.05fr_0.95fr] gap-28 items-center relative z-10 pt-32">

          {/* LEFT CONTENT */}
          <div>


            <h1 className="mt-6 text-6xl md:text-8xl font-black leading-none max-w-4xl">

              BUILD
              <span className="text-orange-500 block mt-2">
  CHAMPIONS
</span>
            </h1>

            <p className="mt-8 text-xl text-gray-300 leading-relaxed max-w-2xl">
              India’s next-generation sports ecosystem empowering academies,
              athletes, and fitness communities through technology,
              affiliations, and elite opportunities.
            </p>

            {/* BUTTONS */}
            <div className="mt-10 flex flex-wrap gap-5">

              <Link
                href="/academies/list"
                className="bg-orange-500 hover:bg-orange-600 transition px-8 py-4 rounded-2xl text-lg font-semibold shadow-[0_0_40px_rgba(255,115,0,0.4)]"
              >
                Find Academies
              </Link>

              <Link
                href="/academies/affiliation"
                className="border border-white/20 hover:border-orange-500 hover:bg-orange-500/10 transition px-8 py-4 rounded-2xl text-lg font-semibold"
              >
                Get Affiliated
              </Link>

            </div>

            {/* STATS */}
            <div className="mt-16 grid grid-cols-3 gap-6 max-w-xl">

              <div>
                <h2 className="text-4xl font-black text-orange-500">
                  500+
                </h2>
                <p className="text-gray-400 mt-2">
                  Academies
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-black text-orange-500">
                  25+
                </h2>
                <p className="text-gray-400 mt-2">
                  Sports
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-black text-orange-500">
                  50K+
                </h2>
                <p className="text-gray-400 mt-2">
                  Athletes
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="relative flex justify-center">

            {/* MAIN IMAGE CARD */}
            <div className="relative w-full max-w-xl h-[650px] rounded-[40px] overflow-hidden border border-white/10 bg-zinc-900">

              <img
                src="indiafuture.png"
                alt="Indias Sports Future"
                className="w-full h-full object-cover opacity-80"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

              {/* FLOATING CARD */}
              <div className="absolute bottom-8 left-8 right-8 bg-black/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

                <p className="text-sm text-orange-400 font-semibold">
                  EGF VERIFIED
                </p>

                <h3 className="mt-2 text-3xl font-bold">
                  Empowering India’s Sports Future
                </h3>

                <p className="mt-3 text-gray-300">
                  Discover opportunities, affiliations, and elite sports
                  communities across India.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* SPORTS SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-28">

        <div className="flex items-end justify-between flex-wrap gap-6">

          <div>
            <p className="text-orange-500 font-semibold uppercase tracking-[0.3em]">
              Featured Sports
            </p>

            <h2 className="mt-4 text-5xl font-black">
              Explore Sports
            </h2>
          </div>

          <Link
            href="/academies"
            className="text-orange-500 hover:text-orange-400"
          >
            View All →
          </Link>

        </div>

        {/* CARDS */}
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {[
            "Football",
            "Cricket",
            "MMA",
            "Athletics",
          ].map((sport) => (
            <div
              key={sport}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 h-[320px]"
            >

              <img
                src="https://images.unsplash.com/photo-1547347298-4074fc3086f0?q=80&w=1200&auto=format&fit=crop"
                alt={sport}
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

              <div className="absolute bottom-8 left-8">
                <h3 className="text-3xl font-bold">
                  {sport}
                </h3>
              </div>

            </div>
          ))}

        </div>

      </section>

      {/* FITSTREAK SECTION */}
      <section className="relative py-32 border-t border-white/10">

        <div className="absolute inset-0 bg-orange-500/5 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center relative z-10">

          <div>

            <p className="text-orange-500 font-semibold tracking-[0.3em] uppercase">
              FitStreak
            </p>

<h1 className="text-6xl font-black leading-none"></h1>
<p className="text-orange-500 uppercase tracking-[0.4em] text-sm font-semibold mb-6">
  Inspired by the Fit India Movement
</p>

            <h2 className="mt-6 text-6xl font-black leading-tight">
              Track Every
              <span className="text-orange-500"> Move</span>
            </h2>

            <p className="mt-6 text-xl text-gray-300 leading-relaxed">
              Monitor workouts, steps, calories, streaks, and performance
              with the ultimate athlete companion app.
            </p>

            <div className="mt-10">
              <Link
                href="/fitstreak"
                className="bg-orange-500 hover:bg-orange-600 transition px-8 py-4 rounded-2xl text-lg font-semibold inline-block"
              >
                Explore FitStreak
              </Link>
            </div>

          </div>

          {/* FITSTREAK PHONE MOCKUP */}
<div className="flex justify-center relative">

  {/* GLOW */}
  <div className="absolute inset-0 flex items-center justify-center">

    <div className="w-[320px] h-[650px] bg-orange-500/20 blur-[120px] rounded-full"></div>

  </div>

  {/* PHONE IMAGE */}
  <img
    src="/mockupphone.png"
    alt="FitStreak Phone Mockup"
    className="
      relative z-10
      w-[340px]
      md:w-[390px]
      object-contain
      drop-shadow-[0_0_60px_rgba(255,115,0,0.25)]
      hover:scale-[1.02]
      transition duration-500
    "
  />

</div>

        </div>

      </section>

      <Footer />

    </main>
  );
}