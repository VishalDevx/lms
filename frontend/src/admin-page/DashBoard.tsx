
import DashboardChart from "../components/DashboardChart";
import {
  useExpenseByYear,
  useExpenseByMonth,
  useExpenseByWeek,
  useIncomeByYear,
  useIncomeByMonth,
  useIncomeByWeek,
} from "../hooks/useFinance";
import { getGreeting } from "../utils/getGreetings";
import { Users, UserCheck, HandCoins, CreditCard, Banknote } from "lucide-react";
import { get5DayIntervalData } from "../utils/get5DayFinance";
import { useAllStudent } from "../hooks/useStudent";
import { useStaff } from "../hooks/useStaff";

const DashBoard = () => {
  // -------------------- Fetch Data --------------------
  const { data: expenseByYearData } = useExpenseByYear();
  const { data: incomeByYearData } = useIncomeByYear();
  const { data: expenseByMonthData } = useExpenseByMonth();
  const { data: incomeByMonthData } = useIncomeByMonth();
  const { data: expenseByWeekData } = useExpenseByWeek();
  const { data: incomeByWeekData } = useIncomeByWeek();
  const { data: studentData}       = useAllStudent()
  const { data: staffData}       = useStaff()

  const yearBalance =
    (incomeByYearData?.totalIncome ?? 0) -
    (expenseByYearData?.totalExpense ?? 0);

  const greeting = getGreeting();

  // -------------------- Prepare Chart Data --------------------
  // Week
  const weekLabels = incomeByWeekData?.labels ?? ["Week"];
  const weekIncomeData = incomeByWeekData?.incomeData ?? [0];
  const weekExpenseData = expenseByWeekData?.expenseData ?? [0];

  // Month (5-day intervals)
  const monthLabels = incomeByMonthData?.labels ?? [];
  const monthIncomeData = incomeByMonthData?.incomeData ?? [];
  const monthExpenseData = expenseByMonthData?.expenseData ?? [];

  const monthTransformed = get5DayIntervalData(monthLabels, monthIncomeData);
  const monthExpenseTransformed = get5DayIntervalData(
    monthLabels,
    monthExpenseData
  );

  // Year
  const yearLabels = incomeByYearData?.labels ?? [];
  const yearIncomeData = incomeByYearData?.incomeData ?? [];
  const yearExpenseData = expenseByYearData?.expenseData ?? [];

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
            <p className="text-2xl font-bold text-gray-800">{
studentData?.length}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform flex items-center space-x-4">
          <UserCheck className="w-10 h-10 text-green-500" />
          <div>
            <p className="text-sm text-gray-500">Total Staff</p>
            <p className="text-2xl font-bold text-gray-800">{staffData?.length}</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-100 to-green-200 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform flex items-center space-x-4">
          <HandCoins className="w-10 h-10 text-green-700" />
          <div>
            <p className="text-sm text-green-700">Income (Year)</p>
            <p className="text-2xl font-bold text-green-800">
              ₹{incomeByYearData?.totalIncome ?? 0}
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-100 to-red-200 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform flex items-center space-x-4">
          <CreditCard className="w-10 h-10 text-red-700" />
          <div>
            <p className="text-sm text-red-700">Expense (Year)</p>
            <p className="text-2xl font-bold text-red-800">
              ₹{expenseByYearData?.totalExpense ?? 0}
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform flex items-center space-x-4">
          <Banknote className="w-10 h-10 text-purple-700" />
          <div>
            <p className="text-sm text-purple-700">Balance</p>
            <p className="text-2xl font-bold text-purple-800">₹{yearBalance}</p>
          </div>
        </div>
      </div>

      {/* Charts: Week, Month, Year in one row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">
            Income vs Expense (Week)
          </h3>
          <DashboardChart
            labels={weekLabels}
            incomeData={weekIncomeData}
            expenseData={weekExpenseData}
            type="line"
            height={300}
          />
        </div>

        {/* Monthly Chart (5-day intervals) */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">
            Income vs Expense (Month)
          </h3>
          <DashboardChart
            labels={monthTransformed.labels} // only 5,10,15,20,25,30
            incomeData={monthTransformed.data}
            expenseData={monthExpenseTransformed.data}
            type="line"
            height={300}
          />
        </div>

        {/* Yearly Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">
            Income vs Expense (Year)
          </h3>
          <DashboardChart
            labels={yearLabels}
            incomeData={yearIncomeData}
            expenseData={yearExpenseData}
            type="line"
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
