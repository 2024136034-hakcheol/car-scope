import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCEWMBfPO1MEjcqFT1-BFbqFbAdEuz0QRE",
  authDomain: "car-scope.firebaseapp.com",
  projectId: "car-scope",
  storageBucket: "car-scope.firebasestorage.app",
  messagingSenderId: "35160847481",
  appId: "1:35160847481:web:8278cd2d565ca29c5910a8",
  measurementId: "G-LDPLXB5MV9"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();