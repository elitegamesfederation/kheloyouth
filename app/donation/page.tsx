import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donation",
  description:
    "Support Elite Games Federation through one-time donations or monthly contributions. Contributions are exempted U/s 80G of Income Tax Act 1961.",
  alternates: {
    canonical: "/donation",
  },
};

const oneTimeDonationLink = "https://rzp.io/rzp/EliteGamesFederation";

const monthlyPlans = [
  {
    name: "Silver Supporter",
    amount: "Monthly",
    href: "https://elitegamesfederation.github.io/donation-page/silver.html",
    desc: "Support regular grassroots sports activity and athlete outreach.",
  },
  {
    name: "Gold Supporter",
    amount: "Monthly",
    href: "https://elitegamesfederation.github.io/donation-page/gold.html",
    desc: "Help sustain training, visibility, and development programs.",
  },
  {
    name: "Platinum Supporter",
    amount: "Monthly",
    href: "https://elitegamesfederation.github.io/donation-page/platinum.html",
    desc: "Back a stronger long-term support system for athletes and academies.",
  },
  {
    name: "Palladium Supporter",
    amount: "Monthly",
    href: "https://elitegamesfederation.github.io/donation-page/palladium.html",
    desc: "Become a high-impact monthly patron for federation initiatives.",
  },
];

export default function DonationPage() {
  return (
    <main className="min-h-screen pt-40 md:pt-0 bg-black text-white overflow-hidden">
      <Navbar />

      <section className="relative pt-52 pb-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-500/10 blur-[140px] rounded-full"></div>
        <div className="absolute right-0 top-20 w-[450px] h-[450px] bg-orange-500/10 blur-[120px] rounded-full"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="uppercase tracking-[0.4em] text-orange-500 font-semibold">
              Elite Games Federation
            </p>

            <h1 className="mt-6 text-6xl md:text-8xl font-black leading-none">
              SUPPORT
              <span className="block text-orange-500 mt-2">
                INDIA'S ATHLETES
              </span>
            </h1>

            <p className="mt-8 text-xl text-gray-300 leading-relaxed max-w-2xl">
              Support is not always about giving more. Sometimes it is about
              giving regularly. Your contribution helps us nurture sports
              talent, support athletes including para-athletes, and build a
              stronger sporting culture in India.
            </p>

            <div className="mt-8 bg-green-500/10 border border-green-500/30 rounded-3xl p-6">
              <p className="text-green-400 font-black">
                All Contribution for ELITE GAMES FEDERATION are exempted U/s 80G of Income Tax Act 1961.
              </p>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-5">
              <a
                href={oneTimeDonationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-500 hover:bg-orange-600 transition px-8 py-4 rounded-2xl text-lg font-bold text-center shadow-[0_0_40px_rgba(255,115,0,0.35)]"
              >
                One Time Donation
              </a>

              <a
                href="#monthly-support"
                className="border border-white/20 hover:border-orange-500 hover:bg-orange-500/10 transition px-8 py-4 rounded-2xl text-lg font-semibold text-center"
              >
                Monthly Subscription
              </a>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="relative w-full max-w-xl h-[650px] rounded-[40px] overflow-hidden border border-white/10 bg-zinc-900">
              <img
                src="uttarpradeshsports.png"
                alt="Athletes supported by Elite Games Federation"
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 bg-black/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                <p className="text-orange-400 font-semibold uppercase tracking-[0.2em] text-sm">
                  Donate With Purpose
                </p>
                <h3 className="mt-3 text-3xl font-black">
                  Every Contribution Creates Opportunity
                </h3>
                <p className="mt-4 text-gray-300 leading-relaxed">
                  Help young athletes train, compete, and build a better
                  future through sports.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="monthly-support" className="max-w-7xl mx-auto px-6 pb-28">
        <div className="text-center">
          <p className="text-orange-500 uppercase tracking-[0.4em] font-semibold">
            Two Ways To Donate
          </p>
          <h2 className="mt-5 text-6xl font-black">
            ONE TIME OR MONTHLY
          </h2>
          <p className="mt-6 max-w-3xl mx-auto text-gray-400 text-lg leading-relaxed">
            Choose a one-time contribution or become a monthly supporter so we
            can plan better, reach further, and support consistently.
          </p>
        </div>

        <div className="mt-14 grid lg:grid-cols-[0.9fr_1.1fr] gap-8">
          <div className="bg-orange-500 text-black rounded-[35px] p-8">
            <p className="uppercase tracking-[0.25em] text-sm font-black">
              One Time
            </p>
            <h3 className="mt-5 text-5xl font-black">
              Donate Any Amount
            </h3>
            <p className="mt-6 text-lg leading-relaxed">
              Make a direct one-time contribution to Elite Games Federation
              through Razorpay.
            </p>
            <a
              href={oneTimeDonationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex bg-black text-white px-8 py-4 rounded-2xl font-black"
            >
              Donate Now
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {monthlyPlans.map((plan) => (
              <a
                key={plan.name}
                href={plan.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-zinc-900 border border-white/10 rounded-[32px] p-6 hover:border-orange-500 hover:-translate-y-1 transition duration-300"
              >
                <p className="text-orange-500 uppercase tracking-[0.2em] text-xs font-semibold">
                  {plan.amount} Subscription
                </p>
                <h3 className="mt-5 text-3xl font-black">
                  {plan.name}
                </h3>
                <p className="mt-5 text-gray-400 leading-relaxed">
                  {plan.desc}
                </p>
                <span className="mt-8 inline-flex bg-white text-black px-5 py-3 rounded-2xl font-black">
                  Become Supporter
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 border-y border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-orange-500/5 blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="rounded-[40px] overflow-hidden border border-white/10">
            <img
              src="karateseminar.png"
              alt="Elite Games Federation sports initiative"
              className="w-full h-[560px] object-cover"
            />
          </div>

          <div>
            <p className="uppercase tracking-[0.4em] text-orange-500 font-semibold">
              CSR & Partnerships
            </p>
            <h2 className="mt-6 text-6xl font-black leading-tight">
              Build India's
              <span className="text-orange-500"> Sports Future</span>
            </h2>
            <p className="mt-8 text-xl text-gray-300 leading-relaxed">
              For corporate partnerships and CSR queries, email us at{" "}
              <a
                href="mailto:contact@elitegamesfederation.com"
                className="text-orange-500 font-bold"
              >
                contact@elitegamesfederation.com
              </a>
              .
            </p>

            <div className="mt-10 space-y-6">
              {[
                "Transparent and impact-driven donations.",
                "Direct support for athletes and academies.",
                "Empowering para-athletes and grassroots talent.",
              ].map((item) => (
                <div key={item} className="flex gap-4">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mt-2"></div>
                  <p className="text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
