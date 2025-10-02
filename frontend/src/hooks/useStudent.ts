import { useMutation, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query";
import { getStudentByRoll, addStudent, getAllStudents, updateStudent } from "../api/student.api";
import { StudentType, StudentWithFees } from "../types/zod";
import { AxiosResponse } from "axios";

// -------------------
// Add Student Hook
// -------------------
export const useAddStudent = (): UseMutationResult<
  AxiosResponse<any>, // return type from axios
  Error,             // error type
  StudentType        // variables type
> => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse<any>, Error, StudentType>({
    mutationFn: (data: StudentType) => addStudent(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["all", "student"] }),
  });
};

// -------------------
// Get Student by Roll Number
// -------------------
export const useStudentByRollNumber = (rollNumber: string) =>
  useQuery<StudentWithFees>({
    queryKey: ["student", rollNumber],
    queryFn: async () => {
      const response = await getStudentByRoll(rollNumber);
      return response.data; // assume API returns StudentWithFees
    },
    enabled: !!rollNumber,
  });

// -------------------
// Get All Students
// -------------------
export const useAllStudent = () =>
  useQuery<StudentType[]>({
    queryKey: ["all", "student"],
    queryFn: async () => {
      const res = await getAllStudents();
      return res.data;
    },
  });

// -------------------
// Update Student
// -------------------
export const useUpdateStudent = () => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse<any>, Error, { rollNumber: string; data: StudentType }>({
    mutationFn: ({ rollNumber, data }) => updateStudent(rollNumber, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["all", "student"] });
      queryClient.invalidateQueries({ queryKey: ["student", variables.rollNumber] });
    },
  });
};
