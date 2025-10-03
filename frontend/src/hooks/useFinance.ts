import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addTrascation,
  getTransactionsByWeek,
  getTransactionsByMonth,
  getTransactionsByYear,
  getTransactionsByWeekRaw,
  getTransactionsByMonthRaw,
} from "../api/finance.api";
import { ExpenseFormType } from "../types/zod";

// -------------------- Add Transaction --------------------
export const useAddTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ExpenseFormType) => addTrascation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["transactions", "week-raw"] });
      queryClient.invalidateQueries({ queryKey: ["transactions", "month-raw"] });
      queryClient.invalidateQueries({ queryKey: ["transactions", "year"] });
    },
  });
};


// -------------------- Transactions by Week --------------------
export const useTransactionsByWeek = () => {
  return useQuery({
    queryKey: ["transactions", "week"],
    queryFn: async () => {
      const res = await getTransactionsByWeek();
      return res.data; // e.g., { transactions: [...] }
    },
  });
};

// -------------------- Transactions by Month --------------------
export const useTransactionsByMonth = () => {
  return useQuery({
    queryKey: ["transactions", "month"],
    queryFn: async () => {
      const res = await getTransactionsByMonth();
      return res.data; // e.g., { transactions: [...] }
    },
  });
};

// -------------------- Transactions by Year --------------------
export const useTransactionsByYear = () => {
  return useQuery({
    queryKey: ["transactions", "year"],
    queryFn: async () => {
      const res = await getTransactionsByYear();
      return res.data; // e.g., { labels: [], incomeData: [], expenseData: [] }
    },
  });
};

// -------------------- Raw Transactions by Week --------------------
export const useTransactionsByWeekRaw = () => {
  return useQuery({
    queryKey: ["transactions", "week-raw", "latest"],
    queryFn: async () => {
      const res = await getTransactionsByWeekRaw();
      return res.data; // object or array
    },
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};
// -------------------- Raw Transactions by Month --------------------
export const useTransactionsByMonthRaw = () => {
  return useQuery({
    queryKey: ["transactions", "month-raw", "latest"],
    queryFn: async () => {
      const res = await getTransactionsByMonthRaw();
      return res.data;
    },
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};