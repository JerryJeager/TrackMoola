import { useEffect, useState } from "react";
import { transactionDateFormat } from "../../lib/helpers/dateFormat";
import { useAuthContext } from "../../context/AuthContext";
import supabase from "../../lib/supabase/server";
import toast, { Toaster } from "react-hot-toast";

const ExpensesForm = () => {
  const { user } = useAuthContext();
  const [date, setDate] = useState(transactionDateFormat());
  const [amount, setAmount] = useState(null);
  const [expenseName, setExpenseName] = useState("");
  const [wallet, setWallet] = useState("");
  const [description, setDescription] = useState("");
  const [budgetCategory, setBudgetCategory] = useState(0);
  const [userWallets, setUserWallets] = useState([]);
  const [userBudgets, setUserBudgets] = useState([]);
  const [error, setError] = useState("");

  const notify = (content: string) => toast(content);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setError("");
      // console.log(budgetCategory)
      let selectedBudget = userBudgets.filter((b) => b.id == budgetCategory);
      console.log(budgetCategory);
      console.log(typeof budgetCategory);
      if (selectedBudget[0].amount < amount) {
        setError("Expense Amount Exceeds Budget");
        return;
      }

      let { error, data } = await supabase
        .from("expenses")
        .insert({
          created_at: date,
          expense_name: expenseName,
          amount: amount,
          description: description,
          category_id: Number(budgetCategory),
        })
        .select();

      if (error) throw new Error(error.message);
      if (data) {
        notify("Expense Added Succesfully");
        setAmount('');
        setExpenseName("");
        setDescription("");
      }

      updateBudgetAmount(amount);
      updateMainAccountAmount(amount);
    } catch (error) {
      console.log(error);
    }
  };

  const getWallets = async () => {
    try {
      const { error, data } = await supabase
        .from("wallets")
        .select()
        .eq("user_id", user.id);

      console.log(data);
      setUserWallets([...data]);
    } catch (error) {
      console.log(error);
    }
  };

  const getBudgets = async (id: string) => {
    try {
      // console.log(wallet)
      // console.log(id)

      const { error, data } = await supabase
        .from("categories")
        .select()
        .eq("wallet_id", id);

      if (error) throw new Error(error.message);
      if (data) setUserBudgets(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateBudgetAmount = async (exp: number) => {
    getBudgets(wallet)
    try {
      let currentAmount = userBudgets.filter(
        (budget) => budget.id === Number(budgetCategory)
      );
      // console.log(typeof budgetCategory)
      console.log(currentAmount);

      const { error, data } = await supabase
        .from("categories")
        .update({ amount: currentAmount[0].amount - exp })
        .eq("id", budgetCategory)
        .select();

      if (data) console.log(data);
      if (error) throw new Error(error.message);
    } catch (error) {
      console.log(error);
    }
  };

  const updateMainAccountAmount = async (exp: number) => {
    getWallets()
    console.log(userWallets)
    let currentAmount = userWallets.filter(
      (w) => w.id === Number(wallet)
    );
    console.log(currentAmount)
    console.log(wallet)
    try {
      const { error, data } = await supabase
        .from("wallets")
        .update({ account_balance: currentAmount[0].account_balance - exp })
        .eq("id", Number(wallet))
        .select();

      if (data) console.log(data);
      if (error) throw new Error(error.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWallets();
  }, []);

  useEffect(() => {
    if (userBudgets.length < 1 && wallet !== "")
      notify("You've not created any budget category for this wallet");
  }, [userBudgets]);
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="text-white  mt-4 p-2 lg:mt-8 lg:p-4"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <label className="transaction-form-label">
            <span>Date</span>
            <input
              className="w-full"
              type="date"
              value={date}
              required
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <label className="transaction-form-label">
            <span>Wallet</span>
            <select
              value={wallet}
              onChange={(e) => {
                setWallet(e.target.value);
                getBudgets(e.target.value);
              }}
              name=""
              id=""
              required
              className="bg-lightBlue"
            >
              <option value="" hidden>
                Select a Wallet
              </option>
              {userWallets &&
                userWallets.map((w, key) => (
                  <option key={key} value={w.id}>
                    {w.wallet_name}
                  </option>
                ))}
            </select>
          </label>
          <label className="transaction-form-label">
            <span>Budget Category</span>
            <select
              value={budgetCategory}
              onChange={(e) => {
                setBudgetCategory(Number(e.target.value));
              }}
              name=""
              id=""
              required
              className="bg-lightBlue"
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
          <label className="transaction-form-label">
            <span>Amount</span>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              required
            />
          </label>
          <label className="transaction-form-label">
            <span>Expense Name</span>
            <input
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
              type="text"
              required
              placeholder="e.g: Garri"
            />
          </label>
          <label className="transaction-form-label">
            <span>Description</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none h-[50px]"
              required
            ></textarea>
          </label>
        </div>
        {error && <p className="text-secondary my-1">{error}</p>}
        <button className="p-2 bg-secondary text-white mt-4 lg:mt-8 rounded-md">
          Add Expense
        </button>
      </form>

      <Toaster />
    </>
  );
};

export default ExpensesForm;
