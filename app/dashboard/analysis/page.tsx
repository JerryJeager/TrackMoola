"use client";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import supabase from "../../lib/supabase/server";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import Loading from "../../components/ui/loading";

ChartJS.register(ArcElement, Tooltip, Legend);

const BudgetAnalysis = () => {
  const { user } = useAuthContext();
  const [userWallets, setUserWallets] = useState([]);
  const [wallet, setWallet] = useState("");
  const [balance, setBalance] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);

  const data = {
    labels: ["Expenses", "Income"],
    datasets: [
      {
        label: "",
        data: [expense, income],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
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
        setUserWallets([...data]);
      } else if (data.length < 1) {
        console.log("no available wallets");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getBalance = (id: string) => {
    const choosenWalletBalance = userWallets.filter((w) => w.id == id);
    setBalance(choosenWalletBalance[0].account_balance);
  };

  const getTotalTransactionAmount = async (
    id: string,
    db: "income" | "expenses"
  ) => {
    const { error, data } = await supabase
      .from(`${db}`)
      .select()
      .eq("wallet_id", id);

    if (error) throw new Error(error.message);
    if (data) {
      // console.log(data);
      const total = data.reduce((a, b) => a + b.amount, 0);
      // console.log(total);
      if (db === "income") {
        setIncome(total);
      } else {
        setExpense(total);
      }
    }
  };

  useEffect(() => {
    if (user && user.id) {
      getWallets();
    }
  }, [user]);
  return (
    <div className="text-white mx-auto w-[90%] mt-4">
      <h2 className="text-xl font-bold">Budget Analysis</h2>
      {isLoading && <Loading />}
      {userWallets.length > 0 && (
        <div>
          <select
            name=""
            id=""
            className="text-tertiary border-b-white"
            value={wallet}
            onChange={(e) => {
              setWallet(e.target.value);
              getBalance(e.target.value);
              getTotalTransactionAmount(e.target.value, "income");
              getTotalTransactionAmount(e.target.value, "expenses"); // getCategories(e.target.value);
              // getTransactions(e.target.value);
            }}
          >
            <option value="" hidden>
              Select a Wallet
            </option>
            {userWallets &&
              userWallets.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.wallet_name}
                </option>
              ))}
          </select>

          <div>
            <p className="mt-4">
              Account Balance:{" "}
              {balance ? (
                <span>&#8358;{balance.toLocaleString()}</span>
              ) : (
                <span>&#8358;0</span>
              )}
            </p>
          </div>

          <div className="w-[60%] lg:w-[300px] mx-auto mt-4 lg:mx-6">
            {income !== 0 || expense !== 0 ? (
              <Pie data={data} />
            ) : (
              <p className="text-slate-500 mt-4">
                You&#39;ve not made any transactions yet!
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetAnalysis;
