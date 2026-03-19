// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCCG0txdTGIhS-fLGLdg4Q3HyPvYwZK3gM",
  authDomain: "my-study-hub-28e4b.firebaseapp.com",
  projectId: "my-study-hub-28e4b",
  storageBucket: "my-study-hub-28e4b.firebasestorage.app",
  messagingSenderId: "357678930316",
  appId: "1:357678930316:web:9aa3758b0c39b96f281ea9",
  measurementId: "G-FWCM7LJ4YT"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
