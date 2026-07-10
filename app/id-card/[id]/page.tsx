import type { Metadata } from "next";
import Image from "next/image";
import QRCode from "qrcode";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { adminDb } from "@/app/lib/firebase-admin";

const findMember = (academy: any, memberId: string) => {
  const owners = Array.isArray(academy.owners) ? academy.owners : [];
  const students = Array.isArray(academy.students) ? academy.students : [];
  const owner = owners.find((item: any) => item.memberId === memberId);

  if (owner) {
    return {
      member: owner,
      type: "Owner / Coach",
      name: owner.fullName,
      photo: owner.photoUrl || owner.photoPreview,
      role: owner.role || "Owner / Coach",
    };
  }

  const student = students.find((item: any) => item.memberId === memberId);

  if (student) {
    return {
      member: student,
      type: "Student",
      name: student.name,
      photo: student.photoUrl || student.photoPreview,
      role: student.isEliteAthlete ? "Elite Athlete" : "Student",
    };
  }

  return null;
};

const getAchievementLines = (achievement: string) =>
  String(achievement || "")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.replace(/^[-*\d.)\s]+/, "").trim())
    .filter(Boolean);

async function findIdCardRecord(rawId: string) {
  const memberId = decodeURIComponent(rawId);

  // Only paid academies ever get member IDs handed out, so this narrows
  // the scan considerably even though memberId itself isn't indexable
  // (it lives inside the owners/students arrays).
  const snap = await adminDb
    .collection("academies")
    .where("paymentDone", "==", true)
    .get();

  let foundRecord: any = null;

  snap.docs.some((academyDoc) => {
    const academy = { id: academyDoc.id, ...academyDoc.data() };
    const result = findMember(academy, memberId);

    if (result) {
      foundRecord = { academy, ...result };
      return true;
    }

    return false;
  });

  return { record: foundRecord, memberId };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { record } = await findIdCardRecord(id);

  return {
    title: record
      ? `${record.name} Federation ID`
      : "ID Card Verification",
  };
}

export default async function IdCardVerificationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { record, memberId } = await findIdCardRecord(id);

  const achievementLines =
    record?.type === "Student"
      ? getAchievementLines(record.member?.achievement)
      : [];

  const qrCode = await QRCode.toDataURL(
    `https://www.kheloyouth.com/id-card/${encodeURIComponent(memberId)}`,
    {
      errorCorrectionLevel: "H",
      margin: 1,
      width: 220,
    }
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="pt-44 pb-24 max-w-4xl mx-auto px-6">
        <p className="text-orange-500 uppercase tracking-[0.35em] font-semibold">
          Verified Federation ID
        </p>
        <h1 className="mt-5 text-5xl md:text-7xl font-black">
          ID Card Verification
        </h1>

        <div className="mt-10 bg-zinc-900 border border-white/10 rounded-[35px] p-8 md:p-10">
          {record ? (
            <div className="grid md:grid-cols-[220px_1fr] gap-8 items-start">
              <div>
                {record.photo ? (
                  <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden border border-white/10">
                    <Image
                      src={record.photo}
                      alt={record.name || "Member"}
                      fill
                      className="object-cover"
                      sizes="220px"
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-[4/5] bg-black rounded-3xl flex items-center justify-center text-6xl font-black text-orange-500">
                    {(record.name || "E").charAt(0)}
                  </div>
                )}
                <img
                  src={qrCode}
                  alt="Verification QR"
                  className="mt-5 w-40 h-40 bg-white p-2 rounded-2xl"
                />
              </div>

              <div>
                <span className="bg-green-500 text-black px-4 py-2 rounded-full font-black">
                  Authentic ID
                </span>
                <h2 className="mt-6 text-4xl font-black">
                  {record.name}
                </h2>
                <p className="mt-3 text-orange-500 font-bold">
                  {record.role} | {record.type}
                </p>
                <div className="mt-8 grid sm:grid-cols-2 gap-4">
                  {[
                    ["ID Number", memberId],
                    ["Academy", record.academy.academyName],
                    ["State", record.academy.state],
                    ["Blood Group", record.member.bloodGroup],
                    ["Valid From", record.academy.affiliationStartDate],
                    ["Valid Till", record.academy.affiliationEndDate],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="bg-black border border-white/10 rounded-2xl p-5"
                    >
                      <p className="text-xs uppercase tracking-[0.2em] text-orange-500">
                        {label}
                      </p>
                      <p className="mt-2 font-bold">
                        {value || "Not added"}
                      </p>
                    </div>
                  ))}
                </div>

                {achievementLines.length > 0 && (
                  <div className="mt-5 bg-black border border-white/10 rounded-2xl p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-orange-500">
                      Achievements
                    </p>
                    <ol className="mt-3 list-decimal list-inside space-y-2 text-zinc-100 font-semibold">
                      {achievementLines.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p className="text-red-400 font-bold">
              This ID was not found in Elite Games Federation records.
            </p>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
