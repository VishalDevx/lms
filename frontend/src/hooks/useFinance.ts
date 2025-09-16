import { addTrascation,getExpenseByCategory,getExpenseByMonth,getExpenseByWeek,getIncomeByCategory,getIncomeByMonth,getIncomeByWeek } from "../api/finance.api";
import {useQueryClient,useMutation,useQuery} from "@tanstack/react-query"
import { ExpenseFormType } from "../types/zod";


// mutations

export const useAddTrascation = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : (data:ExpenseFormType)=>addTrascation(data),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["CREDIT"]});
            queryClient.invalidateQueries({queryKey:["DEBIT"]});
        }
    })
}

//Income queries 
export const useIncomeByCategory = ()=>{
    useQuery({queryKey:["income","category"],queryFn:getIncomeByCategory})
}
export const useIncomeByWeek = ()=>{
    useQuery({queryKey:["income","week"],queryFn:getIncomeByWeek})

}
export const useIncomeByMonth = ()=>{
    useQuery({queryKey:["income","month"],queryFn:getIncomeByMonth})
}
// expense queries 
export const useExpenseByCategory = ()=>{
    useQuery({queryKey:["expense","category"],queryFn:getExpenseByCategory})
}

export const useExpenseByWeek = ()=>{
    useQuery({queryKey:["expense","week"],queryFn:getExpenseByWeek})
}
export const useExpenseByMonth = ()=>{
    useQuery({queryKey:["expense","month"],queryFn:getExpenseByMonth})
}