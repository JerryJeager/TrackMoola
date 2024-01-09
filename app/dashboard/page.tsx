"use client";

import { getGreeting } from "../lib/helpers/timeGreeting";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { IoIosArrowDropdown } from "react-icons/io";
import { useEffect, useState } from "react";
// import TransactionCard from "../components/ui/Card";
import { useAuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import supabase from "../lib/supabase/server";
import TransactionCard from "../components/ui/Card";
import NewUser from "../components/ui/NewUser";
import getUserWallets from "../lib/actions";
import Loading from "../components/ui/loading";

const Dashboard = () => {
  const { user } = useAuthContext();
  // console.log(user)
  // console.log(user.id)
  const router = useRouter();
  const [userWallets, setUserWallets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [wallet, setWallet] = useState("");
  const [balance, setBalance] = useState("xxx");
  // const [name, setName] = useState('')
  // console.log(user.user_metadata)
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
      expense: "3 Notebooks",
      category: "School",
      date: "Dec 3, 2023",
      amount: "840.00",
    },
  ];
  const [isBalanceShown, setIsBalanceShown] = useState(false);
  const [isTransactionShown, setIsTransactionShown] = useState(false);
  const handleShownBalance = () => {
    setIsBalanceShown((prev) => !prev);
  };
  const handleShownTransaction = () => {
    setIsTransactionShown((prev) => !prev);
  };

  const getWallets = async () => {
    setIsLoading(true);
    try {
      const { error, data } = await supabase
        .from("wallets")
        .select()
        .eq("user_id", user.id);

      if (data.length > 0) {
        console.log(data);
        setUserWallets([...data].reverse());
        setIsLoading(false);
      } else if (data.length < 1) {
        console.log("no available wallets");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (user && user.id) {
      getWallets();
    }
  }, [user]);

  const getBalance = (id: string) => {
    const choosenWalletBalance = userWallets.filter((w) => w.id == id);
    setBalance(choosenWalletBalance[0].account_balance);
  };

  const getTransactions = (id: string) => {

  }

  const getCategories = (id: string) => {
    
  }

  return (
    <>
      {isLoading && <Loading />}
      {Object.keys(user).length > 0 && user.user_metadata && (
        <div>
          <section className="text-white bg-homeRadialBg4 bg-center  px-[5%] pt-4 lg:pt-8 rounded-lg">
            <h2 className="font-bold text-2xl lg:text-3xl mt-4 lg:mt-8">
              {getGreeting()}
            </h2>
            <p className="font-bold text-xl lg:text-2xl">
              {user.user_metadata.first_name}
            </p>
          </section>

          <div className="mx-auto w-[90%]">
            <select
              name=""
              id=""
              className="text-tertiary border-b-white"
              value={wallet}
              onChange={(e) => {
                setWallet(e.target.value);
                getBalance(e.target.value);
              }}
            >
              <option value="" hidden>
                Select a Wallet
              </option>
              {userWallets &&
                userWallets.map((w) => (
                  <option value={w.id}>{w.wallet_name}</option>
                ))}
            </select>
          </div>

          {userWallets.length < 1 && !isLoading && <NewUser />}
          {userWallets.length > 0 && (
            <div>
              <section className="mx-auto w-[90%] mt-6">
                <div className="w-full lg:w-[320px] rounded-md bg-whiteP2 p-4 ">
                  <p className="text-tertiary">Account Balance</p>
                  <div className="mt-2 flex justify-between text-white">
                    <p
                      className={`${isBalanceShown ? "blur-0" : "blur-[5px]"}`}
                    >
                      &#8358;{balance}
                    </p>
                    <button
                      aria-label="show/hide balance"
                      onClick={handleShownBalance}
                    >
                      {isBalanceShown && <FaEyeSlash />}
                      {!isBalanceShown && <FaRegEye />}
                    </button>
                  </div>
                </div>
              </section>

              <section className="w-[90%] mx-auto mt-4">
                <div className="flex justify-between lg:justify-normal lg:gap-8">
                  {" "}
                  <h2 className="text-white text-md lg:text-2xl">
                    My Transactions
                  </h2>
                  <button onClick={() => handleShownTransaction()}>
                    <IoIosArrowDropdown
                      className={`scale-[1.5] text-white ${
                        isTransactionShown ? "rotate-[540deg]" : "rotate-0"
                      }  duration-[.4] transition`}
                    />
                  </button>
                </div>
                <div
                  className={`${
                    isTransactionShown ? "grid" : "hidden"
                  } mt-2 grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6`}
                >
                  {dummyTransactionData.map((item, index) => (
                    <TransactionCard key={index} {...item} />
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Dashboard;
