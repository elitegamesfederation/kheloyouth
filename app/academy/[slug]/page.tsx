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

const getStudentSports = (student: any) =>
  Array.isArray(student?.sports)
    ? student.sports
    : student?.sports
    ? [student.sports]
    : [];

const getAchievementLines = (achievement: string) =>
  String(achievement || "")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.replace(/^[-*\d.)\s]+/, "").trim())
    .filter(Boolean);

export default function PublicAcademyPage() {
  const params = useParams();
  const slug = String(params.slug || "");
  const [academy, setAcademy] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
  const academyGallery = Array.isArray(academy?.academyImageUrls)
    ? academy.academyImageUrls
    : [];
  const academySports = Array.isArray(academy?.sportsConducted)
    ? academy.sportsConducted
    : [];
  const owners = Array.isArray(academy?.owners) ? academy.owners : [];
  const eliteStudents = liveStudents.filter(
    (student: any) => student.isEliteAthlete
  );
  const coverImage =
    academy?.featuredAcademyImageUrl ||
    academyGallery[0] ||
    fallbackImage;
  const logoImage = academy?.academyLogoUrl || academy?.logoURL || "";
  const location = [academy?.city, academy?.district, academy?.state]
    .filter(Boolean)
    .join(", ");

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="pt-44 pb-24 max-w-7xl mx-auto px-6">
        {loading && <p className="text-zinc-400">Loading academy...</p>}

        {!loading && !academy && (
          <div className="bg-zinc-900 border border-white/10 rounded-[35px] p-10">
            <h1 className="text-5xl font-black">Academy Not Found</h1>
            <p className="mt-4 text-zinc-400">
              This academy is not live yet or payment is pending.
            </p>
          </div>
        )}

        {academy && (
          <>
            <section className="relative overflow-hidden rounded-[35px] border border-white/10 bg-zinc-950">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-40"
                style={{ backgroundImage: `url(${coverImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/35" />
              <div className="relative min-h-[470px] p-7 md:p-12 flex flex-col justify-end">
                <div className="flex flex-col lg:flex-row lg:items-end gap-8">
                  <div className="w-36 h-36 md:w-44 md:h-44 rounded-3xl border border-white/10 bg-black/80 p-4 flex items-center justify-center">
                    {logoImage ? (
                      <img
                        src={logoImage}
                        alt={academy.academyName}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-6xl font-black text-orange-500">
                        {(academy.academyName || "A").charAt(0)}
                      </span>
                    )}
                  </div>

                  <div className="max-w-4xl">
                    <p className="text-orange-500 uppercase tracking-[0.4em]">
                      Affiliated Academy
                    </p>
                    <h1 className="mt-4 text-5xl md:text-7xl font-black leading-none">
                      {academy.academyName}
                    </h1>
                    <p className="mt-4 text-xl text-zinc-300">
                      {location || "Location not available"}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <span className="bg-green-500 text-black px-4 py-2 rounded-full font-black">
                        Affiliation Active
                      </span>
                      {academy.affiliationNumber && (
                        <span className="bg-white/10 border border-white/10 px-4 py-2 rounded-full font-bold">
                          {academy.affiliationNumber}
                        </span>
                      )}
                      <span className="bg-white/10 border border-white/10 px-4 py-2 rounded-full font-bold">
                        {liveStudents.length} Students
                      </span>
                      <span className="bg-white/10 border border-white/10 px-4 py-2 rounded-full font-bold">
                        {owners.length} Owners / Coaches
                      </span>
                      {eliteStudents.length > 0 && (
                        <span className="bg-orange-500 text-black px-4 py-2 rounded-full font-black">
                          {eliteStudents.length} Elite Athlete{eliteStudents.length > 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-10 grid lg:grid-cols-[1.25fr_0.75fr] gap-8">
              <div className="bg-zinc-900 border border-white/10 rounded-[35px] p-8">
                <h2 className="text-4xl font-black">Academy Description</h2>
                <p className="mt-5 text-lg text-zinc-300 leading-relaxed whitespace-pre-line">
                  {academy.academyDescription ||
                    "Academy description not added yet."}
                </p>
              </div>

              <div className="bg-zinc-900 border border-white/10 rounded-[35px] p-8">
                <h2 className="text-4xl font-black">Sports Conducted</h2>
                <div className="mt-5 flex flex-wrap gap-3">
                  {academySports.length ? (
                    academySports.map((sport: string) => (
                      <span
                        key={sport}
                        className="bg-orange-500/10 border border-orange-500/40 text-orange-400 rounded-full px-4 py-2 font-bold"
                      >
                        {sport}
                      </span>
                    ))
                  ) : (
                    <p className="text-zinc-400">No sports added.</p>
                  )}
                </div>
              </div>
            </section>

            {eliteStudents.length > 0 && (
              <section className="mt-10 bg-orange-500 text-black rounded-[35px] p-8">
                <p className="uppercase tracking-[0.3em] text-sm font-black">
                  Elite Athlete Spotlight
                </p>
                <h2 className="mt-3 text-4xl font-black">
                  Featured Elite Athletes
                </h2>
                <div className="mt-6 grid md:grid-cols-2 gap-5">
                  {eliteStudents.map((student: any, index: number) => (
                    <div
                      key={index}
                      className="bg-black text-white rounded-3xl p-5 flex flex-col sm:flex-row gap-5"
                    >
                      {student.photoUrl ? (
                        <img
                          src={student.photoUrl}
                          alt={student.name || "Elite Athlete"}
                          className="w-28 h-32 rounded-2xl object-cover"
                        />
                      ) : (
                        <div className="w-28 h-32 rounded-2xl bg-zinc-900 flex items-center justify-center text-4xl font-black text-orange-500">
                          {(student.name || "E").charAt(0)}
                        </div>
                      )}
                      <div>
                        <h3 className="text-2xl font-black">
                          {student.name || `Elite Athlete ${index + 1}`}
                        </h3>
                        <p className="mt-2 text-zinc-300">
                          {[
                            getStudentSports(student).join(", "),
                            student.school,
                            student.age && `${student.age} yrs`,
                          ]
                            .filter(Boolean)
                            .join(" | ")}
                        </p>
                        {getAchievementLines(student.achievement).length > 0 && (
                          <ol className="mt-3 list-decimal list-inside text-zinc-200 space-y-1">
                            {getAchievementLines(student.achievement).map(
                              (achievement, achievementIndex) => (
                                <li key={achievementIndex}>{achievement}</li>
                              )
                            )}
                          </ol>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                ["Location", location],
                ["Full Address", academy.fullAddress],
                ["Established", academy.establishmentYear],
                ["Contact", academy.contactNumber],
                ["Email", academy.officialEmail],
                ["Website", academy.websiteLink],
                ["Google Location", academy.googleLocation],
                ["Instagram", academy.instagramLink],
                ["Facebook", academy.facebookLink],
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
            </section>

            {academyGallery.length > 0 && (
              <section className="mt-10 bg-zinc-900 border border-white/10 rounded-[35px] p-8">
                <h2 className="text-4xl font-black">Academy Photos</h2>
                <div className="mt-6 grid md:grid-cols-3 gap-5">
                  {academyGallery.map((imageUrl: string, index: number) => (
                    <img
                      key={`${imageUrl}-${index}`}
                      src={imageUrl}
                      alt={`${academy.academyName} photo ${index + 1}`}
                      className="w-full h-60 object-cover rounded-3xl border border-white/10"
                    />
                  ))}
                </div>
              </section>
            )}

            <section className="mt-10 grid lg:grid-cols-2 gap-8">
              <div className="bg-zinc-900 border border-white/10 rounded-[35px] p-8">
                <h2 className="text-4xl font-black">Owner / Coach Details</h2>
                <div className="mt-6 space-y-4">
                  {owners.length ? (
                    owners.map((owner: any, index: number) => (
                      <div
                        key={index}
                        className="bg-black border border-zinc-700 rounded-2xl p-5 flex gap-5"
                      >
                        {owner.photoUrl ? (
                          <img
                            src={owner.photoUrl}
                            alt={owner.fullName || "Owner"}
                            className="w-20 h-24 rounded-xl object-cover"
                          />
                        ) : (
                          <div className="w-20 h-24 rounded-xl bg-zinc-900 flex items-center justify-center text-2xl font-black text-orange-500">
                            {(owner.fullName || "O").charAt(0)}
                          </div>
                        )}
                        <div>
                          <p className="text-xl font-bold">
                            {owner.fullName || `Owner ${index + 1}`}
                          </p>
                          <p className="mt-2 text-orange-500 font-bold">
                            {owner.role || "Owner"}
                          </p>
                          <p className="mt-2 text-zinc-400">
                            {[owner.sex, owner.designation].filter(Boolean).join(" | ") ||
                              "Designation not added"}
                          </p>
                          <p className="mt-2 text-zinc-400">
                            Blood Group: {owner.bloodGroup || "Not added"}
                          </p>
                          <p className="mt-2 text-zinc-400">
                            ID: {owner.memberId || "Not generated"}
                          </p>
                          <p className="mt-2 text-zinc-400">
                            {owner.mobile || "Mobile not added"} | {owner.email || "Email not added"}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-zinc-400">No owner details added yet.</p>
                  )}
                </div>
              </div>

              <div className="bg-zinc-900 border border-white/10 rounded-[35px] p-8">
                <h2 className="text-4xl font-black">Student Details</h2>
                <div className="mt-6 space-y-4">
                  {liveStudents.length ? (
                    liveStudents.map((student: any, index: number) => (
                      <div
                        key={index}
                        className="bg-black border border-zinc-700 rounded-2xl p-5 flex gap-5"
                      >
                        {student.photoUrl ? (
                          <img
                            src={student.photoUrl}
                            alt={student.name || `Student ${index + 1}`}
                            className="w-20 h-24 object-cover rounded-xl border border-white/10"
                          />
                        ) : (
                          <div className="w-20 h-24 rounded-xl bg-zinc-900 flex items-center justify-center text-2xl font-black text-orange-500">
                            {(student.name || "S").charAt(0)}
                          </div>
                        )}
                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <p className="text-xl font-bold">
                              {student.name || `Student ${index + 1}`}
                            </p>
                            {student.isEliteAthlete && (
                              <span className="bg-orange-500 text-black px-3 py-1 rounded-full text-xs font-black">
                                Elite Athlete
                              </span>
                            )}
                          </div>
                          <p className="mt-2 text-zinc-400">
                            {[
                              getStudentSports(student).join(", "),
                              student.sex,
                              student.age && `${student.age} yrs`,
                            ]
                              .filter(Boolean)
                              .join(" | ") || "Sport not added"}
                          </p>
                          <p className="mt-2 text-zinc-400">
                            {student.school || "School not added"}
                          </p>
                          <p className="mt-2 text-zinc-400">
                            Blood Group: {student.bloodGroup || "Not added"}
                          </p>
                          <p className="mt-2 text-zinc-400">
                            ID: {student.memberId || "Not generated"}
                          </p>
                          {getAchievementLines(student.achievement).length > 0 && (
                            <ol className="mt-3 list-decimal list-inside text-zinc-300 space-y-1">
                              {getAchievementLines(student.achievement).map(
                                (achievement, achievementIndex) => (
                                  <li key={achievementIndex}>{achievement}</li>
                                )
                              )}
                            </ol>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-zinc-400">No student details added yet.</p>
                  )}
                </div>
              </div>
            </section>
          </>
        )}
      </section>

      <Footer />
    </main>
  );
}
