"use client";

import { useEffect, useMemo, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { db } from "@/app/lib/firebase";

import {
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";

const yearlyStudentFee = 99;

const affiliationFees: any = {
  1: 999,
  2: 1799,
  3: 2499,
};

const stateCodes: any = {
  Delhi: "DL",
  Maharashtra: "MH",
  "Uttar Pradesh": "UP",
  Haryana: "HR",
  Punjab: "PB",
  Rajasthan: "RJ",
  Gujarat: "GJ",
  Karnataka: "KA",
  "Tamil Nadu": "TN",
  Telangana: "TS",
  Kerala: "KL",
  "West Bengal": "WB",
  Bihar: "BR",
  Jharkhand: "JH",
  Odisha: "OD",
  Assam: "AS",
};

const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const getStateCode = (value: string) =>
  stateCodes[value] ||
  value.trim().slice(0, 2).toUpperCase() ||
  "EG";

const getDefaultOwner = () => ({
  fullName: "",
  role: "Owner",
  sex: "",
  mobile: "",
  email: "",
  designation: "",
});

const getDefaultStudent = () => ({
  name: "",
  age: "",
  sex: "",
  sports: "",
  school: "",
  achievement: "",
  isEliteAthlete: false,
  isParaAthlete: false,
});

const adminLoginId = "jameelspeaks";
const defaultAdminPassword = "Jameel@4121#";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [academies, setAcademies] = useState<any[]>([]);
  const [selectedState, setSelectedState] = useState("All States");
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminIdInput, setAdminIdInput] = useState("");
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [showAdminReset, setShowAdminReset] = useState(false);
  const [resetCurrentPassword, setResetCurrentPassword] = useState("");
  const [resetNewPassword, setResetNewPassword] = useState("");
  const [showResetCurrentPassword, setShowResetCurrentPassword] =
    useState(false);
  const [showResetNewPassword, setShowResetNewPassword] =
    useState(false);

  const [academyName, setAcademyName] = useState("");
  const [academyDescription, setAcademyDescription] =
    useState("");
  const [establishmentYear, setEstablishmentYear] = useState("");
  const [stateName, setStateName] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [officialEmail, setOfficialEmail] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [hasOtherBranch, setHasOtherBranch] = useState("");
  const [googleLocation, setGoogleLocation] = useState("");
  const [desiredSport, setDesiredSport] = useState("");
  const [mediaCoverageProofName, setMediaCoverageProofName] =
    useState("");
  const [declarationAccepted, setDeclarationAccepted] =
    useState(false);
  const [academyLogoUrl, setAcademyLogoUrl] = useState("");
  const [academyImageUrls, setAcademyImageUrls] = useState<
    string[]
  >([]);
  const [selectedYears, setSelectedYears] = useState(1);
  const [sportsConducted, setSportsConducted] = useState("");
  const [owners, setOwners] = useState<any[]>([getDefaultOwner()]);
  const [students, setStudents] = useState<any[]>([getDefaultStudent()]);

  const loadAcademies = async () => {
    setLoading(true);

    const snap = await getDocs(collection(db, "academies"));

    setAcademies(
      snap.docs.map((academyDoc) => ({
        id: academyDoc.id,
        ...academyDoc.data(),
      }))
    );

    setLoading(false);
  };

  const getSavedAdminPassword = () =>
    window.localStorage.getItem("eliteAdminPassword") ||
    defaultAdminPassword;

  useEffect(() => {
    if (window.localStorage.getItem("eliteAdminUnlocked") === "true") {
      setAdminUnlocked(true);
      return;
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (adminUnlocked) {
      loadAcademies();
    }
  }, [adminUnlocked]);

  const activeAcademies = academies.filter(
    (academy) => academy.paymentDone
  );
  const unpaidAcademies = academies.filter(
    (academy) => !academy.paymentDone
  );
  const sportRequests = academies.filter(
    (academy) => academy.desiredSport
  );
  const totalActiveStudents = activeAcademies.reduce(
    (total, academy) =>
      total +
      Number(
        academy.paidStudentsCount ??
          academy.studentsCount ??
          (Array.isArray(academy.students)
            ? academy.students.length
            : 0)
      ),
    0
  );

  const stateRows = useMemo(() => {
    const rows: any = {};

    academies.forEach((academy) => {
      const state = academy.state || "Not Added";

      if (!rows[state]) {
        rows[state] = {
          state,
          totalAcademies: 0,
          activeAcademies: 0,
          unpaidAcademies: 0,
          activeStudents: 0,
        };
      }

      rows[state].totalAcademies += 1;

      if (academy.paymentDone) {
        rows[state].activeAcademies += 1;
        rows[state].activeStudents += Number(
          academy.paidStudentsCount ??
            academy.studentsCount ??
            (Array.isArray(academy.students)
              ? academy.students.length
              : 0)
        );
      } else {
        rows[state].unpaidAcademies += 1;
      }
    });

    return Object.values(rows);
  }, [academies]);

  const filteredStateRows =
    selectedState === "All States"
      ? stateRows
      : stateRows.filter(
          (row: any) => row.state === selectedState
        );

  const addOwner = () =>
    setOwners([...owners, getDefaultOwner()]);

  const addStudent = () =>
    setStudents([...students, getDefaultStudent()]);

  const handleAdminLogin = () => {
    if (
      adminIdInput.trim() === adminLoginId &&
      adminPasswordInput === getSavedAdminPassword()
    ) {
      window.localStorage.setItem("eliteAdminUnlocked", "true");
      setAdminUnlocked(true);
      setAdminPasswordInput("");
      return;
    }

    alert("Invalid admin login details.");
  };

  const handleAdminLogout = () => {
    window.localStorage.removeItem("eliteAdminUnlocked");
    setAdminUnlocked(false);
    setAcademies([]);
  };

  const handleAdminPasswordReset = () => {
    if (resetCurrentPassword !== getSavedAdminPassword()) {
      alert("Current admin password is incorrect.");
      return;
    }

    if (resetNewPassword.length < 8) {
      alert("New password must be at least 8 characters.");
      return;
    }

    window.localStorage.setItem("eliteAdminPassword", resetNewPassword);
    setResetCurrentPassword("");
    setResetNewPassword("");
    setShowAdminReset(false);
    alert("Admin password updated for this browser.");
  };

  const readFileAsDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleAdminLogoUpload = async (file?: File) => {
    if (!file) return;

    setAcademyLogoUrl(await readFileAsDataUrl(file));
  };

  const handleAdminPhotosUpload = async (files: FileList | null) => {
    const selectedFiles = Array.from(files || []);

    if (!selectedFiles.length) return;

    if (academyImageUrls.length + selectedFiles.length > 5) {
      alert("Maximum 5 academy photos allowed.");
      return;
    }

    const urls = await Promise.all(
      selectedFiles.map((file) => readFileAsDataUrl(file))
    );

    setAcademyImageUrls([...academyImageUrls, ...urls]);
  };

  const updateOwner = (
    index: number,
    field: string,
    value: string
  ) => {
    const updated = [...owners];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setOwners(updated);
  };

  const updateStudent = (
    index: number,
    field: string,
    value: any
  ) => {
    const updated = [...students];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setStudents(updated);
  };

  const createAdminAcademy = async () => {
    if (!academyName || !stateName || !district) {
      alert("Academy name, state, and district are required.");
      return;
    }

    try {
      setSaving(true);

      const today = new Date();
      const affiliationEndDate = new Date(today);
      const studentFeeEndDate = new Date(today);
      const slug = slugify(academyName);
      const randomId = Math.random()
        .toString(36)
        .slice(2, 8)
        .toUpperCase();
      const affiliationNumber = `${getStateCode(stateName)}/${today
        .getFullYear()
        .toString()
        .slice(-2)}/${randomId}`;

      affiliationEndDate.setFullYear(
        today.getFullYear() + Number(selectedYears)
      );
      studentFeeEndDate.setFullYear(today.getFullYear() + 1);

      await addDoc(collection(db, "academies"), {
        academyName,
        academySlug: slug,
        academyDescription,
        establishmentYear,
        state: stateName,
        district,
        city,
        fullAddress,
        pincode,
        contactNumber,
        officialEmail,
        websiteLink,
        instagramLink,
        facebookLink,
        hasOtherBranch,
        googleLocation,
        desiredSport,
        mediaCoverageProofName,
        declarationAccepted,
        academyLogoUrl,
        logoURL: academyLogoUrl,
        academyImageUrls,
        sportsConducted: sportsConducted
          .split(",")
          .map((sport) => sport.trim())
          .filter(Boolean),
        owners,
        students,
        studentsCount: students.length,
        paidStudentsCount: students.length,
        selectedYears: Number(selectedYears),
        affiliationNumber,
        affiliationStartDate: today.toDateString(),
        affiliationEndDate: affiliationEndDate.toDateString(),
        studentFeeStartDate: today.toDateString(),
        studentFeeEndDate: studentFeeEndDate.toDateString(),
        couponCode: "ELITENETWORK",
        paymentMode: "admin-coupon",
        paymentDone: true,
        verified: true,
        profileCompleted: true,
        totalAmount:
          (affiliationFees[selectedYears] || 0) +
          students.length * yearlyStudentFee,
        payableAmount: 0,
        amountPaid: 0,
        createdByAdmin: true,
        createdAt: new Date(),
      });

      alert("Academy added with ELITENETWORK.");

      setAcademyName("");
      setAcademyDescription("");
      setEstablishmentYear("");
      setStateName("");
      setDistrict("");
      setCity("");
      setFullAddress("");
      setPincode("");
      setContactNumber("");
      setOfficialEmail("");
      setWebsiteLink("");
      setInstagramLink("");
      setFacebookLink("");
      setHasOtherBranch("");
      setGoogleLocation("");
      setDesiredSport("");
      setMediaCoverageProofName("");
      setDeclarationAccepted(false);
      setAcademyLogoUrl("");
      setAcademyImageUrls([]);
      setSelectedYears(1);
      setSportsConducted("");
      setOwners([getDefaultOwner()]);
      setStudents([getDefaultStudent()]);
      await loadAcademies();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (!adminUnlocked) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />

        <section className="pt-44 pb-24 max-w-3xl mx-auto px-6">
          <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8">
            <p className="text-orange-500 uppercase tracking-[0.35em] text-sm font-semibold">
              Federation Admin
            </p>
            <h1 className="mt-5 text-5xl font-black">
              Admin Login
            </h1>

            <div className="mt-8 space-y-5">
              <input
                value={adminIdInput}
                onChange={(e) => setAdminIdInput(e.target.value)}
                placeholder="Login ID"
                className="w-full bg-black border border-zinc-700 rounded-2xl px-5 py-4"
              />

              <div className="relative">
                <input
                  type={showAdminPassword ? "text" : "password"}
                  value={adminPasswordInput}
                  onChange={(e) =>
                    setAdminPasswordInput(e.target.value)
                  }
                  placeholder="Password"
                  className="w-full bg-black border border-zinc-700 rounded-2xl px-5 py-4 pr-24"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowAdminPassword(!showAdminPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-orange-500"
                >
                  {showAdminPassword ? "Hide" : "Show"}
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdminLogin}
                className="w-full bg-orange-500 hover:bg-orange-600 text-black rounded-2xl py-4 font-black"
              >
                Open Admin Dashboard
              </button>

              <button
                type="button"
                onClick={() => setShowAdminReset(!showAdminReset)}
                className="text-orange-500 font-bold"
              >
                Reset Admin Password
              </button>
            </div>

            {showAdminReset && (
              <div className="mt-8 border-t border-white/10 pt-8 space-y-5">
                <div className="relative">
                  <input
                    type={
                      showResetCurrentPassword ? "text" : "password"
                    }
                    value={resetCurrentPassword}
                    onChange={(e) =>
                      setResetCurrentPassword(e.target.value)
                    }
                    placeholder="Current Password"
                    className="w-full bg-black border border-zinc-700 rounded-2xl px-5 py-4 pr-24"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowResetCurrentPassword(
                        !showResetCurrentPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-orange-500"
                  >
                    {showResetCurrentPassword ? "Hide" : "Show"}
                  </button>
                </div>

                <div className="relative">
                  <input
                    type={showResetNewPassword ? "text" : "password"}
                    value={resetNewPassword}
                    onChange={(e) =>
                      setResetNewPassword(e.target.value)
                    }
                    placeholder="New Password"
                    className="w-full bg-black border border-zinc-700 rounded-2xl px-5 py-4 pr-24"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowResetNewPassword(!showResetNewPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-orange-500"
                  >
                    {showResetNewPassword ? "Hide" : "Show"}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAdminPasswordReset}
                  className="w-full bg-white text-black rounded-2xl py-4 font-black"
                >
                  Save New Admin Password
                </button>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="pt-44 pb-24 max-w-7xl mx-auto px-6">
        <p className="text-orange-500 uppercase tracking-[0.4em]">
          Federation Admin
        </p>

        <h1 className="mt-5 text-6xl font-black">
          Academy Control Panel
        </h1>

        <button
          type="button"
          onClick={handleAdminLogout}
          className="mt-6 bg-red-500 hover:bg-red-600 px-6 py-3 rounded-2xl font-bold"
        >
          Admin Logout
        </button>

        {loading ? (
          <p className="mt-10 text-zinc-400">
            Loading admin data...
          </p>
        ) : (
          <>
            <div className="mt-12 grid md:grid-cols-4 gap-5">
              {[
                ["Active Academies", activeAcademies.length],
                ["Payment Pending", unpaidAcademies.length],
                ["Active Students", totalActiveStudents],
                ["Sport Requests", sportRequests.length],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="bg-zinc-900 border border-white/10 rounded-3xl p-6"
                >
                  <p className="text-orange-500 uppercase tracking-[0.25em] text-xs">
                    {label}
                  </p>
                  <p className="mt-4 text-5xl font-black">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 bg-zinc-900 border border-white/10 rounded-3xl p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                <h2 className="text-3xl font-black">
                  State Wise Data
                </h2>

                <select
                  value={selectedState}
                  onChange={(e) =>
                    setSelectedState(e.target.value)
                  }
                  className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
                >
                  <option>All States</option>
                  {stateRows.map((row: any) => (
                    <option key={row.state} value={row.state}>
                      {row.state}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-6 grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredStateRows.map((row: any) => (
                  <div
                    key={row.state}
                    className="bg-black border border-zinc-700 rounded-2xl p-5"
                  >
                    <h3 className="text-2xl font-black">
                      {row.state}
                    </h3>
                    <p className="mt-3 text-zinc-300">
                      Total academies: {row.totalAcademies}
                    </p>
                    <p className="text-zinc-300">
                      Active academies: {row.activeAcademies}
                    </p>
                    <p className="text-zinc-300">
                      Payment pending: {row.unpaidAcademies}
                    </p>
                    <p className="text-zinc-300">
                      Active students: {row.activeStudents}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 grid lg:grid-cols-2 gap-8">
              <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8">
                <h2 className="text-3xl font-black">
                  Payment Pending Leads
                </h2>

                <div className="mt-6 space-y-4">
                  {unpaidAcademies.length ? (
                    unpaidAcademies.map((academy) => {
                      const owner = Array.isArray(academy.owners)
                        ? academy.owners[0]
                        : null;

                      return (
                        <div
                          key={academy.id}
                          className="bg-black border border-zinc-700 rounded-2xl p-5"
                        >
                          <p className="text-xl font-black">
                            {academy.academyName || "Unnamed Academy"}
                          </p>
                          <p className="mt-2 text-zinc-400">
                            {[academy.state, academy.district]
                              .filter(Boolean)
                              .join(", ") || "Location not added"}
                          </p>
                          <p className="mt-2 text-zinc-300">
                            Owner: {owner?.fullName || "Not added"}
                          </p>
                          <p className="text-zinc-300">
                            Contact:{" "}
                            {owner?.mobile ||
                              academy.contactNumber ||
                              "Not added"}{" "}
                            {owner?.email || academy.officialEmail
                              ? `• ${
                                  owner?.email ||
                                  academy.officialEmail
                                }`
                              : ""}
                          </p>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-zinc-400">
                      No unpaid academies right now.
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8">
                <h2 className="text-3xl font-black">
                  Sport Request Notifications
                </h2>

                <div className="mt-6 space-y-4">
                  {sportRequests.length ? (
                    sportRequests.map((academy) => (
                      <div
                        key={academy.id}
                        className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-5"
                      >
                        <p className="text-orange-500 uppercase tracking-[0.2em] text-xs font-bold">
                          Requested Sport
                        </p>
                        <p className="mt-2 text-2xl font-black">
                          {academy.desiredSport}
                        </p>
                        <p className="mt-2 text-zinc-300">
                          {academy.academyName || "Unnamed Academy"} •{" "}
                          {[academy.state, academy.district]
                            .filter(Boolean)
                            .join(", ")}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-zinc-400">
                      No sport requests yet.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-10 bg-zinc-900 border border-white/10 rounded-3xl p-8">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
                <div>
                  <h2 className="text-3xl font-black">
                    Add Academy From Admin
                  </h2>
                  <p className="mt-2 text-zinc-400">
                    Uses coupon code ELITENETWORK with unlimited use.
                  </p>
                </div>

                <div className="bg-black border border-orange-500/30 rounded-2xl px-5 py-4 font-black text-orange-500">
                  ELITENETWORK
                </div>
              </div>

              <div className="mt-8 grid md:grid-cols-2 gap-5">
                <input
                  value={academyName}
                  onChange={(e) =>
                    setAcademyName(e.target.value)
                  }
                  placeholder="Academy Name"
                  className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
                />
                <select
                  value={selectedYears}
                  onChange={(e) =>
                    setSelectedYears(Number(e.target.value))
                  }
                  className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
                >
                  <option value={1}>1 Year</option>
                  <option value={2}>2 Years</option>
                  <option value={3}>3 Years</option>
                </select>
                <input
                  value={establishmentYear}
                  onChange={(e) =>
                    setEstablishmentYear(e.target.value)
                  }
                  placeholder="Year Of Establishment"
                  className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
                />
                <input
                  value={fullAddress}
                  onChange={(e) => setFullAddress(e.target.value)}
                  placeholder="Full Address"
                  className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
                />
                <input
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                  placeholder="State"
                  className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
                />
                <input
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="District"
                  className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
                />
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
                />
                <input
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Pincode"
                  className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
                />
                <input
                  type="tel"
                  maxLength={10}
                  value={contactNumber}
                  onChange={(e) =>
                    setContactNumber(
                      e.target.value.replace(/\D/g, "").slice(0, 10)
                    )
                  }
                  placeholder="Contact Number"
                  className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
                />
                <input
                  value={officialEmail}
                  onChange={(e) =>
                    setOfficialEmail(e.target.value)
                  }
                  placeholder="Official Email"
                  className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
                />
                <input
                  value={websiteLink}
                  onChange={(e) => setWebsiteLink(e.target.value)}
                  placeholder="Website Link"
                  className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
                />
                <input
                  value={instagramLink}
                  onChange={(e) => setInstagramLink(e.target.value)}
                  placeholder="Instagram Link"
                  className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
                />
                <input
                  value={facebookLink}
                  onChange={(e) => setFacebookLink(e.target.value)}
                  placeholder="Facebook Link"
                  className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
                />
                <select
                  value={hasOtherBranch}
                  onChange={(e) =>
                    setHasOtherBranch(e.target.value)
                  }
                  className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
                >
                  <option value="">Any Other Branch?</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
                <input
                  value={googleLocation}
                  onChange={(e) => setGoogleLocation(e.target.value)}
                  placeholder="Google Location Of Academy"
                  className="md:col-span-2 bg-black border border-zinc-700 rounded-2xl px-5 py-4"
                />
                <input
                  value={sportsConducted}
                  onChange={(e) =>
                    setSportsConducted(e.target.value)
                  }
                  placeholder="Sports Conducted, comma separated"
                  className="md:col-span-2 bg-black border border-zinc-700 rounded-2xl px-5 py-4"
                />
                <input
                  value={desiredSport}
                  onChange={(e) => setDesiredSport(e.target.value)}
                  placeholder="Federation Sport Request"
                  className="md:col-span-2 bg-black border border-zinc-700 rounded-2xl px-5 py-4"
                />
                <textarea
                  value={academyDescription}
                  onChange={(e) =>
                    setAcademyDescription(e.target.value)
                  }
                  placeholder="Academy Description"
                  className="md:col-span-2 bg-black border border-zinc-700 rounded-2xl px-5 py-4 min-h-32"
                />
                <input
                  value={mediaCoverageProofName}
                  onChange={(e) =>
                    setMediaCoverageProofName(e.target.value)
                  }
                  placeholder="Press / Media Coverage Proof Name or Link"
                  className="md:col-span-2 bg-black border border-zinc-700 rounded-2xl px-5 py-4"
                />
              </div>

              <div className="mt-8 grid lg:grid-cols-2 gap-8">
                <div className="bg-black border border-zinc-700 rounded-2xl p-5">
                  <h3 className="text-2xl font-black">
                    Academy Logo
                  </h3>
                  <label className="mt-5 inline-flex bg-orange-500 text-black px-5 py-3 rounded-2xl font-bold cursor-pointer">
                    Upload Logo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleAdminLogoUpload(e.target.files?.[0])
                      }
                      className="hidden"
                    />
                  </label>

                  {academyLogoUrl && (
                    <div className="mt-5 flex items-center gap-4">
                      <img
                        src={academyLogoUrl}
                        alt="Academy logo preview"
                        className="w-28 h-28 object-cover rounded-2xl border border-white/10"
                      />
                      <button
                        type="button"
                        onClick={() => setAcademyLogoUrl("")}
                        className="bg-red-500 px-4 py-2 rounded-xl font-bold"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>

                <div className="bg-black border border-zinc-700 rounded-2xl p-5">
                  <h3 className="text-2xl font-black">
                    Academy Photos
                  </h3>
                  <p className="mt-1 text-zinc-400 text-sm">
                    Minimum 3 photos, maximum 5 photos.
                  </p>
                  <label className="mt-5 inline-flex bg-white text-black px-5 py-3 rounded-2xl font-bold cursor-pointer">
                    Upload Photos
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) =>
                        handleAdminPhotosUpload(e.target.files)
                      }
                      className="hidden"
                    />
                  </label>

                  {academyImageUrls.length > 0 && (
                    <div className="mt-5 grid grid-cols-2 gap-4">
                      {academyImageUrls.map((imageUrl, index) => (
                        <div key={imageUrl} className="relative">
                          <img
                            src={imageUrl}
                            alt={`Academy photo ${index + 1}`}
                            className="w-full h-32 object-cover rounded-2xl border border-white/10"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setAcademyImageUrls(
                                academyImageUrls.filter(
                                  (_image, photoIndex) =>
                                    photoIndex !== index
                                )
                              )
                            }
                            className="absolute top-2 right-2 bg-red-500 w-8 h-8 rounded-full font-bold"
                          >
                            x
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 grid lg:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black">
                      Owners / Coaches
                    </h3>
                    <button
                      type="button"
                      onClick={addOwner}
                      className="bg-orange-500 text-black px-5 py-3 rounded-2xl font-bold"
                    >
                      + Add
                    </button>
                  </div>

                  <div className="mt-5 space-y-5">
                    {owners.map((owner, index) => (
                      <div
                        key={index}
                        className="bg-black border border-zinc-700 rounded-2xl p-5 grid gap-4"
                      >
                        <input
                          value={owner.fullName}
                          onChange={(e) =>
                            updateOwner(
                              index,
                              "fullName",
                              e.target.value
                            )
                          }
                          placeholder="Full Name"
                          className="bg-zinc-950 border border-zinc-700 rounded-2xl px-5 py-4"
                        />
                        <div className="grid md:grid-cols-2 gap-4">
                          <select
                            value={owner.role}
                            onChange={(e) =>
                              updateOwner(
                                index,
                                "role",
                                e.target.value
                              )
                            }
                            className="bg-zinc-950 border border-zinc-700 rounded-2xl px-5 py-4"
                          >
                            <option>Owner</option>
                            <option>Coach</option>
                            <option>Coach and Owner</option>
                          </select>
                          <select
                            value={owner.sex}
                            onChange={(e) =>
                              updateOwner(
                                index,
                                "sex",
                                e.target.value
                              )
                            }
                            className="bg-zinc-950 border border-zinc-700 rounded-2xl px-5 py-4"
                          >
                            <option value="">Sex</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <input
                          value={owner.designation}
                          onChange={(e) =>
                            updateOwner(
                              index,
                              "designation",
                              e.target.value
                            )
                          }
                          placeholder="Designation"
                          className="bg-zinc-950 border border-zinc-700 rounded-2xl px-5 py-4"
                        />
                        <input
                          type="tel"
                          maxLength={10}
                          value={owner.mobile}
                          onChange={(e) =>
                            updateOwner(
                              index,
                              "mobile",
                              e.target.value
                                .replace(/\D/g, "")
                                .slice(0, 10)
                            )
                          }
                          placeholder="Mobile"
                          className="bg-zinc-950 border border-zinc-700 rounded-2xl px-5 py-4"
                        />
                        <input
                          value={owner.email}
                          onChange={(e) =>
                            updateOwner(
                              index,
                              "email",
                              e.target.value
                            )
                          }
                          placeholder="Email"
                          className="bg-zinc-950 border border-zinc-700 rounded-2xl px-5 py-4"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black">
                      Students
                    </h3>
                    <button
                      type="button"
                      onClick={addStudent}
                      className="bg-orange-500 text-black px-5 py-3 rounded-2xl font-bold"
                    >
                      + Add Student
                    </button>
                  </div>

                  <div className="mt-5 space-y-5">
                    {students.map((student, index) => (
                      <div
                        key={index}
                        className="bg-black border border-zinc-700 rounded-2xl p-5 grid gap-4"
                      >
                        <input
                          value={student.name}
                          onChange={(e) =>
                            updateStudent(
                              index,
                              "name",
                              e.target.value
                            )
                          }
                          placeholder="Student Name"
                          className="bg-zinc-950 border border-zinc-700 rounded-2xl px-5 py-4"
                        />
                        <div className="grid md:grid-cols-2 gap-4">
                          <input
                            value={student.age}
                            onChange={(e) =>
                              updateStudent(
                                index,
                                "age",
                                e.target.value
                              )
                            }
                            placeholder="Age"
                            className="bg-zinc-950 border border-zinc-700 rounded-2xl px-5 py-4"
                          />
                          <select
                            value={student.sex}
                            onChange={(e) =>
                              updateStudent(
                                index,
                                "sex",
                                e.target.value
                              )
                            }
                            className="bg-zinc-950 border border-zinc-700 rounded-2xl px-5 py-4"
                          >
                            <option value="">Sex</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <input
                          value={student.sports}
                          onChange={(e) =>
                            updateStudent(
                              index,
                              "sports",
                              e.target.value
                            )
                          }
                          placeholder="Sport"
                          className="bg-zinc-950 border border-zinc-700 rounded-2xl px-5 py-4"
                        />
                        <input
                          value={student.school}
                          onChange={(e) =>
                            updateStudent(
                              index,
                              "school",
                              e.target.value
                            )
                          }
                          placeholder="School"
                          className="bg-zinc-950 border border-zinc-700 rounded-2xl px-5 py-4"
                        />
                        <textarea
                          value={student.achievement}
                          onChange={(e) =>
                            updateStudent(
                              index,
                              "achievement",
                              e.target.value
                            )
                          }
                          placeholder="Achievements"
                          className="bg-zinc-950 border border-zinc-700 rounded-2xl px-5 py-4 min-h-28"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <label className="mt-8 flex items-start gap-3 bg-black border border-zinc-700 rounded-2xl px-5 py-4">
                <input
                  type="checkbox"
                  checked={declarationAccepted}
                  onChange={(e) =>
                    setDeclarationAccepted(e.target.checked)
                  }
                  className="mt-1"
                />
                <span className="text-sm text-zinc-300">
                  I declare that all information, documents, photos,
                  student details, and media proof submitted for this
                  academy are true and correct to the best of my
                  knowledge.
                </span>
              </label>

              <button
                type="button"
                onClick={createAdminAcademy}
                disabled={saving}
                className="mt-8 w-full bg-orange-500 hover:bg-orange-600 text-black py-5 rounded-2xl text-xl font-black"
              >
                {saving
                  ? "Adding Academy..."
                  : "Add Active Academy With ELITENETWORK"}
              </button>
            </div>
          </>
        )}
      </section>

      <Footer />
    </main>
  );
}
