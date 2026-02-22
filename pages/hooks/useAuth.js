import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../library/firebaseConfig";

export const useAuth = () => {
  const [user, setUser] = useState(undefined); 

  useEffect(() => {//if auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {//if someone logs in, change user to their information
      setUser(currentUser);
    });

    return () => unsubscribe();//clear out the function
  }, []);

  return user;
};