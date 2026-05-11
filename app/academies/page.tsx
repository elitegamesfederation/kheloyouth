import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AcademiesPage() {
  return (
    <main className="min-h-screen bg-black text-white">

      <Navbar />

      <section className="relative pt-52 pb-40 overflow-hidden">

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-500/10 blur-[150px] rounded-full"></div>

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-500/10 blur-[150px] rounded-full"></div>

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">

          <p className="text-orange-500 uppercase tracking-[0.45em] font-semibold">
            Elite Games Federation
          </p>

          <h1 className="mt-8 text-7xl md:text-8xl font-black leading-none">
            ACADEMIES
          </h1>

          <p className="mt-8 text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Explore affiliated academies across India or apply
            for official Elite Games Federation affiliation.
          </p>

          {/* BUTTONS */}
          <div className="mt-16 flex flex-wrap justify-center gap-6">

            <a
              href="/academies/affiliation"
              className="bg-orange-500 hover:bg-orange-600 transition px-10 py-5 rounded-2xl text-lg font-bold shadow-[0_0_40px_rgba(255,115,0,0.4)]"
            >
              Academy Affiliation
            </a>

            <a
              href="/academies/list"
              className="border border-white/10 hover:border-orange-500 hover:bg-orange-500/10 transition px-10 py-5 rounded-2xl text-lg font-bold"
            >
              Browse Academies
            </a>

          </div>

        </div>

      </section>

      <Footer />

    </main>
  );
}