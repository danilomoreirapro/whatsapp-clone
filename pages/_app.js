import "../styles/globals.css";
import Login from "./login";
import { useEffect, useState } from "react";
import { auth, onAuthStateChanged } from "../firebase.js";
import Loading from "../components/Loading";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    //verificar se o user está logado e atualizar o valor de user
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      return currentUser;
    });
    return unsubscribe;
  }, []);

  if (user === undefined) return <Loading />;
  if (!user) return <Login />;
  return <Component {...pageProps} />;
}

export default MyApp;
