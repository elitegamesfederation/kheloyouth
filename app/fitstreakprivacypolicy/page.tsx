import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function FitStreakPrivacyPolicy() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 -z-10">

        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,rgba(255,115,0,0.15),transparent_45%)]"></div>

        <div className="absolute top-20 left-20 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full"></div>

        <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full"></div>

      </div>

      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative py-24 px-6">

        <div className="max-w-6xl mx-auto text-center">

          {/* GLOWING LOGO */}
          <div className="relative w-fit mx-auto mb-10">

            <img
              src="/fitstreaklogo.png"
              alt="FitStreak Logo"
              className="w-28 h-28 object-contain relative z-10"
            />

            <div className="absolute inset-0 bg-orange-500/40 blur-[70px] rounded-full"></div>

          </div>

          {/* BADGE */}
          <div className="inline-flex items-center gap-3 bg-orange-500/10 border border-orange-500/20 px-6 py-3 rounded-full mb-10">

            <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>

            <p className="text-orange-400 font-semibold tracking-wide">
              Secure • Transparent • Trusted
            </p>

          </div>

          {/* TITLE */}
          <h1 className="text-5xl md:text-8xl font-black leading-none mb-8">

            PRIVACY{" "}

            <span className="text-orange-500">
              POLICY
            </span>

          </h1>

          {/* SUBTITLE */}
          <p className="max-w-3xl mx-auto text-lg md:text-2xl text-gray-400 leading-relaxed">

            FitStreak is committed to protecting your privacy,
            fitness data, account security, and workout information
            while delivering a premium fitness ecosystem.

          </p>

          <p className="mt-8 text-orange-400 font-semibold text-lg">
            Effective Date: April 27, 2026
          </p>

        </div>

      </section>

      {/* CONTENT */}
      <section className="px-6 pb-28">

        <div className="max-w-5xl mx-auto">

          <div className="bg-white/[0.03] border border-white/10 rounded-[40px] p-8 md:p-14 backdrop-blur-xl shadow-[0_0_80px_rgba(255,115,0,0.08)]">

            <div className="space-y-14 text-lg leading-9 text-gray-300">

              {/* INTRO */}
              <section>

                <p className="text-2xl leading-relaxed text-gray-200">

                  FitStreak is operated by Elite Games Federation /
                  KheloYouth (“we,” “our,” or “us”). This Privacy Policy
                  explains how we collect, use, store, and share
                  information when you use the FitStreak mobile application.

                </p>

              </section>

              {/* SECTION 1 */}
              <section>

                <h2 className="text-4xl font-black text-orange-500 mb-8">
                  1. Information We Collect
                </h2>

                <div className="space-y-8">

                  {/* ACCOUNT */}
                  <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6">

                    <h3 className="text-2xl font-bold text-white mb-4">
                      a. Account Information
                    </h3>

                    <ul className="list-disc ml-6 space-y-2">
                      <li>Name</li>
                      <li>Email address</li>
                      <li>Profile photo</li>
                      <li>Login credentials or authentication data</li>
                    </ul>

                  </div>

                  {/* PROFILE */}
                  <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6">

                    <h3 className="text-2xl font-bold text-white mb-4">
                      b. Profile Information
                    </h3>

                    <ul className="list-disc ml-6 space-y-2">
                      <li>Date of birth</li>
                      <li>Gender</li>
                      <li>Phone number</li>
                      <li>Address and location-related profile details</li>
                    </ul>

                  </div>

                  {/* FITNESS */}
                  <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6">

                    <h3 className="text-2xl font-bold text-white mb-4">
                      c. Fitness and Challenge Information
                    </h3>

                    <ul className="list-disc ml-6 space-y-2">
                      <li>Challenge selections and enrollments</li>
                      <li>Daily task completion status</li>
                      <li>Workout duration</li>
                      <li>Reading progress entries</li>
                      <li>Water intake tracking</li>
                      <li>Selfie uploads for challenge progress</li>
                      <li>Donation-related challenge entries</li>
                    </ul>

                  </div>

                  {/* LOCATION */}
                  <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6">

                    <h3 className="text-2xl font-bold text-white mb-4">
                      d. Location Information
                    </h3>

                    <ul className="list-disc ml-6 space-y-2">
                      <li>Precise location data for workout tracking</li>
                      <li>Route/path information and workout metrics</li>
                    </ul>

                  </div>

                </div>

              </section>

              {/* AUTO SECTIONS */}
              {[
                {
                  title: "2. How We Use Information",
                  text: "We use collected information to manage accounts, enable challenge participation, record workouts, support route mapping, process payments, send reminders, improve app performance, and prevent misuse or fraud.",
                },
                {
                  title: "3. Location Data",
                  text: "FitStreak may collect precise location data during outdoor workouts to track routes, calculate distance, pace, and related workout metrics.",
                },
                {
                  title: "4. Photos and Selfies",
                  text: "Users may upload selfies and images for challenge participation, accountability, and optional social-sharing features.",
                },
                {
                  title: "5. Payments",
                  text: "Payments may be processed through third-party providers such as Razorpay. We do not store full card or bank details.",
                },
                {
                  title: "6. Third-Party Services",
                  text: "FitStreak may use Firebase, Google Maps, Google Sign-In, Razorpay, Spotify integrations, and related services.",
                },
                {
                  title: "7. Data Sharing",
                  text: "We do not sell personal information. Data may only be shared where required for app functionality, payment processing, or legal obligations.",
                },
                {
                  title: "8. Data Retention",
                  text: "We retain information as necessary for app functionality, challenge participation, compliance, fraud prevention, and dispute resolution.",
                },
                {
                  title: "9. Data Security",
                  text: "We use reasonable technical and organizational safeguards, though no system is completely secure.",
                },
                {
                  title: "10. Children’s Privacy",
                  text: "If FitStreak is used by minors, use should occur with parent or guardian awareness where required by law.",
                },
                {
                  title: "11. Your Choices",
                  text: "Users may update profile information, disable notifications, withdraw location permissions, or request deletion/correction of personal data.",
                },
              ].map((section, index) => (
                <section key={index}>

                  <h2 className="text-4xl font-black text-orange-500 mb-6">
                    {section.title}
                  </h2>

                  <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8">

                    <p className="text-gray-300 leading-relaxed">
                      {section.text}
                    </p>

                  </div>

                </section>
              ))}

              {/* DELETE ACCOUNT */}
              <section className="relative overflow-hidden bg-gradient-to-br from-orange-500/20 to-orange-500/5 border border-orange-500/30 rounded-[40px] p-10 shadow-[0_0_80px_rgba(255,115,0,0.15)]">

                <div className="absolute top-0 right-0 w-60 h-60 bg-orange-500/20 blur-[100px] rounded-full"></div>

                <div className="relative z-10">

                  <div className="inline-flex items-center gap-3 bg-orange-500/20 border border-orange-500/20 px-5 py-3 rounded-full mb-8">

                    <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>

                    <span className="text-orange-300 font-semibold">
                      Important User Rights
                    </span>

                  </div>

                  <h2 className="text-5xl font-black text-orange-400 mb-8">
                    12. Delete Your Account
                  </h2>

                  <p className="text-2xl leading-relaxed font-semibold text-white mb-8">

                    To request deletion of your FitStreak account and all
                    associated data, please contact us using the email below.

                  </p>

                  <div className="bg-black/40 border border-orange-500/20 rounded-3xl p-8 mb-8">

                    <p className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-4">
                      Official Email
                    </p>

                    <p className="text-3xl md:text-4xl font-black text-orange-400 break-words">
                      contact@elitegamesfederation.com
                    </p>

                  </div>

                  <div className="flex flex-wrap items-center gap-4">

                    <div className="bg-green-500/10 border border-green-500/20 px-5 py-3 rounded-full">
                      <p className="text-green-400 font-semibold">
                        Processing Time: 48–72 Hours
                      </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-full">
                      <p className="text-gray-300 font-semibold">
                        Secure Data Removal
                      </p>
                    </div>

                  </div>

                </div>

              </section>

              {/* CONTACT */}
              <section>

                <h2 className="text-4xl font-black text-orange-500 mb-6">
                  13. Contact Us
                </h2>

                <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8">

                  <p className="text-xl text-gray-300">
                    Email:{" "}
                    <span className="text-orange-400 font-bold">
                      contact@elitegamesfederation.com
                    </span>
                  </p>

                </div>

              </section>

              {/* CHANGES */}
              <section>

                <h2 className="text-4xl font-black text-orange-500 mb-6">
                  14. Changes to This Privacy Policy
                </h2>

                <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8">

                  <p className="text-gray-300 leading-relaxed">
                    We may update this Privacy Policy from time to time.
                    Updated versions will be posted at the relevant public URL
                    and will take effect from the stated effective date.
                  </p>

                </div>

              </section>

            </div>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <Footer />

    </main>
  );
}