// src/components/AddStudentForm.tsx
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentSchema } from "@vishaldevsx/lms-common"; // replace with your actual path
type StudentType = z.infer<typeof studentSchema>;
const AddStudentForm = () => {};

export default AddStudentForm;
