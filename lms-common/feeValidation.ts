import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const feeStructureSchema = z.object({
  name: z.string().min(3, "Fee name must be at least 3 characters long"),
  amount: z.coerce.number().positive("Amount must be a positive number"),
  dueDate: z.coerce.date().refine((date) => date > new Date(), {
    message: "Due date must be in the future",
  }),
  frequency: z.enum(["MONTHLY", "QUARTERLY", "YEARLY", "ONE_TIME"]),
  adminId: z
    .number()
    .int()
    .positive("Admin ID must be a valid positive integer"),
});
