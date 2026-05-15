"use client";

import { useEffect, useMemo, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { auth, db } from "@/app/lib/firebase";
import {
  getDistrictsForState,
  states as indiaStates,
} from "@/app/lib/indiaLocations";

import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { createUserWithEmailAndPassword } from "firebase/auth";

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
  bloodGroup: "",
  mobile: "",
  email: "",
  designation: "",
  memberId: "",
});

const getDefaultStudent = () => ({
  name: "",
  age: "",
  sex: "",
  bloodGroup: "",
  sports: [],
  school: "",
  achievement: "",
  memberId: "",
  photoUrl: "",
  isEliteAthlete: false,
  isParaAthlete: false,
});

const adminLoginId = "jameelspeaks";
const defaultAdminPassword = "Jameel@4121#";
const academyDefaultPassword = "Elite123";

const bloodGroupOptions = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

const sportsList = [
  "Cricket",
  "Football",
  "Hockey",
  "Athletics",
  "Rugby",
  "Baseball",
  "Softball",
  "Basketball",
  "Volleyball",
  "Handball",
  "Netball",
  "Kho Kho",
  "Kabaddi",
  "Cycling",
  "Archery",
  "Shooting",
  "Golf",
  "Polo",
  "Tennis",
  "Table Tennis",
  "Badminton",
  "Squash",
  "Skateboarding",
  "Roller Skating",
  "Rowing",
  "Canoeing",
  "Kayaking",
  "Triathlon",
  "Marathon",
  "Chess",
  "Carrom",
  "Snooker",
  "Billiards",
  "Pool",
  "Gymnastics",
  "Yoga Sports",
  "Martial Arts",
  "Arm Wrestling",
  "Powerlifting",
  "Weightlifting",
  "Bodybuilding",
  "Wrestling",
  "Boxing",
  "Kickboxing",
  "Wushu",
  "Taekwondo",
  "Karate",
  "Judo",
  "Ju-Jitsu",
  "MMA (Mixed Martial Arts)",
  "Muay Thai",
  "Sambo",
  "Kudo",
  "Aikido",
  "Kung Fu",
  "Silambam",
  "Mallakhamb",
  "Gatka",
  "Kalaripayattu",
  "Brazilian Jiu-Jitsu",
  "Grappling",
  "Pickleball",
  "Padel",
];

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [academies, setAcademies] = useState<any[]>([]);
  const [contactMessages, setContactMessages] = useState<any[]>([]);
  const [selectedState, setSelectedState] = useState("All States");
  const [activeAdminTool, setActiveAdminTool] = useState("create");
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
  const [mediaCoverageProofName, setMediaCoverageProofName] =
    useState("");
  const [declarationAccepted, setDeclarationAccepted] =
    useState(false);
  const [academyLogoUrl, setAcademyLogoUrl] = useState("");
  const [academyImageUrls, setAcademyImageUrls] = useState<
    string[]
  >([]);
  const [featuredAcademyImageUrl, setFeaturedAcademyImageUrl] =
    useState("");
  const [selectedYears, setSelectedYears] = useState(1);
  const [sportsConducted, setSportsConducted] = useState<string[]>(
    []
  );
  const [customSport, setCustomSport] = useState("");
  const [adminSports, setAdminSports] = useState<string[]>([]);
  const [newMasterSport, setNewMasterSport] = useState("");
  const [editAcademyId, setEditAcademyId] = useState("");
  const [editAcademyForm, setEditAcademyForm] = useState<any>({
    academyName: "",
    state: "",
    district: "",
    city: "",
    contactNumber: "",
    officialEmail: "",
    sportsConducted: "",
    academyImageUrls: [],
    featuredAcademyImageUrl: "",
  });
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

  const loadAdminSports = async () => {
    const sportsSnap = await getDoc(doc(db, "siteSettings", "sports"));
    const data = sportsSnap.exists() ? sportsSnap.data() : {};
    setAdminSports(
      Array.isArray(data.extraSports) ? data.extraSports : []
    );
  };

  const loadContactMessages = async () => {
    try {
      const messageSnap = await getDocs(
        query(
          collection(db, "contactMessages"),
          orderBy("createdAt", "desc")
        )
      );

      setContactMessages(
        messageSnap.docs.map((messageDoc) => ({
          id: messageDoc.id,
          ...messageDoc.data(),
        }))
      );
    } catch {
      const messageSnap = await getDocs(collection(db, "contactMessages"));
      setContactMessages(
        messageSnap.docs.map((messageDoc) => ({
          id: messageDoc.id,
          ...messageDoc.data(),
        }))
      );
    }
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
      loadAdminSports();
      loadContactMessages();
    }
  }, [adminUnlocked]);

  const activeAcademies = academies.filter(
    (academy) => academy.paymentDone
  );
  const unpaidAcademies = academies.filter(
    (academy) => !academy.paymentDone
  );
  const liveAcademies = academies.filter(
    (academy) => academy.paymentDone
  );
  const sportRequests = academies.filter(
    (academy) => academy.desiredSport && !academy.sportRequestResolved
  );
  const masterSports = useMemo(
    () =>
      Array.from(new Set([...sportsList, ...adminSports])).sort(
        (a, b) => a.localeCompare(b)
      ),
    [adminSports]
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
  const adminDistrictOptions = getDistrictsForState(stateName);
  const editDistrictOptions = getDistrictsForState(
    editAcademyForm.state || ""
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

  const addSportToAcademy = (sport: string) => {
    const cleanSport = sport.trim();

    if (!cleanSport) return;

    if (
      sportsConducted.some(
        (existingSport) =>
          existingSport.toLowerCase() === cleanSport.toLowerCase()
      )
    ) {
      setCustomSport("");
      return;
    }

    setSportsConducted([...sportsConducted, cleanSport]);
    setCustomSport("");
  };

  const removeSportFromAcademy = (sport: string) => {
    setSportsConducted(
      sportsConducted.filter((item) => item !== sport)
    );
    setStudents(
      students.map((student) =>
        getStudentSports(student).includes(sport)
          ? {
              ...student,
              sports: getStudentSports(student).filter(
                (studentSport: string) => studentSport !== sport
              ),
            }
          : student
      )
    );
  };

  const handleAdminStudentPhotoUpload = async (
    index: number,
    file?: File
  ) => {
    if (!file) return;

    updateStudent(index, "photoUrl", await readFileAsDataUrl(file));
  };

  const handleAddMasterSport = async () => {
    const cleanSport = newMasterSport.trim();

    if (!cleanSport) {
      alert("Enter sport name.");
      return;
    }

    if (
      masterSports.some(
        (sport) => sport.toLowerCase() === cleanSport.toLowerCase()
      )
    ) {
      alert("This sport is already available.");
      setNewMasterSport("");
      return;
    }

    const updatedSports = [...adminSports, cleanSport].sort((a, b) =>
      a.localeCompare(b)
    );

    await setDoc(
      doc(db, "siteSettings", "sports"),
      {
        extraSports: updatedSports,
        updatedAt: new Date(),
      },
      { merge: true }
    );

    setAdminSports(updatedSports);
    setNewMasterSport("");
    alert("Sport added live.");
  };

  const resolveSportRequest = async (academyId: string) => {
    await updateDoc(doc(db, "academies", academyId), {
      sportRequestResolved: true,
      sportRequestResolvedAt: new Date(),
    });

    await loadAcademies();
  };

  const loadEditAcademy = (academyId: string) => {
    setEditAcademyId(academyId);
    const academy = liveAcademies.find(
      (item) => item.id === academyId
    );

    if (!academy) return;

    setEditAcademyForm({
      academyName: academy.academyName || "",
      state: academy.state || "",
      district: academy.district || "",
      city: academy.city || "",
      academyDescription: academy.academyDescription || "",
      contactNumber: academy.contactNumber || "",
      officialEmail: academy.officialEmail || academy.email || "",
      academyImageUrls: Array.isArray(academy.academyImageUrls)
        ? academy.academyImageUrls
        : [],
      featuredAcademyImageUrl:
        academy.featuredAcademyImageUrl ||
        (Array.isArray(academy.academyImageUrls)
          ? academy.academyImageUrls[0]
          : ""),
      sportsConducted: Array.isArray(academy.sportsConducted)
        ? academy.sportsConducted.join(", ")
        : "",
    });
  };

  const saveEditAcademy = async () => {
    if (!editAcademyId) {
      alert("Select a live academy first.");
      return;
    }

    const editSports = String(editAcademyForm.sportsConducted || "")
      .split(",")
      .map((sport) => sport.trim())
      .filter(Boolean);

    if (
      !editAcademyForm.academyName ||
      !editAcademyForm.state ||
      !editAcademyForm.district ||
      editAcademyForm.contactNumber.length !== 10 ||
      !editSports.length
    ) {
      alert(
        "Please fill compulsory fields: academy name, state, district, 10-digit contact, and sports conducted."
      );
      return;
    }

    await updateDoc(doc(db, "academies", editAcademyId), {
      academyName: editAcademyForm.academyName,
      academySlug: slugify(editAcademyForm.academyName),
      state: editAcademyForm.state,
      district: editAcademyForm.district,
      city: editAcademyForm.city,
      academyDescription: editAcademyForm.academyDescription,
      contactNumber: editAcademyForm.contactNumber,
      officialEmail: editAcademyForm.officialEmail,
      sportsConducted: editSports,
      featuredAcademyImageUrl: editAcademyForm.featuredAcademyImageUrl || "",
      updatedAt: new Date(),
    });

    alert("Live academy updated.");
    await loadAcademies();
  };

  const deleteAcademy = async (academyId: string, academyName = "") => {
    const confirmed = window.confirm(
      `Delete ${academyName || "this academy"} from the database? This removes it from admin and public academy lists.`
    );

    if (!confirmed) return;

    await deleteDoc(doc(db, "academies", academyId));

    if (editAcademyId === academyId) {
      setEditAcademyId("");
    }

    await loadAcademies();
    alert("Academy deleted.");
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

  const getStudentSports = (student: any) =>
    Array.isArray(student.sports)
      ? student.sports
      : student.sports
      ? [student.sports]
      : [];

const toggleStudentSport = (
    index: number,
    sport: string,
    checked: boolean
  ) => {
    const currentSports = getStudentSports(students[index]);
    updateStudent(
      index,
      "sports",
      checked
        ? Array.from(new Set([...currentSports, sport]))
        : currentSports.filter((item: string) => item !== sport)
    );
  };

  const getAdminMemberId = (
    existingId: string,
    type: "OC" | "ST",
    index: number,
    academySeed: string
  ) => {
    if (existingId) return existingId;

    return `EGF-${getStateCode(stateName)}-${type}-${academySeed}${String(
      index + 1
    ).padStart(2, "0")}`;
  };

  const createAdminAcademy = async () => {
    if (
      !academyName ||
      !stateName ||
      !district ||
      pincode.length !== 6 ||
      contactNumber.length !== 10 ||
      !sportsConducted.length ||
      !owners.some((owner) => owner.fullName) ||
      !students.some((student) => student.name)
    ) {
      alert(
        "Please fill compulsory fields: academy name, state, district, 6-digit pincode, 10-digit contact, sports conducted, at least one owner/coach, and at least one student."
      );
      return;
    }

    if (!officialEmail) {
      alert("Official email is required for academy login.");
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
      const memberSeed = randomId.slice(0, 5);
      const ownersWithIds = owners.map((owner, index) => ({
        ...owner,
        memberId: getAdminMemberId(
          owner.memberId || "",
          "OC",
          index,
          memberSeed
        ),
      }));
      const studentsWithIds = students.map((student, index) => ({
        ...student,
        memberId: getAdminMemberId(
          student.memberId || "",
          "ST",
          index,
          memberSeed
        ),
      }));

      affiliationEndDate.setFullYear(
        today.getFullYear() + Number(selectedYears)
      );
      studentFeeEndDate.setFullYear(today.getFullYear() + 1);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        officialEmail,
        academyDefaultPassword
      );

      await setDoc(doc(db, "academies", userCredential.user.uid), {
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
        mediaCoverageProofName,
        declarationAccepted,
        academyLogoUrl,
        logoURL: academyLogoUrl,
        academyImageUrls,
        featuredAcademyImageUrl:
          featuredAcademyImageUrl || academyImageUrls[0] || "",
        sportsConducted,
        owners: ownersWithIds,
        students: studentsWithIds,
        studentsCount: students.length,
        paidStudentsCount: students.length,
        selectedYears: Number(selectedYears),
        affiliationNumber,
        certificateVerificationId: affiliationNumber
          .replace(/[^a-z0-9]+/gi, "-")
          .replace(/^-+|-+$/g, "")
          .toUpperCase(),
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
        email: officialEmail,
        adminCreatedLoginEmail: officialEmail,
        adminCreatedDefaultPassword: academyDefaultPassword,
        createdAt: new Date(),
      });

      alert(
        `Academy added with ELITENETWORK. Login email: ${officialEmail}, password: ${academyDefaultPassword}`
      );

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
      setMediaCoverageProofName("");
      setDeclarationAccepted(false);
      setAcademyLogoUrl("");
      setAcademyImageUrls([]);
      setFeaturedAcademyImageUrl("");
      setSelectedYears(1);
      setSportsConducted([]);
      setCustomSport("");
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
                ["Total Academies", academies.length],
                ["Active Academies", activeAcademies.length],
                ["Payment Pending", unpaidAcademies.length],
                ["Active Students", totalActiveStudents],
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

            <div className="mt-10 grid md:grid-cols-4 gap-4">
              {[
                ["create", "Create New Academy"],
                ["edit", "Edit Live Academy"],
                ["sports", "Add Sports"],
                ["requests", `Sport Requests (${sportRequests.length})`],
              ].map(([tool, label]) => (
                <button
                  key={tool}
                  type="button"
                  onClick={() => setActiveAdminTool(tool)}
                  className={`rounded-2xl px-5 py-4 font-black transition ${
                    activeAdminTool === tool
                      ? "bg-orange-500 text-black"
                      : "bg-zinc-900 border border-white/10 text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {activeAdminTool === "requests" && (
              <div className="mt-10 bg-zinc-900 border border-white/10 rounded-3xl p-8">
                <h2 className="text-3xl font-black">
                  Academy Sport Requests
                </h2>

                <div className="mt-6 space-y-4">
                  {sportRequests.length ? (
                    sportRequests.map((academy) => (
                      <div
                        key={academy.id}
                        className="bg-black border border-zinc-700 rounded-2xl p-5"
                      >
                        <p className="text-orange-500 uppercase tracking-[0.2em] text-xs font-bold">
                          Requested Sport
                        </p>
                        <p className="mt-2 text-2xl font-black">
                          {academy.desiredSport}
                        </p>
                        <p className="mt-2 text-zinc-300">
                          {academy.academyName || "Unnamed Academy"} -{" "}
                          {[academy.state, academy.district]
                            .filter(Boolean)
                            .join(", ")}
                        </p>
                        <label className="mt-5 flex items-center gap-3 text-zinc-300">
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              if (e.target.checked) {
                                resolveSportRequest(academy.id);
                              }
                            }}
                          />
                          Request has been handled
                        </label>
                      </div>
                    ))
                  ) : (
                    <p className="text-zinc-400">
                      No pending sport requests.
                    </p>
                  )}
                </div>
              </div>
            )}

            {activeAdminTool === "sports" && (
              <div className="mt-10 bg-zinc-900 border border-white/10 rounded-3xl p-8">
                <h2 className="text-3xl font-black">
                  Add Sports
                </h2>
                <p className="mt-2 text-zinc-400">
                  Added sports become available in academy forms and
                  dashboards.
                </p>

                <div className="mt-6 grid md:grid-cols-[1fr_auto] gap-4">
                  <input
                    value={newMasterSport}
                    onChange={(e) => setNewMasterSport(e.target.value)}
                    placeholder="Sport name"
                    className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
                  />
                  <button
                    type="button"
                    onClick={handleAddMasterSport}
                    className="bg-orange-500 text-black rounded-2xl px-6 py-4 font-black"
                  >
                    Add Sport Live
                  </button>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {masterSports.map((sport) => (
                    <span
                      key={sport}
                      className="bg-black border border-zinc-700 rounded-full px-4 py-2 text-sm"
                    >
                      {sport}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeAdminTool === "edit" && (
              <div className="mt-10 bg-zinc-900 border border-white/10 rounded-3xl p-8">
                <h2 className="text-3xl font-black">
                  Edit Existing Live Academy
                </h2>

                <select
                  value={editAcademyId}
                  onChange={(e) => loadEditAcademy(e.target.value)}
                  className="mt-6 w-full bg-black border border-zinc-700 rounded-2xl px-5 py-4"
                >
                  <option value="">Select live academy</option>
                  {liveAcademies.map((academy) => (
                    <option key={academy.id} value={academy.id}>
                      {academy.academyName} - {academy.state}
                    </option>
                  ))}
                </select>

                {editAcademyId && (
                  <div className="mt-6 grid md:grid-cols-2 gap-5">
                    <input
                      value={editAcademyForm.academyName || ""}
                      onChange={(e) =>
                        setEditAcademyForm({
                          ...editAcademyForm,
                          academyName: e.target.value,
                        })
                      }
                      placeholder="Academy Name"
                      className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
                    />
                    <select
                      value={editAcademyForm.state || ""}
                      onChange={(e) =>
                        setEditAcademyForm({
                          ...editAcademyForm,
                          state: e.target.value,
                          district: "",
                        })
                      }
                      className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
                    >
                      <option value="">Select State</option>
                      {indiaStates.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                    <select
                      value={editAcademyForm.district || ""}
                      onChange={(e) =>
                        setEditAcademyForm({
                          ...editAcademyForm,
                          district: e.target.value,
                        })
                      }
                      className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
                    >
                      <option value="">Select District</option>
                      {editDistrictOptions.map((districtOption) => (
                        <option
                          key={districtOption}
                          value={districtOption}
                        >
                          {districtOption}
                        </option>
                      ))}
                    </select>
                    <input
                      value={editAcademyForm.city || ""}
                      onChange={(e) =>
                        setEditAcademyForm({
                          ...editAcademyForm,
                          city: e.target.value,
                        })
                      }
                      placeholder="City"
                      className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
                    />
                    <input
                      value={editAcademyForm.contactNumber || ""}
                      onChange={(e) =>
                        setEditAcademyForm({
                          ...editAcademyForm,
                          contactNumber: e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 10),
                        })
                      }
                      placeholder="Contact Number"
                      className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
                    />
                    <input
                      value={editAcademyForm.officialEmail || ""}
                      onChange={(e) =>
                        setEditAcademyForm({
                          ...editAcademyForm,
                          officialEmail: e.target.value,
                        })
                      }
                      placeholder="Official Email"
                      className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
                    />
                    <input
                      value={editAcademyForm.sportsConducted || ""}
                      onChange={(e) =>
                        setEditAcademyForm({
                          ...editAcademyForm,
                          sportsConducted: e.target.value,
                        })
                      }
                      placeholder="Sports Conducted, comma separated"
                      className="md:col-span-2 bg-black border border-zinc-700 rounded-2xl px-5 py-4"
                    />
                    <textarea
                      value={editAcademyForm.academyDescription || ""}
                      onChange={(e) =>
                        setEditAcademyForm({
                          ...editAcademyForm,
                          academyDescription: e.target.value,
                        })
                      }
                      placeholder="Academy Description"
                      className="md:col-span-2 bg-black border border-zinc-700 rounded-2xl px-5 py-4 min-h-36"
                    />
                    {Array.isArray(editAcademyForm.academyImageUrls) &&
                      editAcademyForm.academyImageUrls.length > 0 && (
                        <div className="md:col-span-2 bg-black border border-zinc-700 rounded-2xl p-5">
                          <h3 className="text-xl font-black">
                            Highlight / Banner Photo
                          </h3>
                          <p className="mt-1 text-zinc-400 text-sm">
                            Select the academy photo used as the main banner.
                          </p>
                          <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4">
                            {editAcademyForm.academyImageUrls.map(
                              (imageUrl: string, index: number) => (
                                <label
                                  key={`${imageUrl}-${index}`}
                                  className={`block rounded-2xl border p-2 cursor-pointer ${
                                    editAcademyForm.featuredAcademyImageUrl ===
                                    imageUrl
                                      ? "border-orange-500 bg-orange-500/10"
                                      : "border-zinc-700 bg-zinc-950"
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name="editFeaturedAcademyImage"
                                    checked={
                                      editAcademyForm.featuredAcademyImageUrl ===
                                      imageUrl
                                    }
                                    onChange={() =>
                                      setEditAcademyForm({
                                        ...editAcademyForm,
                                        featuredAcademyImageUrl: imageUrl,
                                      })
                                    }
                                    className="mb-2"
                                  />
                                  <img
                                    src={imageUrl}
                                    alt={`Banner option ${index + 1}`}
                                    className="w-full aspect-video object-cover rounded-xl"
                                  />
                                </label>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    <button
                      type="button"
                      onClick={saveEditAcademy}
                      className="bg-orange-500 text-black rounded-2xl px-6 py-4 font-black"
                    >
                      Save Live Academy Changes
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        deleteAcademy(
                          editAcademyId,
                          editAcademyForm.academyName
                        )
                      }
                      className="bg-red-500 text-white rounded-2xl px-6 py-4 font-black"
                    >
                      Delete This Academy
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="mt-10 grid gap-8">
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
                          <button
                            type="button"
                            onClick={() =>
                              deleteAcademy(
                                academy.id,
                                academy.academyName
                              )
                            }
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-xl font-bold"
                          >
                            Delete Academy
                          </button>
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
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <h2 className="text-3xl font-black">
                    Contact Messages
                  </h2>
                  <button
                    type="button"
                    onClick={loadContactMessages}
                    className="bg-black border border-zinc-700 rounded-2xl px-5 py-3 font-bold"
                  >
                    Refresh
                  </button>
                </div>

                <div className="mt-6 space-y-4">
                  {contactMessages.length ? (
                    contactMessages.map((message) => (
                      <div
                        key={message.id}
                        className="bg-black border border-zinc-700 rounded-2xl p-5"
                      >
                        <p className="text-xl font-black">
                          {message.subject || "No subject"}
                        </p>
                        <p className="mt-2 text-zinc-300">
                          {message.name || "Unknown"}{" "}
                          {message.email ? (
                            <>
                              -{" "}
                              <a
                                href={`mailto:${message.email}`}
                                className="text-orange-500"
                              >
                                {message.email}
                              </a>
                            </>
                          ) : null}
                        </p>
                        <p className="mt-3 text-zinc-400 whitespace-pre-line">
                          {message.message}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-zinc-400">
                      No contact messages yet.
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8">
                <h2 className="text-3xl font-black">
                  Admin Notes
                </h2>

                <p className="mt-6 text-zinc-400">
                  Sports can now be added directly while creating an
                  academy profile.
                </p>
              </div>
            </div>

            {activeAdminTool === "create" && (
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
                <select
                  value={stateName}
                  onChange={(e) => {
                    setStateName(e.target.value);
                    setDistrict("");
                  }}
                  className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
                >
                  <option value="">Select State</option>
                  {indiaStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
                >
                  <option value="">Select District</option>
                  {adminDistrictOptions.map((districtOption) => (
                    <option key={districtOption} value={districtOption}>
                      {districtOption}
                    </option>
                  ))}
                </select>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
                />
                <input
                  value={pincode}
                  maxLength={6}
                  onChange={(e) =>
                    setPincode(
                      e.target.value.replace(/\D/g, "").slice(0, 6)
                    )
                  }
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
                <div className="md:col-span-2 bg-black border border-zinc-700 rounded-2xl p-5">
                  <h3 className="text-xl font-black">
                    Sports Conducted
                  </h3>
                  <p className="mt-1 text-zinc-400 text-sm">
                    Select from the master list or add a new sport.
                  </p>

                  <div className="mt-5 grid md:grid-cols-[1fr_auto] gap-4">
                    <select
                      value=""
                      onChange={(e) =>
                        addSportToAcademy(e.target.value)
                      }
                      className="bg-zinc-950 border border-zinc-700 rounded-2xl px-5 py-4"
                    >
                      <option value="">Select Sport</option>
                      {masterSports
                        .filter(
                          (sport) => !sportsConducted.includes(sport)
                        )
                        .map((sport) => (
                          <option key={sport} value={sport}>
                            {sport}
                          </option>
                        ))}
                    </select>

                    <button
                      type="button"
                      onClick={() => addSportToAcademy(customSport)}
                      className="bg-orange-500 text-black rounded-2xl px-6 py-4 font-bold"
                    >
                      + Add Sport
                    </button>
                  </div>

                  <input
                    value={customSport}
                    onChange={(e) => setCustomSport(e.target.value)}
                    placeholder="Type new sport and click Add Sport"
                    className="mt-4 w-full bg-zinc-950 border border-zinc-700 rounded-2xl px-5 py-4"
                  />

                  {sportsConducted.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-3">
                      {sportsConducted.map((sport) => (
                        <button
                          type="button"
                          key={sport}
                          onClick={() => removeSportFromAcademy(sport)}
                          className="bg-orange-500/10 border border-orange-500/30 text-orange-500 rounded-full px-4 py-2 font-bold"
                        >
                          {sport} x
                        </button>
                      ))}
                    </div>
                  )}
                </div>
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
                          <label className="mt-2 flex items-center gap-2 text-sm text-zinc-300">
                            <input
                              type="radio"
                              name="adminFeaturedAcademyImage"
                              checked={
                                featuredAcademyImageUrl === imageUrl ||
                                (!featuredAcademyImageUrl && index === 0)
                              }
                              onChange={() =>
                                setFeaturedAcademyImageUrl(imageUrl)
                              }
                            />
                            Banner photo
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              const updatedImages =
                                academyImageUrls.filter(
                                  (_image, photoIndex) =>
                                    photoIndex !== index
                                );
                              setAcademyImageUrls(updatedImages);
                              if (featuredAcademyImageUrl === imageUrl) {
                                setFeaturedAcademyImageUrl(
                                  updatedImages[0] || ""
                                );
                              }
                            }}
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
                          <select
                            value={owner.bloodGroup || ""}
                            onChange={(e) =>
                              updateOwner(
                                index,
                                "bloodGroup",
                                e.target.value
                              )
                            }
                            className="bg-zinc-950 border border-zinc-700 rounded-2xl px-5 py-4"
                          >
                            <option value="">Blood Group</option>
                            {bloodGroupOptions.map((bloodGroup) => (
                              <option key={bloodGroup} value={bloodGroup}>
                                {bloodGroup}
                              </option>
                            ))}
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
                          <select
                            value={student.bloodGroup || ""}
                            onChange={(e) =>
                              updateStudent(
                                index,
                                "bloodGroup",
                                e.target.value
                              )
                            }
                            className="bg-zinc-950 border border-zinc-700 rounded-2xl px-5 py-4"
                          >
                            <option value="">Blood Group</option>
                            {bloodGroupOptions.map((bloodGroup) => (
                              <option key={bloodGroup} value={bloodGroup}>
                                {bloodGroup}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="bg-zinc-950 border border-zinc-700 rounded-2xl p-5">
                          <p className="font-bold">
                            Sports Learned
                          </p>
                          <div className="mt-4 grid sm:grid-cols-2 gap-3">
                            {sportsConducted.length ? (
                              sportsConducted.map((sport) => (
                                <label
                                  key={sport}
                                  className="flex items-center gap-3"
                                >
                                  <input
                                    type="checkbox"
                                    checked={getStudentSports(student).includes(
                                      sport
                                    )}
                                    onChange={(e) =>
                                      toggleStudentSport(
                                        index,
                                        sport,
                                        e.target.checked
                                      )
                                    }
                                  />
                                  <span>{sport}</span>
                                </label>
                              ))
                            ) : (
                              <p className="text-zinc-400 text-sm">
                                Select academy sports first.
                              </p>
                            )}
                          </div>
                        </div>
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
                          placeholder={"Achievements\n1. State Champion\n2. Gold Medalist 2023"}
                          className="bg-zinc-950 border border-zinc-700 rounded-2xl px-5 py-4 min-h-28"
                        />
                        <div>
                          <label className="inline-flex bg-white text-black px-5 py-3 rounded-2xl font-bold cursor-pointer">
                            Upload Student Photo
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                handleAdminStudentPhotoUpload(
                                  index,
                                  e.target.files?.[0]
                                )
                              }
                              className="hidden"
                            />
                          </label>

                          {student.photoUrl && (
                            <div className="mt-4 flex items-center gap-4">
                              <img
                                src={student.photoUrl}
                                alt={`${student.name || "Student"} photo`}
                                className="w-28 h-32 object-cover rounded-2xl border border-white/10"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  updateStudent(index, "photoUrl", "")
                                }
                                className="bg-red-500 px-4 py-2 rounded-xl font-bold"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
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
            )}
          </>
        )}
      </section>

      <Footer />
    </main>
  );
}
