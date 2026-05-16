import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const sampleSports = [
  "Athletics",
  "Taekwondo",
  "Football",
  "Fitness Training",
];

const sampleStudents = [
  {
    name: "Aarav Sharma",
    age: "15",
    sex: "Male",
    bloodGroup: "O+",
    sports: "Athletics, Football",
    achievement: ["District Gold Medalist", "Elite Athlete Feature"],
    photo: "/navdeepsingh.jpg",
  },
  {
    name: "Meera Nair",
    age: "13",
    sex: "Female",
    bloodGroup: "B+",
    sports: "Taekwondo, Fitness Training",
    achievement: ["State Championship Finalist", "School Sports Captain"],
    photo: "/buildingindia.png",
  },
];

export default function SampleAcademyPage() {
  const sampleCoachSports = "Athletics, Taekwondo";

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="pt-44 pb-24 max-w-7xl mx-auto px-6">
        <div className="bg-zinc-900 border border-orange-500/40 rounded-[35px] overflow-hidden">
          <div className="relative min-h-[480px] p-8 md:p-14 flex items-end">
            <img
              src="/paraathletes.png"
              alt="Sample Academy banner"
              className="absolute inset-0 w-full h-full object-cover opacity-45"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-end gap-8">
              <img
                src="/elite-logo.png"
                alt="Sample Academy logo"
                className="w-36 h-36 rounded-3xl object-contain bg-black border border-white/10 p-4"
              />
              <div>
                <p className="text-orange-500 uppercase tracking-[0.35em] font-semibold">
                  Sample Academy
                </p>
                <h1 className="mt-4 text-5xl md:text-7xl font-black">
                  Sample Academy Profile
                </h1>
                <p className="mt-4 max-w-3xl text-zinc-200 text-lg">
                  This is a demo profile showing how a paid academy page can look inside India&apos;s growing grassroots sports network.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="bg-orange-500 text-black px-4 py-2 rounded-full font-black">
                    Demo Only
                  </span>
                  <span className="bg-white/10 border border-white/20 px-4 py-2 rounded-full font-bold">
                    EGF-DL-SAMPLE
                  </span>
                  <span className="bg-white/10 border border-white/20 px-4 py-2 rounded-full font-bold">
                    2 Elite Athletes
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12 grid lg:grid-cols-3 gap-8">
            <section className="lg:col-span-2 bg-black border border-white/10 rounded-3xl p-8">
              <h2 className="text-4xl font-black">Academy Description</h2>
              <p className="mt-4 text-zinc-300 leading-relaxed">
                Sample Academy develops young athletes through structured training, tournament exposure, mentorship, and federation-backed visibility. The page is clearly marked as a sample so visitors understand it is a preview profile.
              </p>
            </section>

            <section className="bg-black border border-white/10 rounded-3xl p-8">
              <h2 className="text-4xl font-black">Contact</h2>
              <div className="mt-5 space-y-3 text-zinc-300">
                <p>New Delhi, Delhi</p>
                <p>contact@elitegamesfederation.com</p>
                <p>9999999999</p>
              </div>
            </section>

            <section className="lg:col-span-3 bg-black border border-white/10 rounded-3xl p-8">
              <h2 className="text-4xl font-black">Sports Conducted</h2>
              <div className="mt-5 flex flex-wrap gap-3">
                {sampleSports.map((sport) => (
                  <span
                    key={sport}
                    className="bg-orange-500/10 text-orange-500 border border-orange-500/20 px-4 py-2 rounded-full font-bold"
                  >
                    {sport}
                  </span>
                ))}
              </div>
            </section>

            <section className="bg-black border border-white/10 rounded-3xl p-8">
              <h2 className="text-4xl font-black">Owner / Coach</h2>
              <div className="mt-6 flex gap-5 bg-zinc-950 border border-white/10 rounded-2xl p-5">
                <img
                  src="/surajpodcast.png"
                  alt="Sample coach"
                  className="w-20 h-24 rounded-xl object-cover"
                />
                <div>
                  <p className="text-xl font-black">Sample Coach</p>
                  <p className="mt-1 text-orange-500 font-bold">
                    Coach and Owner
                  </p>
                  <p className="mt-2 text-zinc-400">Blood Group: A+</p>
                  <p className="mt-2 text-zinc-400">
                    Sports: {sampleCoachSports}
                  </p>
                </div>
              </div>
            </section>

            <section className="lg:col-span-2 bg-black border border-white/10 rounded-3xl p-8">
              <h2 className="text-4xl font-black">Elite Athlete Features</h2>
              <div className="mt-6 grid md:grid-cols-2 gap-5">
                {sampleStudents.map((student) => (
                  <div
                    key={student.name}
                    className="bg-zinc-950 border border-white/10 rounded-2xl p-5 flex gap-5"
                  >
                    <img
                      src={student.photo}
                      alt={student.name}
                      className="w-20 h-24 rounded-xl object-cover"
                    />
                    <div>
                      <p className="text-xl font-black">{student.name}</p>
                      <p className="mt-1 text-zinc-400">
                        {student.sports} | {student.sex} | {student.age} yrs
                      </p>
                      <p className="mt-2 text-zinc-400">
                        Blood Group: {student.bloodGroup}
                      </p>
                      <ol className="mt-3 list-decimal list-inside text-zinc-300 space-y-1">
                        {student.achievement.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ol>
                      <span className="mt-3 inline-block bg-orange-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                        Elite Athlete
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
