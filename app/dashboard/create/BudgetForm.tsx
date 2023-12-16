
import { useState } from "react";
import { transactionDateFormat } from "../../lib/helpers/dateFormat";

const BudgetForm = () => {
  const [date, setDate] = useState(transactionDateFormat());
  const [amount, setAmount] = useState(null);
  const [budgetName, setBudgetName] = useState('');
  const [wallet, setWallet] = useState('');
  const [plan, setPlan] = useState('')
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
          />
        </label>
        <label className="transaction-form-label">
          <span>Plan</span>
          <select
            value={plan}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPlan(e.target.value)}
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
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setWallet(e.target.value)}
            name=""
            id=""
            className="bg-lightBlue"
          >
            <option value="Wallet 1">Wallet 1</option>
            <option value="Wallet 2">Wallet 2</option>
          </select>
        </label>
        <label className="transaction-form-label">
          <span>Budget Amount</span>
          <input
            value={amount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
            type="number"
          />
        </label>
        <label className="transaction-form-label">
          <span>Buget Category Name</span>
          <input
            value={budgetName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBudgetName(e.target.value)}
            type="text"
            placeholder="e.g: Groceries"
          />
        </label>
      </div>
      <button className="p-2 bg-secondary text-white mt-4 lg:mt-8 rounded-md">
        Create Budget
      </button>
    </form>
  );
};

export default BudgetForm;
