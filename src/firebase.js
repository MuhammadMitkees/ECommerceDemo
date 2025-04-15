import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDHOBYARw0j98HDpDbjfi4skrXuIlUfyC8",
  authDomain: "ecommercedemo-403ac.firebaseapp.com",
  projectId: "ecommercedemo-403ac",
  storageBucket: "ecommercedemo-403ac.firebasestorage.app",
  messagingSenderId: "870437169455",
  appId: "1:870437169455:web:96f89c33156c42c80c59da",
  measurementId: "G-21TJGNTFCG",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const storage = getStorage(app);
export { auth, db, googleProvider, storage };
