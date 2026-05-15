"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import QRCode from "qrcode";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { db } from "@/app/lib/firebase";

import {
  collection,
  getDocs,
} from "firebase/firestore";

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

export default function IdCardVerificationPage() {
  const params = useParams<{ id: string }>();
  const [record, setRecord] = useState<any>(null);
  const [memberId, setMemberId] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecord = async () => {
      const decodedId = decodeURIComponent(params.id);
      setMemberId(decodedId);

      const snap = await getDocs(collection(db, "academies"));
      let foundRecord: any = null;

      snap.docs.some((academyDoc) => {
        const academy = {
          id: academyDoc.id,
          ...academyDoc.data(),
        };
        const result = findMember(academy, decodedId);

        if (result) {
          foundRecord = {
            academy,
            ...result,
          };
          return true;
        }

        return false;
      });

      setRecord(foundRecord);
      setQrCode(
        await QRCode.toDataURL(window.location.href, {
          errorCorrectionLevel: "H",
          margin: 1,
          width: 220,
        })
      );
      setLoading(false);
    };

    loadRecord();
  }, [params.id]);

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
          {loading ? (
            <p className="text-zinc-300">Checking federation record...</p>
          ) : record ? (
            <div className="grid md:grid-cols-[220px_1fr] gap-8 items-start">
              <div>
                {record.photo ? (
                  <img
                    src={record.photo}
                    alt={record.name || "Member"}
                    className="w-full aspect-[4/5] object-cover rounded-3xl border border-white/10"
                  />
                ) : (
                  <div className="w-full aspect-[4/5] bg-black rounded-3xl flex items-center justify-center text-6xl font-black text-orange-500">
                    {(record.name || "E").charAt(0)}
                  </div>
                )}
                {qrCode && (
                  <img
                    src={qrCode}
                    alt="Verification QR"
                    className="mt-5 w-40 h-40 bg-white p-2 rounded-2xl"
                  />
                )}
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
