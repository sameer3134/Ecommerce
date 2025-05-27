// src/components/admin/firebase/setup.tsx

import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCS_PIIzxFeesre-OARYS5IKuu7SBnpYNY",
  authDomain: "kashika-4516f.firebaseapp.com",
  projectId: "kashika-4516f",
  storageBucket: "kashika-4516f.appspot.com",
  messagingSenderId: "899640913302",
  appId: "1:899640913302:web:d5a7873fc8ec5ce20341b7",
  measurementId: "G-0YFWCCP11M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// 👇 Function Types
export const signInWithGoogle = async (): Promise<User | undefined> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const registerWithEmailPassword = async (
  email: string,
  password: string
): Promise<User | undefined> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const loginWithEmailPassword = async (
  email: string,
  password: string
): Promise<User | undefined> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error(error.message);
  }
};

export { db, auth, onAuthStateChanged };
