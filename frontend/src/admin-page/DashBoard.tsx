import {
  useExpenseByMonth,
  useIncomeByMonth,
} from "../hooks/useFinance";
import { getGreeting } from "../utils/getGreetings";

const DashBoard = () => {
  const { data: expenseByMonthData, isLoading: expenseLoading, error: expenseError } = useExpenseByMonth();
  const { data: incomeByMonthData, isLoading: incomeLoading, error: incomeError } = useIncomeByMonth();

  if (expenseLoading || incomeLoading) return <div className="p-4">Loading...</div>;
  if (expenseError || incomeError) return <div className="p-4 text-red-500">Error fetching data</div>;

const totalIncomeOfYear = incomeByMonthData?.totalIncome ?? 0;
const totalExpenseOfYear = expenseByMonthData?.totalExpense ?? 0;
const balance = totalIncomeOfYear - totalExpenseOfYear;
 0;


  const greeting = getGreeting();

  return (
   <div className="relative">
  {/* Blue header with gradient and curved bottom */}
  <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-60 flex flex-col justify-center pl-10 rounded-b-[50%]">
    <h1 className="text-4xl font-bold text-white">{greeting}, Deepak Sir 👋</h1>
    <p className="text-white text-lg mt-2">Here’s your financial overview</p>
  </div>

  {/* Cards container - positioned above the blue header */}
  <div className="max-w-6xl mx-auto px-6 -mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
    {/* Total Income */}
    <div className="bg-green-50 hover:bg-green-100 rounded-xl p-6 shadow-lg transition-all">
      <h2 className="text-lg font-semibold mb-2 text-green-700">Total Income (Year)</h2>
      <p className="text-2xl font-bold text-green-600">₹{totalIncomeOfYear.toLocaleString()}</p>
    </div>


    {/* Balance */}<div className="bg-blue-50 hover:bg-blue-100 rounded-xl p-6 shadow-lg transition-all">
      <h2 className="text-lg font-semibold mb-2 text-blue-700">Balance</h2>
      <p className={`text-2xl font-bold ${balance >= 0 ? "text-blue-600" : "text-gray-800"}`}>₹{balance.toLocaleString()}</p>
    
    </div>
    {/* Total Expense */}
    <div className="bg-red-50 hover:bg-red-100 rounded-xl p-6 shadow-lg transition-all">
      <h2 className="text-lg font-semibold mb-2 text-red-700">Total Expense (Year)</h2>
      <p className="text-2xl font-bold text-red-600">₹{totalExpenseOfYear.toLocaleString()}</p>
    </div>
  </div>
</div>
  );
};

export default DashBoard;
