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
  const profileDescription =
    academy?.academyDescription ||
    "Officially affiliated with Elite Games Federation inside India's growing grassroots sports network.";
  const featuredStudents = eliteStudents.length ? eliteStudents : liveStudents;

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
          <div className="bg-zinc-900 border border-orange-500/40 rounded-[35px] overflow-hidden">
            <div className="relative min-h-[480px] p-8 md:p-14 flex items-end">
              <img
                src={coverImage}
                alt={`${academy.academyName} banner`}
                className="absolute inset-0 w-full h-full object-cover opacity-45"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
              <div className="relative z-10 flex flex-col md:flex-row md:items-end gap-8">
                {logoImage ? (
                  <img
                    src={logoImage}
                    alt={`${academy.academyName} logo`}
                    className="w-36 h-36 rounded-3xl object-contain bg-black border border-white/10 p-4"
                  />
                ) : (
                  <div className="w-36 h-36 rounded-3xl bg-black border border-white/10 flex items-center justify-center text-6xl font-black text-orange-500">
                    {(academy.academyName || "A").charAt(0)}
                  </div>
                )}

                <div>
                  <p className="text-orange-500 uppercase tracking-[0.35em] font-semibold">
                    Affiliated Academy
                  </p>
                  <h1 className="mt-4 text-5xl md:text-7xl font-black">
                    {academy.academyName}
                  </h1>
                  <p className="mt-4 max-w-3xl text-zinc-200 text-lg whitespace-pre-line">
                    {profileDescription}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <span className="bg-green-500 text-black px-4 py-2 rounded-full font-black">
                      Affiliation Active
                    </span>
                    {academy.affiliationNumber && (
                      <span className="bg-white/10 border border-white/20 px-4 py-2 rounded-full font-bold">
                        {academy.affiliationNumber}
                      </span>
                    )}
                    <span className="bg-white/10 border border-white/20 px-4 py-2 rounded-full font-bold">
                      {liveStudents.length} Students
                    </span>
                    <span className="bg-white/10 border border-white/20 px-4 py-2 rounded-full font-bold">
                      {owners.length} Owners / Coaches
                    </span>
                    {eliteStudents.length > 0 && (
                      <span className="bg-orange-500 text-black px-4 py-2 rounded-full font-black">
                        {eliteStudents.length} Elite Athlete
                        {eliteStudents.length > 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12 grid lg:grid-cols-3 gap-8">
              <section className="lg:col-span-2 bg-black border border-white/10 rounded-3xl p-8">
                <h2 className="text-4xl font-black">Academy Description</h2>
                <p className="mt-4 text-zinc-300 leading-relaxed whitespace-pre-line">
                  {profileDescription}
                </p>
              </section>

              <section className="bg-black border border-white/10 rounded-3xl p-8">
                <h2 className="text-4xl font-black">Contact</h2>
                <div className="mt-5 space-y-3 text-zinc-300 break-words">
                  <p>{location || "Location not available"}</p>
                  {academy.officialEmail ? (
                    <a
                      href={`mailto:${academy.officialEmail}`}
                      className="block hover:text-orange-500 transition"
                    >
                      {academy.officialEmail}
                    </a>
                  ) : (
                    <p>Email not available</p>
                  )}
                  <p>{academy.contactNumber || "Contact not available"}</p>
                </div>
              </section>

              <section className="lg:col-span-3 bg-black border border-white/10 rounded-3xl p-8">
                <h2 className="text-4xl font-black">Sports Conducted</h2>
                <div className="mt-5 flex flex-wrap gap-3">
                  {academySports.length ? (
                    academySports.map((sport: string) => (
                      <span
                        key={sport}
                        className="bg-orange-500/10 text-orange-500 border border-orange-500/20 px-4 py-2 rounded-full font-bold"
                      >
                        {sport}
                      </span>
                    ))
                  ) : (
                    <p className="text-zinc-400">Sports are being updated.</p>
                  )}
                </div>
              </section>

              <section className="bg-black border border-white/10 rounded-3xl p-8">
                <h2 className="text-4xl font-black">Owner / Coach</h2>
                <div className="mt-6 space-y-4">
                  {owners.length ? (
                    owners.map((owner: any, index: number) => (
                      <div
                        key={index}
                        className="flex gap-5 bg-zinc-950 border border-white/10 rounded-2xl p-5"
                      >
                        {owner.photoUrl ? (
                          <img
                            src={owner.photoUrl}
                            alt={owner.fullName || "Owner"}
                            className="w-20 h-24 rounded-xl object-cover"
                          />
                        ) : (
                          <div className="w-20 h-24 rounded-xl bg-black border border-white/10 flex items-center justify-center text-2xl font-black text-orange-500">
                            {(owner.fullName || "O").charAt(0)}
                          </div>
                        )}
                        <div>
                          <p className="text-xl font-black">
                            {owner.fullName || `Owner ${index + 1}`}
                          </p>
                          <p className="mt-1 text-orange-500 font-bold">
                            {owner.role || "Owner"}
                          </p>
                          {owner.designation && (
                            <p className="mt-2 text-zinc-400">
                              {owner.designation}
                            </p>
                          )}
                          <p className="mt-2 text-zinc-400">
                            Blood Group: {owner.bloodGroup || "Not added"}
                          </p>
                          <p className="mt-2 text-zinc-400">
                            ID: {owner.memberId || "Not generated"}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-zinc-400">
                      Owner and coach details are being updated.
                    </p>
                  )}
                </div>
              </section>

              <section className="lg:col-span-2 bg-black border border-white/10 rounded-3xl p-8">
                <h2 className="text-4xl font-black">
                  {eliteStudents.length
                    ? "Elite Athlete Features"
                    : "Student Details"}
                </h2>
                <div className="mt-6 grid md:grid-cols-2 gap-5">
                  {featuredStudents.length ? (
                    featuredStudents.map((student: any, index: number) => (
                      <div
                        key={index}
                        className="bg-zinc-950 border border-white/10 rounded-2xl p-5 flex gap-5"
                      >
                        {student.photoUrl ? (
                          <img
                            src={student.photoUrl}
                            alt={student.name || `Student ${index + 1}`}
                            className="w-20 h-24 rounded-xl object-cover"
                          />
                        ) : (
                          <div className="w-20 h-24 rounded-xl bg-black border border-white/10 flex items-center justify-center text-2xl font-black text-orange-500">
                            {(student.name || "S").charAt(0)}
                          </div>
                        )}
                        <div>
                          <p className="text-xl font-black">
                            {student.name || `Student ${index + 1}`}
                          </p>
                          <p className="mt-1 text-zinc-400">
                            {[
                              getStudentSports(student).join(", "),
                              student.sex,
                              student.age && `${student.age} yrs`,
                            ]
                              .filter(Boolean)
                              .join(" | ") || "Sport not added"}
                          </p>
                          {student.school && (
                            <p className="mt-2 text-zinc-400">
                              {student.school}
                            </p>
                          )}
                          <p className="mt-2 text-zinc-400">
                            Blood Group: {student.bloodGroup || "Not added"}
                          </p>
                          {getAchievementLines(student.achievement).length >
                            0 && (
                            <ol className="mt-3 list-decimal list-inside text-zinc-300 space-y-1">
                              {getAchievementLines(student.achievement).map(
                                (item, achievementIndex) => (
                                  <li key={achievementIndex}>{item}</li>
                                )
                              )}
                            </ol>
                          )}
                          {student.isEliteAthlete && (
                            <span className="mt-3 inline-block bg-orange-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                              Elite Athlete
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-zinc-400">
                      Student details are being updated.
                    </p>
                  )}
                </div>
              </section>

              <section className="lg:col-span-3 bg-black border border-white/10 rounded-3xl p-8">
                <h2 className="text-4xl font-black">Academy Details</h2>
                <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    ["Established", academy.establishmentYear],
                    ["Full Address", academy.fullAddress],
                    ["Google Location", academy.googleLocation],
                    ["Website", academy.websiteLink],
                    ["Instagram", academy.instagramLink],
                    ["Facebook", academy.facebookLink],
                    ["Public URL", `kheloyouth.com/academy/${slug}`],
                    ["Affiliation No.", academy.affiliationNumber],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="bg-zinc-950 border border-white/10 rounded-2xl p-5"
                    >
                      <p className="text-orange-500 uppercase tracking-[0.2em] text-xs">
                        {label}
                      </p>
                      <p className="mt-3 font-bold break-words">
                        {value || "Not available"}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {academyGallery.length > 0 && (
                <section className="lg:col-span-3 bg-black border border-white/10 rounded-3xl p-8">
                  <h2 className="text-4xl font-black">Academy Photos</h2>
                  <div className="mt-6 grid md:grid-cols-3 gap-5">
                    {academyGallery.map((imageUrl: string, index: number) => (
                      <img
                        key={`${imageUrl}-${index}`}
                        src={imageUrl}
                        alt={`${academy.academyName} photo ${index + 1}`}
                        className="w-full h-60 object-cover rounded-2xl border border-white/10"
                      />
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
