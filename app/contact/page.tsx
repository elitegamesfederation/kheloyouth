"use client";

import { FormEvent, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { db } from "@/app/lib/firebase";
import { addDoc, collection } from "firebase/firestore";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!name || !email || !subject || !message) {
      alert("Please fill all message fields.");
      return;
    }

    try {
      setSaving(true);
      await addDoc(collection(db, "contactMessages"), {
        name,
        email,
        subject,
        message,
        createdAt: new Date(),
        status: "new",
      });

      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      alert("Message sent successfully.");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen pt-40 md:pt-0 bg-black text-white">
      <Navbar />

      <section className="relative pt-52 pb-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-500/10 blur-[140px] rounded-full"></div>
        <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-orange-500/10 blur-[120px] rounded-full"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <p className="text-orange-500 uppercase tracking-[0.4em] font-semibold">
            Elite Games Federation
          </p>

          <h1 className="mt-6 text-6xl md:text-8xl font-black leading-none">
            CONTACT US
          </h1>

          <p className="mt-8 text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
            Reach out for academy network support, sponsorships, partnerships,
            athlete support, events, media collaborations, and sports initiatives.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-28 grid lg:grid-cols-2 gap-10">
        <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-[35px] p-10">
          <h2 className="text-5xl font-black">Get In Touch</h2>

          <p className="mt-6 text-gray-400 text-lg leading-relaxed">
            We value athletes, academies, sports communities, sponsors,
            and fitness enthusiasts across India.
          </p>

          <div className="mt-12 space-y-10">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
                Email
              </p>
              <a
                href="mailto:contact@elitegamesfederation.com"
                className="mt-3 block text-2xl font-semibold break-all hover:text-orange-500"
              >
                contact@elitegamesfederation.com
              </a>
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
                Phone
              </p>
              <p className="mt-3 text-2xl font-semibold">
                +91 8793030306 / +91 7217602919
              </p>
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
                Head Office
              </p>
              <p className="mt-3 text-2xl font-semibold">
                B201, Tyagi Cyber Cafe, Jai Durga Chowk, Vikas Nagar, New Delhi - 110059
              </p>
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
                Pune Office
              </p>
              <p className="mt-3 text-2xl font-semibold">
                Office 8, Salamat Ray Complex, Kamgarnagar, Pimpri Pune 411018
              </p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-[35px] p-10">
          <h2 className="text-5xl font-black">Send Message</h2>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full bg-black border border-zinc-700 rounded-2xl px-6 py-5 outline-none focus:border-orange-500 text-lg"
            />

            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full bg-black border border-zinc-700 rounded-2xl px-6 py-5 outline-none focus:border-orange-500 text-lg"
            />

            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              className="w-full bg-black border border-zinc-700 rounded-2xl px-6 py-5 outline-none focus:border-orange-500 text-lg"
            />

            <textarea
              rows={6}
              placeholder="Your Message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="w-full bg-black border border-zinc-700 rounded-2xl px-6 py-5 outline-none focus:border-orange-500 text-lg"
            ></textarea>

            <button
              disabled={saving}
              className="w-full bg-orange-500 hover:bg-orange-600 transition py-5 rounded-2xl text-xl font-bold shadow-[0_0_40px_rgba(255,115,0,0.4)] disabled:opacity-60"
            >
              {saving ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-28">
        <div className="text-center">
          <p className="text-orange-500 uppercase tracking-[0.4em] font-semibold">
            Testimonials
          </p>
          <h2 className="mt-5 text-6xl font-black">
            REVIEWS & FEEDBACK
          </h2>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {[
            [
              "Elite Games Federation is genuinely helping young athletes get visibility and opportunities.",
              "Aarav Sharma",
            ],
            [
              "Professional ecosystem for academies, athletes, and sports communities.",
              "Sneha Patil",
            ],
            [
              "The future of sports networking and athlete growth in India.",
              "Rahul Mehta",
            ],
          ].map(([quote, author]) => (
            <div
              key={author}
              className="bg-zinc-900 border border-white/10 rounded-3xl p-8"
            >
              <p className="text-gray-300 text-lg leading-relaxed">
                "{quote}"
              </p>
              <h3 className="mt-8 text-2xl font-bold text-orange-500">
                {author}
              </h3>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
