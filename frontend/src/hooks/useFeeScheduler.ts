import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../services/axiosInstance";
import { feeStructureSchema, FeeStructureType } from "../types/zod";

// ------------------------
// Run Fee Scheduler Hook
// ------------------------
export const useRunFeeScheduler = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post("/admin/fee-scheduler/run");
      return response.data; // TS infers the type automatically
    },
    onSuccess: (data) => {
      console.log("Fee scheduler ran successfully:", data);
      queryClient.invalidateQueries({ queryKey: ["all", "studentFees"] });
    },
    onError: (err: Error) => {
      console.error("Error running fee scheduler:", err.message);
    },
  });
};

// ------------------------
// Assign Fee Hook
// ------------------------
export const useAssignFee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FeeStructureType) => {
      // Validate with Zod
      const parsed = feeStructureSchema.parse(data);
      const response = await axiosInstance.post("/admin/assign_fee", parsed);
      return response.data; // TS infers the type automatically
    },
    onSuccess: (data) => {
      console.log("Fee assigned successfully:", data);
      queryClient.invalidateQueries({ queryKey: ["all", "studentFees"] });
    },
    onError: (err: Error) => {
      console.error("Error assigning fee:", err.message);
    },
  });
};
