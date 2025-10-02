
import axiosInstance from "../services/axiosInstance";
import { feeStructureSchema, FeeStructureType } from "../types/zod";

export const assignFee = async (data:FeeStructureType)=>{
    const parsed = feeStructureSchema.parse(data);
    const payload = {
        ...parsed,

    }
    return axiosInstance.post("/admin/assign_fee",payload)
}