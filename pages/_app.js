import "../styles/globals.css";
import Login from "./login";
import { useEffect, useState } from "react";
import db, { auth, onAuthStateChanged } from "../firebase.js";
import Loading from "../components/Loading";
import { collection, setDoc, doc, serverTimestamp } from "firebase/firestore";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(undefined);
  const usersRef = collection(db, "users");

  useEffect(() => {
    //verificar se o user está logado e atualizar o valor de user
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const { uid, email, photoURL, displayName } = currentUser;
        setDoc(
          doc(usersRef, uid),
          {
            displayName,
            email,
            photoURL,
            lastSeen: serverTimestamp(),
          },
          { merge: true }
        );
      }
      return currentUser;
    });
    return unsubscribe;
  }, []);

  if (user === undefined) return <Loading />;
  if (!user) return <Login />;
  return <Component {...pageProps} />;
}

export default MyApp;
