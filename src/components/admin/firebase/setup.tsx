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
  apiKey: "AIzaSyAe0pUwXt3IhMZ4QU9lFyK8R7hzrDPy4rw",
  authDomain: "kashika-deda4.firebaseapp.com",
  projectId: "kashika-deda4",
  storageBucket: "kashika-deda4.firebasestorage.app",
  messagingSenderId: "613140894114",
  appId: "1:613140894114:web:4c754d222061b73d1462fb",
  measurementId: "G-6KBCE0YSFW"
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
