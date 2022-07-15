import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB6WCj65abCz85Ze2V801jBrtdqtgjQE78",
  authDomain: "whatsapp-clone-4ca5f.firebaseapp.com",
  projectId: "whatsapp-clone-4ca5f",
  storageBucket: "whatsapp-clone-4ca5f.appspot.com",
  messagingSenderId: "492009265369",
  appId: "1:492009265369:web:21ae2b286e5f3d955806c8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore();

export { provider, auth, onAuthStateChanged, signInWithPopup, signOut };
export default db;
