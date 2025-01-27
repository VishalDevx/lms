import { z } from "zod";
import { Gender } from "@prisma/client";

// Defining the schema, not a function
export const studentSchema = z.object({
  name: z.string({ required_error: "Name is Required" }),
  fatherName: z.string({ required_error: "Father Name is Required" }),
  motherName: z.string({ required_error: "Mother Name is Required" }),
  gender: z.nativeEnum(Gender),
  bloodGroup: z.string({ required_error: "Please Provide Your Blood Group" }),
  mobileNumber: z.string({ required_error: "Mobile Number is Required" }),
  profilePic: z.string({ required_error: "Please Provide Your Image" }),
  rollNumber: z.string({ required_error: "Enter Your Roll Number" }),
});

export type StudentModel = z.infer<typeof studentSchema>;
