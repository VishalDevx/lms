import Button from "../components/Button";
import { useExpenseByCategory } from "../hooks/useFinance";
import { getGreeting } from "../utils/getGreetings";


const Expense = ()=>{
    const {data:expenseByCategoryData} = useExpenseByCategory();
   

const greeting = getGreeting()
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
        <div className="bg-white rounded-full p-2 shadow-lg"></div>
      </div>
      <div>
        <Button/>
      </div>
</div>
)
}

export default Expense;