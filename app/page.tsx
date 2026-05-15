import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sports Academy Affiliation, Athlete Profiles & FitStreak",
  description:
    "KheloYouth by Elite Games Federation helps sports academies get affiliated, showcase athletes, receive visibility, and connect with India's sports ecosystem.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main className="bg-black text-white overflow-x-hidden">

        <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-screen pt-32 md:pt-0 flex items-start md:items-center">

        {/* BACKGROUND GLOW */}
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-orange-500/20 blur-[140px] rounded-full"></div>

        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-400/10 blur-[120px] rounded-full"></div>

       <div className="max-w-7xl mx-auto px-5 md:px-6 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-28 items-center relative z-10 pt-0 md:pt-32">

          {/* LEFT CONTENT */}
          <div className="text-center lg:text-left">


            <h1 className="mt-6 text-5xl sm:text-6xl md:text-8xl font-black leading-none max-w-4xl">

              BUILD
              <span className="text-orange-500 block mt-2">
  CHAMPIONS
</span>
            </h1>

            <p className="mt-8 text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
              India’s next-generation sports ecosystem empowering academies,
              athletes, and fitness communities through technology,
              affiliations, and elite opportunities.
            </p>

            {/* BUTTONS */}
            <div className="mt-10 flex flex-col sm:flex-row gap-5 items-center lg:items-start">

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
            <div className="mt-12 md:mt-16 grid grid-cols-3 gap-4 md:gap-6 max-w-xl">

              <div>
                <h2 className="text-2xl md:text-4xl font-black text-orange-500">
                  500+
                </h2>
                <p className="text-gray-400 mt-2">
                  Academies
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-4xl font-black text-orange-500">
                  25+
                </h2>
                <p className="text-gray-400 mt-2">
                  Sports
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-4xl font-black text-orange-500">
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
            <div className="relative w-full max-w-xl h-[420px] sm:h-[520px] md:h-[650px] rounded-[40px] overflow-hidden border border-white/10 bg-zinc-900">

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

  {/* PODCAST SERIES SECTION */}
<section className="relative max-w-7xl mx-auto px-5 md:px-6 py-24 overflow-hidden">

  {/* BACKGROUND GLOW */}
  <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-orange-500/10 blur-[140px] rounded-full"></div>

  <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-orange-500/10 blur-[140px] rounded-full"></div>

  {/* TOP SECTION */}
  <div className="relative z-10">

    <p className="text-orange-500 uppercase tracking-[0.4em] text-sm font-semibold">
      Beyond Limits
    </p>

    <h2 className="mt-5 text-4xl md:text-6xl font-black leading-tight max-w-5xl">

      Stories Of
      <span className="text-orange-500"> Real Champions</span>

    </h2>

    <p className="mt-8 text-gray-400 text-lg leading-relaxed max-w-4xl">

      A powerful podcast initiative by Elite Games Federation dedicated to
      inspiring youth through real stories of para-athletes
      who fought against all odds and never gave up.

    </p>

  </div>

  {/* MAIN LAYOUT */}
  <div className="relative z-10 mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

    {/* LEFT SIDE */}
    <div>

      {/* IMAGE CARD */}
      <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-zinc-900 h-[620px] group">

        <img
          src="/surajpodcast.png"
          alt="Suraj Gaywal Podcast"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

        {/* LIVE BADGE */}
        <div className="absolute top-6 left-6 flex items-center gap-3 px-5 py-3 rounded-full bg-black/60 backdrop-blur-xl border border-white/10">

          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>

          <p className="text-white text-sm uppercase tracking-[0.25em]">
            Under Production
          </p>

        </div>

        {/* TEXT */}
        <div className="absolute bottom-0 p-8 md:p-10">

          <p className="text-orange-500 uppercase tracking-[0.3em] text-sm font-semibold">
            Featured Episode
          </p>

          <h3 className="mt-4 text-4xl font-black leading-tight">
            Suraj Gaywal
          </h3>

          <p className="mt-5 text-gray-300 leading-relaxed text-lg">

            A para bodybuilder who lost his limbs in a life-changing
            accident, yet rebuilt his life through discipline, fitness,
            bodybuilding, and unstoppable mental strength.

          </p>

        </div>

      </div>

      {/* STATS BELOW IMAGE */}
      <div className="mt-8 grid grid-cols-2 gap-5">

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">

          <h3 className="text-4xl font-black text-orange-500">
            534K+
          </h3>

          <p className="mt-3 text-gray-400">
            Instagram Followers
          </p>

        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">

          <h3 className="text-4xl font-black text-orange-500">
            75
          </h3>

          <p className="mt-3 text-gray-400">
            Hard Challenge Completed
          </p>

        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">

          <h3 className="text-4xl font-black text-orange-500">
            Pune
          </h3>

          <p className="mt-3 text-gray-400">
            Shree Title Winner
          </p>

        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">

          <h3 className="text-4xl font-black text-orange-500">
            Real
          </h3>

          <p className="mt-3 text-gray-400">
            Story Of Resilience
          </p>

        </div>

      </div>

    </div>

    {/* RIGHT SIDE */}
    <div>

      {/* ABOUT CARD */}
      <div className="rounded-[36px] border border-white/10 bg-zinc-900/70 backdrop-blur-xl p-8 md:p-10">

        <p className="text-orange-500 uppercase tracking-[0.3em] text-sm font-semibold">
          About The Initiative
        </p>

        <h3 className="mt-4 text-4xl font-black leading-tight">

          Inspiring India Through Storytelling

        </h3>

        <p className="mt-6 text-gray-300 leading-relaxed text-lg">

          “Beyond Limits – Stories of Real Champions” is a digital media
          initiative created to motivate children, youth, athletes,
          and everyday individuals through emotional and inspiring stories.

        </p>

        <p className="mt-5 text-gray-400 leading-relaxed text-lg">

          The series focuses on struggle, discipline, perseverance,
          mental strength, and the power of never giving up —
          especially highlighting the journeys of para-athletes who face
          unimaginable challenges yet continue fighting every single day.

        </p>

        {/* TAGS */}
        <div className="mt-8 flex flex-wrap gap-3">

          {[
            "Youth Inspiration",
            "Para Athletes",
            "Sports Culture",
            "Mental Strength",
            "Fitness",
            "Motivation",
          ].map((item) => (

            <div
              key={item}
              className="px-4 py-2 rounded-full border border-orange-500/20 bg-orange-500/10 text-orange-400 text-sm"
            >
              {item}
            </div>

          ))}

        </div>

      </div>

    </div>

  </div>

</section>

      {/* FITSTREAK SECTION */}
<section className="relative py-20 md:py-32 border-t border-white/10 overflow-hidden">

  <div className="absolute inset-0 bg-orange-500/5 blur-3xl"></div>

  <div className="max-w-7xl mx-auto px-5 md:px-6 grid lg:grid-cols-2 gap-20 items-center relative z-10">

    <div className="text-center lg:text-left">

      <p className="text-orange-500 font-semibold tracking-[0.3em] uppercase">
        FitStreak
      </p>

      <p className="text-orange-500 uppercase tracking-[0.4em] text-sm font-semibold mb-6">
        Inspired by the Fit India Movement
      </p>

      <h2 className="mt-6 text-4xl md:text-6xl font-black leading-tight">
        Track Every
        <span className="text-orange-500"> Move</span>
      </h2>

      <p className="mt-6 text-lg md:text-xl text-gray-300 leading-relaxed">
        Monitor workouts, steps, calories, streaks, and performance
        with the ultimate athlete companion app.
      </p>

      {/* HIGHLIGHT BOX */}
      <div className="mt-8 rounded-3xl border border-orange-500/20 bg-orange-500/10 p-6 backdrop-blur-xl">

        <p className="text-orange-400 uppercase tracking-[0.25em] text-xs font-semibold">
          Social Impact Initiative
        </p>

        <p className="mt-4 text-gray-300 leading-relaxed text-base md:text-lg">
          FitStreak is also a fundraising initiative created to support
          para-athletes and grassroots sports development across India.
          Every challenge accepted, every streak completed, and every
          step taken helps someone move closer to achieving their dream.
        </p>

      </div>

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
          w-[250px]
          sm:w-[300px]
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

{/* LITTLE FEETS PRESCHOOL SECTION */}
<section className="relative py-24 border-t border-white/10 overflow-hidden">

  {/* GLOW */}
  <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-orange-500/10 blur-[140px] rounded-full"></div>

  <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-orange-500/10 blur-[140px] rounded-full"></div>

  <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-6">

    {/* TOP */}
    <div className="text-center max-w-5xl mx-auto">

      <p className="text-orange-500 uppercase tracking-[0.35em] text-sm font-semibold">
        Little Feet’s Pre School
      </p>

      <h2 className="mt-5 text-4xl md:text-6xl font-black leading-tight">

        An Initiative By
        <span className="text-orange-500"> Elite Games Federation</span>

      </h2>

      <p className="mt-8 text-gray-300 text-lg md:text-xl leading-relaxed">

        At Little Feet’s Pre School, we believe sports, discipline,
        confidence, and leadership should begin right from childhood.

      </p>

      <p className="mt-5 text-gray-400 text-lg leading-relaxed max-w-4xl mx-auto">

        Our mission is to provide high-quality education while developing
        creativity, curiosity, physical activity, teamwork, and sports
        interest from the very beginning.

      </p>

      {/* BUTTON */}
      <div className="mt-10">

        <a
          href="https://little-feets.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 transition px-8 py-4 rounded-2xl text-lg font-semibold"
        >
          Visit Little Feet’s
        </a>

      </div>

      {/* LOCATION */}
      <div className="mt-8 inline-flex items-center gap-3 px-6 py-3 rounded-full border border-orange-500/20 bg-orange-500/10 text-orange-400 text-sm uppercase tracking-[0.25em]">

        First Branch • Pimpri, Pune, Maharashtra 411018

      </div>

    </div>

    {/* GALLERY */}
    <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      {/* IMAGE 1 */}
      <div className="group relative overflow-hidden rounded-[32px] h-[320px] border border-white/10">

        <img
          src="/littlefeet1.png"
          alt="Little Feet Preschool"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
        />

      </div>

      {/* IMAGE 2 */}
      <div className="group relative overflow-hidden rounded-[32px] h-[320px] border border-white/10">

        <img
          src="/littlefeet2.png"
          alt="Little Feet Preschool"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
        />

      </div>

      {/* IMAGE 3 */}
      <div className="group relative overflow-hidden rounded-[32px] h-[320px] border border-white/10">

        <img
          src="/littlefeet3.png"
          alt="Little Feet Preschool"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
        />

      </div>

     

    </div>

  </div>

</section>

{/* PREMIUM ELITE GALLERY */}
<section className="relative py-24 overflow-hidden border-t border-white/10">

  {/* BACKGROUND GLOW */}
  <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-orange-500/10 blur-[140px] rounded-full"></div>

  <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-orange-500/10 blur-[140px] rounded-full"></div>

  <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-6">

    {/* TOP */}
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">

      <div>

        <p className="text-orange-500 uppercase tracking-[0.35em] text-sm font-semibold">
          Elite Gallery
        </p>

      </div>

      {/* BADGE */}
      <div className="px-6 py-4 rounded-2xl border border-orange-500/20 bg-orange-500/10 backdrop-blur-xl">

        <p className="text-orange-400 uppercase tracking-[0.25em] text-xs">
          Powered By #KheloYouth
        </p>

      </div>

    </div>

    {/* GALLERY GRID */}
    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

      {/* IMAGE 1 */}
      <div className="group relative overflow-hidden rounded-[32px] h-[300px] border border-white/10">

        <img
          src="/navdeepsingh.jpg"
          alt="Navdeep Singh"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

        <div className="absolute bottom-0 p-6">

          <p className="text-orange-400 uppercase tracking-[0.3em] text-xs">
            Javelin Throwers
          </p>

          <h3 className="mt-3 text-xl font-black">
            Suraj Gaywal
          </h3>

        </div>

      </div>

      {/* IMAGE 2 */}
      <div className="group relative overflow-hidden rounded-[32px] h-[300px] border border-white/10">

        <img
          src="/arjunmeghwal.png"
          alt="Arjun Meghwal"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

        <div className="absolute bottom-0 p-6">

          <p className="text-orange-400 uppercase tracking-[0.3em] text-xs">
            Union Minister
          </p>

          <h3 className="mt-3 text-xl font-black">
            Shri. Arjun Meghwalji
          </h3>

        </div>

      </div>

      {/* IMAGE 3 */}
      <div className="group relative overflow-hidden rounded-[32px] h-[300px] border border-white/10">

        <img
          src="/paraathletes.png"
          alt="Para-Athletes"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

        <div className="absolute bottom-0 p-6">

          <p className="text-orange-400 uppercase tracking-[0.3em] text-xs">
            Ms. Kajal Keshi, General Secretary
          </p>

          <h3 className="mt-3 text-xl font-black">
            With Para-Athletes
          </h3>

        </div>

      </div>

      {/* IMAGE 4 */}
      <div className="group relative overflow-hidden rounded-[32px] h-[300px] border border-white/10">

        <img
          src="/ruralsports.png"
          alt="Rural Sports"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

        <div className="absolute bottom-0 p-6">

          <p className="text-orange-400 uppercase tracking-[0.3em] text-xs">
            Rural Tournament
          </p>

          <h3 className="mt-3 text-xl font-black">
            Team Elite
          </h3>

        </div>

      </div>

    </div>

  </div>

</section>

{/* INSTAGRAM FEED */}
<section className="relative py-20 md:py-24 overflow-hidden border-t border-white/10">

  <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-orange-500/10 blur-[140px] rounded-full"></div>

  <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-6">

    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

      <div>

        <p className="text-orange-500 uppercase tracking-[0.35em] text-sm font-semibold">
          Instagram
        </p>

        <h2 className="mt-5 text-4xl md:text-6xl font-black leading-tight">
          Follow
          <span className="text-orange-500"> Elite Games Federation</span>
        </h2>

        <p className="mt-6 text-gray-400 text-lg leading-relaxed max-w-3xl">
          Watch academy updates, athlete stories, tournaments, and federation
          moments from our official Instagram page.
        </p>

      </div>

      <a
        href="https://www.instagram.com/elitegamesfederation/"
        target="_blank"
        rel="noopener noreferrer"
        className="w-fit bg-orange-500 hover:bg-orange-600 transition px-8 py-4 rounded-2xl text-lg font-bold shadow-[0_0_40px_rgba(255,115,0,0.35)]"
      >
        Open Instagram
      </a>

    </div>

    <div className="mt-12 rounded-[36px] border border-white/10 bg-zinc-900/70 backdrop-blur-xl p-4 md:p-8 overflow-hidden">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink="https://www.instagram.com/elitegamesfederation/"
        data-instgrm-version="14"
        style={{
          background: "#000",
          border: 0,
          borderRadius: "28px",
          margin: "0 auto",
          maxWidth: "920px",
          minWidth: "326px",
          width: "100%",
        }}
      >
        <a
          href="https://www.instagram.com/elitegamesfederation/"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-orange-500 font-bold py-16"
        >
          View @elitegamesfederation on Instagram
        </a>
      </blockquote>
    </div>

  </div>

  <Script src="https://www.instagram.com/embed.js" strategy="afterInteractive" />

</section>

<Footer />

    </main>
  );
}
