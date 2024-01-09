"use server"

import { useAuthContext } from "../../context/AuthContext"
import supabase from "../supabase/server";

const getUserWallets = async () => {
    const { user } =  useAuthContext()

    try {
      const { error, data } = await supabase
        .from("wallets")
        .select()
        .eq("user_id", user.id);

      if(data){
        console.log(data)
        return data
      }else{
        return error
      }
    } catch (error) {
      console.log(error);
    }
}

export default getUserWallets