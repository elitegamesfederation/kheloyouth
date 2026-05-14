"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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

export default function PublicAcademyPage() {
  const params = useParams();
  const slug = String(params.slug || "");
  const [academy, setAcademy] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const academyStudents = Array.isArray(academy?.students)
    ? academy.students
    : [];
  const liveStudents = academyStudents.slice(
    0,
    Number(
      academy?.paidStudentsCount ??
        academy?.studentsCount ??
        academyStudents.length
    )
  );

  useEffect(() => {
    const loadAcademy = async () => {
      const academyQuery = query(
        collection(db, "academies"),
        where("paymentDone", "==", true)
      );

      const snap = await getDocs(academyQuery);
      const matchingDoc = snap.docs.find((academyDoc) => {
        const data = academyDoc.data();

        return (
          data.academySlug === slug ||
          slugify(data.academyName || "") === slug
        );
      });

      if (matchingDoc) {
        setAcademy({
          id: matchingDoc.id,
          ...matchingDoc.data(),
        });
      }

      setLoading(false);
    };

    loadAcademy();
  }, [slug]);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="pt-44 pb-24 max-w-7xl mx-auto px-6">
        {loading && (
          <p className="text-zinc-400">Loading academy...</p>
        )}

        {!loading && !academy && (
          <div className="bg-zinc-900 border border-white/10 rounded-[35px] p-10">
            <h1 className="text-5xl font-black">
              Academy Not Found
            </h1>
            <p className="mt-4 text-zinc-400">
              This academy is not live yet or payment is pending.
            </p>
          </div>
        )}

        {academy && (
          <>
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-start">
              <div>
                <p className="text-orange-500 uppercase tracking-[0.4em]">
                  Affiliated Academy
                </p>

                <h1 className="mt-5 text-6xl md:text-7xl font-black">
                  {academy.academyName}
                </h1>

                <p className="mt-6 text-xl text-zinc-300 leading-relaxed">
                  {academy.academyDescription ||
                    "Officially affiliated with Elite Games Federation."}
                </p>
              </div>

              <img
                src={academy.logoURL || fallbackImage}
                alt={academy.academyName}
                className="w-full h-[320px] object-cover rounded-[35px] border border-white/10"
              />
            </div>

            <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                ["Location", [academy.city, academy.district, academy.state].filter(Boolean).join(", ")],
                ["Address", academy.fullAddress],
                ["Established", academy.establishmentYear],
                ["Contact", academy.contactNumber],
                ["Email", academy.officialEmail],
                ["Sports", (Array.isArray(academy.sportsConducted) ? academy.sportsConducted : []).join(", ")],
                ["Students", `${liveStudents.length}`],
                ["Owners / Coaches", `${academy.owners?.length || 0}`],
                ["Google Location", academy.googleLocation],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="bg-zinc-900 border border-white/10 rounded-3xl p-6"
                >
                  <p className="text-orange-500 uppercase tracking-[0.2em] text-xs">
                    {label}
                  </p>
                  <p className="mt-3 text-lg font-bold break-words">
                    {value || "Not available"}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 grid lg:grid-cols-2 gap-8">
              <div className="bg-zinc-900 border border-white/10 rounded-[35px] p-8">
                <h2 className="text-4xl font-black">
                  Owner / Coach Details
                </h2>

                <div className="mt-6 space-y-4">
                  {(academy.owners || []).map((owner: any, index: number) => (
                    <div
                      key={index}
                      className="bg-black border border-zinc-700 rounded-2xl p-5"
                    >
                      <p className="text-xl font-bold">
                        {owner.fullName || `Owner ${index + 1}`}
                      </p>
                      <p className="mt-2 text-zinc-400">
                        {owner.role || "Owner"} • {owner.designation || "Designation not added"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-zinc-900 border border-white/10 rounded-[35px] p-8">
                <h2 className="text-4xl font-black">
                  Featured Students
                </h2>

                <div className="mt-6 space-y-4">
                  {liveStudents.map((student: any, index: number) => (
                    <div
                      key={index}
                      className="bg-black border border-zinc-700 rounded-2xl p-5"
                    >
                      <p className="text-xl font-bold">
                        {student.name || `Student ${index + 1}`}
                      </p>
                      <p className="mt-2 text-zinc-400">
                        {[student.sports, student.school, student.age && `${student.age} yrs`]
                          .filter(Boolean)
                          .join(" • ")}
                      </p>
                      {(student.isEliteAthlete || student.isParaAthlete) && (
                        <p className="mt-3 text-orange-500 font-bold">
                          {student.isEliteAthlete ? "Elite Athlete" : ""}
                          {student.isEliteAthlete && student.isParaAthlete ? " • " : ""}
                          {student.isParaAthlete ? "Para Athlete" : ""}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </section>

      <Footer />
    </main>
  );
}
