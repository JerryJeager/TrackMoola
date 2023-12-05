"use client"
import Image from "next/image";
import Link from "next/link";
import logo from "./trackMoolalogo2.png";
import { usePathname } from "next/navigation";
const Navbar = () => {
  const pathname  = usePathname()

  return (
    <nav className="pt-4 lg:pt-8 px-[5%] pb-4 flex items-center justify-between  shadow-md">
      <div>
        <Link className="flex gap-2 items-center" href="/">
          <Image
            src={logo}
            width={55}
            placeholder="blur"
            alt="Trackmoola logo"
          />
          <h1 className="font-black logo-h text-xl lg:text-3xl ">
            Trackmoola
          </h1>
        </Link>
      </div>
      <div>
      {
        pathname.includes('/auth') &&
        <Link href={pathname == '/auth/signup' ? '/auth/login' : '/auth/signup'}>
          <button className="bg-[#E3823C] text-white rounded-md flex justify-center items-center p-1 w-[90px]">
            {pathname == '/auth/signup' && <span>Login</span>}
            {pathname == '/auth/login' && <span>Sign Up</span>}
            {pathname == '/' && <span>Sign Up</span>}
          </button>
        </Link>
        }
        {
          pathname == '/' && 
          <Link href='/auth/signup'>
            <button className="bg-[#E3823C] text-white rounded-md flex justify-center items-center p-1 w-[90px]">
              Sign Up
            </button>
          </Link>
        }
      </div>
    </nav>
  );
};

export default Navbar;
