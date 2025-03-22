import { z } from "zod";

export const studentSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  fatherName: z.string().min(3, "Father's name must be at least 3 characters"),
  motherName: z.string().min(3, "Mother's name must be at least 3 characters"),
  gender: z.enum(["Male", "Female", "Others"]),
  grade: z.string(),
  address: z.string(),
  profilePic: z.string().url("Invalid profile picture URL"),
  rollNumber: z.string().min(3, "Roll number must be at least 3 characters"),
  bloodGroup: z.string().optional(),
  mobileNumber: z
    .string()
    .regex(/^\d{10}$/, "Invalid mobile number")
    .optional(),
});

export type StudentInput = z.infer<typeof studentSchema>;
