// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCiZO5XOOb7EkIEGNjJdGPZOO_cpen6jCA",
  authDomain: "seninhalott.firebaseapp.com",
  projectId: "seninhalott",
  storageBucket: "seninhalott.appspot.com",
  messagingSenderId: "590174658437",
  appId: "1:590174658437:web:0934280185cc6b9591eeec",
  measurementId: "G-QNMPLHQJZG",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);
