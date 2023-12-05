"use client";

import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
const SignupForm = () => {
  const router = useRouter()
  const [isPasswordShown, setIsPassWordShown] = useState(false);
  const handlePasswordShown = () => {
    setIsPassWordShown((prev) => !prev);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/dashboard')

  };
  return (
    <form
      onSubmit={handleSubmit}
      className="px-4 py-6 lg:px-8 text-white flex flex-col gap-2 lg:gap-4"
    >
     
      <label>
        <span>Email</span>
        <input
          type="text"
          className="w-full mt-1 outline-none p-2"
          required
          placeholder="e.g: therumbling@gmail.com"
        />
      </label>
      <label className="relative">
        <span>Password</span>
        <input
          type={isPasswordShown ? "text" : "password"}
          className="w-full mt-1 outline-none py-2 pl-2 pr-8"
          required
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
        Login
      </button>
    </form>
  );
};

export default SignupForm;
