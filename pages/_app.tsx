import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { FIREBASE_AUTH } from "../Firebase";

export const userContext = createContext<User | null>(null);

export default function App({ Component, pageProps }: AppProps) {
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setUserInfo(user);
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
