// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: "watercurtain-39c47",
  storageBucket: "watercurtain-39c47.firebasestorage.app",
  messagingSenderId: "574153829306",
  appId: "1:574153829306:web:811b8b08c9cd6de25a4b83",
  measurementId: "G-71KMRE827E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// Firebase authentication with Google
export const provider = new GoogleAuthProvider();

// Firebase authentication
export const auth = getAuth(app);

// Firebase firestore
export const db = getFirestore(app);