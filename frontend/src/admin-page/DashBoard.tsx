import React from "react";
import DashboardChart from "../components/DashboardChart";
import {
  useTransactionsByMonth,
  useTransactionsByWeek,
  useTransactionsByYear,
} from "../hooks/useFinance";
import { getGreeting } from "../utils/getGreetings";
import {
  Users,
  UserCheck,
  HandCoins,
  CreditCard,
  Banknote,
} from "lucide-react";
import { get5DayIntervalData } from "../utils/get5DayFinance";
import { useAllStudent } from "../hooks/useStudent";
import { useStaff } from "../hooks/useStaff";

interface TransactionData {
  labels: string[];
  incomeData: number[];
  expenseData: number[];
  totalIncome: number;
  totalExpense: number;
}

const DashBoard: React.FC = () => {
  // -------------------- Fetch Data --------------------
  const { data: transactionByYearData } = useTransactionsByYear();
  const { data: transactionByMonthData } = useTransactionsByMonth();
  const { data: transactionByWeekData } = useTransactionsByWeek();
  const { data: studentData } = useAllStudent();
  const { data: staffData } = useStaff();

  const yearBalance =
    (transactionByYearData?.totalIncome ?? 0) -
    (transactionByYearData?.totalExpense ?? 0);

  const greeting = getGreeting();

  // -------------------- Prepare Chart Data --------------------
  const weekData: TransactionData = {
    labels: transactionByWeekData?.labels ?? ["Week"],
    incomeData: transactionByWeekData?.incomeData ?? [0],
    expenseData: transactionByWeekData?.expenseData ?? [0],
    totalIncome: transactionByWeekData?.totalIncome ?? 0,
    totalExpense: transactionByWeekData?.totalExpense ?? 0,
  };

  const monthData: TransactionData = {
    labels: transactionByMonthData?.labels ?? [],
    incomeData: transactionByMonthData?.incomeData ?? [],
    expenseData: transactionByMonthData?.expenseData ?? [],
    totalIncome: transactionByMonthData?.totalIncome ?? 0,
    totalExpense: transactionByMonthData?.totalExpense ?? 0,
  };

  // Transform monthly into 5-day intervals
  const monthTransformed = get5DayIntervalData(
    monthData.labels,
    monthData.incomeData
  );
  const monthExpenseTransformed = get5DayIntervalData(
    monthData.labels,
    monthData.expenseData
  );

  const yearData: TransactionData = {
    labels: transactionByYearData?.labels ?? [],
    incomeData: transactionByYearData?.incomeData ?? [],
    expenseData: transactionByYearData?.expenseData ?? [],
    totalIncome: transactionByYearData?.totalIncome ?? 0,
    totalExpense: transactionByYearData?.totalExpense ?? 0,
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-56 flex items-center justify-between p-10 rounded-b-[50%] shadow-lg">
        <div>
          <h1 className="text-5xl font-bold text-white">
            {greeting}, Deepak Sir 👋
          </h1>
          <p className="text-white mt-2 text-lg">
            Here's your school financial overview
          </p>
        </div>
        <div className="bg-white rounded-full p-2 shadow-lg" />
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 -mt-20">
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform flex items-center space-x-4">
          <Users className="w-10 h-10 text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Total Students</p>
            <p className="text-2xl font-bold text-gray-800">
              {studentData?.length ?? 0}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform flex items-center space-x-4">
          <UserCheck className="w-10 h-10 text-green-500" />
          <div>
            <p className="text-sm text-gray-500">Total Staff</p>
            <p className="text-2xl font-bold text-gray-800">
              {staffData?.length ?? 0}
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-100 to-green-200 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform flex items-center space-x-4">
          <HandCoins className="w-10 h-10 text-green-700" />
          <div>
            <p className="text-sm text-green-700">Income (Year)</p>
            <p className="text-2xl font-bold text-green-800">
              ₹{yearData.totalIncome}
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-100 to-red-200 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform flex items-center space-x-4">
          <CreditCard className="w-10 h-10 text-red-700" />
          <div>
            <p className="text-sm text-red-700">Expense (Year)</p>
            <p className="text-2xl font-bold text-red-800">
              ₹{yearData.totalExpense}
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform flex items-center space-x-4">
          <Banknote className="w-10 h-10 text-purple-700" />
          <div>
            <p className="text-sm text-purple-700">Balance</p>
            <p className="text-2xl font-bold text-purple-800">
              ₹{yearBalance}
            </p>
          </div>
        </div>
      </div>

      {/* Charts: Week, Month, Year */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">
            Income vs Expense (Week)
          </h3>
          <DashboardChart
            labels={weekData.labels}
            incomeData={weekData.incomeData}
            expenseData={weekData.expenseData}
            type="area"
            xAxisType="category" // weekly = categories
            height={300}
          />
        </div>

        {/* Monthly Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">
            Income vs Expense (Month)
          </h3>
          <DashboardChart
            labels={monthTransformed.labels}
            incomeData={monthTransformed.data}
            expenseData={monthExpenseTransformed.data}
            type="line"
            xAxisType="category" // or "datetime" if you provide ISO dates
            height={300}
          />
        </div>

       
      </div>
    </div>
  );
};

export default DashBoard;
