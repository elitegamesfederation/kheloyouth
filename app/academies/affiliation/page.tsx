"use client";

import { useState } from "react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import { auth, db } from "@/app/lib/firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

export default function AcademyAffiliationPage() {

  // SIGNUP STATES
  const [academyName, setAcademyName] = useState("");
  const [stateName, setStateName] = useState("");
  const [district, setDistrict] = useState("");
  const [pincode, setPincode] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // LOGIN STATES
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // OTHER STATES
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  

  // PLAN SELECT
  

    

  // SIGNUP FUNCTION
  const handleSignup = async () => {

    if (
      !academyName ||
      !stateName ||
      !district ||
      !pincode ||
      !email ||
      !password
    ) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    

    try {

      setLoading(true);

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user = userCredential.user;

      await setDoc(doc(db, "academies", user.uid), {

        academyName,
        state: stateName,
        district,
        pincode,

        email,

        selectedPlan: "",

        verified: false,
        paymentDone: false,

        createdAt: new Date(),

      });

      window.location.href = "/dashboard";

    } catch (error: any) {

      alert(error.message);

    } finally {

      setLoading(false);

    }
  };

  // LOGIN FUNCTION
  const handleLogin = async () => {

    try {

      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );

      window.location.href = "/dashboard";

    } catch (error: any) {

      alert(error.message);

    } finally {

      setLoading(false);

    }
  };

  return (

    <main className="min-h-screen pt-40 md:pt-0 bg-black text-white overflow-hidden">

      <Navbar />

      {/* POPUP */}
      {showPopup && (

        <div className="fixed top-28 left-1/2 -translate-x-1/2 z-[100]">

          <div className="bg-zinc-950 border border-orange-500/30 shadow-[0_0_60px_rgba(255,115,0,0.35)] rounded-[30px] px-10 py-7 backdrop-blur-2xl">

            <div className="flex items-center gap-5">

              <div className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center text-2xl font-black text-white">
                ✓
              </div>

              <div>

                <h3 className="text-2xl font-black text-white">
                  Plan Selected
                </h3>

                <p className="text-gray-400 mt-1">
                 
                </p>

              </div>

            </div>

          </div>

        </div>

      )}

      {/* HERO */}
      <section className="relative pt-44 pb-20 overflow-hidden">

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-500/10 blur-[150px] rounded-full"></div>

        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-orange-500/10 blur-[150px] rounded-full"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">

          <p className="text-orange-500 uppercase tracking-[0.45em] font-semibold">
            Elite Games Federation
          </p>

          <h1 className="mt-6 text-6xl md:text-8xl font-black leading-none">
            ACADEMY
            <span className="text-orange-500 block mt-3">
              AFFILIATION
            </span>
          </h1>

        </div>

      </section>

      {/* LOGIN + SIGNUP */}
      <section className="max-w-7xl mx-auto px-6 pb-28">

        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* LOGIN */}
          <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-[35px] p-10">

            <p className="text-orange-500 uppercase tracking-[0.35em] text-sm font-semibold">
              Existing Academy
            </p>

            <h2 className="mt-5 text-5xl font-black">
              Login
            </h2>

            <div className="mt-10 space-y-6">

              <input
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) =>
                  setLoginEmail(e.target.value)
                }
                className="w-full bg-black border border-zinc-700 rounded-2xl px-6 py-5 outline-none focus:border-orange-500"
              />

              <input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) =>
                  setLoginPassword(e.target.value)
                }
                className="w-full bg-black border border-zinc-700 rounded-2xl px-6 py-5 outline-none focus:border-orange-500"
              />

              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 transition py-5 rounded-2xl text-lg font-bold"
              >
                {loading
                  ? "Logging In..."
                  : "Login To Dashboard"}
              </button>

            </div>

          </div>

          {/* SIGNUP */}
          <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-[35px] p-10">

            <p className="text-orange-500 uppercase tracking-[0.35em] text-sm font-semibold">
              New Academy
            </p>

            <h2 className="mt-5 text-5xl font-black">
              Create Account
            </h2>

            <div className="mt-10 space-y-6">

              <input
                type="text"
                placeholder="Academy Name"
                value={academyName}
                onChange={(e) =>
                  setAcademyName(e.target.value)
                }
                className="w-full bg-black border border-zinc-700 rounded-2xl px-6 py-5 outline-none focus:border-orange-500"
              />

              <div className="grid md:grid-cols-2 gap-6">

                <input
                  type="text"
                  placeholder="State"
                  value={stateName}
                  onChange={(e) =>
                    setStateName(e.target.value)
                  }
                  className="w-full bg-black border border-zinc-700 rounded-2xl px-6 py-5 outline-none focus:border-orange-500"
                />

                <input
                  type="text"
                  placeholder="District"
                  value={district}
                  onChange={(e) =>
                    setDistrict(e.target.value)
                  }
                  className="w-full bg-black border border-zinc-700 rounded-2xl px-6 py-5 outline-none focus:border-orange-500"
                />

              </div>

              <input
                type="text"
                placeholder="Pincode"
                value={pincode}
                onChange={(e) =>
                  setPincode(e.target.value)
                }
                className="w-full bg-black border border-zinc-700 rounded-2xl px-6 py-5 outline-none focus:border-orange-500"
              />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full bg-black border border-zinc-700 rounded-2xl px-6 py-5 outline-none focus:border-orange-500"
              />

              <input
                type="password"
                placeholder="Create Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full bg-black border border-zinc-700 rounded-2xl px-6 py-5 outline-none focus:border-orange-500"
              />

              <input
                type="password"
                placeholder="Retype Password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                className="w-full bg-black border border-zinc-700 rounded-2xl px-6 py-5 outline-none focus:border-orange-500"
              />

              <button
                onClick={handleSignup}
                disabled={loading}
                className="w-full bg-white text-black hover:bg-gray-200 transition py-5 rounded-2xl text-lg font-bold"
              >
                {loading
                  ? "Creating Account..."
                  : "Create Academy Account"}
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* PLANS */}
      <section className="max-w-7xl mx-auto px-6 pb-32">

        <div className="text-center">

          <p className="text-orange-500 uppercase tracking-[0.4em] font-semibold">
            Membership Plans
          </p>

          <h2 className="mt-5 text-6xl font-black">
            AFFILIATION PRICING
          </h2>

        </div>

        <div className="mt-16 grid md:grid-cols-2 xl:grid-cols-4 gap-8">

          {[
            {
              duration: "1 Year",
              price: "₹1000",
              featured: false,
            },
            {
              duration: "2 Years",
              price: "₹1800",
              featured: true,
            },
            {
              duration: "3 Years",
              price: "₹2500",
              featured: false,
            },
            {
              duration: "5 Years",
              price: "₹4000",
              featured: false,
            },
          ].map((plan) => (

            <div
              key={plan.duration}
              className={`relative rounded-[35px] p-10 border transition duration-300 ${
                plan.featured
                  ? "bg-orange-500 text-white border-orange-500 shadow-[0_0_60px_rgba(255,115,0,0.35)]"
                  : "bg-zinc-900 border-white/10 hover:border-orange-500"
              }`}
            >

              <h3 className="text-5xl font-black">
                {plan.price}
              </h3>

              <p className="mt-3 text-xl">
                {plan.duration}
              </p>

              <button
                onClick={() =>
  alert("Signup/Login first to select your affiliation plan from dashboard.")
}

                className={`mt-10 w-full py-4 rounded-2xl font-bold transition ${
                  plan.featured
                    ? "bg-white text-orange-500"
                    : "bg-orange-500 text-white"
                }`}
              >
                Select Plan
              </button>

            </div>

          ))}

        </div>

      </section>

      <Footer />

    </main>
  );
}