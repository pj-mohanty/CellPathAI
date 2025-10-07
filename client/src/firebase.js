// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmeq2I9DjELfgr4HosVCu-2hCIwR4v_x0",
  authDomain: "bio-website-5f00b.firebaseapp.com",
  projectId: "bio-website-5f00b",
  storageBucket: "bio-website-5f00b.firebasestorage.app",
  messagingSenderId: "425764810895",
  appId: "1:425764810895:web:edbd56d8c8cbf9d01580fa",
  measurementId: "G-WNP6J2MTMX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);