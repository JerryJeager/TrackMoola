"use client";

import { useEffect, useState } from "react";
import supabase from "../../lib/supabase/server";
import { useAuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const WalletForm = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  const [name, setName] = useState("");
  const [balance, setBalance] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [userWallets, setUserWallets] = useState([]);

  const notifySuccess = () => toast("Wallet Created Successfully.");
  const getWallets = async () => {
    try {
      const { error, data } = await supabase
        .from("wallets")
        .select()
        .eq("user_id", user.id);

      // console.log(data)

      setUserWallets([...data].reverse());
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getWallets();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setError("");
    try {
      e.preventDefault();
      console.log(name, balance);

      const { data, error } = await supabase.from("wallets").insert({
        wallet_name: name,
        account_balance: balance,
        user_id: user.id,
      });

      if (error) throw new Error(error.code);
      else notifySuccess();
    } catch (error) {
      console.log(error);
      if (error.message === "23505") setError(`Wallet ${name} already Exists!`);
      // console.log(error.code)
    } finally {
      getWallets();
    }
  };
  return (
    <>
      <ul className="list-disc ml-8 mt-2">
        {userWallets &&
          userWallets.map((wallet, key) => (
            <li key={key}>{wallet.wallet_name}</li>
          ))}
      </ul>
      <form
        onSubmit={handleSubmit}
        className="w-full lg:w-[50%] mt-8  p-4 bg-whiteP2 backdrop-blur-[40px] rounded-2xl "
      >
        <h3 className="mt-2 font-bold text-tertiary">+ New Wallet</h3>
        <p className="text-gray-400 text-xs mb-4">
          Having multiple wallets let&#39;s you monitor expense on multiple
          accounts.
        </p>
        <div className="flex flex-col gap-4">
          <label>
            <span>Wallet Name :</span>
            <input
              type="text"
              className="w-full bg-primary outline-none p-2  border-whiteP5 rounded-md"
              placeholder="e.g: Wallet 1"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            <span>Account Balance :</span>
            <input
              type="number"
              max="9000000000000"
              className="w-full bg-primary border-whiteP5 rounded-md  outline-none p-2"
              required
              value={balance}
              onChange={(e) => setBalance(Number(e.target.value))}
            />
          </label>
          {error && <p className="text-secondary my-1">{error}</p>}
        </div>
        <button className="bg-secondary rounded-md p-2 mt-2">Save</button>
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

export default WalletForm;
