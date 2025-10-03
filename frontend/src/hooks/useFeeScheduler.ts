import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../services/axiosInstance";
import { feeStructureSchema, FeeStructureType } from "../types/zod";




// ------------------------
// Assign Fee Hook
// ------------------------
export const useAssignFee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FeeStructureType) => {
      // Validate with Zod
      const parsed = feeStructureSchema.parse(data);
      const response = await axiosInstance.post("/admin/fee-structure", parsed);
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
