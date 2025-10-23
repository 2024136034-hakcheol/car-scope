import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCEWMBP01MEjcqFT1-BFbqFbAdEuz0QRE",
  authDomain: "car-scope.firebaseapp.com",
  projectId: "car-scope",
  storageBucket: "car-scope.firebasestorage.app",
  messagingSenderId: "35160847481",
  appId: "1:35160847481:web:8278c2d565ca29c5910a8",
  measurementId: "G-LDPLXB5MV9"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);