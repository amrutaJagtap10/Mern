// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth , signInWithEmailAndPassword} from "firebase/auth"; // For Authentication
import { getFirestore } from "firebase/firestore"; // For Firestore Database
import { getStorage } from "firebase/storage"; // For Storage (optional)


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCr69_0Fik9EUblm50BZpVObvbxm6QFdno",
  authDomain: "ebussystem.firebaseapp.com",
  projectId: "ebussystem",
  storageBucket: "ebussystem.firebasestorage.app",
  messagingSenderId: "1025760446424",
  appId: "1:1025760446424:web:f5b2de29d8e09a787ad4ad",
  measurementId: "G-W4EQB9DGJ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export { signInWithEmailAndPassword };

export default app;
