import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB6WCj65abCz85Ze2V801jBrtdqtgjQE78",
  authDomain: "whatsapp-clone-4ca5f.firebaseapp.com",
  projectId: "whatsapp-clone-4ca5f",
  storageBucket: "whatsapp-clone-4ca5f.appspot.com",
  messagingSenderId: "492009265369",
  appId: "1:492009265369:web:21ae2b286e5f3d955806c8",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
