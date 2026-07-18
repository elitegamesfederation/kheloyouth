import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import { FaInstagram } from "react-icons/fa6";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const fitStreakDownloadUrl = "/fitstreak/download";
const fitStreakInstagramUrl = "https://www.instagram.com/fitstreakofficial/";
const qrTargetUrl = "https://www.kheloyouth.com/fitstreak/download";
const qrCodeUrl =
  "https://api.qrserver.com/v1/create-qr-code/?size=420x420&margin=16&data=" +
  encodeURIComponent(qrTargetUrl);

const challenges = [
  {
    slug: "5km",
    image: "/challenge-5km.png",
    title: "5 KM – 30 Days",
    meta: "30 Days · Walk / Run",
    description:
      "Walk or run 5 km every day for 30 days with honesty and discipline. GPS-tracked distance, a daily progress selfie, and a small daily donation keep you accountable.",
    price: 129,
    popular: false,
  },
  {
    slug: "2km",
    image: "/challenge-2km.png",
    title: "2 KM – 30 Days",
    meta: "30 Days · Walk / Run",
    description:
      "A lighter entry point into daily movement — walk or run 2 km every day for 30 days, with the same GPS tracking and daily accountability as the 5 KM challenge.",
    price: 129,
    popular: false,
  },
  {
    slug: "45hard",
    image: "/challenge-45hard.png",
    title: "45 Hard Challenge",
    meta: "45 Days · High Intensity",
    description:
      "Two 45-minute workouts a day (at least one outdoors), a strict no-cheat-meal diet, 4 litres of water, 10 pages of reading, and a daily progress selfie — every single day for 45 days.",
    price: 129,
    popular: false,
  },
  {
    slug: "75hard",
    image: "/challenge-75hard.png",
    title: "75 Hard Challenge",
    meta: "75 Days · High Intensity",
    description:
      "The full mental toughness test. The same non-negotiable daily rules as 45 Hard — two workouts, strict diet, water, reading, and a progress selfie — sustained for 75 consecutive days.",
    price: 149,
    popular: true,
  },
];

const features = [
  {
    number: "01",
    title: "Challenges",
    text: "Complete discipline challenges and unlock rewards.",
  },
  {
    number: "02",
    title: "Daily Streaks",
    text: "Stay accountable with streak tracking and progress monitoring.",
  },
  {
    number: "03",
    title: "Analytics",
    text: "Measure workouts, calories, steps, and transformation insights.",
  },
  {
    number: "04",
    title: "Motivation",
    text: "Turn discipline into a lifestyle with community-driven fitness.",
  },
];

const faqs = [
  {
    question: "How do I start a challenge?",
    answer: "Download the FitStreak app, register, and start your challenge right away.",
    showDownloadLink: true,
  },
  {
    question: "Is FitStreak free?",
    answer:
      "Downloading the app is completely free. Challenge registration is ₹129 for the 5 KM, 2 KM, and 45 Hard challenges, and ₹149 for the 75 Hard challenge.",
    showDownloadLink: false,
  },
  {
    question: "What challenges are available?",
    answer:
      "🏃 5 KM – 30 Days Challenge\n🚶 2 KM – 30 Days Challenge\n💪 45 Hard Challenge\n🔥 75 Hard Challenge\n\nComplete your daily challenge and earn a digital certificate, performance report, and an exclusive medal on successful completion. 🏅",
    showDownloadLink: false,
  },
  {
    question: "How do I track my progress?",
    answer: "The FitStreak app automatically tracks your daily progress throughout the challenge.",
    showDownloadLink: false,
  },
  {
    question: "Can I earn multiple medals?",
    answer:
      "Yes! Take on as many challenges as you like — just one challenge, and one medal, at a time.",
    showDownloadLink: false,
  },
];

export const metadata: Metadata = {
  title: "FitStreak App | Download on Google Play",
  description:
    "Download FitStreak on Google Play. Track workouts, daily streaks, steps, calories, challenges, and build discipline while supporting grassroots sports.",
  alternates: {
    canonical: "/fitstreak",
  },
  openGraph: {
    title: "FitStreak App | Elite Games Federation",
    description:
      "FitStreak is now live on Google Play. Scan the QR code, install the app, and start building your daily fitness streak.",
    url: "https://www.kheloyouth.com/fitstreak",
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

export default function FitStreakPage() {
  return (
    <main className="min-h-screen pt-40 md:pt-0 bg-black text-white overflow-hidden">
      <Navbar />

      <section className="relative pt-36 md:pt-44 pb-20 md:pb-28 overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-500/10 blur-[140px] rounded-full" />
        <div className="absolute top-20 right-0 w-[450px] h-[450px] bg-orange-500/10 blur-[130px] rounded-full" />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
          <div>
            <div className="relative w-16 h-16 md:w-28 md:h-28 mb-6">
              <Image
                src="/fitstreaklogo.png"
                alt="FitStreak Logo"
                fill
                priority
                className="object-contain drop-shadow-[0_0_25px_rgba(255,115,0,0.7)]"
                sizes="(min-width: 768px) 112px, 64px"
              />
            </div>

            <p className="uppercase tracking-[0.4em] text-white font-semibold">
              Inspired By
            </p>

            <p className="uppercase tracking-[0.4em] text-orange-500 font-bold text-2xl">
              Fit India Movement
            </p>

            <h1 className="mt-6 text-6xl md:text-8xl font-black leading-none">
              LET'S MAKE
              <span className="block text-orange-500 mt-2">INDIA FIT</span>
            </h1>

            <div className="mt-6 space-y-5">
              <p className="text-xl text-gray-300 leading-relaxed">
                FitStreak is more than just a fitness app. It's a movement built
                around discipline, consistency, self-growth, and transformation.
              </p>

              <div className="relative overflow-hidden rounded-3xl border border-orange-500/20 bg-orange-500/10 backdrop-blur-xl p-6">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 blur-3xl rounded-full" />
                <p className="relative z-10 text-orange-400 uppercase tracking-[0.3em] text-xs font-semibold">
                  Purpose Driven Movement
                </p>
                <h3 className="relative z-10 mt-3 text-2xl font-black leading-tight text-white">
                  Every Challenge Accepted
                  <span className="text-orange-500"> Helps Someone Rise</span>
                </h3>
                <p className="relative z-10 mt-4 text-gray-300 leading-relaxed">
                  FitStreak is also a fundraising initiative dedicated to
                  supporting para-athletes and grassroots sports development
                  across India.
                </p>
                <p className="relative z-10 mt-4 text-gray-400 leading-relaxed">
                  Every workout completed, every challenge accepted, and every
                  streak maintained contributes towards empowering athletes who
                  continue to fight against limitations to achieve their dreams
                  and inspire millions.
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-5">
              <a
                href={fitStreakDownloadUrl}
                className="inline-flex justify-center bg-orange-500 hover:bg-orange-600 transition px-8 py-4 rounded-2xl text-lg font-bold text-black shadow-[0_0_40px_rgba(255,115,0,0.35)]"
              >
                Download on Google Play
              </a>

              <a
                href="#fitstreak-download"
                className="inline-flex justify-center border border-white/20 hover:border-orange-500 hover:bg-orange-500/10 transition px-8 py-4 rounded-2xl text-lg font-semibold"
              >
                Scan QR Code
              </a>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="relative w-full max-w-xl h-[520px] md:h-[680px] rounded-[40px] overflow-hidden border border-white/10 bg-zinc-900 shadow-[0_0_80px_rgba(255,115,0,0.15)]">
              <img
                src="/lets-make-india-fit.png"
                alt="FitStreak fitness movement"
                className="w-full h-full object-cover opacity-90"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 bg-black/50 backdrop-blur-xl border border-white/10 rounded-3xl p-5 md:p-6">
                <p className="text-orange-400 uppercase tracking-[0.25em] text-sm font-semibold">
                  FitStreak Movement
                </p>

                <h3 className="mt-3 text-2xl md:text-3xl font-black">
                  Discipline Creates Champions
                </h3>

                <p className="mt-4 text-gray-300 leading-relaxed">
                  Every streak, every step, and every workout pushes you closer
                  to your strongest version.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="fitstreak-download"
        className="max-w-7xl mx-auto px-6 pb-24 md:pb-28"
      >
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-stretch rounded-[40px] border border-orange-500/30 bg-gradient-to-br from-orange-500/15 via-zinc-950 to-black p-6 md:p-10 shadow-[0_0_80px_rgba(255,115,0,0.12)]">
          <div className="flex flex-col justify-center">
            <p className="text-orange-500 uppercase tracking-[0.35em] text-sm font-bold">
              Google Play Launch
            </p>

            <h2 className="mt-5 text-4xl md:text-6xl font-black leading-tight">
              FitStreak is live.
              <span className="block text-orange-500">Scan and install.</span>
            </h2>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href={fitStreakDownloadUrl}
                className="inline-flex justify-center bg-orange-500 hover:bg-orange-600 transition px-8 py-4 rounded-2xl text-lg font-bold text-black shadow-[0_0_40px_rgba(255,115,0,0.3)]"
              >
                Click To Download
              </a>

              <span className="inline-flex items-center justify-center border border-white/15 rounded-2xl px-6 py-4 text-gray-200">
                Android app now available
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center rounded-[32px] border border-white/10 bg-black/50 p-6">
            <div className="rounded-3xl bg-white p-4 shadow-[0_0_45px_rgba(255,255,255,0.12)]">
              <img
                src={qrCodeUrl}
                alt="QR code to download FitStreak app"
                className="w-56 h-56 md:w-72 md:h-72 object-contain"
              />
            </div>

            <h3 className="mt-6 text-3xl font-black">Scan To Download</h3>

            <p className="mt-3 text-center text-gray-400 leading-relaxed">
              Point your phone camera at this QR code to open the FitStreak
              download page.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-28">
        <div className="text-center">
          <p className="text-orange-500 uppercase tracking-[0.4em] font-semibold">
            Why FitStreak?
          </p>

          <h2 className="mt-5 text-5xl md:text-6xl font-black">
            BUILT FOR CONSISTENCY
          </h2>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-zinc-900 border border-white/10 rounded-[32px] p-8 hover:border-orange-500 hover:-translate-y-2 transition duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-orange-500/20 flex items-center justify-center text-orange-500 text-2xl font-black">
                {feature.number}
              </div>

              <h3 className="mt-8 text-3xl font-black">{feature.title}</h3>

              <p className="mt-5 text-gray-400 leading-relaxed">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-28">
        <div className="text-center">
          <p className="text-orange-500 uppercase tracking-[0.4em] font-semibold">
            Smart Tracking
          </p>

          <h2 className="mt-5 text-5xl md:text-6xl font-black">
            APP EXPERIENCE
          </h2>
        </div>

        <div className="mt-20 flex justify-center">
          <div className="w-[340px] h-[680px] rounded-[50px] border border-white/10 bg-zinc-900 p-4 shadow-[0_0_80px_rgba(255,115,0,0.18)]">
            <div className="w-full h-full rounded-[40px] bg-black overflow-hidden relative p-6 flex flex-col">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Welcome Back</p>
                  <h3 className="text-3xl font-black mt-1">FitStreak</h3>
                </div>

                <div className="relative flex items-center justify-center">
                  <div className="absolute w-20 h-20 bg-orange-500/30 blur-2xl rounded-full" />
                  <div className="relative w-20 h-20 animate-pulse">
                    <Image
                      src="/fitstreaklogo.png"
                      alt="FitStreak Logo"
                      fill
                      className="object-contain drop-shadow-[0_0_25px_rgba(255,115,0,0.9)]"
                      sizes="80px"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-14">
                <p className="text-gray-400">Today Steps</p>
                <h2 className="text-6xl font-black mt-3">12,846</h2>
              </div>

              <div className="mt-10 space-y-5">
                <div className="bg-zinc-900 rounded-3xl p-6 border border-white/5">
                  <p className="text-gray-400">Calories Burned</p>
                  <h3 className="text-4xl font-black mt-2">742 kcal</h3>
                </div>

                <div className="bg-zinc-900 rounded-3xl p-6 border border-white/5">
                  <p className="text-gray-400">Workout Time</p>
                  <h3 className="text-4xl font-black mt-2">1h 32m</h3>
                </div>
              </div>

              <div className="mt-auto">
                <a
                  href={fitStreakDownloadUrl}
                  className="block w-full text-center bg-orange-500 hover:bg-orange-600 transition py-5 rounded-2xl text-lg font-bold text-black shadow-[0_0_35px_rgba(255,115,0,0.35)]"
                >
                  Download FitStreak
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-28">
        <div className="text-center">
          <p className="text-orange-500 uppercase tracking-[0.4em] font-semibold">
            Challenges
          </p>
          <h2 className="mt-5 text-4xl md:text-6xl font-black">
            Ongoing Challenges
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-gray-400 text-lg leading-relaxed">
            Pick your challenge, stay honest and consistent, and walk away with a
            medal, a certificate, and a full performance summary.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {challenges.map((challenge) => (
            <div
              key={challenge.slug}
              className={`rounded-3xl border p-6 md:p-8 flex flex-col md:flex-row gap-6 ${
                challenge.popular
                  ? "bg-orange-500 border-orange-500 text-black"
                  : "bg-zinc-900 border-white/10"
              }`}
            >
              <div className="relative w-20 h-20 md:w-24 md:h-24 shrink-0 mx-auto md:mx-0">
                <Image
                  src={challenge.image}
                  alt={challenge.title}
                  fill
                  className="object-contain"
                  sizes="96px"
                />
              </div>

              <div className="flex-1 text-center md:text-left">
                {challenge.popular && (
                  <span className="inline-block mb-3 bg-black text-orange-500 text-xs font-black uppercase tracking-[0.2em] px-3 py-2 rounded-full">
                    Most Popular
                  </span>
                )}

                <h3 className="text-2xl md:text-3xl font-black">
                  {challenge.title}
                </h3>
                <p
                  className={`mt-1 text-sm font-bold uppercase tracking-[0.15em] ${
                    challenge.popular ? "text-black/70" : "text-orange-500"
                  }`}
                >
                  {challenge.meta}
                </p>

                <p
                  className={`mt-4 leading-relaxed ${
                    challenge.popular ? "text-black/80" : "text-gray-400"
                  }`}
                >
                  {challenge.description}
                </p>

                <p
                  className={`mt-4 text-sm font-semibold ${
                    challenge.popular ? "text-black/70" : "text-gray-400"
                  }`}
                >
                  Medal · Certificate · Performance Summary
                </p>

                <div className="mt-6 flex flex-col sm:flex-row items-center gap-4 sm:justify-between">
                  <p className="text-3xl font-black">₹{challenge.price}</p>

                  <a
                    href={fitStreakDownloadUrl}
                    className={`w-full sm:w-auto text-center px-6 py-3 rounded-xl font-bold transition ${
                      challenge.popular
                        ? "bg-black text-white hover:bg-zinc-900"
                        : "bg-orange-500 text-black hover:bg-orange-600"
                    }`}
                  >
                    Start Challenge
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-gray-500 text-sm max-w-2xl mx-auto">
          Every challenge includes a GPS honesty check and a 2-lifeline safety
          net — full rules are shown inside the app before you join.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-28">
        <div className="text-center">
          <p className="text-orange-500 uppercase tracking-[0.4em] font-semibold">
            FAQ
          </p>
          <h2 className="mt-5 text-4xl md:text-6xl font-black">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-14 space-y-5">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group bg-zinc-900 border border-white/10 rounded-3xl p-6 md:p-8 open:border-orange-500/40"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none text-xl md:text-2xl font-bold">
                {faq.question}
                <span className="shrink-0 text-orange-500 text-2xl transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="mt-5 text-gray-400 text-lg leading-relaxed whitespace-pre-line">
                {faq.answer}
              </div>
              {faq.showDownloadLink && (
                <a
                  href={fitStreakDownloadUrl}
                  className="mt-5 inline-flex bg-orange-500 hover:bg-orange-600 transition px-6 py-3 rounded-xl font-bold text-black"
                >
                  Download FitStreak
                </a>
              )}
            </details>
          ))}
        </div>

        <p className="mt-10 text-center text-gray-500">
          Read our{" "}
          <a
            href="/form-privacy-policy"
            className="text-orange-500 hover:text-orange-400 underline underline-offset-4"
          >
            Privacy Policy
          </a>
          .
        </p>
      </section>

      <section className="relative py-8 md:py-12 pb-28 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[560px] h-[560px] bg-orange-500/10 blur-[150px] rounded-full" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 text-orange-500 uppercase tracking-[0.4em] font-semibold">
            <FaInstagram size={18} />
            Instagram
          </div>
          <h2 className="mt-5 text-4xl md:text-6xl font-black leading-tight">
            Follow <span className="text-orange-500">FitStreak Official</span>
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-gray-400 text-lg leading-relaxed">
            Watch app updates, fitness challenges, transformation stories, and
            daily motivation from the official FitStreak page.
          </p>

          <a
            href={fitStreakInstagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:opacity-90 transition px-8 py-4 rounded-2xl text-lg font-bold text-white shadow-[0_0_40px_rgba(238,42,123,0.35)]"
          >
            <FaInstagram size={22} />
            Open Instagram
          </a>

          <div className="mt-12 rounded-[36px] border border-white/10 bg-zinc-900/70 backdrop-blur-xl p-4 md:p-8 overflow-hidden">
            <blockquote
              className="instagram-media mx-auto"
              data-instgrm-permalink={fitStreakInstagramUrl}
              data-instgrm-version="14"
              style={{
                background: "#000",
                border: 0,
                borderRadius: "28px",
                margin: "0 auto",
                maxWidth: "920px",
                minWidth: "326px",
                width: "100%",
              }}
            >
              <a
                href={fitStreakInstagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-orange-500 font-bold py-16"
              >
                View @fitstreakofficial on Instagram
              </a>
            </blockquote>
          </div>
        </div>

        <Script src="https://www.instagram.com/embed.js" strategy="lazyOnload" />
      </section>
      <Footer />
    </main>
  );
}
