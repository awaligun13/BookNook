
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAR3Ew3Ok9U5SN17P8btad30Zc3ZwVKHiI",
  authDomain: "booknook-869f4.firebaseapp.com",
  projectId: "booknook-869f4",
  storageBucket: "booknook-869f4.firebasestorage.app",
  messagingSenderId: "589156847920",
  appId: "1:589156847920:web:655696c15589babc2f78f5",
  measurementId: "G-N5P9SRHQ7Y"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);