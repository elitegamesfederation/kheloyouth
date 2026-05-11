import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDqPFbImxQP1yhFwFidbZPFCGq9RyHlCkQ",

  authDomain: "kheloyouth-60693.firebaseapp.com",

  projectId: "kheloyouth-60693",

  storageBucket: "kheloyouth-60693.firebasestorage.app",

  messagingSenderId: "419651470764",

  appId: "1:419651470764:web:e6bdacfeedc02c42ace609",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);