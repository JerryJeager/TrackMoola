"use client";

import { FaHouse } from "react-icons/fa6";
import { FaWallet } from "react-icons/fa6";
import { CgInsights } from "react-icons/cg";
import { IoMdAddCircle } from "react-icons/io";
import Link from "next/link";

import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bg-primary w-full bottom-0 py-4 lg:py-8 px-[5%] shadow-md border-t-[1px] border-gray-500">
      <ul className="flex justify-between w-full">
        <li>
          <Link href="/dashboard" aria-label="Home">
            <FaHouse
              className={`dashboard-nav-icons ${
                pathname == "/dashboard" ? "text-tertiary" : "text-white"
              }`}
            />
          </Link>
        </li>
        <li>
          <Link href="/dashboard/history" aria-label="Budget Histroy">
            <FaWallet
              className={`dashboard-nav-icons ${
                pathname == "/dashboard/history"
                  ? "text-tertiary"
                  : "text-white"
              }`}
            />
          </Link>
        </li>
        <li>
          <Link href="/dashboard/create" aria-label="Create new Budget">
            <IoMdAddCircle
              className={`dashboard-nav-icons ${
                pathname == "/dashboard/create" ? "text-tertiary" : "text-white"
              }`}
            />
          </Link>
        </li>
        <li>
          <Link href="/dashboard/analysis" aria-label="Budget Analysis">
            <CgInsights
              className={`dashboard-nav-icons ${
                pathname == "/dashboard/analysis"
                  ? "text-tertiary"
                  : "text-white"
              }`}
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
