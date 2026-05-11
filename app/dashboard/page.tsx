"use client";

import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { auth, db, storage } from "@/app/lib/firebase";

import { onAuthStateChanged, signOut } from "firebase/auth";

import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

export default function DashboardPage() {

  const [loading, setLoading] = useState(false);

  const [academyName, setAcademyName] =
    useState("");

  const [foundedYear, setFoundedYear] =
    useState("");

  const [academyAddress, setAcademyAddress] =
    useState("");

  const [phoneNumber, setPhoneNumber] =
    useState("");

  const [whatsappNumber, setWhatsappNumber] =
    useState("");

  const [sports, setSports] = useState<string[]>([]);

  const [logoFile, setLogoFile] =
    useState<File | null>(null);

  const [logoURL, setLogoURL] =
    useState("");

  const [bannerFiles, setBannerFiles] =
    useState<FileList | null>(null);

  const [bannerURLs, setBannerURLs] =
    useState<string[]>([]);

  // OWNERS

  const [owners, setOwners] = useState([
    {
      name: "",
      gender: "",
      role: "",
    },
  ]);

  // COACHES

  const [coaches, setCoaches] = useState([
    {
      name: "",
      gender: "",
      sport: "",
      experience: "",
    },
  ]);

  // STUDENTS

  const [students, setStudents] = useState([
    {
      name: "",
      gender: "",
      age: "",
      sport: "",
      school: "",
      district: "",
      state: "",
      image: "",
    },
  ]);

  const sportsList = [
    "Football",
    "Cricket",
    "MMA",
    "Boxing",
    "Karate",
    "Taekwondo",
    "Wrestling",
    "Kabaddi",
    "Athletics",
    "Yoga",
  ];

  // LOAD DATA

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(auth, async (user) => {

        if (user) {

          const docRef = doc(
            db,
            "academies",
            user.uid
          );

          const docSnap =
            await getDoc(docRef);

          if (docSnap.exists()) {

            const data = docSnap.data();

            setAcademyName(
              data.academyName || ""
            );

            setFoundedYear(
              data.foundedYear || ""
            );

            setAcademyAddress(
              data.academyAddress || ""
            );

            setPhoneNumber(
              data.phoneNumber || ""
            );

            setWhatsappNumber(
              data.whatsappNumber || ""
            );

            setSports(data.sports || []);

            setLogoURL(data.logoURL || "");

            setBannerURLs(
              data.bannerURLs || []
            );

            setOwners(
              data.owners || [
                {
                  name: "",
                  gender: "",
                  role: "",
                },
              ]
            );

            setCoaches(
              data.coaches || [
                {
                  name: "",
                  gender: "",
                  sport: "",
                  experience: "",
                },
              ]
            );

            setStudents(
              data.students || [
                {
                  name: "",
                  gender: "",
                  age: "",
                  sport: "",
                  school: "",
                  district: "",
                  state: "",
                  image: "",
                },
              ]
            );

          }

        }

      });

    return () => unsubscribe();

  }, []);

  // SPORTS

  const toggleSport = (sport: string) => {

    if (sports.includes(sport)) {

      setSports(
        sports.filter(
          (item) => item !== sport
        )
      );

    } else {

      setSports([...sports, sport]);

    }

  };

  // LOGOUT

  const handleLogout = async () => {

    await signOut(auth);

    window.location.href =
      "/academies/affiliation";

  };

  // LOGO UPLOAD

  const uploadLogo = async () => {

    if (!logoFile) {

      alert("Logo is compulsory");

      return;

    }

    try {

      const user = auth.currentUser;

      if (!user) return;

      const storageRef = ref(
        storage,
        `academy-logos/${user.uid}/${logoFile.name}`
      );

      await uploadBytes(
        storageRef,
        logoFile
      );

      const url =
        await getDownloadURL(storageRef);

      setLogoURL(url);

      alert("Logo Uploaded");

    } catch (error) {

      console.log(error);

    }

  };

  // BANNER UPLOAD

  const uploadBanners = async () => {

    if (!bannerFiles) {

      alert(
        "Minimum 3 banners compulsory"
      );

      return;

    }

    if (
      bannerFiles.length < 3 ||
      bannerFiles.length > 5
    ) {

      alert(
        "Upload minimum 3 and maximum 5 banners"
      );

      return;

    }

    try {

      const user = auth.currentUser;

      if (!user) return;

      const uploadedURLs: string[] = [];

      for (
        let i = 0;
        i < bannerFiles.length;
        i++
      ) {

        const file = bannerFiles[i];

        const storageRef = ref(
          storage,
          `academy-banners/${user.uid}/${file.name}`
        );

        await uploadBytes(
          storageRef,
          file
        );

        const url =
          await getDownloadURL(storageRef);

        uploadedURLs.push(url);

      }

      setBannerURLs(uploadedURLs);

      alert("Banners Uploaded");

    } catch (error) {

      console.log(error);

    }

  };

  // SAVE DASHBOARD

  const saveDashboard = async () => {

    if (!foundedYear) {

      alert(
        "Founder Year is compulsory"
      );

      return;

    }

    if (!academyAddress) {

      alert(
        "Academy Address is compulsory"
      );

      return;

    }

    if (!phoneNumber) {

      alert(
        "Phone Number is compulsory"
      );

      return;

    }

    if (!whatsappNumber) {

      alert(
        "WhatsApp Number is compulsory"
      );

      return;

    }

    if (sports.length === 0) {

      alert(
        "Select at least one sport"
      );

      return;

    }

    if (!logoURL) {

      alert(
        "Academy Logo is compulsory"
      );

      return;

    }

    if (
      bannerURLs.length < 3 ||
      bannerURLs.length > 5
    ) {

      alert(
        "Upload minimum 3 banners"
      );

      return;

    }

    if (
      owners.length < 1 ||
      !owners[0].name
    ) {

      alert(
        "At least one owner compulsory"
      );

      return;

    }

    if (
      coaches.length < 1 ||
      !coaches[0].name
    ) {

      alert(
        "At least one coach compulsory"
      );

      return;

    }

    if (
      students.length < 1 ||
      !students[0].name
    ) {

      alert(
        "At least one student compulsory"
      );

      return;

    }

    try {

      setLoading(true);

      const user = auth.currentUser;

      if (!user) return;

      const academyFees = 1000;

      const studentFees =
        students.length * 100;

      const totalAmount =
        academyFees + studentFees;

      await updateDoc(
        doc(
          db,
          "academies",
          user.uid
        ),
        {

          academyName,

          foundedYear,

          academyAddress,

          phoneNumber,

          whatsappNumber,

          sports,

          logoURL,

          bannerURLs,

          owners,

          coaches,

          students,

          academyFees,

          studentFees,

          totalAmount,

          updatedAt: new Date(),

        }
      );

      alert(
        `Dashboard Saved Successfully. Total Fees: ₹${totalAmount}`
      );

    } catch (error) {

      console.log(error);

      alert("Save Failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <main className="min-h-screen pt-40 md:pt-0 bg-black text-white">

      <Navbar />

      <section className="max-w-7xl mx-auto px-6 pt-40 pb-24">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-orange-500 uppercase tracking-[0.4em]">
              Academy Dashboard
            </p>

            <h1 className="mt-4 text-6xl font-black">
              Complete Academy Profile
            </h1>

          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-6 py-3 rounded-xl font-bold"
          >
            Logout
          </button>

        </div>

        {/* BASIC DETAILS */}

        <div className="mt-14 bg-zinc-900 rounded-3xl p-10 border border-white/10">

          <h2 className="text-3xl font-black">
            Basic Details
          </h2>

          <div className="mt-8 grid md:grid-cols-2 gap-6">

            <input
              type="text"
              placeholder="Academy Name"
              value={academyName}
              onChange={(e) =>
                setAcademyName(
                  e.target.value
                )
              }
              className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
            />

            <input
              type="text"
              placeholder="Founded Year *"
              value={foundedYear}
              onChange={(e) =>
                setFoundedYear(
                  e.target.value
                )
              }
              className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
            />

            <input
              type="text"
              placeholder="Phone Number *"
              value={phoneNumber}
              onChange={(e) =>
                setPhoneNumber(
                  e.target.value
                )
              }
              className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
            />

            <input
              type="text"
              placeholder="WhatsApp Number *"
              value={whatsappNumber}
              onChange={(e) =>
                setWhatsappNumber(
                  e.target.value
                )
              }
              className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
            />

          </div>

          <textarea
            placeholder="Academy Address *"
            value={academyAddress}
            onChange={(e) =>
              setAcademyAddress(
                e.target.value
              )
            }
            className="mt-6 w-full bg-black border border-zinc-700 rounded-2xl px-5 py-4 min-h-[120px]"
          />

        </div>

        {/* SPORTS */}

        <div className="mt-10 bg-zinc-900 rounded-3xl p-10 border border-white/10">

          <h2 className="text-3xl font-black">
            Sports *
          </h2>

          <div className="mt-8 grid md:grid-cols-3 gap-4">

            {sportsList.map((sport) => (

              <label
                key={sport}
                className="bg-black border border-zinc-700 rounded-2xl px-5 py-4 flex items-center gap-3"
              >

                <input
                  type="checkbox"
                  checked={sports.includes(
                    sport
                  )}
                  onChange={() =>
                    toggleSport(sport)
                  }
                />

                {sport}

              </label>

            ))}

          </div>

        </div>

        {/* LOGO */}

        <div className="mt-10 bg-zinc-900 rounded-3xl p-10 border border-white/10">

          <h2 className="text-3xl font-black">
            Academy Logo *
          </h2>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {

              if (
                e.target.files?.[0]
              ) {

                setLogoFile(
                  e.target.files[0]
                );

              }

            }}
            className="mt-8"
          />

          <button
            onClick={uploadLogo}
            className="mt-6 bg-orange-500 px-8 py-3 rounded-xl font-bold"
          >
            Upload Logo
          </button>

        </div>

        {/* BANNERS */}

        <div className="mt-10 bg-zinc-900 rounded-3xl p-10 border border-white/10">

          <h2 className="text-3xl font-black">
            Academy Banners *
          </h2>

          <p className="text-gray-400 mt-2">
            Minimum 3 Maximum 5
          </p>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) =>
              setBannerFiles(
                e.target.files
              )
            }
            className="mt-8"
          />

          <button
            onClick={uploadBanners}
            className="mt-6 bg-orange-500 px-8 py-3 rounded-xl font-bold"
          >
            Upload Banners
          </button>

        </div>

{/* OWNERS */}

<div className="mt-10 bg-zinc-900 rounded-3xl p-10 border border-white/10">

  <div className="flex items-center justify-between">

    <h2 className="text-3xl font-black">
      Owners *
    </h2>

    <button
      onClick={() =>
        setOwners([
          ...owners,
          {
            name: "",
            gender: "",
            role: "",
          },
        ])
      }
      className="bg-orange-500 px-5 py-2 rounded-xl font-bold"
    >
      Add Owner
    </button>

  </div>

  <div className="mt-8 space-y-6">

    {owners.map((owner, index) => (

      <div
        key={index}
        className="grid md:grid-cols-3 gap-4"
      >

        <input
          type="text"
          placeholder="Owner Name"
          value={owner.name}
          onChange={(e) => {

            const updated = [...owners];

            updated[index].name =
              e.target.value;

            setOwners(updated);

          }}
          className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
        />

        <select
          value={owner.gender}
          onChange={(e) => {

            const updated = [...owners];

            updated[index].gender =
              e.target.value;

            setOwners(updated);

          }}
          className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
        >

          <option value="">
            Select Gender
          </option>

          <option value="Male">
            Male
          </option>

          <option value="Female">
            Female
          </option>

        </select>

        <input
          type="text"
          placeholder="Role"
          value={owner.role}
          onChange={(e) => {

            const updated = [...owners];

            updated[index].role =
              e.target.value;

            setOwners(updated);

          }}
          className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
        />

      </div>

    ))}

  </div>

</div>

{/* COACHES */}

<div className="mt-10 bg-zinc-900 rounded-3xl p-10 border border-white/10">

  <div className="flex items-center justify-between">

    <h2 className="text-3xl font-black">
      Coaches *
    </h2>

    <button
      onClick={() =>
        setCoaches([
          ...coaches,
          {
            name: "",
            gender: "",
            sport: "",
            experience: "",
          },
        ])
      }
      className="bg-orange-500 px-5 py-2 rounded-xl font-bold"
    >
      Add Coach
    </button>

  </div>

  <div className="mt-8 space-y-6">

    {coaches.map((coach, index) => (

      <div
        key={index}
        className="grid md:grid-cols-4 gap-4"
      >

        <input
          type="text"
          placeholder="Coach Name"
          value={coach.name}
          onChange={(e) => {

            const updated = [...coaches];

            updated[index].name =
              e.target.value;

            setCoaches(updated);

          }}
          className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
        />

        <select
          value={coach.gender}
          onChange={(e) => {

            const updated = [...coaches];

            updated[index].gender =
              e.target.value;

            setCoaches(updated);

          }}
          className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
        >

          <option value="">
            Gender
          </option>

          <option value="Male">
            Male
          </option>

          <option value="Female">
            Female
          </option>

        </select>

        <input
          type="text"
          placeholder="Sport"
          value={coach.sport}
          onChange={(e) => {

            const updated = [...coaches];

            updated[index].sport =
              e.target.value;

            setCoaches(updated);

          }}
          className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
        />

        <input
          type="text"
          placeholder="Experience"
          value={coach.experience}
          onChange={(e) => {

            const updated = [...coaches];

            updated[index].experience =
              e.target.value;

            setCoaches(updated);

          }}
          className="bg-black border border-zinc-700 rounded-2xl px-5 py-4"
        />

      </div>

    ))}

  </div>

</div>

{/* STUDENTS */}

<div className="mt-10 bg-zinc-900 rounded-3xl p-10 border border-white/10">

  <div className="flex items-center justify-between">

    <h2 className="text-3xl font-black">
      Students *
    </h2>

    <button
      onClick={() =>
        setStudents([
          ...students,
          {
            name: "",
            gender: "",
            age: "",
            sport: "",
            school: "",
            district: "",
            state: "",
            image: "",
          },
        ])
      }
      className="bg-orange-500 px-5 py-2 rounded-xl font-bold"
    >
      Add Student
    </button>

  </div>

  <div className="mt-8 space-y-10">

    {students.map((student, index) => (

      <div
        key={index}
        className="bg-black border border-zinc-800 rounded-3xl p-6"
      >

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Student Name"
            value={student.name}
            onChange={(e) => {

              const updated = [...students];

              updated[index].name =
                e.target.value;

              setStudents(updated);

            }}
            className="bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-4"
          />

          <select
            value={student.gender}
            onChange={(e) => {

              const updated = [...students];

              updated[index].gender =
                e.target.value;

              setStudents(updated);

            }}
            className="bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-4"
          >

            <option value="">
              Gender
            </option>

            <option value="Male">
              Male
            </option>

            <option value="Female">
              Female
            </option>

          </select>

          <input
            type="text"
            placeholder="Age"
            value={student.age}
            onChange={(e) => {

              const updated = [...students];

              updated[index].age =
                e.target.value;

              setStudents(updated);

            }}
            className="bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-4"
          />

          <input
            type="text"
            placeholder="Sport"
            value={student.sport}
            onChange={(e) => {

              const updated = [...students];

              updated[index].sport =
                e.target.value;

              setStudents(updated);

            }}
            className="bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-4"
          />

          <input
            type="text"
            placeholder="School"
            value={student.school}
            onChange={(e) => {

              const updated = [...students];

              updated[index].school =
                e.target.value;

              setStudents(updated);

            }}
            className="bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-4"
          />

          <input
            type="text"
            placeholder="District"
            value={student.district}
            onChange={(e) => {

              const updated = [...students];

              updated[index].district =
                e.target.value;

              setStudents(updated);

            }}
            className="bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-4"
          />

        </div>

      </div>

    ))}

  </div>

</div>



        {/* TOTAL */}

        <div className="mt-12 bg-orange-500 rounded-3xl p-10 text-black">

          <h2 className="text-4xl font-black">
            Fee Calculation
          </h2>

          <div className="mt-8 space-y-4 text-xl">

            <div className="flex justify-between">
              <span>
                Academy Registration
              </span>

              <span>
                ₹1000
              </span>
            </div>

            <div className="flex justify-between">
              <span>
                Students (
                {students.length} × ₹100)
              </span>

              <span>
                ₹
                {students.length *
                  100}
              </span>
            </div>

            <div className="border-t border-black/20 pt-5 flex justify-between text-3xl font-black">

              <span>Total</span>

              <span>
                ₹
                {1000 +
                  students.length *
                    100}
              </span>

            </div>

          </div>

        </div>

        {/* SAVE */}

        <button
          onClick={saveDashboard}
          disabled={loading}
          className="mt-12 w-full bg-orange-500 hover:bg-orange-600 transition py-5 rounded-3xl text-2xl font-black"
        >
          {loading
            ? "Saving..."
            : "Save Dashboard"}
        </button>

      </section>

      <Footer />

    </main>

  );
}