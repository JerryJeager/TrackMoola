"use client";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import supabase from "../../lib/supabase/server";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

// import faker from 'faker';
import { Pie, Doughnut } from "react-chartjs-2";
import Loading from "../../components/ui/loading";
import NewUser from "../../components/ui/NewUser";
import dayjs from "dayjs";
import { dayFormat, monthFormat } from "../../lib/helpers/dateFormat";
import BarChart from "../../components/ui/BarChart";
import toast, { Toaster } from "react-hot-toast";
import { getPercentage } from "../../lib/helpers/percentage";
import Spinner from "../../components/ui/Spinner";
import { useRouter } from "next/navigation";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const BudgetAnalysis = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  const [userWallets, setUserWallets] = useState([]);
  const [userBudgets, setUserBudgets] = useState([]);
  const [wallet, setWallet] = useState("");
  const [balance, setBalance] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);

  const [weeklyIncome, setWeeklyIncome] = useState([]);
  const [weeklyExpense, setWeeklyExpense] = useState([]);

  const [budgetCategory, setBudgetCategory] = useState(0);

  const [budgetAmount, setBudgetAmount] = useState(0);

  const [totalExpensesOnBudget, setTotalExpensesOnBudget] = useState(0);

  const notify = (text: string) => toast(text);

  const last7Days = dayjs().subtract(7, "day").format("YYYY-MM-DD");
  const dateLabels = [];
  dateLabels.push(`${dayFormat(dayjs().day())}, ${dayjs().date()}`);
  for (let i = 1; i < 7; i++) {
    dateLabels.push(
      `${dayFormat(dayjs().subtract(i, "day").day())},${dayjs()
        .subtract(i, "day")
        .date()}`
    );
  } // last 7 days
  const labels = [...dateLabels].reverse();

  const dateLabels2 = [];
  dateLabels2.push(dayjs().format("YYYY-MM-DD"));
  for (let i = 1; i < 7; i++) {
    dateLabels2.push(dayjs().subtract(i, "day").format("YYYY-MM-DD"));
  }
  // console.log(dateLabels2)

  const data = {
    labels: ["Expenses(₦)", "Income(₦)"],
    datasets: [
      {
        label: "",
        data: [expense, income],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(75, 192, 192, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const data2 = {
    labels: ["Expenses(₦)", "Budget(₦)"],
    datasets: [
      {
        label: "",
        data: [totalExpensesOnBudget, budgetAmount],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  let totalWeeklyIncome = [];

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

  const getLast7DaysIncome = async (id: string, db: "income" | "expenses") => {
    try {
      const { error, data } = await supabase
        .from(`${db}`)
        .select()
        .eq("wallet_id", id)
        .gt("created_at", last7Days);

      if (data) {
        console.log(data);

        if (data.length > 0) {
          const totalIncome = data.reduce((acc, current) => {
            const date = current.created_at;
            const amount = current.amount;

            const existingEntry = acc.find((entry) => entry.date === date);

            if (existingEntry) {
              existingEntry.total += amount;
            } else {
              acc.push({ date, total: amount });
            }

            return acc;
          }, []);
          // console.log(totalIncome);

          const resultArray = dateLabels2.map((date) => {
            const matchingEntry = totalIncome.find(
              (entry) => entry.date === date
            );
            return matchingEntry ? matchingEntry.total : 0;
          });

          if (db === "income") {
            setWeeklyIncome([...resultArray].reverse());
          } else {
            setWeeklyExpense([...resultArray].reverse());
          }

          // console.log(weeklyExpense)
          // console.log(weeklyIncome)
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserBudgets = async (id: string) => {
    try {
      const { error, data } = await supabase
        .from("categories")
        .select()
        .eq("wallet_id", id);

      if (data) {
        setUserBudgets([...data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalExpensesFromBudget = async (id: string) => {
    try {
      const { error, data } = await supabase
        .from("expenses")
        .select()
        .eq("category_id", id);

      if (data) {
        if (data.length > 1) {
          let total = data.reduce((a, b) => a + b.amount, 0);
          setTotalExpensesOnBudget(total);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBudget = async () => {
    try {
      setIsDeleteLoading(true);
      const { error, data } = await supabase
        .from("categories")
        .delete()
        .eq("id", budgetCategory)
        .select();

      if (data) {
        console.log(data);
        notify("Category Deleted Successfully.");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.id) {
      getWallets();
    }
  }, [user]);

  useEffect(() => {
    setWeeklyExpense([]);
    setWeeklyIncome([]);
  }, [wallet]);

  useEffect(() => {
    if (userBudgets.length < 1 && wallet !== "")
      notify("You've not created any budget category for this wallet");
  }, [userBudgets]);

  return (
    <div className="text-white mx-auto w-[90%] mb-14 mt-4">
      <h2 className="text-xl font-bold">Budget Analysis</h2>
      {isLoading && <Loading />}
      {userWallets.length < 1 && !isLoading && <NewUser />}
      {userWallets.length > 0 && (
        <div className="mt-4">
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
              getLast7DaysIncome(e.target.value, "income");
              getLast7DaysIncome(e.target.value, "expenses");

              getUserBudgets(e.target.value);
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

          <div>
            <p className="text-slate-500 text-sm mt-4">
              {monthFormat(dayjs().month())}, {dayjs().year()}
            </p>
            <BarChart
              incomeWeeklyTotal={weeklyIncome}
              expenseWeeklyTotal={weeklyExpense}
            />
          </div>

          {wallet && (
            <div className="mt-4">
              <label className="flex flex-col md:flex-row gap-4 md:items-center">
                <span className="font-semibold">Budget Category</span>
                <select
                  value={budgetCategory}
                  onChange={(e) => {
                    setBudgetCategory(Number(e.target.value));

                    setBudgetAmount(
                      userBudgets.filter(
                        (category) => category.id == e.target.value
                      )[0].amount
                    );

                    getTotalExpensesFromBudget(e.target.value);
                  }}
                  name=""
                  id=""
                  required
                  className="bg-lightBlue mt-2 "
                >
                  {userBudgets.length < 1 && (
                    <option value="" hidden>
                      No available budget category
                    </option>
                  )}
                  <option value="" hidden>
                    select a Budget
                  </option>
                  {userBudgets &&
                    userBudgets.map((b, key) => (
                      <option key={key} value={b.id}>
                        {b.category_name}
                      </option>
                    ))}
                </select>
              </label>

              <p className="mt-4">
                Budget Amount:
                {budgetAmount ? ` ₦${budgetAmount.toLocaleString()}` : " ₦0"}
              </p>

              <div className="w-[60%] mx-auto">
                <Doughnut data={data2} />
              </div>

              {totalExpensesOnBudget !== 0 && budgetAmount !== 0  && (
                <>
                  <p className="text-slate-500 text-sm mt-2">
                    You have used up{" "}
                    {getPercentage(totalExpensesOnBudget, budgetAmount)}% of
                    your budget
                  </p>

                  <button
                    onClick={deleteBudget}
                    className="rounded-md p-2 text-center w-[140px]text-white bg-[#FF4B4B] mt-4"
                  >
                    {!isDeleteLoading ? "Delete Category" : <Spinner />}
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default BudgetAnalysis;
