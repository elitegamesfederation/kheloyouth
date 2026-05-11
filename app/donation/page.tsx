import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DonationPage() {
  return (
    <main className="min-h-screen pt-40 md:pt-0 bg-black text-white overflow-hidden">

      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-52 pb-28 overflow-hidden">

        {/* GLOW EFFECTS */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-500/10 blur-[140px] rounded-full"></div>

        <div className="absolute right-0 top-20 w-[450px] h-[450px] bg-orange-500/10 blur-[120px] rounded-full"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT CONTENT */}
          <div>

            <p className="uppercase tracking-[0.4em] text-orange-500 font-semibold">
              Elite Games Federation
            </p>

            <h1 className="mt-6 text-6xl md:text-8xl font-black leading-none">
              SUPPORT
              <span className="block text-orange-500 mt-2">
                INDIA’S ATHLETES
              </span>
            </h1>

            <p className="mt-8 text-xl text-gray-300 leading-relaxed max-w-2xl">
              Your contribution empowers grassroots talent,
              para-athletes, sports academies, and the next
              generation of champions across India.
            </p>

            {/* BUTTONS */}
            <div className="mt-10 flex flex-wrap gap-5">

              <button className="bg-orange-500 hover:bg-orange-600 transition px-8 py-4 rounded-2xl text-lg font-bold shadow-[0_0_40px_rgba(255,115,0,0.35)]">
                Donate Now
              </button>

              <button className="border border-white/20 hover:border-orange-500 hover:bg-orange-500/10 transition px-8 py-4 rounded-2xl text-lg font-semibold">
                Become Sponsor
              </button>

            </div>

            {/* STATS */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl">

              <div>
                <h2 className="text-4xl font-black text-orange-500">
                  100+
                </h2>

                <p className="mt-2 text-gray-400">
                  Para Athletes
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-black text-orange-500">
                  25+
                </h2>

                <p className="mt-2 text-gray-400">
                  Sports Supported
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-black text-orange-500">
                  50K+
                </h2>

                <p className="mt-2 text-gray-400">
                  Lives Impacted
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT SIDE CARD */}
          <div className="relative flex justify-center">

            <div className="relative w-full max-w-xl h-[650px] rounded-[40px] overflow-hidden border border-white/10 bg-zinc-900">

              <img
                src="uttarpradeshsports.png"
                alt="Uttar PRadesh Sports"
                className="w-full h-full object-cover opacity-70"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

              {/* FLOATING CARD */}
              <div className="absolute bottom-8 left-8 right-8 bg-black/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

                <p className="text-orange-400 font-semibold uppercase tracking-[0.2em] text-sm">
                  Empowering Change
                </p>

                <h3 className="mt-3 text-3xl font-black">
                  Every Donation Creates Opportunity
                </h3>

                <p className="mt-4 text-gray-300 leading-relaxed">
                  Help young athletes train, compete, and build
                  a better future through sports.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* DONATION TIERS */}
      <section className="max-w-7xl mx-auto px-6 pb-28">

        <div className="text-center">

          <p className="text-orange-500 uppercase tracking-[0.4em] font-semibold">
            Contribution Plans
          </p>

          <h2 className="mt-5 text-6xl font-black">
            DONATION TIERS
          </h2>

        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* CARD */}
          {[
            {
              title: "Bronze Supporter",
              price: "₹500",
              desc: "Support grassroots athlete initiatives.",
            },
            {
              title: "Silver Supporter",
              price: "₹2,000",
              desc: "Help para-athletes access training facilities.",
            },
            {
              title: "Gold Supporter",
              price: "₹5,000",
              desc: "Contribute towards academy development.",
            },
            {
              title: "Elite Partner",
              price: "₹10,000",
              desc: "Sponsor national-level athlete programs.",
            },
          ].map((tier) => (
            <div
              key={tier.title}
              className="bg-zinc-900 border border-white/10 rounded-[32px] p-8 hover:border-orange-500 hover:-translate-y-2 transition duration-300"
            >

              <p className="text-orange-500 uppercase tracking-[0.2em] text-sm font-semibold">
                {tier.title}
              </p>

              <h3 className="mt-6 text-5xl font-black">
                {tier.price}
              </h3>

              <p className="mt-6 text-gray-400 leading-relaxed">
                {tier.desc}
              </p>

              <button className="mt-10 w-full bg-orange-500 hover:bg-orange-600 transition py-4 rounded-2xl font-bold">
                Donate
              </button>

            </div>
          ))}

        </div>

      </section>

      {/* IMPACT SECTION */}
      <section className="relative py-28 border-y border-white/10 overflow-hidden">

        <div className="absolute inset-0 bg-orange-500/5 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-20 items-center">

          {/* IMAGE */}
          <div className="relative">

            <div className="rounded-[40px] overflow-hidden border border-white/10">

              <img
                src="karateseminar.png"
                alt="Karate Seminar"
                className="w-full h-[600px] object-cover"
              />

            </div>

          </div>

          {/* CONTENT */}
          <div>

            <p className="uppercase tracking-[0.4em] text-orange-500 font-semibold">
              Why Donate?
            </p>

            <h2 className="mt-6 text-6xl font-black leading-tight">
              Building
              <span className="text-orange-500"> India’s Sports Future</span>
            </h2>

            <p className="mt-8 text-xl text-gray-300 leading-relaxed">
              Your support enables athletes to access professional coaching,
              equipment, nutrition, travel assistance, and competition exposure.
            </p>

            <div className="mt-10 space-y-6">

              <div className="flex gap-4">
                <div className="w-3 h-3 bg-orange-500 rounded-full mt-2"></div>

                <p className="text-gray-300">
                  Transparent and impact-driven donations.
                </p>
              </div>

              <div className="flex gap-4">
                <div className="w-3 h-3 bg-orange-500 rounded-full mt-2"></div>

                <p className="text-gray-300">
                  Direct support for athletes and academies.
                </p>
              </div>

              <div className="flex gap-4">
                <div className="w-3 h-3 bg-orange-500 rounded-full mt-2"></div>

                <p className="text-gray-300">
                  Empowering para-athletes and grassroots talent.
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* GALLERY */}
      <section className="max-w-7xl mx-auto px-6 py-28">

        <div className="text-center">

          <p className="text-orange-500 uppercase tracking-[0.4em] font-semibold">
            Community
          </p>

          <h2 className="mt-5 text-6xl font-black">
            DONATION DRIVE
          </h2>

        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">

          <div className="rounded-[30px] overflow-hidden border border-white/10">
            <img
              src="/donationdrive1.png"
              alt="Community"
              className="w-full h-[350px] object-cover hover:scale-110 transition duration-700"
            />
          </div>

          <div className="rounded-[30px] overflow-hidden border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop"
              alt="Support"
              className="w-full h-[350px] object-cover hover:scale-110 transition duration-700"
            />
          </div>

          <div className="rounded-[30px] overflow-hidden border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop"
              alt="Sports"
              className="w-full h-[350px] object-cover hover:scale-110 transition duration-700"
            />
          </div>

        </div>

      </section>

      <Footer />

    </main>
  );
}