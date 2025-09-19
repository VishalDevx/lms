import { data } from "react-router-dom"
import axiosInstance from "../services/axiosInstances"

export const expense = ()=>{
    return axiosInstance.post("/api/v1/admin/expenses",data)
}

export const incomeByCategory =() =>{
    return axiosInstance.get("/api/v1/admin/");

}

/*
adminRoutes.post("/expenses", addTrascation);
adminRoutes.get("/income-by-category", incomeByCategory);
adminRoutes.get("/income-by-week", incomeByWeek);
adminRoutes.get("/income-by-month", incomeBymonth);
adminRoutes.get("/expense-by-category", expenseByCategory);
adminRoutes.get("/expense-by-week", expenseByWeek);
adminRoutes.get("/expense-by-month", expenseBymonth);
*/