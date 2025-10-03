import axiosInstance from "../services/axiosInstance";
import { ExpenseFormType,expenseSchema } from "../types/zod";
export const addTrascation = async (data : ExpenseFormType) =>{
    const parsed = expenseSchema.parse(data)
    // backend my not accept it direct so convert into ISO string 
    const payload = {
        ...parsed,
        date : parsed.date.toISOString()

    }
    return axiosInstance.post('/admin/add',payload)
}

export const getTransactionsByWeek=()=>{
    return axiosInstance.get("/admin/transactions/week")
}
export const getTransactionsByMonth=()=>{
    return axiosInstance.get("/admin/transactions/month")
}
export const getTransactionsByYear=()=>{
    return axiosInstance.get("/admin/transactions/year")
}
export const getTransactionsByWeekRaw=()=>{
    return axiosInstance.get("/admin/transactions/weekly")
}
export const getTransactionsByMonthRaw=()=>{
    return axiosInstance.get("/admin/transactions/monthly")
}

