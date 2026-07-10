import type { Metadata } from "next";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import RedirectClient from "./RedirectClient";

const playStoreUrl =
  "https://play.google.com/store/apps/details?id=com.kheloyouth.fitstreakofficial";
const qrCodeUrl =
  "https://api.qrserver.com/v1/create-qr-code/?size=420x420&margin=16&data=" +
  encodeURIComponent(playStoreUrl);

export const metadata: Metadata = {
  title: "Download FitStreak App | KheloYouth",
  description:
    "Install FitStreak from Google Play and start tracking your fitness streak.",
  alternates: {
    canonical: "/fitstreak/download",
  },
  openGraph: {
    title: "Download FitStreak App",
    description:
      "FitStreak is live on Google Play. Start tracking workouts, streaks, and fitness challenges.",
    url: "https://www.kheloyouth.com/fitstreak/download",
    siteName: "KheloYouth",
    images: [
      {
        url: "/fitstreaklogo.png",
        width: 1200,
        height: 630,
        alt: "FitStreak App",
      },
    ],
  },
};

export default function FitStreakDownloadPage() {
  return (
    <main className="min-h-screen pt-40 md:pt-0 bg-black text-white overflow-hidden">
      <RedirectClient />

      <Navbar />

      <section className="relative pt-36 md:pt-52 pb-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-[420px] h-[420px] bg-orange-500/10 blur-[120px] rounded-full" />

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <p className="text-orange-500 uppercase tracking-[0.4em] font-semibold">
            FitStreak App
          </p>

          <h1 className="mt-6 text-5xl md:text-7xl font-black leading-tight">
            Opening Google Play
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            FitStreak is live on Google Play. You will be redirected
            automatically. If it does not open, use the button or scan the QR
            code below.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-500 hover:bg-orange-600 transition px-8 py-4 rounded-2xl text-lg font-bold text-black shadow-[0_0_40px_rgba(255,115,0,0.3)]"
            >
              Open Google Play Now
            </a>

            <a
              href="/fitstreak"
              className="border border-white/20 hover:border-orange-500 hover:bg-orange-500/10 transition px-8 py-4 rounded-2xl text-lg font-semibold"
            >
              Back To FitStreak
            </a>
          </div>

          <div className="mt-12 inline-flex flex-col items-center rounded-[32px] border border-white/10 bg-zinc-900/80 p-6">
            <div className="rounded-3xl bg-white p-4">
              <img
                src={qrCodeUrl}
                alt="QR code for FitStreak Google Play download"
                className="w-56 h-56 md:w-72 md:h-72 object-contain"
              />
            </div>

            <p className="mt-5 text-gray-300">
              Scan this QR code to install FitStreak from Google Play.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
