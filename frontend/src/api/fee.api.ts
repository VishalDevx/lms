// src/api/fee.api.ts
import axiosInstance from "../services/axiosInstance";

export const runFeeSchedulerApi = async () => {
  return axiosInstance.post("/admin/fee-scheduler/run");
};

export const assignFeeStructure = async (data: { name: string; grade: string; amount: number; month: Date }) => {
  return axiosInstance.post("/admin/fee-structure", data);
};