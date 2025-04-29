// hooks/useStudentForm.ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentSchema } from "@vishaldevsx/lms-common"; // adjust the path
import { z } from "zod";

type StudentType = z.infer<typeof studentSchema>;

const useStudentForm = () => {
  return useForm<StudentType>({
    resolver: zodResolver(studentSchema),
  });
};
export default useStudentForm;
