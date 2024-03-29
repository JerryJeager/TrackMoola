"use client"

import { useState, useContext, createContext, useEffect, useMemo } from "react";
import supabase from "../lib/supabase/server";
import { redirect, useRouter } from "next/navigation";

type AuthContextProps = {
    children: React.ReactNode
}

const AuthContext = createContext<any>({});

export const AuthContextProvider = (props: AuthContextProps) => {
  const [user, setUser] = useState({});
  const router = useRouter()

  const onAuthStateChange = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        console.log(user)
        console.log(user.identities[0].user_id)
      }else if(!user){
        // redirect("/auth/login")
        router.push("/auth/login")
      }
    } catch (error) {
      console.log(error);
      // redirect("/auth/login")
      router.push("/auth/login")
    }
  };

  const value = useMemo(() => {
    return {
        user,
        signOut: () => supabase.auth.signOut()
    }
  }, [user])

  useEffect(() => {
    onAuthStateChange();
  }, []);

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};


export const useAuthContext = () => {
    const user = useContext(AuthContext)
    return user
}