// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEWMBfPO1MEjcqFT1-BFbqFbAdEuz0QRE",
  authDomain: "car-scope.firebaseapp.com",
  projectId: "car-scope",
  storageBucket: "car-scope.firebasestorage.app",
  messagingSenderId: "35160847481",
  appId: "1:35160847481:web:8278cd2d565ca29c5910a8",
  measurementId: "G-LDPLXB5MV9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);