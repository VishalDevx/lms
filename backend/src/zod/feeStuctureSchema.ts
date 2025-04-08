import { z } from "zod";

// Zod enum for Grade (must match Prisma enum exactly)
export const GradeEnum = z.enum([
  "NURSERY",
  "LKG",
  "UKG",
  "FIRST",
  "SECOND",
  "THIRD",
  "FOURTH",
  "FIFTH",
  "SIXTH",
  "SEVENTH",
  "EIGHTH",
  "NINTH",
  "TENTH",
]);
export const FeeStatusEnum = z.enum(["PENDING", "PAID", "PARTIALLY_PAID"]);

// Zod validation schema for FeeStructure
export const feeStructureSchema = z.object({
  name: z.string().min(1, "Fee name is required"),
  amount: z.number().positive("Amount must be a positive number"),
  month: z.coerce.date(), // Parses "2025-04-01" to Date
  grade: GradeEnum,
});

export const studentFeeSchema = z.object({
  status: FeeStatusEnum.default("PENDING"),
  paidAmount: z.number().min(0, "Paid amount cannot be negative").default(0),
  dueAmount: z.number().positive("Due amount must be greater than 0"),
  dueDate: z.coerce.date(), // Accepts both string or Date
  studentId: z.number().int().positive("Student ID is required"),
  feeStructureId: z.number().int().positive("Fee structure ID is required"),
});
