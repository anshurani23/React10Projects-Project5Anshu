// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "*****",
  authDomain: "vite-contact-33a5d.firebaseapp.com",
  projectId: "vite-contact-33a5d",
  storageBucket: "vite-contact-33a5d.firebasestorage.app",
  messagingSenderId: "661794449079",
  appId: "1:661794449079:web:d1fbec3789c80262880f32",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
