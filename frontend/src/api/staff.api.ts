
import axiosInstance from "../services/axiosInstance";
import { staffSchema, StaffType } from "../types/zod";

export const addStaff = async ( data:StaffType)=>{
    const parsed = staffSchema.parse(data);
    const payload = {
        ...parsed,
    }
     return axiosInstance.post("/admin/staff",payload)
}
 export const getStaff = () =>{
    return axiosInstance.get("/admin/staff")
 }
 export const getByName = (email:string)=>{
    return axiosInstance.get(`/admin/staff/${email}`)
 }
 export const updateStaff = (email : string, data:StaffType)=>{
    return axiosInstance.put(`/admin/staff/${email}`,data)
 }