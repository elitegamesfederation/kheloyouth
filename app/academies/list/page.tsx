"use client";

import { useEffect, useMemo, useState } from "react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import { db } from "@/app/lib/firebase";

import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const fallbackImage =
  "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop";

const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function AcademiesListPage() {
  const [academies, setAcademies] = useState<any[]>([]);
  const [selectedSport, setSelectedSport] = useState("All Sports");
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedDistrict, setSelectedDistrict] = useState("All Districts");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadAcademies = async () => {
      const academiesQuery = query(
        collection(db, "academies"),
        where("paymentDone", "==", true)
      );

      const snap = await getDocs(academiesQuery);

      setAcademies(
        snap.docs.map((academyDoc) => ({
          id: academyDoc.id,
          ...academyDoc.data(),
        }))
      );
    };

    loadAcademies();
  }, []);

  const sports = useMemo(
    () => [
      "All Sports",
      ...Array.from(
        new Set(
          academies.flatMap((academy) =>
            Array.isArray(academy.sportsConducted)
              ? academy.sportsConducted
              : []
          )
        )
      ),
    ],
    [academies]
  );

  const states = useMemo(
    () => [
      "All States",
      ...Array.from(
        new Set(
          academies
            .map((academy) => academy.state)
            .filter(Boolean)
        )
      ),
    ],
    [academies]
  );

  const districts = useMemo(
    () => [
      "All Districts",
      ...Array.from(
        new Set(
          academies
            .map((academy) => academy.district)
            .filter(Boolean)
        )
      ),
    ],
    [academies]
  );

  const filteredAcademies = academies.filter((academy) => {
    const academySports = Array.isArray(academy.sportsConducted)
      ? academy.sportsConducted
      : [];

    const matchesSport =
      selectedSport === "All Sports" ||
      academySports.includes(selectedSport);

    const matchesState =
      selectedState === "All States" ||
      academy.state === selectedState;

    const matchesDistrict =
      selectedDistrict === "All Districts" ||
      academy.district === selectedDistrict;

    const matchesSearch = (academy.academyName || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    return (
      matchesSport &&
      matchesState &&
      matchesDistrict &&
      matchesSearch
    );
  });

  return (
    <main className="min-h-screen pt-40 md:pt-0 bg-black text-white overflow-hidden">
      <Navbar />

      <section className="pt-44 pb-24 max-w-7xl mx-auto px-6">
        <div className="text-center">
          <p className="text-orange-500 uppercase tracking-[0.4em] font-semibold">
            Verified Network
          </p>

          <h1 className="mt-5 text-6xl md:text-7xl font-black">
            Elite Academies
          </h1>
        </div>

        <div className="mt-16 grid md:grid-cols-4 gap-5">
          <select
            value={selectedSport}
            onChange={(e) => setSelectedSport(e.target.value)}
            className="bg-zinc-900 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          >
            {sports.map((sport) => (
              <option key={sport}>{sport}</option>
            ))}
          </select>

          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="bg-zinc-900 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          >
            {states.map((state) => (
              <option key={state}>{state}</option>
            ))}
          </select>

          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="bg-zinc-900 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          >
            {districts.map((district) => (
              <option key={district}>{district}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search Academy"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-zinc-900 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          />
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAcademies.map((academy) => {
            const slug =
              academy.academySlug ||
              slugify(academy.academyName || academy.id);

            const sport =
              Array.isArray(academy.sportsConducted) &&
              academy.sportsConducted.length
                ? academy.sportsConducted[0]
                : "Academy";

            return (
              <a
                key={academy.id}
                href={`/academy/${slug}`}
                className="bg-zinc-900 border border-white/10 rounded-[35px] overflow-hidden hover:border-orange-500 transition block"
              >
                <img
                  src={academy.logoURL || fallbackImage}
                  alt={academy.academyName || "Academy"}
                  className="w-full h-[240px] object-cover"
                />

                <div className="p-8">
                  <h2 className="text-3xl font-black">
                    {academy.academyName}
                  </h2>

                  <p className="mt-4 text-gray-400">
                    {academy.district}, {academy.state}
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="bg-orange-500/10 text-orange-500 px-4 py-2 rounded-full text-sm border border-orange-500/20">
                      {sport}
                    </span>

                    <span className="hover:text-orange-500 transition">
                      View →
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {filteredAcademies.length === 0 && (
          <p className="mt-16 text-center text-zinc-400">
            No paid affiliated academies are live yet.
          </p>
        )}
      </section>

      <Footer />
    </main>
  );
}
