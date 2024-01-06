import { useEffect, useState } from "react";
import { transactionDateFormat } from "../../lib/helpers/dateFormat";
import supabase from "../../lib/supabase/server";
import { useAuthContext } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const BudgetForm = () => {
  const { user } = useAuthContext();
  const [date, setDate] = useState(transactionDateFormat());
  const [amount, setAmount] = useState(null);
  const [budgetName, setBudgetName] = useState("");
  const [wallet, setWallet] = useState("");
  const [plan, setPlan] = useState("Weekly");
  const [userWallets, setUserWallets] = useState([]);
  const [maxAmount, setMaxAmount] = useState(0);
  const [error, setError] = useState("");
  const notifySuccess = () => toast("Budget has been Created.")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setError("")
    try {
      e.preventDefault();
      let selectedWallet = userWallets.filter((w) => w.id == wallet);
      console.log(selectedWallet);
      if (selectedWallet[0].account_balance <= amount) {
        setError("Budget Amount is too large for this Wallet");
        return;
      } else if (wallet === "") {
        setError("wallet not choosen");
        return;
      }
      const { error, data } = await supabase.from("categories").insert({
        created_at: date,
        category_name: budgetName,
        amount: amount,
        plan: plan,
        wallet_id: wallet,
      });

      if (error) throw new Error("Budget Category Already Exits");
      else notifySuccess()
    } catch (error) {
      console.log(error);
      setError(error.message);
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

  useEffect(() => {
    getWallets();
  }, []);

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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDate(e.target.value)
              }
            />
          </label>
          <label className="transaction-form-label">
            <span>Plan</span>
            <select
              value={plan}
              required
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setPlan(e.target.value)
              }
              name=""
              id=""
              className="bg-lightBlue"
            >
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </label>
          <label className="transaction-form-label">
            <span>Wallet</span>
            <select
              value={wallet}
              required
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setWallet(e.target.value)
              }
              name=""
              id=""
              className="bg-lightBlue"
            >
              <option value="" hidden>
                select a wallet
              </option>
              {userWallets &&
                userWallets.map((wallet) => (
                  <option key={wallet.id} value={wallet.id}>
                    {wallet.wallet_name}
                  </option>
                ))}
            </select>
          </label>
          <label className="transaction-form-label">
            <span>Budget Amount</span>
            <input
              value={amount}
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAmount(e.target.value)
              }
              type="number"
            />
          </label>
          <label className="transaction-form-label">
            <span>Buget Category Name</span>
            <input
              value={budgetName}
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setBudgetName(e.target.value)
              }
              type="text"
              placeholder="e.g: Groceries"
            />
          </label>
        </div>
        {error && <p className="text-secondary my-2">{error}</p>}
        <button className="p-2 bg-secondary text-white mt-4 lg:mt-8 rounded-md">
          Create Budget
        </button>
      </form>
      <div>
        <Toaster
          toastOptions={{
            style: {
              color: "green",
            },
          }}
        />
      </div>
    </>
  );
};

export default BudgetForm;
