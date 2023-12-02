"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "./trackMoolalogo2.png";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const router = useRouter();
  return (
    <nav className=" pt-4 lg:pt-8 px-[5%] pb-4 flex items-center justify-between border-b-[1px] border-[#E3823C]">
      <div>
        <Link className="flex gap-2 items-center" href="/">
          <Image
            src={logo}
            width={55}
            placeholder="blur"
            alt="Trackmoola logo"
          />
          <h1 className="font-black text-[#E3823C] text-xl lg:text-3xl ">Trackmoola</h1>
        </Link>
      </div>
      <div>
        <button
          onClick={() => router.push("/login")}
          className="bg-[#E3823C] text-white rounded-md flex justify-center items-center p-2"
        >
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
