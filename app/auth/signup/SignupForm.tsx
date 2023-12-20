"use client";

import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "../../lib/supabase/server";

const SignupForm = () => {
  const router = useRouter();
  const [isPasswordShown, setIsPassWordShown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const handlePasswordShown = () => {
    setIsPassWordShown((prev) => !prev);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      console.log(error.message);
      setError(error?.message);
    } else if (data) {
      console.log(data);
      router.push("/dashboard");
    }
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

      <p className="my-2 text-[#FF4B4B]">{error}</p>

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
