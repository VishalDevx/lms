import axiosInstance from "../services/axiosInstance";
import { ExpenseFormType,expenseSchema } from "../types/zod";
export const addTrascation = async (data : ExpenseFormType) =>{
    const parsed = expenseSchema.parse(data)
    // backend my not accept it direct so convert into ISO string 
    const payload = {
        ...parsed,
        date : parsed.date.toISOString()

    }
    return axiosInstance.post('/admin/expenses',payload)
}
export const getIncomeByCategory = () =>{
    return axiosInstance.get("/admin/income/category")}
export const getIncomeByWeek  = () =>{
    return axiosInstance.get("/admin/income/week")
}
export const getIncomeByMonth = () =>{
    return axiosInstance.get("/admin/income/month")

}
export const getIncomeByYear = ()=>{
    return axiosInstance.get("/admin/income/year")
}
export const getExpenseByCategory = () =>{
    return axiosInstance.get("/admin/expense/category")
}
export const getExpenseByWeek = () =>{
    return axiosInstance.get("/admin/expense/week")
}
export const getExpenseByMonth = ()=>{
    return axiosInstance.get("/admin/expense/month")
}
export const getExpenseByYear=()=>{
    return axiosInstance.get("/admin/expense/year")
}