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
import { Pie, Bar } from "react-chartjs-2";
import Loading from "../../components/ui/loading";
import NewUser from "../../components/ui/NewUser";
import dayjs from "dayjs";
import { dayFormat, monthFormat } from "../../lib/helpers/dateFormat";

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
  const [userWallets, setUserWallets] = useState([]);
  const [wallet, setWallet] = useState("");
  const [balance, setBalance] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);
  
  const [weeklyIncome, setWeeklyIncome] = useState([])

  const last7Days = dayjs().subtract(7, "day").format("YYYY-MM-DD");
  const dateLabels = []
  dateLabels.push(`${dayFormat(dayjs().day())}, ${dayjs().date()}`)
  for(let i = 1; i < 7; i++){
    dateLabels.push(`${dayFormat(dayjs().subtract(i, "day").day())},${dayjs().subtract(i, 'day').date()}`)
  } // last 7 days
  const labels = [...dateLabels].reverse();
  

  const dateLabels2 = []
  dateLabels2.push(dayjs().format("YYYY-MM-DD"))
  for(let i  = 1; i < 7; i++){
    dateLabels2.push(dayjs().subtract(i, 'day').format("YYYY-MM-DD"))
  }
  // console.log(dateLabels2)

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Weekly Transactions chart",
      },
    },
  };

  const data = {
    labels: ["Expenses", "Income"],
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
    labels,
    datasets: [
      {
        label: "Expense",
        data: [2300, 500, 1000, 1500, 800, 0, 400, 450],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Income",
        data: [0, 2000, 500, 0, 0, 0, 5000],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
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

  const getLast7DaysIncome = async (id: string) => {
    try {
      const { error, data } = await supabase
        .from("income")
        .select()
        .eq("wallet_id", id)
        .gt("created_at", last7Days);

      if (data) {
        console.log(data);

        if (data.length > 0) {
          const totalIncome = [];
          let groupedByDate = Object.groupBy(
            data,
            ({ created_at }) => created_at
          );
          for (let item in groupedByDate) {
            totalIncome.push({
              date: item,
              total: groupedByDate[item].reduce((a, b) => a + b.amount, 0),
            });
          }
          console.log(totalIncome);

          // for(let item in dateLabels2){

          // }

          console.log(weeklyIncome)
        }
      }
    } catch (error) {
      console.log(error);
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
              getLast7DaysIncome(e.target.value);
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
          <p className="text-slate-500 text-sm mt-4">{monthFormat(dayjs().month())} , {dayjs().year()}</p>
          <Bar options={options} data={data2} />
        </div>
      )}
    </div>
  );
};

export default BudgetAnalysis;
