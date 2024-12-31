// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAam-u1J_ygL2boU7wPpFidlS3VxjajZBY",
  authDomain: "ai-trip-planner-5efe5.firebaseapp.com",
  projectId: "ai-trip-planner-5efe5",
  storageBucket: "ai-trip-planner-5efe5.firebasestorage.app",
  messagingSenderId: "1072913528132",
  appId: "1:1072913528132:web:a71c2645e5119b64535311",
  measurementId: "G-JBQMN7B80B"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);