import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase config (get this from Firebase Console)
const firebaseConfig = {
    apiKey: "AIzaSyCFD0TRcUo4urNBH2TWp0X7AgTjUonTc14",
    authDomain: "hop-in-website-46ba1.firebaseapp.com",
    projectId: "hop-in-website-46ba1",
    storageBucket: "hop-in-website-46ba1.firebasestorage.app",
    messagingSenderId: "595189280348",
    appId: "1:595189280348:web:347def1587229e51acc099",
    measurementId: "G-21VH3N172E",
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
