
import axiosInstance from "../services/axiosInstance";
import { studentSchema, StudentType } from "../types/zod";
export const getALlStudent = () => {
  return axiosInstance.get("/admin/students");
};
export const getStudentByRoll = (rollNumber: string) => {
  return axiosInstance.get(`/admin/students/${rollNumber}`);
};

export const addStudent = async (data:StudentType) => {
  const parsed = studentSchema.parse(data);
  const payload = {
    ...parsed,
  }
  return axiosInstance.post("/admin/students",payload);
};

export const updateStudent = (rollNumber: string, data: StudentType) => {
  return axiosInstance.put(`/admin/${rollNumber}`, data);
};
