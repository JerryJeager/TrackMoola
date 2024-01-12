"use client";
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
import dayjs from "dayjs";
import { useEffect, useState } from "react";

// import faker from 'faker';
import { Pie, Bar } from "react-chartjs-2";
import { dayFormat } from "../../lib/helpers/dateFormat";

type BarChartPropsType = {
  incomeWeeklyTotal: number[];
  expenseWeeklyTotal: number[]
};

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const BarChart = ({ incomeWeeklyTotal, expenseWeeklyTotal }: BarChartPropsType) => {
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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Weekly Transactions chart (₦)",
      },
    },
  };

  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: "Expense",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Income",
        data: [],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  });

  useEffect(() => {
    setData({
      labels,
      datasets: [
        {
          label: "Expense",
          data: [...expenseWeeklyTotal],
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Income",
          data: [...incomeWeeklyTotal],
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    });
  }, [incomeWeeklyTotal, expenseWeeklyTotal]);
  return <Bar options={options} data={data} />;
};

export default BarChart;
