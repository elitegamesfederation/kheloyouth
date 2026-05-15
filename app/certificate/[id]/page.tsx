"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { db } from "@/app/lib/firebase";

import {
  collection,
  getDocs,
} from "firebase/firestore";

const normalizeCertificateId = (value = "") =>
  value
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .toUpperCase();

export default function CertificateVerificationPage() {
  const params = useParams<{ id: string }>();
  const [academy, setAcademy] = useState<any>(null);
  const [certificateId, setCertificateId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCertificate = async () => {
      const decodedId = decodeURIComponent(params.id);
      const normalizedId = normalizeCertificateId(decodedId);
      setCertificateId(normalizedId);

      const snap = await getDocs(collection(db, "academies"));
      const foundAcademy = snap.docs
        .map((academyDoc) => ({
          id: academyDoc.id,
          ...academyDoc.data(),
        }))
        .find((item: any) => {
          const storedId = normalizeCertificateId(
            item.certificateVerificationId || item.affiliationNumber
          );

          return storedId === normalizedId && item.paymentDone;
        });

      setAcademy(foundAcademy || null);
      setLoading(false);
    };

    loadCertificate();
  }, [params.id]);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="pt-44 pb-24 max-w-4xl mx-auto px-6">
        <p className="text-orange-500 uppercase tracking-[0.35em] font-semibold">
          Verified Affiliation Certificate
        </p>
        <h1 className="mt-5 text-5xl md:text-7xl font-black">
          Certificate Verification
        </h1>

        <div className="mt-10 bg-zinc-900 border border-white/10 rounded-[35px] p-8 md:p-10">
          {loading ? (
            <p className="text-zinc-300">Checking certificate record...</p>
          ) : academy ? (
            <>
              <span className="bg-green-500 text-black px-4 py-2 rounded-full font-black">
                Authentic Certificate
              </span>
              <h2 className="mt-6 text-4xl font-black">
                {academy.academyName}
              </h2>
              <p className="mt-3 text-zinc-300">
                Officially affiliated with Elite Games Federation.
              </p>

              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {[
                  ["Certificate ID", certificateId],
                  ["Affiliation Number", academy.affiliationNumber],
                  ["State", academy.state],
                  ["District", academy.district],
                  ["Valid From", academy.affiliationStartDate],
                  ["Valid Till", academy.affiliationEndDate],
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
            </>
          ) : (
            <p className="text-red-400 font-bold">
              This certificate was not found as an active Elite Games Federation affiliation.
            </p>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
