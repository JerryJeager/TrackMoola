"use client";
import { useState } from "react";
import ExpensesForm from "./ExpensesForm";
import IncomeForm from "./IncomeForm";
import BudgetForm from "./BudgetForm";

type CurrentFormType = ('expense' | 'income' | 'budget')

const CreateBudget = () => {
  const [currentForm, setCurrentForm] = useState<CurrentFormType>("budget");
  const handleExpenseForm = () => {
    setCurrentForm("expense");
  };
  const handleIncomeForm = () => {
    setCurrentForm("income");
  };
  const handleBudgetForm = () => {
    setCurrentForm("budget")
  }
  return (
    <div>
      <div className="flex text-white lg:mt-4">
        <button
          onClick={handleBudgetForm}
          className={`select-transaction-form-button ${
            currentForm == "budget" ? "bg-secondary" : "bg-whiteP2"
          }`}
        >
          Budget
        </button>
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
            currentForm == "income" ? "bg-secondary" : "bg-whiteP2"
          }`}
        >
          Income
        </button>
      </div>

      <div className="w-[90%] mx-auto">
        {currentForm == "expense" && <ExpensesForm />}
        {currentForm == "income" && <IncomeForm />}
        {currentForm == 'budget' && <BudgetForm />}
      </div>
    </div>
  );
};

export default CreateBudget;
