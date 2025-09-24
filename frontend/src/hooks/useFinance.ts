import { 
  addTrascation,
  getExpenseByCategory,
  getExpenseByMonth,
  getExpenseByWeek,
  getExpenseByYear,
  getIncomeByCategory,
  getIncomeByMonth,
  getIncomeByWeek,
  getIncomeByYear
} from "../api/finance.api";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { ExpenseFormType } from "../types/zod";

// 🔹 Add transaction (mutation)
export const useAddTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ExpenseFormType) => addTrascation(data),
    onSuccess: () => {
      // Invalidate related queries so data refetches
      queryClient.invalidateQueries({ queryKey: ["income"] });
      queryClient.invalidateQueries({ queryKey: ["expense"] });
    },
  });
};

// 🔹 Income queries
export const useIncomeByCategory = () =>
  useQuery({ queryKey: ["income", "category"], queryFn: getIncomeByCategory });

export const useIncomeByWeek = () =>
  useQuery({ 
    queryKey: ["income", "week"], 
    queryFn: async () => {
      const res = await getIncomeByWeek();
      return res.data; // <-- only return the data from backend
    }
  });


export const useIncomeByMonth = () =>{
  return useQuery({ queryKey: ["income", "month"], queryFn : async ()=>{
    const res = await getIncomeByMonth()
return res.data
  } });
}
export const useIncomeByYear=()=>{
  return useQuery({queryKey:["income","year"],queryFn:async()=>{
    const res = await getIncomeByYear()
    return res.data
  }})
}
// 🔹 Expense queries
export const useExpenseByCategory = () =>
  useQuery({ queryKey: ["expense", "category"], queryFn: getExpenseByCategory });

export const useExpenseByWeek = () =>
  useQuery({
    queryKey: ["expense", "week"],
    queryFn: async () => {
      const res = await getExpenseByWeek();
      return res.data; // <-- only return the data
    },
  });


export const useExpenseByMonth = () =>{
 return  useQuery({ queryKey: ["expense", "month"], queryFn:  async ()=>{
  const res = await getExpenseByMonth();
  return res.data
 } });}

 export const useExpenseByYear=()=>{
  return useQuery({queryKey:["expense","year"],queryFn:async()=>{
const res = await getExpenseByYear()
return res.data
  }})
 }