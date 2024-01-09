import { useEffect, useState } from "react";
import { transactionDateFormat } from "../../lib/helpers/dateFormat";
import { useAuthContext } from "../../context/AuthContext";
import supabase from "../../lib/supabase/server";
import Spinner from "../../components/ui/Spinner";
import toast, { Toaster } from "react-hot-toast";

const IncomeForm = () => {
  const { user } = useAuthContext();
  const [date, setDate] = useState(transactionDateFormat());
  const [amount, setAmount] = useState(null);
  const [description, setDescription] = useState(null);
  const [name, setName] = useState("");
  const [wallet, setWallet] = useState("");
  const [isLoading, setIsLaoding] = useState(false);
  const [userWallets, setUserWallets] = useState([]);
  const notifySuccess = () => toast("Income Added Successfully.");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsLaoding(true);
      const { error, data } = await supabase.from("income").insert({
        created_at: date,
        income_name: name,
        description: !description ? "" : description,
        amount: amount,
        wallet_id: wallet,
      });
      if (data) {
        console.log(data);
        // updateMainAccountAmount(amount);
        // notifySuccess()
        // setIsLaoding(false);
      } else if (error) {
        throw new Error(error.message);
      }
      updateMainAccountAmount(amount);
    } catch (error) {
      console.log(error);
      // setIsLaoding(false);
    } finally {
      setIsLaoding(false);
      setName("");
      setAmount("");
      setDescription("");
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

  const updateMainAccountAmount = async (inc: number) => {
    await getWallets();
    let currentAmount = userWallets.filter((w) => w.id === Number(wallet));
    try {
      const { error, data } = await supabase
        .from("wallets")
        .update({ account_balance: Number(currentAmount[0].account_balance) + Number(inc) })
        .eq("id", Number(wallet))
        .select();
      if (data) {
        console.log(data);
        notifySuccess();
      }
      if (error) throw new Error(error.message);
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
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
          <label className="transaction-form-label">
            <span>Wallet</span>
            <select
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              name=""
              id=""
              className="bg-lightBlue"
              required
            >
              <option value="" hidden>
                Select a Wallet
              </option>
              {userWallets &&
                userWallets.map((wallet) => (
                  <option key={wallet.id} value={wallet.id}>
                    {wallet.wallet_name}
                  </option>
                ))}
              {userWallets.length < 1 && (
                <option disabled={true}>No available wallets</option>
              )}
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
            <span>Name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="e.g: Salary"
              required
            />
          </label>
          <label className="transaction-form-label">
            <span>Description (optional)</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none h-[50px]"
            ></textarea>
          </label>
        </div>
        <button className="p-2 bg-secondary text-white mt-4 lg:mt-8 rounded-md">
          {!isLoading ? (
            "Add Income"
          ) : (
            <div className="flex items-center gap-2">
              Loading <Spinner />
            </div>
          )}
        </button>
      </form>
      <Toaster
        toastOptions={{
          style: {
            color: "green",
          },
        }}
      />
    </>
  );
};

export default IncomeForm;
