import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { FIREBASE_AUTH } from "../Firebase";
import axios from "axios";

export const userContext = createContext<User | null>(null);

export default function App({ Component, pageProps }: AppProps) {
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setUserInfo(user);
        axios.post(`/api/user`, {
          uid: user.uid,
          info: {
            email: user.email,
            name: user.displayName,
            photoUrl: user.photoURL,
          },
        });
      } else {
        setUserInfo(null);
      }
    });
  }, []);

  return (
    <userContext.Provider value={userInfo}>
      <Component {...pageProps} />
    </userContext.Provider>
  );
}
