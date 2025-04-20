import z from "zod";

export const Gender = z.enum(["MALE", "FEMALE", "OTHERS"]);

export const staffSchema = z.object({
  name: z.string(),
  gender: Gender,
  dob: z.coerce.date(),
  phoneNumber: z.string().regex(/^\+\d{10,15}$/),
  email: z.string().email(),
  password: z.string().min(6).max(50),
  address: z.string(),
  profilePic: z.string().optional(),
  qualification: z.string().optional(),
  subject: z.string(),
  university: z.string().optional(),
});
