// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-f97fb.firebaseapp.com",
  projectId: "mern-estate-f97fb",
  storageBucket: "mern-estate-f97fb.appspot.com",
  messagingSenderId: "169594524363",
  appId: "1:169594524363:web:80e39a9e9cfc336f20c14e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);