import { useAllStudent } from "../hooks/useStudent";
import { useStaff } from "../hooks/useStaff";
import { useExpenseByMonth, useIncomeByMonth } from "../hooks/useFinance";
import { BadgeIndianRupee, BookOpenText, GraduationCap } from "lucide-react";

const DashBoard = () => {
  const { data: studentData, isLoading: studentLoading, error: studentError } = useAllStudent();
  const { data: staffData, isLoading: staffLoading, error: staffError } = useStaff();
const {data:expeseMonth, isLoading:expeseMonthLoading,error:expeseMonthError} = useExpenseByMonth()
const {data:incomeMonth, isLoading:incomeMonthLoading,error:incomeMonthError} = useIncomeByMonth()
  if (studentLoading || staffLoading || expeseMonthLoading || incomeMonthLoading) return <div>Loading...</div>;
  if (studentError || staffError||expeseMonthError||incomeMonthError) return <div>Error loading data</div>;

  const totalStudents = studentData?.length ?? 0;
  const totalStaff = staffData?.length ?? 0;
  const totalIncomeOfMonth= incomeMonth?.totalIncome ?? 0;
  
  const totalExpenseOfMonth = expeseMonth?.totalExpense ?? 0 ;
  const balanceOfMonth = totalIncomeOfMonth-totalExpenseOfMonth;


  return (
    <div className="bg-white  min-h-screen p-6 text-black overflow-x-hidden  ">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
<div className=" grid grid-cols-2 w-full">
 <div className="grid  grid-cols-3 gap-4 ">
        <div className="bg-red-100 w-56 h-32 rounded-2xl flex flex-col m-auto justify-between ">
          <span><GraduationCap /></span>
         
          <p className="text-4xl flex m-auto">{totalStudents}</p>
           <span className="text-black">Total Students</span>
        </div>

        <div className="bg-amber-100  w-56 h-32 rounded-2xl flex flex-col m-auto justify-between ">
          <span className="bg-amber-600"> <BookOpenText /></span>
          <p className=" text-4xl m-auto">{totalStaff}</p>
          <span className="text-black">Total Staff</span>
        </div>

   
          <div className="bg-green-100 w-56 h-32 rounded-2xl flex flex-col m-auto justify-between ">
            <span className="text-white flex justify-center align-middle text-2xl h-8 m-3 bg-green-700 w-12 rounded-4xl"><BadgeIndianRupee /></span>
            <p className=" text-2xl font-bold flex m-auto ">₹{balanceOfMonth} </p>
            <span className="text-black m-2 ">This Month Balance</span>
          </div>
        </div>
        <div>
          hello
        </div>
</div>
     
        
      </div>
      

  );
};

export default DashBoard;
