
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 


const firebaseConfig = {
  apiKey: "AIzaSyAmeq2I9DjELfgr4HosVCu-2hCIwR4v_x0",
  authDomain: "bio-website-5f00b.firebaseapp.com",
  projectId: "bio-website-5f00b",
  storageBucket: "bio-website-5f00b.firebasestorage.app",
  messagingSenderId: "425764810895",
  appId: "1:425764810895:web:edbd56d8c8cbf9d01580fa",
  measurementId: "G-WNP6J2MTMX"
};


const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export default app;