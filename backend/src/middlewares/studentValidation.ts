import { Request, Response } from "express";
import { z } from "zod";
import { Gender } from "@prisma/client";

const studentSchema = z.object({
  name: z.string({ required_error: " Name is Required" }),
  fatherName: z.string({ required_error: "Father Name is Required" }),
  motherName: z.string({ required_error: "Mother Name is Required" }),
  gender: z.nativeEnum(Gender),
  bloodGroup: z.string({ required_error: " Pleade Provide your blood Group" }),
  mobileNumber: z.string({ required_error: "Mobile Number is required" }),
  profilePic: z.string({ required_error: "Please provide Your Image" }),
  rollNumber: z.string({ required_error: "Enter Your Roll Number" }),
});

export type StudentModel = z.infer<typeof studentSchema>;
