"use server"

import createSupabaseServerClient from "@/app/lib/supabase/server"


export  const signUpWithEmailAndPassword = async (email, password) => {


    const supabase = await createSupabaseServerClient()

    const result = supabase.auth.signUpNewUser({email, password})

    return JSON.stringify(result)
}