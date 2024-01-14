"use client";

import { getGreeting } from "../lib/helpers/timeGreeting";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { IoIosArrowDropdown } from "react-icons/io";
import { useEffect, useState } from "react";
// import TransactionCard from "../components/ui/Card";
import { useAuthContext } from "../context/AuthContext";
import { redirect, useRouter } from "next/navigation";
import supabase from "../lib/supabase/server";
import TransactionCard from "../components/ui/Card";
import NewUser from "../components/ui/NewUser";
import Loading from "../components/ui/loading";

const Dashboard = () => {
  const { user } = useAuthContext();
  // console.log(user)
  // console.log(user.id)
  const router = useRouter();
  const [userWallets, setUserWallets] = useState([]);
  const [userBudgets, setUserBudgets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [wallet, setWallet] = useState("");
  const [balance, setBalance] = useState("0");
  const [transactions, setTransactions] = useState([]);
  // const [name, setName] = useState('')
  // console.log(user.user_metadata)
  
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
        // console.log(data[0].id);

        setUserWallets([...data]);
        setWallet(data[0].id)
        getBalance(data[0].id, data);
        getCategories(data[0].id);
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

  const getBalance = (id: string, allWallets: any) => {
    // console.log(userWallets)
    const choosenWalletBalance = allWallets.filter((w) => w.id == id);
    console.log(choosenWalletBalance)
    setBalance(choosenWalletBalance[0].account_balance);
  };

  const getTransactions = async (id: string, categories: any) => {
    try {
      // console.log(wallet)
      // console.log(id)
      const transactionsData = [];

      const { error, data } = await supabase
        .from("expenses")
        .select()
        .eq("wallet_id", id);

      if (error) throw new Error(error.message);
      if (data) {
        console.log(data);
        const expensesArr  = [...data]
        console.log(categories);
        if (data.length > 0) {
          for (let i = 0; i < categories.length; i++) {
            for (let j = 0; j < expensesArr.length; j++) {
              if (categories[i].id === expensesArr[j].category_id) {
                expensesArr[j] = {...expensesArr[j], category_name: categories[i].category_name}
              }
            }
          }
        }
        
        setTransactions(expensesArr);
        // console.log(transactionsData);
        // console.log(expensesArr)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async (id: string) => {
    try {
      // console.log(wallet)
      // console.log(id)

      const { error, data } = await supabase
        .from("categories")
        .select()
        .eq("wallet_id", id);

      if (error) throw new Error(error.message);
      if (data) {
        if (data.length > 0) {
          setUserBudgets([...data]);
          console.log(data);
          getTransactions(id, data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

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

          {userWallets.length < 1 && !isLoading && <NewUser />}
          {userWallets.length > 0 && (
            <div>
              <div className="mx-auto mt-4 w-[90%] flex flex-wrap gap-2 items-center ">
                <p className="text-white ">Select a Wallet :</p>
                <select
                  name=""
                  id=""
                  className="text-tertiary border-b-white"
                  value={wallet}
                  onChange={(e) => {
                    setWallet(e.target.value);
                    getBalance(e.target.value, userWallets);
                    getCategories(e.target.value);
                    // getTransactions(e.target.value);
                  }}
                >
                  <option value="" hidden>
                    Select a Wallet
                  </option>
                  {userWallets.length > 0 &&
                    userWallets.map((w) => (
                      <option key={w.id} value={w.id}>
                        {w.wallet_name}
                      </option>
                    ))}
                </select>
              </div>
              <section className="mx-auto w-[90%] mt-6">
                <div className="w-full lg:w-[320px] rounded-md bg-whiteP2 p-4 ">
                  <p className="text-tertiary">Account Balance</p>
                  <div className="mt-2 flex justify-between text-white">
                    <p
                      className={`${isBalanceShown ? "blur-0" : "blur-[5px]"}`}
                    >
                      &#8358;{balance.toLocaleString()}
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
                  {transactions.map((item, index) => (
                    <TransactionCard key={index} expense={item.expense_name} category={item.category_name} date={item.created_at} amount={item.amount} />
                  ))}
                  {
                    transactions.length < 1 && <p className="text-slate-500">You&#39;ve not made any transactions yet!</p>
                  }
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
