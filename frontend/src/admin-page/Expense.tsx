import { useExpenseByCategory } from "../hooks/useFinance";
import { ExpenseFormType } from "../types/zod";

const Expense = ()=>{
    const {data:expenseData,isLoading:expenseLoading,error:expenseError} = useExpenseByCategory();
    if(expenseLoading) {
        return <div> Loading...</div>
    }
    if ( expenseError){
        return <div>Error occured in the data fetching</div>

    }
if(!expenseData){
    return <div>
         Expense By cetagory is not found
    </div>
}
return (
    <div>
        hello
    </div>
)
}

export default Expense;