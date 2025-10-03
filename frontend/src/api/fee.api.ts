// src/api/fee.api.ts
import axiosInstance from "../services/axiosInstance";
import { FeeStructureType } from "../types/zod";



export const assignFeeStructure = async (data: FeeStructureType) => {
  return axiosInstance.post("/admin/fee-structure", data);
};