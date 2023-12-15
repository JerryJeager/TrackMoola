"use client";

import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import { signUpWithEmailAndPassword } from "@/app/auth-server-action/action";
import supabase from "@/app/lib/supabase/server";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
const SignupForm = () => {
  // const supabase = createClientComponentClient()
  const router = useRouter();
  const [isPasswordShown, setIsPassWordShown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const handlePasswordShown = () => {
    setIsPassWordShown((prev) => !prev);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });
    if (error) {
      console.log(error);
    }
    console.log(data);
    router.push('/dashboard')
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="px-4 py-6 lg:px-8 text-white flex flex-col gap-2 lg:gap-4"
    >
      {/* signup */}
      <label>
        <span>First Name</span>
        <input
          type="text"
          className=" w-full mt-1 outline-none p-2"
          placeholder="e.g: Jerry"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <label>
        <span>Last Name</span>
        <input
          type="text"
          className="w-full mt-1 outline-none p-2"
          required
          placeholder="e.g: Jeager"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <label>
        <span>Email</span>
        <input
          type="text"
          className="w-full mt-1 outline-none p-2"
          required
          placeholder="e.g: therumbling@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="relative">
        <span>Password</span>
        <input
          type={isPasswordShown ? "text" : "password"}
          className="w-full mt-1 outline-none py-2 pl-2 pr-8"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handlePasswordShown}
          type="button"
          aria-label="show/hide password"
          role="button"
          className="absolute right-[7px] bottom-[10px]"
        >
          {!isPasswordShown && <FaRegEye />}
          {isPasswordShown && <FaEyeSlash />}
        </button>
      </label>
      <button
        type="submit"
        className="w-[180px] rounded-md p-2 flex justify-center items-center bg-primary mt-4"
      >
        Submit
      </button>
    </form>
  );
};

export default SignupForm;
