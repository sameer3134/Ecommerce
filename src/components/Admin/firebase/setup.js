import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDktd0ajWwue7SW8O6FL1PLHkitYjcUUs4",
  authDomain: "e-commerce-ad213.firebaseapp.com",
  projectId: "e-commerce-ad213",
  storageBucket: "e-commerce-ad213.appspot.com",
  messagingSenderId: "929305349743",
  appId: "1:929305349743:web:601ac98f674a267be8079a",
  measurementId: "G-SBERSQ3XH2"
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
