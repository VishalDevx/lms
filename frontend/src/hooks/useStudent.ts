import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getStudentByRoll,addStudent,getALlStudent,updateStudent } from "../api/student.api";
import { StudentType } from "../types/zod";

export const useAddStudent = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : (data:StudentType)=>addStudent(data),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["student"]})
        }
    })
}
export const useStudentByRollNumber = (rollNumber: string) =>
  useQuery({
    queryKey: ["student", rollNumber],
    queryFn: ({ queryKey }) => {
      const [, rollNumber] = queryKey; 
      return getStudentByRoll(rollNumber as string);
    },
    enabled: !!rollNumber, 
  });

export const useAllStudent = () => {
  return useQuery({
    queryKey: ["all", "student"],
    queryFn: async () => {
      const res = await getALlStudent();
      return res.data; 
    },
  });
};
export const useUpdateStudent = () => {
  return useMutation({
    mutationFn: ({ rollNumber, data }: { rollNumber: string; data: StudentType }) =>
      updateStudent(rollNumber, data),
  });
};