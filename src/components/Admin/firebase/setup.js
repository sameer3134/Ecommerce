import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCS_PIIzxFeesre-OARYS5IKuu7SBnpYNY",
  authDomain: "kashika-4516f.firebaseapp.com",
  projectId: "kashika-4516f",
  storageBucket: "kashika-4516f.firebasestorage.app",
  messagingSenderId: "899640913302",
  appId: "1:899640913302:web:d5a7873fc8ec5ce20341b7",
  measurementId: "G-0YFWCCP11M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
// Sign in with Google
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error(error.message);
  }
};

// Register with Email & Password
const registerWithEmailPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error(error.message);
  }
};

// Login with Email & Password
const loginWithEmailPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error(error.message);
  }
};

// Logout Function
const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error.message);
  }
};

export { db, auth, signInWithGoogle, registerWithEmailPassword, loginWithEmailPassword, logout, onAuthStateChanged };
