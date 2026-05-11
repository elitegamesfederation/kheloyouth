"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const academies = [
  {
    name: "Elite Football Academy",
    sport: "Football",
    state: "Maharashtra",
    district: "Pune",
  },
  {
    name: "Warrior MMA Club",
    sport: "MMA",
    state: "Maharashtra",
    district: "Mumbai",
  },
  {
    name: "Champion Cricket Academy",
    sport: "Cricket",
    state: "Delhi",
    district: "Delhi",
  },
];

export default function AcademiesListPage() {
  return (
    <main className="min-h-screen pt-40 md:pt-0 bg-black text-white overflow-hidden">

      <Navbar />

      <section className="pt-44 pb-24 max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center">

          <p className="text-orange-500 uppercase tracking-[0.4em] font-semibold">
            Verified Network
          </p>

          <h1 className="mt-5 text-6xl md:text-7xl font-black">
            Elite Academies
          </h1>

        </div>

        {/* FILTERS */}
        <div className="mt-16 grid md:grid-cols-4 gap-5">

          <select className="bg-zinc-900 border border-white/10 rounded-2xl px-5 py-4 outline-none">
            <option>All Sports</option>
            <option>Football</option>
            <option>Cricket</option>
            <option>MMA</option>
          </select>

          <select className="bg-zinc-900 border border-white/10 rounded-2xl px-5 py-4 outline-none">
            <option>All States</option>
            <option>Maharashtra</option>
            <option>Delhi</option>
          </select>

          <select className="bg-zinc-900 border border-white/10 rounded-2xl px-5 py-4 outline-none">
            <option>All Districts</option>
            <option>Pune</option>
            <option>Mumbai</option>
          </select>

          <input
            type="text"
            placeholder="Search Academy"
            className="bg-zinc-900 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          />

        </div>

        {/* ACADEMIES */}
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {academies.map((academy) => (
            <div
              key={academy.name}
              className="bg-zinc-900 border border-white/10 rounded-[35px] overflow-hidden hover:border-orange-500 transition"
            >

              <img
                src="https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop"
                className="w-full h-[240px] object-cover"
              />

              <div className="p-8">

                <h2 className="text-3xl font-black">
                  {academy.name}
                </h2>

                <p className="mt-4 text-gray-400">
                  {academy.district}, {academy.state}
                </p>

                <div className="mt-6 flex items-center justify-between">

                  <span className="bg-orange-500/10 text-orange-500 px-4 py-2 rounded-full text-sm border border-orange-500/20">
                    {academy.sport}
                  </span>

                  <button className="hover:text-orange-500 transition">
                    View →
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

      </section>

      <Footer />

    </main>
  );
}