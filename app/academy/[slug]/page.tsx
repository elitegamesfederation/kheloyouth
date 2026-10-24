import { cache } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import JsonLd, { breadcrumbSchema } from "../../components/JsonLd";

import { adminDb } from "@/app/lib/firebase-admin";
import { absoluteUrl } from "@/app/lib/site";
import { slugify } from "@/app/lib/slug";

const fallbackImage = "/elite-logo.png";

const getStudentSports = (student: any) =>
  Array.isArray(student?.sports)
    ? student.sports
    : student?.sports
    ? [student.sports]
    : [];

const getOwnerSports = (owner: any) =>
  Array.isArray(owner?.sports)
    ? owner.sports
    : owner?.sports
    ? [owner.sports]
    : [];

const getAchievementLines = (achievement: string) =>
  String(achievement || "")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.replace(/^[-*\d.)\s]+/, "").trim())
    .filter(Boolean);

const getGoogleMapUrl = (value: string) => {
  const location = String(value || "").trim();

  if (!location) return "";

  return /^https?:\/\//i.test(location)
    ? location
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        location
      )}`;
};

const getExternalUrl = (value: string) => {
  const url = String(value || "").trim();

  if (!url) return "";

  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};

const getAcademyBySlug = cache(async (slug: string) => {
  const bySlugSnap = await adminDb
    .collection("academies")
    .where("academySlug", "==", slug)
    .where("paymentDone", "==", true)
    .limit(1)
    .get();

  if (!bySlugSnap.empty) {
    const matchingDoc = bySlugSnap.docs[0];
    return { id: matchingDoc.id, ...matchingDoc.data() } as any;
  }

  // Fallback for older academies saved before academySlug existed.
  const paidAcademiesSnap = await adminDb
    .collection("academies")
    .where("paymentDone", "==", true)
    .get();

  const matchingDoc = paidAcademiesSnap.docs.find(
    (academyDoc) => slugify(academyDoc.data().academyName || "") === slug
  );

  return matchingDoc ? ({ id: matchingDoc.id, ...matchingDoc.data() } as any) : null;
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const academy = await getAcademyBySlug(slug);

  if (!academy) {
    return {
      title: "Academy Not Found",
      robots: { index: false, follow: false },
    };
  }

  const sports = (
    Array.isArray(academy.sportsConducted) ? academy.sportsConducted : []
  )
    .filter(Boolean)
    .slice(0, 2)
    .join(" & ");
  const place = [academy.city, academy.state].filter(Boolean).join(", ");
  const name = String(academy.academyName);
  // Short enough to show in full in search results (about 60 characters):
  //   "Unique Badminton Academy in Eluru"
  //   "Star Academy - Karate & Judo in Pune"
  const nameMentionsSport = sports
    ? sports
        .split(" & ")
        .some((sport: string) =>
          name.toLowerCase().includes(sport.toLowerCase())
        )
    : false;
  const title = academy.city
    ? sports && !nameMentionsSport
      ? `${name} - ${sports} in ${academy.city}`
      : `${name} in ${academy.city}`
    : name;

  const fallbackDescription = [
    `${academy.academyName}`,
    sports ? `is a ${sports} academy` : "is a sports academy",
    place ? `in ${place}` : "",
    "affiliated with Elite Games Federation. See students, coaches, photos and contact details.",
  ]
    .filter(Boolean)
    .join(" ");
  const rawDescription = String(academy.academyDescription || "").trim();
  // Search results cut descriptions at about 155 characters.
  const description = rawDescription
    ? rawDescription.length > 155
      ? `${rawDescription.slice(0, 152).trimEnd()}...`
      : rawDescription
    : fallbackDescription;
  const image =
    academy.featuredAcademyImageUrl ||
    (Array.isArray(academy.academyImageUrls) && academy.academyImageUrls[0]) ||
    fallbackImage;

  return {
    title,
    description,
    alternates: {
      canonical: `/academy/${slug}`,
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: absoluteUrl(`/academy/${slug}`),
      siteName: "KheloYouth",
      images: [{ url: image, width: 1200, height: 630, alt: academy.academyName }],
    },
  };
}

export default async function PublicAcademyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const academy = await getAcademyBySlug(slug);

  // A real 404 (not a 200 page saying "not found") so Google drops stale URLs.
  if (!academy) notFound();

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
  const eliteStudentIndexes = new Set<number>();
  const eliteStudents = liveStudents.filter((student: any, index: number) => {
    if (student.isEliteAthlete && eliteStudentIndexes.size < 2) {
      eliteStudentIndexes.add(index);
      return true;
    }

    return false;
  });
  const regularStudents = eliteStudents.length
    ? liveStudents.filter((_: any, index: number) => !eliteStudentIndexes.has(index))
    : liveStudents;
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
  const googleMapUrl = getGoogleMapUrl(academy?.googleLocation || location);
  const publicAcademyUrl = `https://www.kheloyouth.com/academy/${slug}`;
  const academyDetails = [
    { label: "Established", value: academy?.establishmentYear },
    { label: "Full Address", value: academy?.fullAddress },
    {
      label: "Google Location",
      value: googleMapUrl ? "Open Google Map" : "",
      href: googleMapUrl,
    },
    {
      label: "Website",
      value: academy?.websiteLink ? "Open Website" : "",
      href: getExternalUrl(academy?.websiteLink),
    },
    {
      label: "Instagram",
      value: academy?.instagramLink ? "Open Instagram" : "",
      href: getExternalUrl(academy?.instagramLink),
    },
    {
      label: "Facebook",
      value: academy?.facebookLink ? "Open Facebook" : "",
      href: getExternalUrl(academy?.facebookLink),
    },
    {
      label: "Public URL",
      value: `kheloyouth.com/academy/${slug}`,
      href: publicAcademyUrl,
    },
    { label: "Affiliation No.", value: academy?.affiliationNumber },
  ];
  const renderStudentCard = (
    student: any,
    index: number,
    showEliteBadge: boolean
  ) => (
    <div
      key={`${student.memberId || student.name || "student"}-${index}`}
      className="bg-zinc-950 border border-white/10 rounded-2xl p-5 flex gap-5"
    >
      {student.photoUrl ? (
        <div className="relative w-20 h-24 shrink-0 rounded-xl overflow-hidden">
          <Image
            src={student.photoUrl}
            alt={student.name || `Student ${index + 1}`}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
      ) : (
        <div className="w-20 h-24 shrink-0 rounded-xl bg-black border border-white/10 flex items-center justify-center text-2xl font-black text-orange-500">
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
          <p className="mt-2 text-zinc-400">{student.school}</p>
        )}
        <p className="mt-2 text-zinc-400">
          Blood Group: {student.bloodGroup || "Not added"}
        </p>
        {getAchievementLines(student.achievement).length > 0 && (
          <ol className="mt-3 list-decimal list-inside text-zinc-300 space-y-1">
            {getAchievementLines(student.achievement).map(
              (item, achievementIndex) => (
                <li key={achievementIndex}>{item}</li>
              )
            )}
          </ol>
        )}
        {showEliteBadge && (
          <span className="mt-3 inline-block bg-orange-500 text-black px-3 py-1 rounded-full text-sm font-bold">
            Elite Athlete
          </span>
        )}
      </div>
    </div>
  );

  const academySchema = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: academy.academyName,
    url: publicAcademyUrl,
    description: profileDescription,
    image: coverImage.startsWith("/") ? absoluteUrl(coverImage) : coverImage,
    ...(logoImage ? { logo: logoImage } : {}),
    address: {
      "@type": "PostalAddress",
      ...(academy.fullAddress ? { streetAddress: academy.fullAddress } : {}),
      ...(academy.city ? { addressLocality: academy.city } : {}),
      ...(academy.state ? { addressRegion: academy.state } : {}),
      addressCountry: "IN",
    },
    ...(googleMapUrl ? { hasMap: googleMapUrl } : {}),
    ...(academySports.length ? { sport: academySports } : {}),
    sameAs: [
      getExternalUrl(academy.websiteLink),
      getExternalUrl(academy.instagramLink),
    ].filter(Boolean),
    parentOrganization: {
      "@type": "SportsOrganization",
      name: "Elite Games Federation",
      url: absoluteUrl("/"),
    },
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <JsonLd
        data={[
          academySchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Academies", path: "/academies/list" },
            { name: academy.academyName, path: `/academy/${slug}` },
          ]),
        ]}
      />
      <Navbar />

      <section className="pt-44 pb-24 max-w-7xl mx-auto px-6">
        {academy && (
          <div className="bg-zinc-900 border border-orange-500/40 rounded-[35px] overflow-hidden">
            <div className="relative min-h-[480px] p-8 md:p-14 flex items-end">
              <Image
                src={coverImage}
                alt={`${academy.academyName} banner`}
                fill
                priority
                className="object-cover opacity-45"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
              <div className="relative z-10 flex flex-col md:flex-row md:items-end gap-8">
                {logoImage ? (
                  <div className="relative w-36 h-36 shrink-0 rounded-3xl overflow-hidden bg-black border border-white/10 p-4">
                    <Image
                      src={logoImage}
                      alt={`${academy.academyName} logo`}
                      fill
                      className="object-contain"
                      sizes="144px"
                    />
                  </div>
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
                  {googleMapUrl && (
                    <a
                      href={googleMapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex mt-2 text-orange-500 font-bold hover:text-orange-400 transition"
                    >
                      Open Google Map
                    </a>
                  )}
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
                          <div className="relative w-20 h-24 shrink-0 rounded-xl overflow-hidden">
                            <Image
                              src={owner.photoUrl}
                              alt={owner.fullName || "Owner"}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                          </div>
                        ) : (
                          <div className="w-20 h-24 shrink-0 rounded-xl bg-black border border-white/10 flex items-center justify-center text-2xl font-black text-orange-500">
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
                          {owner.qualification && (
                            <p className="mt-2 text-zinc-400">
                              Qualification: {owner.qualification}
                            </p>
                          )}
                          {owner.experience && (
                            <p className="mt-2 text-zinc-400">
                              Experience: {owner.experience}
                            </p>
                          )}
                          <p className="mt-2 text-zinc-400">
                            Blood Group: {owner.bloodGroup || "Not added"}
                          </p>
                          <p className="mt-2 text-zinc-400">
                            Sports:{" "}
                            {getOwnerSports(owner).join(", ") ||
                              "Sports not added"}
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

              {eliteStudents.length > 0 && (
                <section className="lg:col-span-2 bg-black border border-white/10 rounded-3xl p-8">
                  <h2 className="text-4xl font-black">
                    Elite Athlete Features
                  </h2>
                  <div className="mt-6 grid md:grid-cols-2 gap-5">
                    {eliteStudents.map((student: any, index: number) =>
                      renderStudentCard(student, index, true)
                    )}
                  </div>
                </section>
              )}

              <section className="lg:col-span-2 bg-black border border-white/10 rounded-3xl p-8">
                <h2 className="text-4xl font-black">
                  {eliteStudents.length
                    ? "Other Students Details"
                    : "Student Details"}
                </h2>
                <div className="mt-6 grid md:grid-cols-2 gap-5">
                  {regularStudents.length ? (
                    regularStudents.map((student: any, index: number) =>
                      renderStudentCard(student, index, false)
                    )
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
                  {academyDetails.map(({ label, value, href }) => (
                    <div
                      key={label}
                      className="bg-zinc-950 border border-white/10 rounded-2xl p-5"
                    >
                      <p className="text-orange-500 uppercase tracking-[0.2em] text-xs">
                        {label}
                      </p>
                      {href && value ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-flex font-bold break-all text-white hover:text-orange-500 transition"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="mt-3 font-bold break-words">
                          {value || "Not available"}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {academyGallery.length > 0 && (
                <section className="lg:col-span-3 bg-black border border-white/10 rounded-3xl p-8">
                  <h2 className="text-4xl font-black">Academy Photos</h2>
                  <div className="mt-6 grid md:grid-cols-3 gap-5">
                    {academyGallery.map((imageUrl: string, index: number) => (
                      <div
                        key={`${imageUrl}-${index}`}
                        className="relative h-60 w-full rounded-2xl overflow-hidden border border-white/10"
                      >
                        <Image
                          src={imageUrl}
                          alt={`${academy.academyName} photo ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(min-width: 768px) 33vw, 100vw"
                        />
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        )}

        {academy && (
          <section className="mt-10 bg-orange-500 text-black rounded-[35px] p-8 md:p-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <p className="uppercase tracking-[0.3em] text-sm font-black">
                Do You Own An Academy?
              </p>
              <h2 className="mt-4 text-4xl md:text-5xl font-black">
                Join India&apos;s growing grassroots sports network today.
              </h2>
              <p className="mt-4 max-w-3xl text-lg font-semibold">
                Get your own academy webpage, federation ID, affiliation
                certificate, athlete features, PAN India listing, and QR
                verified authenticity.
              </p>
            </div>

            <Link
              href="/academies/affiliation"
              className="shrink-0 bg-black text-white hover:bg-zinc-900 transition px-8 py-5 rounded-2xl text-lg font-black text-center"
            >
              Get Affiliated
            </Link>
          </section>
        )}
      </section>

      <Footer />
    </main>
  );
}
