"use client";

import { getGreeting } from "../lib/helpers/timeGreeting";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import TransactionCard from "../components/dashboard/Card";

const Dashboard = () => {
  const dummyTransactionData = [
    {
      expense: "Cough Drugs",
      category: "Health",
      date: "Dec 6, 2023",
      amount: "45.00",
    },
    {
      expense: "Garri",
      category: "Groceries",
      date: "Dec 5, 2023",
      amount: "3,200.00",
    },
    {
      expense: "Groundnut",
      category: "Groceries",
      date: "Dec 4, 2023",
      amount: "1,200.00",
    },
    {
      expense: "3 Notesbooks",
      category: "School",
      date: "Dec 3, 2023",
      amount: "840.00",
    },
  ];
  const [isBalanceShown, setIsBalanceShown] = useState(false);
  const handleShownBalance = () => {
    setIsBalanceShown((prev) => !prev);
  };
  return (
    <>
      <section className="text-white bg-homeRadialBg4 bg-center  px-[5%] pt-4 lg:pt-8 rounded-lg">
        <h2 className="font-bold text-2xl lg:text-3xl mt-4 lg:mt-8">
          {getGreeting()}
        </h2>
        <p className="font-bold text-xl lg:text-2xl">Jeager</p>
      </section>

      <section className="mx-auto w-[90%] mt-6">
        <div className="w-full lg:w-[320px] rounded-md bg-whiteP2 py-4 px-2 ">
          <p className="text-tertiary">Account Balance</p>
          <div className="mt-2 flex justify-between text-white">
            <p className={`${isBalanceShown ? "blur-0" : "blur-[5px]"}`}>
              $2,000,000
            </p>
            <button onClick={handleShownBalance}>
              {isBalanceShown && <FaEyeSlash />}
              {!isBalanceShown && <FaRegEye />}
            </button>
          </div>
        </div>
      </section>

      <section className="w-[90%] mx-auto mt-4">
        <h2 className="text-white text-md lg:text-2xl">My Transactions</h2>
        <div className="mt-2 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {
            dummyTransactionData.map((item, index) => (
               <TransactionCard key={index} {...item} />
            ))
          }
        </div>
      </section>
    </>
  );
};

export default Dashboard;
