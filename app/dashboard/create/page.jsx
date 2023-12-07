"use client";
import { useState } from "react";
import ExpensesForm from "./ExpensesForm";
import IncomeForm from "./IncomeForm";

const CreateBudget = () => {
  const [currentForm, setCurrentForm] = useState("expense");
  const handleExpenseForm = () => {
    setCurrentForm("expense");
  };
  const handleIncomeForm = () => {
    setCurrentForm("income");
  };
  return (
    <div>
      <div className="flex text-white lg:mt-4">
        <button
          onClick={handleExpenseForm}
          className={`select-transaction-form-button ${
            currentForm == "expense" ? "bg-secondary" : "bg-whiteP2"
          }`}
        >
          Expense
        </button>
        <button
          onClick={handleIncomeForm}
          className={`select-transaction-form-button ${
            currentForm == "expense" ? "bg-whiteP2" : "bg-secondary"
          }`}
        >
          Income
        </button>
      </div>

      <div className="w-[90%] mx-auto">
        {currentForm == "expense" && <ExpensesForm />}
        {currentForm == "income" && <IncomeForm />}
      </div>
    </div>
  );
};

export default CreateBudget;
