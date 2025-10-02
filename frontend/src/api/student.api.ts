import axiosInstance from "../services/axiosInstance";
import { studentSchema, StudentType } from "../types/zod";

// Fetch all students
export const getAllStudents = () => {
  return axiosInstance.get("/admin/students");
};

// Fetch a student by roll number
export const getStudentByRoll = (rollNumber: string) => {
  return axiosInstance.get(`/admin/students/${rollNumber}`);
};

// Add a new student
export const addStudent = async (data: StudentType) => {
  const parsed = studentSchema.parse(data); // ensures type safety
  return axiosInstance.post("/admin/students", parsed);
};

// Update an existing student
export const updateStudent = (rollNumber: string, data: StudentType) => {
  const parsed = studentSchema.parse(data);
  return axiosInstance.put(`/admin/students/${rollNumber}`, parsed);
};
