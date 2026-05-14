"use client";

import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import { auth, db, storage } from "@/app/lib/firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import {
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function AcademyAffiliationPage() {

  // =========================
  // AUTH STATES
  // =========================

  const [loading, setLoading] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const [academyName, setAcademyName] = useState("");
  const [stateName, setStateName] = useState("");
  const [district, setDistrict] = useState("");
  const [pincode, setPincode] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  // =========================
  // DASHBOARD STATES
  // =========================

  const [userData, setUserData] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const [isFirstTime, setIsFirstTime] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // =========================
  // FORM STATES
  // =========================

  const [academyDescription, setAcademyDescription] = useState("");
  const [studentsCount, setStudentsCount] = useState(1);
  const [selectedYears, setSelectedYears] = useState(1);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [couponMessage, setCouponMessage] = useState("");

  const [establishmentYear, setEstablishmentYear] = useState("");
const [fullAddress, setFullAddress] = useState("");
const [city, setCity] = useState("");
const [districtName, setDistrictName] = useState("");
const [contactNumber, setContactNumber] = useState("");
const [officialEmail, setOfficialEmail] = useState("");
const [websiteLink, setWebsiteLink] = useState("");
const [instagramLink, setInstagramLink] = useState("");
const [facebookLink, setFacebookLink] = useState("");
const [sportsConducted, setSportsConducted] = useState<string[]>([]);
const [adminSports, setAdminSports] = useState<string[]>([]);
const [desiredSport, setDesiredSport] = useState("");
const [hasOtherBranch, setHasOtherBranch] = useState("");
const [googleLocation, setGoogleLocation] = useState("");
const [mediaCoverageProof, setMediaCoverageProof] = useState<any>(null);
const [mediaCoverageProofName, setMediaCoverageProofName] = useState("");
const [declarationAccepted, setDeclarationAccepted] = useState(false);
const [academyLogo, setAcademyLogo] = useState<any>(null);
const [showSports, setShowSports] = useState(false);
const [sportsSearch, setSportsSearch] = useState("");
const [logoPreview, setLogoPreview] = useState("");
const [academyImages, setAcademyImages] = useState<any[]>([]);

const [owners, setOwners] = useState([
  {
    fullName: "",
    role: "Owner",
    sex: "",
    designation: "",
    mobile: "",
    email: "",
    photo: null,
    photoPreview: "",
    idProof: null,
    idProofPreview: "",
  },
]);
const [coaches, setCoaches] = useState<any[]>([]);
const [students, setStudents] = useState<any[]>([
  {
    name: "",
    age: "",
    school: "",
    achievement: "",
    sex: "",
    sports: "",
    photo: null,
    photoPreview: "",
    isEliteAthlete: false,
    isParaAthlete: false,
  },
]);

  // =========================
  // FEES
  // =========================

  const yearlyStudentFee = 99;

  const affiliationFees: any = {
    1: 999,
    2: 1799,
    3: 2499,
  };

  const academyCouponCodes = [
    "ELITE100-01",
    "ELITE100-02",
    "ELITE100-03",
    "ELITE100-04",
    "ELITE100-05",
  ];

  const affiliationAmount =
    affiliationFees[selectedYears];

  const parseSavedDate = (value: Date | string | null | undefined) => {
    if (!value) return null;

    const date = value instanceof Date ? value : new Date(value);

    return Number.isNaN(date.getTime()) ? null : date;
  };

  const addOneYear = (value: Date | null) => {
    if (!value) return null;

    const date = new Date(value);
    date.setFullYear(date.getFullYear() + 1);
    return date;
  };

  const todayForRenewal = new Date();
  const isPaidAcademy = Boolean(userData?.paymentDone);
  const paidStudentsCount = isPaidAcademy
    ? Number(
        userData?.paidStudentsCount ??
          userData?.studentsCount ??
          0
      )
    : 0;
  const additionalStudentsCount = isPaidAcademy
    ? Math.max(students.length - paidStudentsCount, 0)
    : 0;
  const studentFeeStartDate = parseSavedDate(
    userData?.studentFeeStartDate ||
      userData?.affiliationStartDate
  );
  const studentFeeEndDate =
    parseSavedDate(userData?.studentFeeEndDate) ||
    addOneYear(studentFeeStartDate);
  const studentRenewalDue = Boolean(
    isPaidAcademy &&
      studentFeeEndDate &&
      studentFeeEndDate < todayForRenewal
  );
  const renewalStudentsCount = studentRenewalDue
    ? Math.min(paidStudentsCount, students.length)
    : 0;
  const payableStudentsCount = isPaidAcademy
    ? additionalStudentsCount + renewalStudentsCount
    : students.length;
  const payableAffiliationAmount = isPaidAcademy
    ? 0
    : affiliationAmount;

  const studentsAmount =
    payableStudentsCount * yearlyStudentFee;

  const totalAmount =
    payableAffiliationAmount + studentsAmount;

  const couponDiscountAmount =
    appliedCoupon ? totalAmount : 0;

  const payableAmount =
    Math.max(totalAmount - couponDiscountAmount, 0);

  // =========================
  // LOAD USER
  // =========================

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {

        if (!user) {
          return;
        }

        setCurrentUser(user);

        const docRef = doc(
          db,
          "academies",
          user.uid
        );

        const snap = await getDoc(docRef);

        if (snap.exists()) {

          const data = snap.data();

          setUserData(data);

          // USER HAS COMPLETED PROFILE
          if (data.profileCompleted) {

            setShowDashboard(true);

          } else {

            setIsFirstTime(true);
          }

          // PREFILL
          setAcademyName(data.academyName || "");
          setStateName(data.state || "");
          setDistrict(data.district || "");
          setPincode(data.pincode || "");
          setAcademyDescription(
            data.academyDescription || ""
          );

          setStudentsCount(
            data.studentsCount || 1
          );

          setSelectedYears(
            data.selectedYears || 1
          );

          setEstablishmentYear(
  data.establishmentYear || ""
);

setFullAddress(
  data.fullAddress || ""
);

setCity(
  data.city || ""
);

setContactNumber(
  data.contactNumber || ""
);

setOfficialEmail(
  data.officialEmail || ""
);

setWebsiteLink(
  data.websiteLink || ""
);

setInstagramLink(
  data.instagramLink || ""
);

setFacebookLink(
  data.facebookLink || ""
);

setSportsConducted(
  Array.isArray(data.sportsConducted)
    ? data.sportsConducted
    : []
);

setDesiredSport(
  data.desiredSport || ""
);

setGoogleLocation(
  data.googleLocation || ""
);

setMediaCoverageProofName(
  data.mediaCoverageProofName || ""
);

setLogoPreview(
  data.academyLogoUrl || ""
);

setAcademyImages(
  Array.isArray(data.academyImageUrls)
    ? data.academyImageUrls
    : []
);

setDeclarationAccepted(
  data.declarationAccepted || false
);

setOwners(
  data.owners || [
    {
      fullName: "",
      role: "Owner",
      sex: "",
      designation: "",
      mobile: "",
      email: "",
      photo: null,
      photoPreview: "",
      idProof: null,
      idProofPreview: "",
    },
  ]
);

setStudents(
  data.students || [
    {
      name: "",
      age: "",
      school: "",
      achievement: "",
      sex: "",
      sports: "",
      photo: null,
      photoPreview: "",
      isEliteAthlete: false,
      isParaAthlete: false,
    },
  ]
);

        }
      }
    );

    return () => unsubscribe();

  }, []);

  // =========================
// SPORTS LIST
// =========================

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

const combinedSportsList = Array.from(
  new Set([...sportsList, ...adminSports])
).sort((a, b) => a.localeCompare(b));

const filteredSports = combinedSportsList.filter(
(sport) =>
sport.toLowerCase().includes(
sportsSearch.toLowerCase()
)
);

const selectedSports = Array.isArray(sportsConducted)
  ? sportsConducted
  : [];

useEffect(() => {
  const loadAdminSports = async () => {
    const sportsSnap = await getDoc(doc(db, "siteSettings", "sports"));
    const data = sportsSnap.exists() ? sportsSnap.data() : {};

    setAdminSports(
      Array.isArray(data.extraSports) ? data.extraSports : []
    );
  };

  loadAdminSports();
}, []);

const isBrowserFile = (value: any) =>
  typeof File !== "undefined" && value instanceof File;

const sanitizePeople = (items: any[]) =>
  items.map((item) => {
    const {
      photo,
      idProof,
      ...safeItem
    } = item;

    return {
      ...safeItem,
      photoName: isBrowserFile(photo)
        ? photo.name
        : item.photoName || "",
      idProofName: isBrowserFile(idProof)
        ? idProof.name
        : item.idProofName || "",
    };
  });

const sanitizeStudents = (items: any[]) =>
  items.map((item) => {
    const {
      photo,
      ...safeItem
    } = item;

    return {
      ...safeItem,
      photoName: isBrowserFile(photo)
        ? photo.name
        : item.photoName || "",
    };
  });

const academySlug = academyName
  .trim()
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");

const academyPayload = {
  academyName,
  academySlug,
  state: stateName,
  district,
  pincode,
  academyDescription,
  establishmentYear,
  fullAddress,
  city,
  contactNumber,
  officialEmail,
  websiteLink,
  instagramLink,
  facebookLink,
  sportsConducted: selectedSports,
  desiredSport,
  googleLocation,
  mediaCoverageProofName,
  declarationAccepted,
  owners: sanitizePeople(owners),
  coaches: sanitizePeople(coaches),
  students: sanitizeStudents(students),
  studentsCount: students.length,
  paidStudentsCount: isPaidAcademy
    ? paidStudentsCount
    : 0,
  selectedYears,
  totalAmount,
  payableAmount,
  couponCode: appliedCoupon,
  couponDiscountAmount,
  profileCompleted: true,
};

const dashboardSports = Array.isArray(userData?.sportsConducted)
  ? userData.sportsConducted
  : [];

const dashboardOwners = Array.isArray(userData?.owners)
  ? userData.owners
  : [];

const dashboardStudents = Array.isArray(userData?.students)
  ? userData.students
  : [];
const dashboardPaidStudentsCount = userData?.paymentDone
  ? Number(
      userData?.paidStudentsCount ??
        userData?.studentsCount ??
        dashboardStudents.length
    )
  : 0;
const dashboardLiveStudents = dashboardStudents.slice(
  0,
  dashboardPaidStudentsCount
);
const dashboardPendingStudentsCount = Math.max(
  dashboardStudents.length - dashboardLiveStudents.length,
  0
);
const dashboardAffiliationEndDate = parseSavedDate(
  userData?.affiliationEndDate
);
const dashboardAffiliationRenewalDue = Boolean(
  userData?.paymentDone &&
    dashboardAffiliationEndDate &&
    dashboardAffiliationEndDate < todayForRenewal
);
const dashboardStudentFeeStartDate = parseSavedDate(
  userData?.studentFeeStartDate ||
    userData?.affiliationStartDate
);
const dashboardStudentFeeEndDate =
  parseSavedDate(userData?.studentFeeEndDate) ||
  addOneYear(dashboardStudentFeeStartDate);
const dashboardStudentRenewalDue = Boolean(
  userData?.paymentDone &&
    dashboardStudentFeeEndDate &&
    dashboardStudentFeeEndDate < todayForRenewal &&
    dashboardLiveStudents.length
);
const dashboardStudentRenewalNames =
  dashboardLiveStudents
    .map((student: any, index: number) =>
      student.name || `Student ${index + 1}`
    )
    .join(", ");

const dashboardGallery =
  Array.isArray(userData?.academyImageUrls) &&
  userData.academyImageUrls.length
    ? userData.academyImageUrls
    : academyImages.map((image) =>
        typeof image === "string"
          ? image
          : URL.createObjectURL(image)
      );

const dashboardLogo =
  userData?.academyLogoUrl ||
  logoPreview ||
  "";

const stateCodes: any = {
  "Andhra Pradesh": "AP",
  "Arunachal Pradesh": "AR",
  Assam: "AS",
  Bihar: "BR",
  Chhattisgarh: "CG",
  Delhi: "DL",
  Goa: "GA",
  Gujarat: "GJ",
  Haryana: "HR",
  "Himachal Pradesh": "HP",
  Jharkhand: "JH",
  Karnataka: "KA",
  Kerala: "KL",
  "Madhya Pradesh": "MP",
  Maharashtra: "MH",
  Manipur: "MN",
  Meghalaya: "ML",
  Mizoram: "MZ",
  Nagaland: "NL",
  Odisha: "OD",
  Punjab: "PB",
  Rajasthan: "RJ",
  Sikkim: "SK",
  "Tamil Nadu": "TN",
  Telangana: "TS",
  Tripura: "TR",
  "Uttar Pradesh": "UP",
  Uttarakhand: "UK",
  "West Bengal": "WB",
};

const getStateCode = (value: string) =>
  stateCodes[value] ||
  value
    .trim()
    .slice(0, 2)
    .toUpperCase() ||
  "EG";

const getAffiliationNumber = () => {
  if (userData?.affiliationNumber) {
    return userData.affiliationNumber;
  }

  const year = new Date().getFullYear().toString().slice(-2);
  const uidSeed = (currentUser?.uid || "000001")
    .replace(/[^a-z0-9]/gi, "")
    .slice(-6)
    .toUpperCase()
    .padStart(6, "0");

  return `${getStateCode(stateName)}/${year}/${uidSeed}`;
};

const formatCertificateDate = (value: Date | string | null | undefined) => {
  if (!value) return "";

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  const month = date.toLocaleString("en-US", {
    month: "short",
  });

  return `${String(day).padStart(2, "0")}${suffix} ${month} ${date.getFullYear()}`;
};

const uploadAcademyFile = async (
  file: File,
  folder: string
) => {
  if (!currentUser) return "";

  const storageFolder =
    folder === "logo"
      ? "academy-logos"
      : "academy-banners";

  const storageRef = ref(
    storage,
    `${storageFolder}/${currentUser.uid}/${Date.now()}-${file.name}`
  );

  await uploadBytes(storageRef, file);

  return getDownloadURL(storageRef);
};

const buildAcademyPayload = async () => {
  const safeUploadAcademyFile = async (
    file: File,
    folder: string
  ) => {
    try {
      return await uploadAcademyFile(file, folder);
    } catch (error) {
      console.warn("Academy file upload skipped", error);
      return "";
    }
  };

  const uploadedLogoUrl = academyLogo
    ? await safeUploadAcademyFile(academyLogo, "logo")
    : "";
  const academyLogoUrl =
    uploadedLogoUrl || logoPreview || "";

  const uploadedImageUrls = await Promise.all(
    academyImages
      .filter((image) => isBrowserFile(image))
      .map((image) =>
        safeUploadAcademyFile(image as File, "photos")
      )
  );

  const existingImageUrls = academyImages.filter(
    (image) => typeof image === "string"
  );

  return {
    ...academyPayload,
    academyLogoUrl,
    academyImageUrls: [
      ...existingImageUrls,
      ...uploadedImageUrls.filter(Boolean),
    ],
  };
};

  // =========================
  // SIGNUP
  // =========================

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

      await setDoc(
        doc(db, "academies", user.uid),
        {
          academyName,
          state: stateName,
          district,
          pincode,
          email,

          academyDescription: "",

          establishmentYear: "",
fullAddress: "",
city: "",
contactNumber: "",
officialEmail: "",
websiteLink: "",
instagramLink: "",
facebookLink: "",
sportsConducted: [],
desiredSport: "",
googleLocation: "",
mediaCoverageProofName: "",
declarationAccepted: false,
owners,
coaches,
students,

          studentsCount: 1,
          selectedYears: 1,

          totalAmount: 1098,

          paymentDone: false,
          verified: false,

          profileCompleted: false,

          affiliationStartDate: null,
          affiliationEndDate: null,

          createdAt: new Date(),
        }
      );

      alert(
        "Account created successfully. Login now."
      );

    } catch (error: any) {

      alert(error.message);

    } finally {

      setLoading(false);
    }
  };

  // =========================
  // LOGIN
  // =========================

  const handleLogin = async () => {

    try {

      setLoading(true);

      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          loginEmail,
          loginPassword
        );

      const user = userCredential.user;

      const docRef = doc(
        db,
        "academies",
        user.uid
      );

      const snap = await getDoc(docRef);

      if (snap.exists()) {

        const data = snap.data();

        setUserData(data);

        if (data.profileCompleted) {

          setShowDashboard(true);

        } else {

          setIsFirstTime(true);
        }

        // PREFILL
        setAcademyName(data.academyName || "");
        setStateName(data.state || "");
        setDistrict(data.district || "");
        setPincode(data.pincode || "");
        setAcademyDescription(
          data.academyDescription || ""
        );

        setStudentsCount(
          data.studentsCount || 1
        );

        setSelectedYears(
          data.selectedYears || 1
        );

        setEstablishmentYear(
  data.establishmentYear || ""
);

setFullAddress(
  data.fullAddress || ""
);

setCity(
  data.city || ""
);

setContactNumber(
  data.contactNumber || ""
);

setOfficialEmail(
  data.officialEmail || ""
);

setWebsiteLink(
  data.websiteLink || ""
);

setInstagramLink(
  data.instagramLink || ""
);

setFacebookLink(
  data.facebookLink || ""
);

setSportsConducted(
  Array.isArray(data.sportsConducted)
    ? data.sportsConducted
    : []
);

setDesiredSport(
  data.desiredSport || ""
);

setGoogleLocation(
  data.googleLocation || ""
);

setMediaCoverageProofName(
  data.mediaCoverageProofName || ""
);

setLogoPreview(
  data.academyLogoUrl || ""
);

setAcademyImages(
  Array.isArray(data.academyImageUrls)
    ? data.academyImageUrls
    : []
);

setDeclarationAccepted(
  data.declarationAccepted || false
);

setOwners(
  data.owners || [
    {
      fullName: "",
      role: "Owner",
      sex: "",
      designation: "",
      mobile: "",
      email: "",
      photo: null,
      photoPreview: "",
      idProof: null,
      idProofPreview: "",
    },
  ]
);

setCoaches(
  data.coaches || []
);

setStudents(
  data.students || [
    {
      name: "",
      age: "",
      school: "",
      achievement: "",
      sex: "",
      sports: "",
      photo: null,
      photoPreview: "",
      isEliteAthlete: false,
      isParaAthlete: false,
    },
  ]
);
      }

    } catch (error: any) {

      alert(error.message);

    } finally {

      setLoading(false);
    }
  };

  const handleResetPassword = async () => {

    if (!loginEmail) {
      alert("Please enter your academy login email first.");
      return;
    }

    try {

      setLoading(true);

      await sendPasswordResetEmail(auth, loginEmail);

      alert("Password reset link sent to your email.");

    } catch (error: any) {

      alert(error.message);

    } finally {

      setLoading(false);
    }
  };

  // =========================
  // SAVE FORM
  // =========================


const addOwner = () => {

  setOwners([
    ...owners,
    {
      fullName: "",
      role: "Owner",
      sex: "",
      designation: "",
      mobile: "",
      email: "",
      photo: null,
      photoPreview: "",
      idProof: null,
      idProofPreview: "",
    },
  ]);
};



const removeOwner = (index: number) => {

  setOwners(
    owners.filter((_, i) => i !== index)
  );
};

const addCoach = () => {

  setCoaches([
    ...coaches,
    {
      fullName: "",
      designation: "",
      mobile: "",
      email: "",
      photo: null,
      photoPreview: "",
      idProof: null,
      idProofPreview: "",
      useOwnerData: false,
    },
  ]);

};

const removeCoach = (index: number) => {

  const updated = [...coaches];

  updated.splice(index, 1);

  setCoaches(updated);

};

const addStudent = () => {

  setStudents([
    ...students,
    {
      name: "",
      age: "",
      school: "",
      achievement: "",
      sex: "",
      sports: "",
      photo: null,
      photoPreview: "",
      isEliteAthlete: false,
      isParaAthlete: false,
    },
  ]);
};

const removeStudent = (index: number) => {

  setStudents(
    students.filter((_, i) => i !== index)
  );
};

const handleStudentChange = (
  index: number,
  field: string,
  value: any
) => {

  const updated = [...students];

  updated[index][field] = value;

  setStudents(updated);
};

const handleStudentPhoto = (
  e: any,
  index: number
) => {

  const file = e.target.files[0];

  if (!file) return;

  if (file.size > 2 * 1024 * 1024) {
    alert("Passport photo must be below 2MB");
    return;
  }

  const updated = [...students];

  updated[index].photo = file;
  updated[index].photoPreview =
    URL.createObjectURL(file);

  setStudents(updated);
};

const toggleEliteAthlete = (
  index: number,
  checked: boolean
) => {

  const eliteCount = students.filter(
    (student, studentIndex) =>
      student.isEliteAthlete && studentIndex !== index
  ).length;

  if (checked && eliteCount >= 2) {
    alert("Only two students can be marked as Elite Athlete");
    return;
  }

  handleStudentChange(index, "isEliteAthlete", checked);
};


const handleOwnerChange = (
  index: number,
  field: string,
  value: any
) => {

  const updatedOwners = [...owners];

  (updatedOwners[index] as any)[field] = value;

  setOwners(updatedOwners);
};

const handleOwnerPhoto = (
  e: any,
  index: number
) => {

  const file = e.target.files[0];

  if (!file) return;

  if (file.size > 2 * 1024 * 1024) {
    alert("Passport photo must be below 2MB");
    return;
  }

  const updatedOwners = [...owners];

  updatedOwners[index].photo = file;

  updatedOwners[index].photoPreview =
    URL.createObjectURL(file);

  setOwners(updatedOwners);
};

const handleOwnerIdProof = (
  e: any,
  index: number
) => {

  const file = e.target.files[0];

  if (!file) return;

  const updatedOwners = [...owners];

  updatedOwners[index].idProof = file;

  if (file.type !== "application/pdf") {

    updatedOwners[index].idProofPreview =
      URL.createObjectURL(file);

  }

  setOwners(updatedOwners);
};



const handleCoachChange = (
  index: number,
  field: string,
  value: any
) => {

  const updated = [...coaches];

  (updated[index] as any)[field] = value;

  setCoaches(updated);
};

const copyOwnerToCoach = (
  coachIndex: number,
  ownerIndex: number
) => {

  const updated = [...coaches];

  updated[coachIndex] = {
    ...updated[coachIndex],

    fullName: owners[ownerIndex].fullName,
    designation: owners[ownerIndex].designation,
    mobile: owners[ownerIndex].mobile,
    email: owners[ownerIndex].email,

    sameAsOwner: true,
  };

  setCoaches(updated);
};


  const handleSaveDashboard = async () => {

    if (!currentUser) return;

    if (!userData?.profileCompleted && academyImages.length < 3) {
  alert("Please upload minimum 3 academy photos");
  return;
}

    try {

      setLoading(true);

      const payload = await buildAcademyPayload();

      await updateDoc(
  doc(db, "academies", currentUser.uid),
  payload
);

      alert("Saved. Opening your academy dashboard.");

      const snap = await getDoc(
        doc(db, "academies", currentUser.uid)
      );

      setUserData(snap.data());

      setShowDashboard(true);

      setIsFirstTime(false);

    } catch (error: any) {

      alert(error.message);

    } finally {

      setLoading(false);
    }
  };

  const handleLogoUpload = (e: any) => {

  const file = e.target.files[0];

  if (!file) return;

  setAcademyLogo(file);

  setLogoPreview(
    URL.createObjectURL(file)
  );
};

const handleAcademyPhotos = (e: any) => {

  const files = Array.from(
    e.target.files
  );

  if (files.length > 5) {

    alert("Maximum 5 photos allowed");
    return;
  }

  setAcademyImages(files);
};

const handleMediaCoverageProof = (e: any) => {

  const file = e.target.files[0];

  if (!file) return;

  setMediaCoverageProof(file);
  setMediaCoverageProofName(file.name);
};

const handleApplyCoupon = async () => {
  const normalizedCoupon = couponCode.trim().toUpperCase();

  if (!normalizedCoupon) {
    setCouponMessage("Enter a coupon code");
    return;
  }

  if (!academyCouponCodes.includes(normalizedCoupon)) {
    setAppliedCoupon("");
    setCouponMessage("Invalid coupon code");
    return;
  }

  const usedCouponSnap = await getDocs(
    query(
      collection(db, "academies"),
      where("couponCode", "==", normalizedCoupon)
    )
  );

  const usedByAnotherAcademy = usedCouponSnap.docs.some(
    (couponDoc) =>
      couponDoc.id !== currentUser?.uid &&
      couponDoc.data().paymentDone
  );

  if (usedByAnotherAcademy) {
    setAppliedCoupon("");
    setCouponMessage("This coupon code has already been used");
    return;
  }

  setAppliedCoupon(normalizedCoupon);
  setCouponCode(normalizedCoupon);
  setCouponMessage("100% discount applied");
};

const fitCanvasText = (
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  fontSize: number,
  fontFamily: string,
  color = "#1c3455",
  weight = "800",
  align: CanvasTextAlign = "left"
) => {
  let size = fontSize;

  do {
    context.font = `${weight} ${size}px ${fontFamily}`;
    size -= 2;
  } while (
    context.measureText(text).width > maxWidth &&
    size > 24
  );

  context.fillStyle = color;
  context.textAlign = align;
  context.fillText(text, x, y);
  context.textAlign = "left";
};

const handleDownloadCertificate = async () => {
  if (!userData?.paymentDone) {
    alert("Certificate is available after payment.");
    return;
  }

  const image = new Image();
  image.src = "/certificate-affiliation-template.png";

  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
  });

  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

  const context = canvas.getContext("2d");
  if (!context) return;

  context.drawImage(image, 0, 0);
  context.textBaseline = "alphabetic";

  const scale = canvas.width / 2000;
  const position = (value: number) => value * scale;
  const certificateAcademyName =
    userData?.academyName || academyName || "Academy";
  const certificateLocation =
    userData?.state ||
    stateName ||
    userData?.district ||
    district ||
    "India";

  const drawAcademyName = () => {
    const name = certificateAcademyName.toUpperCase();
    const centerX = position(1265);
    const maxWidth = position(1080);
    const maxFontSize = position(86);
    const minFontSize = position(42);
    const oneLineY = position(660);
    const twoLineFirstY = position(610);

    const wrapName = (fontSize: number) => {
      context.font = `900 ${fontSize}px Arial, sans-serif`;

      const words: string[] = name.split(/\s+/).filter(Boolean);
      const lines: string[] = [];
      let currentLine = "";

      words.forEach((word) => {
        const nextLine = currentLine
          ? `${currentLine} ${word}`
          : word;

        if (
          context.measureText(nextLine).width <= maxWidth ||
          !currentLine
        ) {
          currentLine = nextLine;
          return;
        }

        lines.push(currentLine);
        currentLine = word;
      });

      if (currentLine) {
        lines.push(currentLine);
      }

      if (
        lines.length > 2 ||
        lines.some(
          (line) => context.measureText(line).width > maxWidth
        )
      ) {
        return null;
      }

      return lines;
    };

    for (
      let fontSize = maxFontSize;
      fontSize >= minFontSize;
      fontSize -= 2
    ) {
      context.font = `900 ${fontSize}px Arial, sans-serif`;

      if (context.measureText(name).width <= maxWidth) {
        context.fillStyle = "#1c3455";
        context.textAlign = "center";
        context.fillText(name, centerX, oneLineY);
        context.textAlign = "left";
        return position(760);
      }

      const lines = wrapName(fontSize);

      if (lines) {
        const lineHeight = Math.max(
          position(70),
          fontSize * 0.92
        );

        context.fillStyle = "#1c3455";
        context.textAlign = "center";

        lines.forEach((line, index) => {
          context.fillText(
            line,
            centerX,
            twoLineFirstY + index * lineHeight
          );
        });

        context.textAlign = "left";
        return (
          twoLineFirstY +
          (lines.length - 1) * lineHeight +
          position(88)
        );
      }
    }

    fitCanvasText(
      context,
      name,
      centerX,
      oneLineY,
      maxWidth,
      minFontSize,
      "Arial, sans-serif",
      "#1c3455",
      "900",
      "center"
    );

    return position(760);
  };

  const stateY = drawAcademyName();

  fitCanvasText(
    context,
    certificateLocation,
    position(1265),
    stateY,
    position(700),
    position(56),
    "Arial, sans-serif",
    "#1c3455",
    "800",
    "center"
  );

  fitCanvasText(
    context,
    `From ${formatCertificateDate(userData?.affiliationStartDate)} To ${formatCertificateDate(userData?.affiliationEndDate)}`,
    position(1265),
    position(972),
    position(820),
    position(32),
    "Arial, sans-serif",
    "#2c2835",
    "700",
    "center"
  );

  fitCanvasText(
    context,
    getAffiliationNumber(),
    position(142),
    position(1184),
    position(430),
    position(42),
    "Arial, sans-serif",
    "#2c2835",
    "800"
  );

  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = `${academySlug || "academy"}-affiliation-certificate.png`;
  link.click();
};

const getStudentsWithRenewedFee = () => {
  const today = new Date();
  const endDate = new Date(today);

  endDate.setFullYear(today.getFullYear() + 1);

  const renewedStudents = students.map((student, index) => {
    const existingStudentFeeEndDate = parseSavedDate(
      student.studentFeeEndDate
    );
    const shouldRenewStudent =
      index >= paidStudentsCount ||
      !existingStudentFeeEndDate ||
      existingStudentFeeEndDate < today;

    if (!shouldRenewStudent) {
      return student;
    }

    return {
      ...student,
      studentFeeStartDate: today.toDateString(),
      studentFeeEndDate: endDate.toDateString(),
    };
  });

  return sanitizeStudents(renewedStudents);
};

const completeAffiliationWithCoupon = async () => {
  if (!currentUser || !appliedCoupon) return;

  if (!userData?.profileCompleted && academyImages.length < 3) {
    alert("Please upload minimum 3 academy photos");
    return;
  }

  try {
    setLoading(true);

    const today = new Date();
    const endDate = new Date();

    endDate.setFullYear(
      today.getFullYear() + selectedYears
    );

    const payload = await buildAcademyPayload();
    const affiliationNumber = getAffiliationNumber();
    const renewedStudents = getStudentsWithRenewedFee();
    const studentFeeEndDate = new Date(today);

    studentFeeEndDate.setFullYear(today.getFullYear() + 1);

    await updateDoc(
      doc(db, "academies", currentUser.uid),
      {
        ...payload,
        students: renewedStudents,
        paymentDone: true,
        paymentMode: "coupon",
        couponCode: appliedCoupon,
        couponDiscountAmount: totalAmount,
        payableAmount: 0,
        amountPaid: 0,
        affiliationNumber,
        affiliationStartDate: userData?.paymentDone
          ? userData?.affiliationStartDate
          : today.toDateString(),
        affiliationEndDate: userData?.paymentDone
          ? userData?.affiliationEndDate
          : endDate.toDateString(),
        studentFeeStartDate: today.toDateString(),
        studentFeeEndDate: studentFeeEndDate.toDateString(),
        paidStudentsCount: students.length,
        totalAmount,
      }
    );

    alert("Coupon applied. Affiliation activated.");

    const snap = await getDoc(
      doc(db, "academies", currentUser.uid)
    );

    setUserData(snap.data());
    setShowDashboard(true);
    setIsFirstTime(false);
  } catch (error: any) {
    alert(error.message);
  } finally {
    setLoading(false);
  }
};

  // =========================
  // RAZORPAY PAYMENT
  // =========================

  const handlePayment = async () => {

    if (!currentUser) return;

    if (appliedCoupon && payableAmount === 0) {
      await completeAffiliationWithCoupon();
      return;
    }

    if (payableAmount === 0) {
      await handleSaveDashboard();
      return;
    }

      if (!userData?.profileCompleted && academyImages.length < 3) {
    alert("Please upload minimum 3 academy photos");
    return;
  }

    const today = new Date();

    const endDate = new Date();

    endDate.setFullYear(
      today.getFullYear() + selectedYears
    );

    const payload = await buildAcademyPayload();
    const affiliationNumber = getAffiliationNumber();
    const renewedStudents = getStudentsWithRenewedFee();
    const studentFeeEndDate = new Date(today);

    studentFeeEndDate.setFullYear(today.getFullYear() + 1);

    console.log("RAZORPAY KEY:", process.env.NEXT_PUBLIC_RAZORPAY_KEY);
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,

      amount: payableAmount * 100,

      currency: "INR",

      name: "Elite Games Federation",

      description: "Academy Affiliation",

      handler: async function (response: any) {

        await updateDoc(
          doc(db, "academies", currentUser.uid),
          {
            ...payload,
            students: renewedStudents,
            paymentDone: true,

            razorpayPaymentId:
              response.razorpay_payment_id,

            affiliationStartDate:
              userData?.paymentDone
                ? userData?.affiliationStartDate
                : today.toDateString(),

            affiliationEndDate:
              userData?.paymentDone
                ? userData?.affiliationEndDate
                : endDate.toDateString(),

            affiliationNumber,
            paidStudentsCount: students.length,
            studentFeeStartDate: today.toDateString(),
            studentFeeEndDate: studentFeeEndDate.toDateString(),

            paymentMode: "razorpay",
            couponCode: appliedCoupon,
            couponDiscountAmount,
            payableAmount,
            amountPaid: payableAmount,

            totalAmount,
          }
        );

        alert("Payment Successful");

        const snap = await getDoc(
          doc(db, "academies", currentUser.uid)
        );

        setUserData(snap.data());

        setShowDashboard(true);

        setIsFirstTime(false);
      },

      prefill: {
        name: academyName,
        email: email || userData?.email,
      },

      theme: {
        color: "#ff6b00",
      },
    };
console.log("Razorpay Loaded:", window.Razorpay);
    
    const razor = new window.Razorpay(options);

    razor.open();
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = async () => {

    await signOut(auth);

    window.location.reload();
  };

  // =========================
  // DASHBOARD VIEW
  // =========================

  if (showDashboard) {

    return (

      <main className="min-h-screen bg-black text-white">

        <Navbar />

        <section className="pt-44 pb-24 max-w-7xl mx-auto px-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-orange-500 uppercase tracking-[0.4em]">
                Academy Dashboard
              </p>

              <h1 className="text-6xl font-black mt-4">
                {userData?.academyName}
              </h1>

            </div>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-2xl font-bold"
            >
              Logout
            </button>

          </div>

          {/* STATUS */}

          <div className="mt-10">

            {userData?.paymentDone ? (

              <div className="bg-green-500/10 border border-green-500 rounded-3xl p-8">

                <h2 className="text-3xl font-black text-green-400">
                  Affiliation Active
                </h2>

                <p className="mt-4 text-gray-300 text-lg">
                  This affiliation was done on{" "}
                  <span className="font-bold">
                    {
                      userData?.affiliationStartDate
                    }
                  </span>
                </p>

                <p className="mt-2 text-gray-300 text-lg">
                  Valid till{" "}
                  <span className="font-bold">
                    {
                      userData?.affiliationEndDate
                    }
                  </span>
                </p>

                <p className="mt-2 text-gray-300 text-lg">
                  Affiliation No.{" "}
                  <span className="font-bold">
                    {userData?.affiliationNumber}
                  </span>
                </p>

                <button
                  onClick={handleDownloadCertificate}
                  className="mt-6 bg-white text-black hover:bg-zinc-200 px-8 py-4 rounded-2xl font-bold"
                >
                  Download Affiliation Certificate
                </button>

                {(dashboardAffiliationRenewalDue ||
                  dashboardStudentRenewalDue) && (
                  <div className="mt-8 bg-orange-500/15 border border-orange-500 rounded-3xl p-6">
                    <h3 className="text-2xl font-black text-orange-400">
                      Renewal Required
                    </h3>

                    {dashboardAffiliationRenewalDue && (
                      <p className="mt-3 text-gray-200 text-lg">
                        Academy affiliation has expired. Please renew the academy affiliation to keep it active.
                      </p>
                    )}

                    {dashboardStudentRenewalDue && (
                      <p className="mt-3 text-gray-200 text-lg">
                        Student yearly fee is due for:{" "}
                        <span className="font-bold">
                          {dashboardStudentRenewalNames}
                        </span>
                        . Student fee is ₹99 per student per year.
                      </p>
                    )}
                  </div>
                )}

              </div>

            ) : (

              <div className="bg-red-500/10 border border-red-500 rounded-3xl p-8">

                <h2 className="text-3xl font-black text-red-400">
                  Payment Pending
                </h2>

                <p className="mt-4 text-gray-300">
                  Make payment to make your
                  academy live on the website
                  for public view.
                </p>

                <button
                  onClick={handlePayment}
                  className="mt-6 bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-2xl font-bold"
                >
                  Make Payment Now
                </button>

              </div>

            )}

          </div>

          {/* DETAILS */}

          <div className="mt-12 bg-zinc-900 border border-white/10 rounded-[35px] p-10">

            <div className="flex items-center justify-between">

              <h2 className="text-4xl font-black">
                Academy Profile
              </h2>

              <button
                onClick={() => {
                  setShowDashboard(false);
                  setIsFirstTime(true);
                  setEditMode(false);
                }}
                className="bg-orange-500 px-6 py-3 rounded-2xl font-bold"
              >
                Edit Full Profile
              </button>

            </div>

            <div className="mt-10 grid md:grid-cols-2 gap-6">

              {!editMode && (
                <>
                  <div className="md:col-span-2 overflow-hidden rounded-[35px] border border-white/10 bg-black">
                    <div className="relative h-72 bg-gradient-to-r from-zinc-950 via-orange-500/20 to-zinc-900">
                      {dashboardGallery[0] && (
                        <img
                          src={dashboardGallery[0]}
                          alt="Academy cover"
                          className="absolute inset-0 w-full h-full object-cover opacity-45"
                        />
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/10"></div>

                      <div className="relative z-10 h-full flex flex-col justify-end px-8 pb-8">
                        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                          <div className="flex flex-col sm:flex-row sm:items-end gap-6">
                          <div className="w-36 h-36 shrink-0 rounded-3xl border-4 border-black bg-zinc-900 overflow-hidden flex items-center justify-center shadow-2xl">
                            {dashboardLogo ? (
                              <img
                                src={dashboardLogo}
                                alt="Academy logo"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-5xl font-black text-orange-500">
                                {(userData?.academyName || "A").charAt(0)}
                              </span>
                            )}
                          </div>

                          <div>
                            <h3 className="text-5xl font-black drop-shadow-[0_3px_8px_rgba(0,0,0,0.9)]">
                              {userData?.academyName}
                            </h3>
                            <p className="mt-3 text-zinc-200 text-lg drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                              {[userData?.city, userData?.district, userData?.state]
                                .filter(Boolean)
                                .join(", ") || "Location not added"}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3 relative z-20">
                          <span className={`px-5 py-3 rounded-2xl font-bold ${
                            userData?.paymentDone
                              ? "bg-green-500 text-black"
                              : "bg-red-500 text-white"
                          }`}>
                            {userData?.paymentDone
                              ? "Affiliation Active"
                              : "Payment Pending"}
                          </span>

                          <span className="px-5 py-3 rounded-2xl font-bold bg-zinc-900 border border-white/10">
                            {dashboardLiveStudents.length} Students
                          </span>
                          {dashboardPendingStudentsCount > 0 && (
                            <span className="px-5 py-3 rounded-2xl font-bold bg-orange-500 text-black">
                              {dashboardPendingStudentsCount} Students Pending Payment
                            </span>
                          )}
                          <span className="px-5 py-3 rounded-2xl font-bold bg-zinc-900 border border-white/10">
                            {dashboardOwners.length} Owners / Coaches
                          </span>
                          {userData?.affiliationNumber && (
                            <span className="px-5 py-3 rounded-2xl font-bold bg-zinc-900 border border-white/10">
                              {userData.affiliationNumber}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>

                  <div className="md:col-span-2 grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
                    <div className="bg-black border border-zinc-700 rounded-3xl p-8">
                      <h3 className="text-3xl font-black">
                        About
                      </h3>
                      <p className="mt-4 text-zinc-300 leading-relaxed">
                        {userData?.academyDescription ||
                          "Academy description not added yet."}
                      </p>
                      <div className="mt-6 grid md:grid-cols-2 gap-4">
                        {[
                          ["Established", userData?.establishmentYear],
                          ["Full Address", userData?.fullAddress],
                          ["Google Location", userData?.googleLocation],
                          ["Public URL", userData?.paymentDone ? `kheloyouth.com/academy/${userData?.academySlug || academySlug}` : "Visible after payment"],
                        ].map(([label, value]) => (
                          <div
                            key={label}
                            className="bg-zinc-950 border border-white/10 rounded-2xl p-5"
                          >
                            <p className="text-xs uppercase tracking-[0.2em] text-orange-500">
                              {label}
                            </p>
                            <p className="mt-2 font-bold break-words">
                              {value || "Not added"}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-black border border-zinc-700 rounded-3xl p-8">
                      <h3 className="text-3xl font-black">
                        Contact
                      </h3>
                      <div className="mt-6 space-y-4">
                        {[
                          ["Phone", userData?.contactNumber],
                          ["Email", userData?.officialEmail],
                          ["Website", userData?.websiteLink],
                          ["Instagram", userData?.instagramLink],
                          ["Facebook", userData?.facebookLink],
                        ].map(([label, value]) => (
                          <div key={label}>
                            <p className="text-xs uppercase tracking-[0.2em] text-orange-500">
                              {label}
                            </p>
                            <p className="mt-1 font-bold break-words">
                              {value || "Not added"}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2 bg-black border border-zinc-700 rounded-3xl p-8">
                    <h3 className="text-3xl font-black">
                      Sports Conducted
                    </h3>
                    <div className="mt-5 flex flex-wrap gap-3">
                      {dashboardSports.length ? (
                        dashboardSports.map((sport: string) => (
                          <span
                            key={sport}
                            className="bg-orange-500/10 text-orange-500 border border-orange-500/20 px-4 py-2 rounded-full font-bold"
                          >
                            {sport}
                          </span>
                        ))
                      ) : (
                        <p className="text-zinc-400">No sports added yet.</p>
                      )}
                    </div>
                  </div>

                  <div className="md:col-span-2 bg-black border border-zinc-700 rounded-3xl p-8">
                    <h3 className="text-3xl font-black">
                      Academy Photos
                    </h3>
                    <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {dashboardGallery.length ? (
                        dashboardGallery.map((image: string, index: number) => (
                          <img
                            key={`${image}-${index}`}
                            src={image}
                            alt={`Academy photo ${index + 1}`}
                            className="w-full h-56 object-cover rounded-2xl border border-white/10"
                          />
                        ))
                      ) : (
                        <p className="text-zinc-400">No photos added yet.</p>
                      )}
                    </div>
                  </div>

                  <div className="bg-black border border-zinc-700 rounded-3xl p-8">
                    <h3 className="text-3xl font-black">
                      Owner / Coach Details
                    </h3>
                    <div className="mt-6 space-y-5">
                      {dashboardOwners.length ? (
                        dashboardOwners.map((owner: any, index: number) => (
                          <div
                            key={index}
                            className="flex gap-5 bg-zinc-950 border border-white/10 rounded-2xl p-5"
                          >
                            {owner.photoPreview ? (
                              <img
                                src={owner.photoPreview}
                                alt={owner.fullName || "Owner"}
                                className="w-20 h-24 rounded-xl object-cover"
                              />
                            ) : (
                              <div className="w-20 h-24 rounded-xl bg-zinc-900 flex items-center justify-center text-2xl font-black text-orange-500">
                                {(owner.fullName || "O").charAt(0)}
                              </div>
                            )}
                            <div>
                              <p className="text-xl font-black">
                                {owner.fullName || `Owner ${index + 1}`}
                              </p>
                              <p className="mt-1 text-orange-500 font-bold">
                                {owner.role || "Owner"}
                              </p>
                              {owner.sex && (
                                <p className="mt-2 text-zinc-400">
                                  {owner.sex}
                                </p>
                              )}
                              <p className="mt-2 text-zinc-400">
                                {owner.designation || "Designation not added"}
                              </p>
                              <p className="mt-2 text-zinc-400">
                                {owner.mobile || "Mobile not added"} • {owner.email || "Email not added"}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-zinc-400">No owner details added yet.</p>
                      )}
                    </div>
                  </div>

                  <div className="bg-black border border-zinc-700 rounded-3xl p-8">
                    <h3 className="text-3xl font-black">
                      Student Details
                    </h3>
                    <div className="mt-6 space-y-5">
                      {dashboardLiveStudents.length ? (
                        dashboardLiveStudents.map((student: any, index: number) => (
                          <div
                            key={index}
                            className="flex gap-5 bg-zinc-950 border border-white/10 rounded-2xl p-5"
                          >
                            {student.photoPreview ? (
                              <img
                                src={student.photoPreview}
                                alt={student.name || "Student"}
                                className="w-20 h-24 rounded-xl object-cover"
                              />
                            ) : (
                              <div className="w-20 h-24 rounded-xl bg-zinc-900 flex items-center justify-center text-2xl font-black text-orange-500">
                                {(student.name || "S").charAt(0)}
                              </div>
                            )}
                            <div>
                              <p className="text-xl font-black">
                                {student.name || `Student ${index + 1}`}
                              </p>
                              <p className="mt-1 text-zinc-400">
                                {[student.sports, student.sex, student.age && `${student.age} yrs`]
                                  .filter(Boolean)
                                  .join(" • ") || "Sport not added"}
                              </p>
                              <p className="mt-2 text-zinc-400">
                                {student.school || "School not added"}
                              </p>
                              {student.achievement && (
                                <p className="mt-2 text-zinc-300 whitespace-pre-line">
                                  {student.achievement}
                                </p>
                              )}
                              {(student.isEliteAthlete || student.isParaAthlete) && (
                                <div className="mt-3 flex flex-wrap gap-2">
                                  {student.isEliteAthlete && (
                                    <span className="bg-orange-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                                      Elite Athlete
                                    </span>
                                  )}
                                  {student.isParaAthlete && (
                                    <span className="bg-white text-black px-3 py-1 rounded-full text-sm font-bold">
                                      Para Athlete
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-zinc-400">No paid student details are live yet.</p>
                      )}
                    </div>
                  </div>

                  <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
                    <div className="bg-black border border-zinc-700 rounded-3xl p-8">
                      <h3 className="text-3xl font-black">
                        Media Coverage
                      </h3>
                      <p className="mt-4 text-zinc-300">
                        {userData?.mediaCoverageProofName ||
                          "No media proof uploaded yet."}
                      </p>
                    </div>

                    <div className="bg-black border border-zinc-700 rounded-3xl p-8">
                      <h3 className="text-3xl font-black">
                        Declaration
                      </h3>
                      <p className="mt-4 text-zinc-300">
                        {userData?.declarationAccepted
                          ? "Declaration accepted by the academy."
                          : "Declaration is pending."}
                      </p>
                    </div>
                  </div>
                </>
              )}

              {editMode && (
                <>

              <input
                type="text"
                value={academyName}
                disabled={!editMode}
                onChange={(e) =>
                  setAcademyName(e.target.value)
                }
                className="bg-black border border-zinc-700 rounded-2xl px-6 py-5"
              />

              <input
                type="text"
                value={stateName}
                disabled={!editMode}
                onChange={(e) =>
                  setStateName(e.target.value)
                }
                className="bg-black border border-zinc-700 rounded-2xl px-6 py-5"
              />

              <input
                type="text"
                value={district}
                disabled={!editMode}
                onChange={(e) =>
                  setDistrict(e.target.value)
                }
                className="bg-black border border-zinc-700 rounded-2xl px-6 py-5"
              />

              <input
                type="text"
                value={pincode}
                disabled={!editMode}
                onChange={(e) =>
                  setPincode(e.target.value)
                }
                className="bg-black border border-zinc-700 rounded-2xl px-6 py-5"
              />

                </>
              )}

            </div>

            {editMode && (
              <>
            <textarea
              value={academyDescription}
              disabled={!editMode}
              onChange={(e) =>
                setAcademyDescription(
                  e.target.value
                )
              }
              className="mt-6 w-full bg-black border border-zinc-700 rounded-2xl px-6 py-5 min-h-[180px]"
            />
              </>
            )}




            {editMode && (

              <button
                onClick={handleSaveDashboard}
                className="mt-8 bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-2xl font-bold"
              >
                Save Changes
              </button>

            )}

          </div>

        </section>

        <Footer />

      </main>
    );
  }

  // =========================
  // FIRST TIME FORM
  // =========================

  if (isFirstTime) {

    return (

      <main className="min-h-screen bg-black text-white">

        <Navbar />

        <section className="pt-44 pb-24 max-w-7xl mx-auto px-6">

          <p className="text-orange-500 uppercase tracking-[0.45em]">
            Affiliation Form
          </p>

          <h1 className="mt-6 text-6xl font-black">
            Academy Affiliation Form
          </h1>

          {/* FORM */}

          <div className="mt-10 grid md:grid-cols-2 gap-6">

  <input
    type="text"
    placeholder="Academy Name"
    value={academyName}
    onChange={(e) => setAcademyName(e.target.value)}
    className="bg-black border border-zinc-700 rounded-2xl px-6 py-5"
  />

  <input
    type="text"
    placeholder="Year Of Establishment"
    value={establishmentYear}
    onChange={(e) => setEstablishmentYear(e.target.value)}
    className="bg-black border border-zinc-700 rounded-2xl px-6 py-5"
  />

  <input
    type="text"
    placeholder="Address"
    value={fullAddress}
    onChange={(e) => setFullAddress(e.target.value)}
    className="bg-black border border-zinc-700 rounded-2xl px-6 py-5"
  />

  <input
    type="text"
    placeholder="District"
    value={districtName}
    onChange={(e) => setDistrictName(e.target.value)}
    className="bg-black border border-zinc-700 rounded-2xl px-6 py-5"
  />

  <input
    type="text"
    placeholder="State"
    value={stateName}
    onChange={(e) => setStateName(e.target.value)}
    className="bg-black border border-zinc-700 rounded-2xl px-6 py-5"
  />

  <input
    type="text"
    placeholder="Pincode"
    value={pincode}
    onChange={(e) => setPincode(e.target.value)}
    className="bg-black border border-zinc-700 rounded-2xl px-6 py-5"
  />

  <input
    type="tel"
    placeholder="Contact Number"
    value={contactNumber}
    maxLength={10}
    onChange={(e) =>
      setContactNumber(
        e.target.value.replace(/\D/g, "").slice(0, 10)
      )
    }
    className="bg-black border border-zinc-700 rounded-2xl px-6 py-5"
  />

  <input
    type="email"
    placeholder="Official Email"
    value={officialEmail}
    onChange={(e) => setOfficialEmail(e.target.value)}
    className="bg-black border border-zinc-700 rounded-2xl px-6 py-5"
  />

  <input
    type="text"
    placeholder="Facebook Link"
    value={facebookLink}
    onChange={(e) => setFacebookLink(e.target.value)}
    className="bg-black border border-zinc-700 rounded-2xl px-6 py-5"
  />

  <input
    type="text"
    placeholder="Instagram Link"
    value={instagramLink}
    onChange={(e) => setInstagramLink(e.target.value)}
    className="bg-black border border-zinc-700 rounded-2xl px-6 py-5"
  />

  <input
    type="text"
    placeholder="Website Link"
    value={websiteLink}
    onChange={(e) => setWebsiteLink(e.target.value)}
    className="bg-black border border-zinc-700 rounded-2xl px-6 py-5"
  />

  <select
    value={hasOtherBranch}
    onChange={(e) => setHasOtherBranch(e.target.value)}
    className="bg-black border border-zinc-700 rounded-2xl px-6 py-5"
  >
    <option value="">Any Other Branch?</option>
    <option value="Yes">Yes</option>
    <option value="No">No</option>
  </select>

  <input
    type="text"
    placeholder="Google Location Of Academy"
    value={googleLocation}
    onChange={(e) => setGoogleLocation(e.target.value)}
    className="md:col-span-2 bg-black border border-zinc-700 rounded-2xl px-6 py-5"
  />

  <div className="mt-10">
  <h2 className="text-4xl font-black">
    Academy Logo
  </h2>

  <label
    htmlFor="academyLogo"
    className="mt-6 flex items-center justify-center bg-orange-500 hover:bg-orange-600 transition rounded-2xl px-6 py-5 cursor-pointer font-bold text-black"
  >
    Upload Academy Logo
  </label>

  <input
    id="academyLogo"
    type="file"
    accept="image/*"
    onChange={handleLogoUpload}
    className="hidden"
  />

  {logoPreview && (
    <div className="mt-6 relative w-36">
      <img
        src={logoPreview}
        alt="Logo"
        className="w-36 h-36 object-cover rounded-3xl border border-white/10"
      />

      <button
        type="button"
        onClick={() => {
          setAcademyLogo(null);
          setLogoPreview("");
        }}
        className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full text-sm font-bold"
      >
        ×
      </button>
    </div>
  )}
</div>

<div>

  <h2 className="text-5xl font-black mb-3">
    Academy Photos
  </h2>

  <p className="text-zinc-400 mb-5">
    Minimum 3 photos • Maximum 5 photos
  </p>

  <label
    htmlFor="academyPhotos"
    className="w-full flex items-center justify-center bg-white text-black font-bold py-5 rounded-3xl cursor-pointer hover:bg-zinc-200 transition"
  >
    Upload Academy Photo
  </label>

  <input
    id="academyPhotos"
    type="file"
    accept="image/*"
    className="hidden"
    onChange={(e: any) => {

      const file = e.target.files[0];

      if (!file) return;

      if (academyImages.length >= 5) {
        alert("Maximum 5 photos allowed");
        return;
      }

      setAcademyImages([
        ...academyImages,
        file
      ]);
    }}
  />

  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">

    {academyImages.map((image: any, index: number) => (

      <div
        key={index}
        className="relative"
      >

        <img
          src={
            typeof image === "string"
              ? image
              : URL.createObjectURL(image)
          }
          alt="academy"
          className="w-full h-52 object-cover rounded-3xl border border-white/10"
        />

        <button
          type="button"
          onClick={() => {

            setAcademyImages(
              academyImages.filter(
                (_: any, i: number) => i !== index
              )
            );

          }}
          className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full text-sm font-bold"
        >
          ×
        </button>

      </div>

    ))}

  </div>

  </div>

<div className="md:col-span-2 mt-10">

  <div className="flex items-center justify-between">

    <h3 className="text-2xl font-bold">
      Sports Conducted
    </h3>

    <button
      type="button"
      onClick={() =>
        setShowSports(!showSports)
      }
      className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-xl font-bold"
    >
      {showSports ? "Minimize" : "Expand"}
    </button>

  </div>

  {showSports && (

    <>

      <input
        type="text"
        placeholder="Search Sport..."
        value={sportsSearch}
        onChange={(e) =>
          setSportsSearch(e.target.value)
        }
        className="mt-6 w-full bg-black border border-zinc-700 rounded-2xl px-6 py-4"
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">

        {filteredSports.map((sport) => (

          <label
            key={sport}
            className="flex items-center gap-3 bg-black border border-zinc-700 rounded-2xl px-5 py-4 cursor-pointer"
          >

            <input
              type="checkbox"
              value={sport}
              checked={selectedSports.includes(sport)}
              onChange={(e) => {

                if (e.target.checked) {

                  setSportsConducted([
                    ...selectedSports,
                    sport
                  ]);

                } else {

                  setSportsConducted(
                    selectedSports.filter(
                      (s: string) => s !== sport
                    )
                  );
                }
              }}
            />

            <span>{sport}</span>

          </label>

        ))}

      </div>

      <div className="mt-8 bg-zinc-950 border border-white/10 rounded-3xl p-6">

        <p className="text-zinc-300">
          If your desired sport is not present in the options, write it below and inform the federation to add the desired sport.
        </p>

        <input
          type="text"
          placeholder="Desired sport name"
          value={desiredSport}
          onChange={(e) =>
            setDesiredSport(e.target.value)
          }
          className="mt-5 w-full bg-black border border-zinc-700 rounded-2xl px-6 py-4"
        />

      </div>

    </>

  )}

</div>

  <div className="md:col-span-2 grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-10 mt-16 items-start">

  {/* OWNER SECTION */}
  <div>

    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

      <h2 className="text-3xl xl:text-4xl leading-tight font-black">
        Owner / Coach Details
      </h2>

    <button
      type="button"
      onClick={addOwner}
      className="w-fit whitespace-nowrap bg-orange-500 hover:bg-orange-400 transition px-6 py-3 rounded-2xl font-bold text-black"
    >
      + Add
    </button>

  </div>

  <div className="space-y-10">

    {owners.map((owner, index) => (

      <div
        key={index}
        className="border border-white/10 rounded-3xl p-6 xl:p-8 bg-zinc-950 overflow-hidden"
      >

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">

          <h3 className="text-2xl font-bold">
            Owner #{index + 1}
          </h3>

          {owners.length > 1 && (

            <button
              type="button"
              onClick={() => removeOwner(index)}
              className="bg-red-500 hover:bg-red-400 transition px-5 py-2 rounded-xl font-bold"
            >
              Remove
            </button>

          )}

        </div>

        <div className="overflow-x-auto">

          <table className="w-full border-collapse">

            <tbody>

              <tr className="border-b border-white/10">

                <td className="py-5 pr-5 font-semibold w-40 xl:w-56">
                  Full Name
                </td>

                <td className="py-5">

                  <input
                    type="text"
                    value={owner.fullName}
                    onChange={(e) =>
                      handleOwnerChange(
                        index,
                        "fullName",
                        e.target.value
                      )
                    }
                    className="w-full bg-black border border-zinc-700 rounded-2xl px-5 py-4"
                  />

                </td>

              </tr>

              <tr className="border-b border-white/10">

                <td className="py-5 pr-5 font-semibold">
                  Role
                </td>

                <td className="py-5">

                  <select
                    value={(owner as any).role || "Owner"}
                    onChange={(e) =>
                      handleOwnerChange(
                        index,
                        "role",
                        e.target.value
                      )
                    }
                    className="w-full bg-black border border-zinc-700 rounded-2xl px-5 py-4"
                  >
                    <option value="Owner">Owner</option>
                    <option value="Coach">Coach</option>
                    <option value="Coach and Owner">
                      Coach and Owner
                    </option>
                  </select>

                </td>

              </tr>

              <tr className="border-b border-white/10">

                <td className="py-5 pr-5 font-semibold">
                  Sex
                </td>

                <td className="py-5">

                  <select
                    value={(owner as any).sex || ""}
                    onChange={(e) =>
                      handleOwnerChange(
                        index,
                        "sex",
                        e.target.value
                      )
                    }
                    className="w-full bg-black border border-zinc-700 rounded-2xl px-5 py-4"
                  >
                    <option value="">Sex</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>

                </td>

              </tr>

              <tr className="border-b border-white/10">

                <td className="py-5 pr-5 font-semibold">
                  Designation
                </td>

                <td className="py-5">

                  <input
                    type="text"
                    value={owner.designation}
                    onChange={(e) =>
                      handleOwnerChange(
                        index,
                        "designation",
                        e.target.value
                      )
                    }
                    className="w-full bg-black border border-zinc-700 rounded-2xl px-5 py-4"
                  />

                </td>

              </tr>

              <tr className="border-b border-white/10">

                <td className="py-5 pr-5 font-semibold">
                  Mobile Number
                </td>

                <td className="py-5">

                  <input
                    type="tel"
                    maxLength={10}
                    value={owner.mobile}
                    onChange={(e) =>
                      handleOwnerChange(
                        index,
                        "mobile",
                        e.target.value.replace(/\D/g, "")
                      )
                    }
                    className="w-full bg-black border border-zinc-700 rounded-2xl px-5 py-4"
                  />

                </td>

              </tr>

              <tr className="border-b border-white/10">

                <td className="py-5 pr-5 font-semibold">
                  Email ID
                </td>

                <td className="py-5">

                  <input
                    type="email"
                    value={owner.email}
                    onChange={(e) =>
                      handleOwnerChange(
                        index,
                        "email",
                        e.target.value
                      )
                    }
                    className="w-full bg-black border border-zinc-700 rounded-2xl px-5 py-4"
                  />

                </td>

              </tr>

              <tr className="border-b border-white/10">

                <td className="py-5 pr-5 font-semibold">
                  Passport Size Photo
                </td>

                <td className="py-5">

                  <label
                    htmlFor={`photo-${index}`}
                    className="inline-flex bg-orange-500 text-black font-bold px-6 py-4 rounded-2xl cursor-pointer"
                  >
                    Upload Photo
                  </label>

                  <input
                    id={`photo-${index}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleOwnerPhoto(e, index)
                    }
                  />

                  <p className="text-zinc-400 text-sm mt-2">
                    Maximum Size: 2MB
                  </p>

                  {owner.photoPreview && (

                    <img
                      src={owner.photoPreview}
                      alt="Owner"
                      className="mt-5 w-36 h-44 object-cover rounded-2xl border border-white/10"
                    />

                  )}

                </td>

              </tr>

              <tr>

                <td className="py-5 pr-5 font-semibold">
                  Government ID Proof
                </td>

                <td className="py-5">

                  <label
                    htmlFor={`proof-${index}`}
                    className="inline-flex bg-white text-black font-bold px-6 py-4 rounded-2xl cursor-pointer"
                  >
                    Upload ID Proof
                  </label>

                  <input
                    id={`proof-${index}`}
                    type="file"
                    accept=".pdf,image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleOwnerIdProof(e, index)
                    }
                  />

                  <p className="text-zinc-400 text-sm mt-2">
                    Aadhaar / PAN / Passport / Driving Licence
                  </p>

                  {owner.idProofPreview && (

                    <img
                      src={owner.idProofPreview}
                      alt="ID"
                      className="mt-5 w-44 h-32 object-cover rounded-2xl border border-white/10"
                    />

                  )}

                  {owner.idProof &&
                    (owner.idProof as any)?.type ===
                      "application/pdf" && (

                    <p className="mt-4 text-green-400 font-semibold">
                      PDF Uploaded Successfully
                    </p>

                  )}

                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    ))}

  </div>

  </div>

  {/* STUDENT SECTION */}
  <div>

    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

      <h2 className="text-3xl xl:text-4xl leading-tight font-black">
        Student Details
      </h2>

      <button
        type="button"
        onClick={addStudent}
        className="w-fit whitespace-nowrap bg-orange-500 hover:bg-orange-400 transition text-black px-6 py-3 rounded-2xl font-bold"
      >
        + Add Student
      </button>

    </div>

    <div className="space-y-8">

    {students.map((student, index) => (

      <div
        key={index}
        className="bg-zinc-950 border border-white/10 rounded-3xl p-6 xl:p-8 mb-8 overflow-hidden"
      >

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

          <h3 className="text-3xl font-bold">
            Student #{index + 1}
          </h3>

          {students.length > 1 && (
            <button
              type="button"
              onClick={() => removeStudent(index)}
              className="w-fit text-red-500 font-bold"
            >
              Remove
            </button>
          )}

        </div>

        <div className="grid md:grid-cols-2 gap-5">

          <input
            type="text"
            placeholder="Student Name"
            value={student.name}
            onChange={(e) =>
              handleStudentChange(index, "name", e.target.value)
            }
            className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
          />

          <input
            type="number"
            min={1}
            placeholder="Age"
            value={student.age}
            onChange={(e) =>
              handleStudentChange(index, "age", e.target.value)
            }
            className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
          />

          <input
            type="text"
            placeholder="School"
            value={student.school}
            onChange={(e) =>
              handleStudentChange(index, "school", e.target.value)
            }
            className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
          />

          <select
            value={student.sex}
            onChange={(e) =>
              handleStudentChange(index, "sex", e.target.value)
            }
            className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
          >
            <option value="">Sex</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <select
            value={student.sports}
            onChange={(e) =>
              handleStudentChange(index, "sports", e.target.value)
            }
            className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
          >
            <option value="">
              {selectedSports.length
                ? "Select Sport"
                : "Select sports conducted first"}
            </option>

            {selectedSports.map((sport) => (

              <option
                key={sport}
                value={sport}
              >
                {sport}
              </option>

            ))}
          </select>

          <textarea
            placeholder={"Achievements\nExample:\n1. State Champion 2026\n2. District Gold Medal\n- National camp selected"}
            value={student.achievement}
            onChange={(e) =>
              handleStudentChange(index, "achievement", e.target.value)
            }
            className="md:col-span-2 bg-black border border-zinc-700 rounded-2xl px-5 py-4 min-h-36"
          />

        </div>

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-5">

          <label
            htmlFor={`student-photo-${index}`}
            className="w-fit bg-white text-black font-bold px-6 py-4 rounded-2xl cursor-pointer"
          >
            Upload Passport Photo
          </label>

          <input
            id={`student-photo-${index}`}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) =>
              handleStudentPhoto(e, index)
            }
          />

          <label className="flex items-center gap-3 bg-black border border-zinc-700 rounded-2xl px-5 py-4 cursor-pointer">
            <input
              type="checkbox"
              checked={student.isEliteAthlete}
              onChange={(e) =>
                toggleEliteAthlete(index, e.target.checked)
              }
            />
            <span className="font-bold">
              Mark as Elite Athlete
            </span>
          </label>

          <label className="flex items-center gap-3 bg-black border border-zinc-700 rounded-2xl px-5 py-4 cursor-pointer">
            <input
              type="checkbox"
              checked={student.isParaAthlete || false}
              onChange={(e) =>
                handleStudentChange(index, "isParaAthlete", e.target.checked)
              }
            />
            <span className="font-bold">
              Mark as Para Athlete
            </span>
          </label>

        </div>

        {student.photoPreview && (

          <img
            src={student.photoPreview}
            alt="Student"
            className="mt-5 w-36 h-44 object-cover rounded-2xl border border-white/10"
          />

        )}

      </div>

    ))}

    </div>

  </div>

</div>


<div className="md:col-span-2 mt-10 bg-zinc-900 border border-white/10 rounded-[35px] p-10">

  <h2 className="text-4xl font-black">
    Press / Media Coverage
  </h2>

  <p className="mt-3 text-zinc-400">
    Upload academy press or media coverage proof in PDF, PNG, JPG, or JPEG format.
  </p>

  <label
    htmlFor="mediaCoverageProof"
    className="mt-6 inline-flex bg-white text-black font-bold px-6 py-4 rounded-2xl cursor-pointer hover:bg-zinc-200 transition"
  >
    Upload Proof
  </label>

  <input
    id="mediaCoverageProof"
    type="file"
    accept=".pdf,image/png,image/jpeg"
    className="hidden"
    onChange={handleMediaCoverageProof}
  />

  {mediaCoverageProofName && (
    <p className="mt-4 text-green-400 font-semibold">
      {mediaCoverageProofName} uploaded
    </p>
  )}

</div>

<div className="md:col-span-2 mt-10 bg-zinc-950 border border-white/10 rounded-[35px] p-8">

  <label className="flex items-start gap-4 cursor-pointer">
    <input
      type="checkbox"
      checked={declarationAccepted}
      onChange={(e) =>
        setDeclarationAccepted(e.target.checked)
      }
      className="mt-2"
    />
    <span className="text-zinc-200 leading-relaxed">
      I declare that all information, documents, photos, student details, and media proofs submitted by this academy are true and correct to the best of my knowledge.
    </span>
  </label>

</div>

          {/* PLAN */}

          {!isPaidAcademy && (
          <div className="md:col-span-2 mt-10 bg-zinc-900 border border-white/10 rounded-[35px] p-10">

            <h2 className="text-4xl font-black">
              Select Affiliation Plan
            </h2>

            <div className="mt-8 grid md:grid-cols-3 gap-6">

              {[1, 2, 3].map((year) => (

                <button
                  key={year}
                  onClick={() =>
                    setSelectedYears(year)
                  }
                  className={`rounded-3xl p-8 border text-left transition ${
                    selectedYears === year
                      ? "bg-orange-500 border-orange-500"
                      : "bg-black border-zinc-700"
                  }`}
                >

                  <h3 className="text-4xl font-black">
                    ₹{affiliationFees[year]}
                  </h3>

                  <p className="mt-2 text-lg">
                    {year} Year
                    {year > 1 ? "s" : ""}
                  </p>

                </button>

              ))}

            </div>

          </div>
          )}

          {/* FEES */}

          <div className="md:col-span-2 mt-10 bg-orange-500 text-black rounded-[35px] p-10">

            <h2 className="text-5xl font-black">
              Fee Calculation
            </h2>

            <p className="mt-4 text-lg font-bold">
              Student fee is ₹99 per student per year.
            </p>

            <div className="mt-10 space-y-5 text-2xl">

              <div className="flex items-center justify-between">

                <p>
                  {isPaidAcademy
                    ? "Academy Affiliation already paid"
                    : `Academy Affiliation (${selectedYears} Year)`}
                </p>

                <p>
                  ₹{payableAffiliationAmount}
                </p>

              </div>

              <div className="flex items-center justify-between">

                <p>
                  {isPaidAcademy
                    ? `Students due now (${payableStudentsCount} × ₹99/year)`
                    : `Students (${students.length} × ₹99)`}
                </p>

                <p>
                  ₹{studentsAmount}
                </p>

              </div>

            </div>

            <div className="mt-8 border-t border-black/20 pt-8 flex items-center justify-between">

              <h3 className="text-5xl font-black">
                Payable
              </h3>

              <h3 className="text-5xl font-black">
                ₹{payableAmount}
              </h3>

            </div>

            {isPaidAcademy && studentRenewalDue && (
              <p className="mt-5 bg-black/10 border border-black/20 rounded-2xl px-5 py-4 font-bold">
                Student yearly renewal is due for the paid students. Their fee is ₹99 per student per year.
              </p>
            )}

            {appliedCoupon && (

              <div className="mt-6 flex items-center justify-between text-2xl">

                <p>
                  Coupon Discount ({appliedCoupon})
                </p>

                <p>
                  -₹{couponDiscountAmount}
                </p>

              </div>

            )}

            {payableAmount > 0 && (
            <div className="mt-8 bg-black/10 border border-black/20 rounded-3xl p-6">

              <h3 className="text-2xl font-black">
                Coupon Code
              </h3>

              <div className="mt-5 flex flex-col md:flex-row gap-4">

                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => {
                    setCouponCode(e.target.value.toUpperCase());
                    setAppliedCoupon("");
                    setCouponMessage("");
                  }}
                  className="flex-1 bg-white text-black border border-black/20 rounded-2xl px-6 py-4"
                />

                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="bg-black text-white px-8 py-4 rounded-2xl font-bold"
                >
                  Apply Coupon
                </button>

              </div>

              {couponMessage && (
                <p className="mt-3 font-bold">
                  {couponMessage}
                </p>
              )}

            </div>
            )}

            {/* PAYMENT */}

            <div className="mt-10 flex flex-col md:flex-row gap-6">

              <button
                onClick={handlePayment}
                className="flex-1 bg-black text-white hover:bg-zinc-900 transition py-5 rounded-2xl text-xl font-bold"
              >
                {payableAmount === 0
                  ? "Save Profile Updates"
                  : isPaidAcademy
                  ? "Pay Additional Student Fee"
                  : "Make Payment Now"}
              </button>

              {(!isPaidAcademy || payableAmount > 0) && (
                <button
                  onClick={handleSaveDashboard}                
                  className="flex-1 bg-white text-black hover:bg-gray-200 transition py-5 rounded-2xl text-xl font-bold"              >
                  {isPaidAcademy && payableAmount > 0
                    ? "Save Changes (New Students Hidden Until Paid)"
                    : "Save & Continue Later"}                
                </button>
              )}

            </div>
 </div>
          </div>

        </section>
        <Footer />

      </main>
    );
  }

  // =========================
  // DEFAULT LOGIN/SIGNUP
  // =========================

  return (

    <main className="min-h-screen pt-40 md:pt-0 bg-black text-white overflow-hidden">

      <Navbar />

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
                className="w-full bg-black border border-zinc-700 rounded-2xl px-6 py-5"
              />

              <div className="relative">
                <input
                  type={showLoginPassword ? "text" : "password"}
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) =>
                    setLoginPassword(e.target.value)
                  }
                  className="w-full bg-black border border-zinc-700 rounded-2xl px-6 py-5 pr-24"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowLoginPassword(!showLoginPassword)
                  }
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-sm text-orange-500 font-bold"
                >
                  {showLoginPassword ? "Hide" : "Show"}
                </button>
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 transition py-5 rounded-2xl text-lg font-bold"
              >
                {loading
                  ? "Logging In..."
                  : "Login To Dashboard"}
              </button>

              <button
                type="button"
                onClick={handleResetPassword}
                disabled={loading}
                className="w-full bg-black border border-orange-500/40 text-orange-500 hover:bg-orange-500/10 transition py-4 rounded-2xl text-lg font-bold"
              >
                Reset Password
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
                className="w-full bg-black border border-zinc-700 rounded-2xl px-6 py-5"
              />

              <div className="grid md:grid-cols-2 gap-6">

                <input
                  type="text"
                  placeholder="State"
                  value={stateName}
                  onChange={(e) =>
                    setStateName(e.target.value)
                  }
                  className="w-full bg-black border border-zinc-700 rounded-2xl px-6 py-5"
                />

                <input
                  type="text"
                  placeholder="District"
                  value={district}
                  onChange={(e) =>
                    setDistrict(e.target.value)
                  }
                  className="w-full bg-black border border-zinc-700 rounded-2xl px-6 py-5"
                />

              </div>

              <input
                type="text"
                placeholder="Pincode"
                value={pincode}
                onChange={(e) =>
                  setPincode(e.target.value)
                }
                className="w-full bg-black border border-zinc-700 rounded-2xl px-6 py-5"
              />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full bg-black border border-zinc-700 rounded-2xl px-6 py-5"
              />

              <div className="relative">
                <input
                  type={showSignupPassword ? "text" : "password"}
                  placeholder="Create Password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  className="w-full bg-black border border-zinc-700 rounded-2xl px-6 py-5 pr-24"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowSignupPassword(!showSignupPassword)
                  }
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-sm text-orange-500 font-bold"
                >
                  {showSignupPassword ? "Hide" : "Show"}
                </button>
              </div>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Retype Password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  className="w-full bg-black border border-zinc-700 rounded-2xl px-6 py-5 pr-24"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-sm text-orange-500 font-bold"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>

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

      <Footer />

    </main>
  );
}
