import { transactionDateFormat } from "@/app/lib/helpers/dateFormat";
import { useState } from "react";

const ExpensesForm = () => {
  const [date, setDate] = useState(transactionDateFormat());
  const [amount, setAmount] = useState();
  const [expenseName, setExpenseName] = useState();
  const [description, setDescription] = useState();
  const [budgetCategory, setBudgetCategory] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="text-white  mt-4 p-2 lg:mt-8 lg:p-4"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <label className="transaction-form-label">
          <span>Transaction</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label className="transaction-form-label">
          <span>Budget Category</span>
          <select
            value={budgetCategory}
            onChange={(e) => setBudgetCategory(e.target.value)}
            name=""
            id=""
            className="bg-lightBlue"
          >
            <option value="Groceries">Groceries</option>
            <option value="Health">Health</option>
            <option value="Apparels">Apparels</option>
            <option value="Electronics">Electronics</option>
            <option value="LIfe">Life</option>
          </select>
        </label>
        <label className="transaction-form-label">
          <span>Amount</span>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
          />
        </label>
        <label className="transaction-form-label">
          <span>Expense Name</span>
          <input
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            type="text"
            placeholder="e.g: Garri"
          />
        </label>
        <label className="transaction-form-label">
          <span>Description</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="resize-none h-[50px]"
          ></textarea>
        </label>
      </div>
      <button className="p-2 bg-secondary text-white mt-4 lg:mt-8 rounded-md">
        Add Expense
      </button>
    </form>
  );
};

export default ExpensesForm;
