import React from "react";
import DashboardChart from "../components/DashboardChart";
import {
  useExpenseByMonth,
  useExpenseByYear,
  useExpenseByWeek,
  useIncomeByMonth,
  useIncomeByYear,
  useIncomeByWeek,
} from "../hooks/useFinance";
import { getGreeting } from "../utils/getGreetings";

const DashBoard = () => {
  // -------------------- Fetch Data --------------------
  const { data: expenseByYearData, isLoading: expenseYearLoading, error: expenseYearError } = useExpenseByYear();
  const { data: incomeByYearData, isLoading: incomeYearLoading, error: incomeYearError } = useIncomeByYear();
  
  const { data: expenseByMonthData, isLoading: expenseMonthLoading, error: expenseMonthError } = useExpenseByMonth();
  const { data: incomeByMonthData, isLoading: incomeMonthLoading, error: incomeMonthError } = useIncomeByMonth();
  
  const { data: expenseByWeekData, isLoading: expenseWeekLoading, error: expenseWeekError } = useExpenseByWeek();
  const { data: incomeByWeekData, isLoading: incomeWeekLoading, error: incomeWeekError } = useIncomeByWeek();

  const loading =
    expenseYearLoading ||
    incomeYearLoading ||
    expenseMonthLoading ||
    incomeMonthLoading ||
    expenseWeekLoading ||
    incomeWeekLoading;

  const error =
    expenseYearError ||
    incomeYearError ||
    expenseMonthError ||
    incomeMonthError ||
    expenseWeekError ||
    incomeWeekError;

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error fetching data</div>;

  // -------------------- Calculations --------------------
  const yearBalance = (incomeByYearData?.totalIncome ?? 0) - (expenseByYearData?.totalExpense ?? 0);

  const greeting = getGreeting();

  // -------------------- Prepare chart arrays --------------------
  // Month chart: single month data
  const monthLabels = ["This Month"];
  const monthIncomeData = [incomeByMonthData?.totalIncome ?? 0];
  const monthExpenseData = [expenseByMonthData?.totalExpense ?? 0];

  // Week chart: convert API data to arrays
  // Assuming your API now returns { labels: string[], incomeData: number[] }
  const weekLabels = incomeByWeekData?.labels ?? ["Week"];
  const weekIncomeData = incomeByWeekData?.incomeData ?? [0];
  const weekExpenseData = expenseByWeekData?.expenseData ?? [0];

  return (
    <div className="p-6 space-y-6">
      {/* Greeting */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-48 flex flex-col justify-center pl-10 rounded-b-[50%]">
        <h1 className="text-4xl font-bold text-white">{greeting}, Admin 👋</h1>
        <p className="text-white mt-2">Here's your school overview</p>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 -mt-12">
        <div className="bg-gradient-to-r from-green-100 to-green-200 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform">
          <h2 className="text-lg font-semibold text-green-700 mb-2">Total Students</h2>
          <p className="text-2xl font-bold text-green-800">{0}</p>
        </div>
        <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform">
          <h2 className="text-lg font-semibold text-blue-700 mb-2">Total Staff</h2>
          <p className="text-2xl font-bold text-blue-800">{0}</p>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-green-200 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform">
          <h2 className="text-lg font-semibold text-green-700 mb-2">Total Income (Year)</h2>
          <p className="text-2xl font-bold text-green-800">₹{incomeByYearData?.totalIncome ?? 0}</p>
        </div>
        <div className="bg-gradient-to-r from-red-50 to-red-200 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform">
          <h2 className="text-lg font-semibold text-red-700 mb-2">Total Expense (Year)</h2>
          <p className="text-2xl font-bold text-red-800">₹{expenseByYearData?.totalExpense ?? 0}</p>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-purple-200 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform">
          <h2 className="text-lg font-semibold text-purple-700 mb-2">Balance</h2>
          <p className="text-2xl font-bold text-purple-800">₹{yearBalance}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Monthly Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Income vs Expense (Month)</h3>
          <DashboardChart
            labels={monthLabels}
            incomeData={monthIncomeData}
            expenseData={monthExpenseData}
          />
        </div>

        {/* Weekly Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Income vs Expense (Week)</h3>
          <DashboardChart
            labels={weekLabels}
            incomeData={weekIncomeData}
            expenseData={weekExpenseData}
          />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
