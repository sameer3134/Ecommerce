import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDktd0ajWwue7SW8O6FL1PLHkitYjcUUs4",
  authDomain: "e-commerce-ad213.firebaseapp.com",
  projectId: "e-commerce-ad213",
  storageBucket: "e-commerce-ad213.appspot.com", // ✅ Fixed
  messagingSenderId: "929305349743",
  appId: "1:929305349743:web:601ac98f674a267be8079a",
  measurementId: "G-SBERSQ3XH2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
