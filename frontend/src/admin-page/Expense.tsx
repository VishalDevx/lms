import React, { useState, useMemo } from "react";
import AddTransactionModal from "../components/AddExpenseForm";
import { getGreeting } from "../utils/getGreetings";
import DashboardChart from "../components/DashboardChart";
import { ExpenseFormType } from "../types/zod";
import {
  useTransactionsByYear,
  useTransactionsByWeekRaw,
  useTransactionsByMonthRaw,
} from "../hooks/useFinance";

const MAX_ROWS = 7;

// Array of month names
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const ExpenseDashboard: React.FC = () => {
  const greeting = getGreeting();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // default current month

  // -------------------- Queries --------------------
  const { data: transactionByYearData, isLoading: yearLoading, isError: yearError } = useTransactionsByYear();
  const { data: weekDataRaw, isLoading: weekLoading, isError: weekError } = useTransactionsByWeekRaw();
  const { data: monthDataRaw, isLoading: monthLoading, isError: monthError } = useTransactionsByMonthRaw();

  // -------------------- Safe Data Extraction --------------------
  const allWeeklyTransactions: ExpenseFormType[] = Array.isArray(weekDataRaw?.transactions)
    ? weekDataRaw.transactions
    : Array.isArray(weekDataRaw)
    ? weekDataRaw
    : [];

  const allMonthlyTransactionsAll: ExpenseFormType[] = Array.isArray(monthDataRaw?.transactions)
    ? monthDataRaw.transactions
    : Array.isArray(monthDataRaw)
    ? monthDataRaw
    : [];

  // -------------------- Filter by selected month --------------------
  const allMonthlyTransactions = useMemo(() => {
    return allMonthlyTransactionsAll.filter((t) => new Date(t.date).getMonth() === selectedMonth);
  }, [allMonthlyTransactionsAll, selectedMonth]);

  if (yearLoading || weekLoading || monthLoading) return <div className="text-center mt-10">Loading transactions...</div>;
  if (yearError || weekError || monthError) return <div className="text-center mt-10 text-red-600">Error loading transactions</div>;

  // -------------------- Inline SVG Icons --------------------
  const AmountIcon = ({ type }: { type: string }) =>
    type === "CREDIT" ? (
      <svg className="inline h-4 w-4 text-green-600 ml-1" fill="currentColor" viewBox="0 0 20 20">
        <path d="M5 10l5-5 5 5H5z" />
      </svg>
    ) : (
      <svg className="inline h-4 w-4 text-red-600 ml-1" fill="currentColor" viewBox="0 0 20 20">
        <path d="M5 10l5 5 5-5H5z" />
      </svg>
    );

  // -------------------- Table Renderer --------------------
  const renderTableRows = (dataArray: ExpenseFormType[]) =>
    dataArray.slice(0, MAX_ROWS).map((data, idx) => (
      <tr key={idx} className="hover:bg-gray-50 transition">
        <td className="px-4 py-2">{idx + 1}</td>
        <td className="px-4 py-2">
          <div className="font-medium">{data.title}</div>
          <div className="text-xs text-gray-500">{new Date(data.date).toLocaleDateString()}</div>
          {data.description && <div className="text-xs text-gray-400 mt-1 italic">{data.description}</div>}
        </td>
        <td className="px-4 py-2">
          <button
            className={`px-3 py-1 rounded-full font-semibold text-white ${
              data.type === "CREDIT" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
            } transition-all flex items-center gap-1`}
          >
            ₹{data.amount} <AmountIcon type={data.type} />
          </button>
        </td>
      </tr>
    ));

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-56 flex items-center p-10 rounded-b-[50%] shadow-xl">
        <div>
          <h1 className="text-5xl font-bold text-white">{greeting}, Deepak Sir 👋</h1>
          <p className="text-white mt-2 text-lg">Here's your school financial overview</p>
        </div>
      </div>

      {/* Yearly Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-xl space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Income vs Expense (Year)</h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all"
          >
            Add Transaction
          </button>
        </div>
        <DashboardChart
          labels={transactionByYearData?.labels ?? []}
          incomeData={transactionByYearData?.incomeData ?? []}
          expenseData={transactionByYearData?.expenseData ?? []}
          type="area"
          xAxisType="category"
          height={400}
        />
      </div>

      {/* Weekly & Monthly Tables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weekly */}
        <div className="bg-white p-4 rounded-2xl shadow-xl">
          <h3 className="text-lg font-semibold mb-4">Weekly Transactions</h3>
          <div className="overflow-x-auto max-h-[300px] overflow-y-auto">
            <table className="min-w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg">
              <thead className="text-xs uppercase bg-gray-100 sticky top-0">
                <tr>
                  <th className="px-4 py-2">Sr</th>
                  <th className="px-4 py-2">Title & Date</th>
                  <th className="px-4 py-2">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {allWeeklyTransactions.length > 0 ? renderTableRows(allWeeklyTransactions) : (
                  <tr>
                    <td colSpan={3} className="px-4 py-2 text-center text-gray-500">
                      No transactions this week
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Monthly */}
        <div className="bg-white p-4 rounded-2xl shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Monthly Transactions</h3>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {MONTHS.map((month, idx) => (
                <option key={idx} value={idx}>{month}</option>
              ))}
            </select>
          </div>
          <div className="overflow-x-auto max-h-[300px] overflow-y-auto">
            <table className="min-w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg">
              <thead className="text-xs uppercase bg-gray-100 sticky top-0">
                <tr>
                  <th className="px-4 py-2">Sr</th>
                  <th className="px-4 py-2">Title & Date</th>
                  <th className="px-4 py-2">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {allMonthlyTransactions.length > 0 ? renderTableRows(allMonthlyTransactions) : (
                  <tr>
                    <td colSpan={3} className="px-4 py-2 text-center text-gray-500">
                      No transactions this month
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Transaction Modal */}
      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default ExpenseDashboard;
