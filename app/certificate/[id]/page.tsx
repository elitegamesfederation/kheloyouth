import type { Metadata } from "next";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { adminDb } from "@/app/lib/firebase-admin";

const normalizeCertificateId = (value = "") =>
  value
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .toUpperCase();

async function findCertificate(rawId: string) {
  const normalizedId = normalizeCertificateId(decodeURIComponent(rawId));

  const byCertificateIdSnap = await adminDb
    .collection("academies")
    .where("certificateVerificationId", "==", normalizedId)
    .where("paymentDone", "==", true)
    .get();

  if (!byCertificateIdSnap.empty) {
    const doc = byCertificateIdSnap.docs[0];
    return { academy: { id: doc.id, ...doc.data() } as any, normalizedId };
  }

  // Fallback for older academies whose certificate ID was derived from
  // affiliationNumber and never re-saved with certificateVerificationId.
  const paidAcademiesSnap = await adminDb
    .collection("academies")
    .where("paymentDone", "==", true)
    .get();

  const matchingDoc = paidAcademiesSnap.docs.find(
    (academyDoc) =>
      normalizeCertificateId(academyDoc.data().affiliationNumber || "") ===
      normalizedId
  );

  return {
    academy: matchingDoc
      ? ({ id: matchingDoc.id, ...matchingDoc.data() } as any)
      : null,
    normalizedId,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { academy } = await findCertificate(id);

  return {
    title: academy
      ? `${academy.academyName} Certificate Verification`
      : "Certificate Verification",
  };
}

export default async function CertificateVerificationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { academy, normalizedId } = await findCertificate(id);

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
          {academy ? (
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
                  ["Certificate ID", normalizedId],
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
