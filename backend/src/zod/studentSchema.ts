import { z } from "zod";
export const studentSchema = z.object({
  name: z.string().min(3).max(30),
  fatherName: z.string().min(3).max(30),
  motherName: z.string().min(3).max(30),
  gender: z.enum(["MALE", "FEMALE", "OTHERS"]),
  grade: z.enum(["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"]),
  address: z.string().min(3).max(100),
  profilePic: z.string().url().optional(),
  rollNumber: z.string().min(3).max(10),
  mobileNumber: z.string().regex(/^\+\d{10,15}$/),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]),
});
