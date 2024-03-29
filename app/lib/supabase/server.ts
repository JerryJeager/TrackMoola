// "use server"

// import { createClient } from '@supabase/supabase-js'
// import {cookies} from 'next/headers'


// export  async function createSupabaseServerClient(){
//     const cookieStore = cookies()
//     return createClient(
//         process.env.NEXT_PUBLIC_SUPABASE_URL,
//         process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
//         {
//             cookies: {
//                 get(name){
//                     return cookieStore.get(name).value
//                 },
//                 set(name, value, options){
//                     cookieStore.set({name, value, ...options})
//                 },
//                 remove(name, value, options){
//                     cookieStore.set({name, value, ...options})
//                 }
//             }
//         }
//     )
// }


import { createClient } from '@supabase/supabase-js'
const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey: string =   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


export default supabase