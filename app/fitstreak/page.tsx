import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function FitStreakPage() {
  return (
    <main className="min-h-screen pt-40 md:pt-0 bg-black text-white overflow-hidden">

      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-52 pb-28 overflow-hidden">

        {/* GLOW EFFECTS */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-500/10 blur-[140px] rounded-full"></div>

        <div className="absolute top-20 right-0 w-[450px] h-[450px] bg-orange-500/10 blur-[130px] rounded-full"></div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center relative z-10">

          {/* LEFT CONTENT */}
          <div>

            <p className="uppercase tracking-[0.4em] text-white-500 font-semibold">
              Inspired By
            </p>

<p className="uppercase tracking-[0.4em] text-orange-500 font-bold text-2xl">
              Fit India Movement
            </p>


            <h1 className="mt-6 text-6xl md:text-8xl font-black leading-none">
              LET’S MAKE
              <span className="block text-orange-500 mt-2">
                INDIA FIT
              </span>
            </h1>

            <div className="mt-6 space-y-5">

  <p className="text-xl text-gray-300 leading-relaxed">
    FitStreak is more than just a fitness app. It’s a movement built
    around discipline, consistency, self-growth, and transformation.
  </p>

  {/* HIGHLIGHT BOX */}
  <div className="relative overflow-hidden rounded-3xl border border-orange-500/20 bg-orange-500/10 backdrop-blur-xl p-6">

    {/* GLOW */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 blur-3xl rounded-full"></div>

    <p className="relative z-10 text-orange-400 uppercase tracking-[0.3em] text-xs font-semibold">
      Purpose Driven Movement
    </p>

    <h3 className="relative z-10 mt-3 text-2xl font-black leading-tight text-white">
      Every Challenge Accepted
      <span className="text-orange-500"> Helps Someone Rise</span>
    </h3>

    <p className="relative z-10 mt-4 text-gray-300 leading-relaxed">

      FitStreak is also a fundraising initiative dedicated to supporting
      para-athletes and grassroots sports development across India.

    </p>

    <p className="relative z-10 mt-4 text-gray-400 leading-relaxed">

      Every workout completed, every challenge accepted, and every streak
      maintained contributes towards empowering athletes who continue to
      fight against limitations to achieve their dreams and inspire millions.

    </p>

  </div>

</div>

            {/* BUTTONS */}
            <div className="mt-10 flex flex-wrap gap-5">

              <button className="bg-orange-500 hover:bg-orange-600 transition px-8 py-4 rounded-2xl text-lg font-bold shadow-[0_0_40px_rgba(255,115,0,0.35)]">
                Download App
              </button>

              <button className="border border-white/20 hover:border-orange-500 hover:bg-orange-500/10 transition px-8 py-4 rounded-2xl text-lg font-semibold">
                Explore Features
              </button>

            </div>

            

          </div>

          {/* RIGHT SIDE */}
          <div className="relative flex justify-center">

            {/* MAIN CARD */}
            <div className="relative w-full max-w-xl h-[680px] rounded-[40px] overflow-hidden border border-white/10 bg-zinc-900 shadow-[0_0_80px_rgba(255,115,0,0.15)]">

              <img
                src="/lets-make-india-fit.png"
                alt="FitStreak"
                className="w-full h-full object-cover opacity-90"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent"></div>

              {/* FLOATING CARD */}
              <div className="absolute bottom-8 left-8 right-8 bg-black/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

                <p className="text-orange-400 uppercase tracking-[0.25em] text-sm font-semibold">
                  FitStreak Movement
                </p>

                <h3 className="mt-3 text-3xl font-black">
                  Discipline Creates Champions
                </h3>

                <p className="mt-4 text-gray-300 leading-relaxed">
                  Every streak, every step, and every workout
                  pushes you closer to your strongest version.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* FEATURES SECTION */}
      <section className="max-w-7xl mx-auto px-6 pb-28">

        <div className="text-center">

          <p className="text-orange-500 uppercase tracking-[0.4em] font-semibold">
            Why FitStreak?
          </p>

          <h2 className="mt-5 text-6xl font-black">
            BUILT FOR CONSISTENCY
          </h2>

        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* CARD 1 */}
          <div className="bg-zinc-900 border border-white/10 rounded-[32px] p-8 hover:border-orange-500 hover:-translate-y-2 transition duration-300">

            <div className="w-16 h-16 rounded-2xl bg-orange-500/20 flex items-center justify-center text-3xl">
              🏆
            </div>

            <h3 className="mt-8 text-3xl font-black">
              Challenges
            </h3>

            <p className="mt-5 text-gray-400 leading-relaxed">
              Complete the ultimate discipline challenges and unlock rewards.
            </p>

          </div>

          {/* CARD 2 */}
          <div className="bg-zinc-900 border border-white/10 rounded-[32px] p-8 hover:border-orange-500 hover:-translate-y-2 transition duration-300">

            <div className="w-16 h-16 rounded-2xl bg-orange-500/20 flex items-center justify-center text-3xl">
              🔥
            </div>

            <h3 className="mt-8 text-3xl font-black">
              Daily Streaks
            </h3>

            <p className="mt-5 text-gray-400 leading-relaxed">
              Stay accountable with streak tracking and progress monitoring.
            </p>

          </div>

          {/* CARD 3 */}
          <div className="bg-zinc-900 border border-white/10 rounded-[32px] p-8 hover:border-orange-500 hover:-translate-y-2 transition duration-300">

            <div className="w-16 h-16 rounded-2xl bg-orange-500/20 flex items-center justify-center text-3xl">
              📈
            </div>

            <h3 className="mt-8 text-3xl font-black">
              Analytics
            </h3>

            <p className="mt-5 text-gray-400 leading-relaxed">
              Measure workouts, calories, steps, and transformation insights.
            </p>

          </div>

          {/* CARD 4 */}
          <div className="bg-zinc-900 border border-white/10 rounded-[32px] p-8 hover:border-orange-500 hover:-translate-y-2 transition duration-300">

            <div className="w-16 h-16 rounded-2xl bg-orange-500/20 flex items-center justify-center text-3xl">
              💪
            </div>

            <h3 className="mt-8 text-3xl font-black">
              Motivation
            </h3>

            <p className="mt-5 text-gray-400 leading-relaxed">
              Transform discipline into lifestyle with community-driven fitness.
            </p>

          </div>

        </div>

      </section>

      {/* COMING SOON SECTION */}
      <section className="relative py-28 border-y border-white/10 overflow-hidden">

        <div className="absolute inset-0 bg-orange-500/5 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center relative z-10">

          {/* LEFT IMAGE */}
          <div className="flex justify-center">

            <div className="rounded-[40px] overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(255,115,0,0.15)]">

              <img
                src="/comingsoon.png"
                alt="Coming Soon"
                className="w-full max-w-[500px] object-cover"
              />

            </div>

          </div>

          {/* RIGHT CONTENT */}
          <div>

            <p className="text-orange-500 uppercase tracking-[0.4em] font-semibold">
              Coming Soon
            </p>

            <h2 className="mt-6 text-6xl font-black leading-tight">
              THE
              <span className="text-orange-500"> 45/75 HARD</span>
              <br />
              CHALLENGE
            </h2>

            <p className="mt-8 text-xl text-gray-300 leading-relaxed">
              Push your limits mentally and physically through
              India’s most disciplined transformation movement.
            </p>

            <div className="mt-10 space-y-6">

              <div className="flex gap-4">
                <div className="w-3 h-3 bg-orange-500 rounded-full mt-2"></div>

                <p className="text-gray-300">
                  Daily fitness and mindset tasks.
                </p>
              </div>

              <div className="flex gap-4">
                <div className="w-3 h-3 bg-orange-500 rounded-full mt-2"></div>

                <p className="text-gray-300">
                  Build discipline and consistency.
                </p>
              </div>

              <div className="flex gap-4">
                <div className="w-3 h-3 bg-orange-500 rounded-full mt-2"></div>

                <p className="text-gray-300">
                  Earn trophies, badges, and transformation recognition.
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* APP PREVIEW */}
      <section className="max-w-7xl mx-auto px-6 py-28">

        <div className="text-center">

          <p className="text-orange-500 uppercase tracking-[0.4em] font-semibold">
            Smart Tracking
          </p>

          <h2 className="mt-5 text-6xl font-black">
            APP EXPERIENCE
          </h2>

        </div>

        <div className="mt-20 flex justify-center">

          <div className="w-[340px] h-[680px] rounded-[50px] border border-white/10 bg-zinc-900 p-4 shadow-[0_0_80px_rgba(255,115,0,0.18)]">

            <div className="w-full h-full rounded-[40px] bg-black overflow-hidden relative p-6 flex flex-col">

              {/* TOP */}
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-gray-400 text-sm">
                    Welcome Back
                  </p>

                  <h3 className="text-3xl font-black mt-1">
                    FitStreak
                  </h3>
                </div>

                <div className="relative flex items-center justify-center">
  {/* GLOW */}
  <div className="absolute w-20 h-20 bg-orange-500/30 blur-2xl rounded-full"></div>

  {/* LOGO */}
  <img
    src="/fitstreaklogo.png"
    alt="FitStreak Logo"
    className="relative w-18 h-18 object-contain drop-shadow-[0_0_25px_rgba(255,115,0,0.9)] animate-pulse"
  />
</div>

              </div>

              {/* STEPS */}
              <div className="mt-14">

                <p className="text-gray-400">
                  Today Steps
                </p>

                <h2 className="text-6xl font-black mt-3">
                  12,846
                </h2>

              </div>

              {/* CARDS */}
              <div className="mt-10 space-y-5">

                <div className="bg-zinc-900 rounded-3xl p-6 border border-white/5">

                  <p className="text-gray-400">
                    Calories Burned
                  </p>

                  <h3 className="text-4xl font-black mt-2">
                    742 kcal
                  </h3>

                </div>

                <div className="bg-zinc-900 rounded-3xl p-6 border border-white/5">

                  <p className="text-gray-400">
                    Workout Time
                  </p>

                  <h3 className="text-4xl font-black mt-2">
                    1h 32m
                  </h3>

                </div>

              </div>

              {/* BUTTON */}
              <div className="mt-auto">

                <button className="w-full bg-orange-500 hover:bg-orange-600 transition py-5 rounded-2xl text-lg font-bold shadow-[0_0_35px_rgba(255,115,0,0.35)]">
                  Start Workout
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

      <Footer />

    </main>
  );
}