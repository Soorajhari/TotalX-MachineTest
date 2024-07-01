// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC87LBI_pkKBCZhBoVZX_t3Lo9IYdCSOOk",
  authDomain: "react-task-a7078.firebaseapp.com",
  projectId: "react-task-a7078",
  storageBucket: "react-task-a7078.appspot.com",
  messagingSenderId: "431871961387",
  appId: "1:431871961387:web:be8618ce3e6746cbf7bd6e",
  measurementId: "G-C894EL235N"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage=getStorage(app)
export const db = getFirestore(app);