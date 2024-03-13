import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAyQjTZ9somNj_6aM7HfhjVoiXcWjE2gyA",
  authDomain: "expense-c2d67.firebaseapp.com",
  projectId: "expense-c2d67",
  storageBucket: "expense-c2d67.appspot.com",
  messagingSenderId: "647646538830",
  appId: "1:647646538830:web:b4c56754f1d05c185a271f",
  measurementId: "G-GE2HVC7LZN",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
