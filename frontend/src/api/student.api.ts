import { data } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
export const getALlStudent = () => {
  return axiosInstance.get("/api/v1/admin/students");
};
export const getStudentByRoll = (rollNumber: string) => {
  return axiosInstance.get(`/api/v1/admin/students/${rollNumber}`);
};

export const addStudent = () => {
  return axiosInstance.post("/api/v1/admin/students", data);
};

export const updateStudent = (rollNumber: string, data: any) => {
  return axiosInstance.put(`/api/v1/admin/${rollNumber}`, data);
};
