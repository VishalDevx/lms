import { z } from "zod";
export const studentSchema = z.object({
  name: z.string().min(3).max(30),
  fatherName: z.string().min(3).max(30),
  motherName: z.string().min(3).max(30),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  address: z.string().min(3).max(100),
  profilePic: z.string().url().optional(),
});
