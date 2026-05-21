import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Elite Games Federation academy affiliation forms and Meta lead forms.",
  alternates: {
    canonical: "/form-privacy-policy",
  },
};

const collectedInformation = [
  "Full Name",
  "Phone Number",
  "Email Address",
  "Academy Name",
  "City & State",
  "Instagram Handle",
  "Sports Information",
];

const usageDetails = [
  "Contact you regarding academy affiliation",
  "Share affiliation details and benefits",
  "Verify academy information",
  "Provide support and communication",
  "Improve our services",
];

export default function FormPrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-950">
      <Navbar />

      <section className="px-6 pt-36 pb-20 md:pt-44">
        <article className="mx-auto max-w-4xl rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_24px_80px_rgba(15,23,42,0.08)] md:p-12">
          <div className="mb-10 border-b border-slate-200 pb-8">
            <p className="mb-4 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
              Elite Games Federation
            </p>

            <h1 className="text-4xl font-black tracking-normal text-slate-950 md:text-6xl">
              Privacy Policy
            </h1>

            <p className="mt-5 text-lg font-semibold text-slate-700">
              Effective Date: May 21, 2026
            </p>
          </div>

          <div className="space-y-10 text-base leading-8 text-slate-700 md:text-lg">
            <section>
              <p>
                Elite Games Federation (&ldquo;we&rdquo;, &ldquo;our&rdquo;,
                &ldquo;us&rdquo;) values your privacy and is committed to
                protecting your personal information.
              </p>

              <p className="mt-5">
                When you submit your information through our website, social
                media platforms, or Meta lead forms, we may collect details
                including:
              </p>

              <ul className="mt-5 list-disc space-y-2 pl-6">
                {collectedInformation.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
                How We Use Your Information
              </h2>

              <p className="mt-4">We use the information collected to:</p>

              <ul className="mt-5 list-disc space-y-2 pl-6">
                {usageDetails.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
                Information Sharing
              </h2>

              <p className="mt-4">
                We do not sell, rent, or trade your personal information to
                third parties. Your information is used strictly for official
                communication related to Elite Games Federation services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
                Data Security
              </h2>

              <p className="mt-4">
                We take appropriate measures to protect your information from
                unauthorized access, misuse, or disclosure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
                Consent
              </h2>

              <p className="mt-4">
                By submitting your information through our forms, you consent to
                our collection and use of your information as described in this
                Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-950 md:text-3xl">
                Contact Us
              </h2>

              <address className="mt-4 not-italic">
                <strong className="text-slate-950">
                  Elite Games Federation
                </strong>
                <br />
                Website:{" "}
                <a
                  className="font-bold text-emerald-700 underline underline-offset-4"
                  href="http://www.kheloyouth.com"
                >
                  www.kheloyouth.com
                </a>
                <br />
                Email:{" "}
                <a
                  className="font-bold text-emerald-700 underline underline-offset-4"
                  href="mailto:contact@elitegamesfederation.com"
                >
                  contact@elitegamesfederation.com
                </a>
              </address>

              <p className="mt-5">
                If you have any questions regarding this Privacy Policy, feel
                free to contact us.
              </p>
            </section>
          </div>
        </article>
      </section>

      <Footer />
    </main>
  );
}
