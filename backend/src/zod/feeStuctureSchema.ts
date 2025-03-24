import { date, z } from "zod";
export const feeStructureSchema = z.object({
  name: z.string().min(4).max(50),
  amount: z.number(),
  dueDate: z.coerce.date(),
  grade: z.enum(["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"]),
  frequency: z.enum(["MONTHLY", "QUARTERLY", "YEARLY", "ONE_TIME"]),
});

export const studentFeeSchema = z.object({
  status: z.enum(["PENDING", "PARTIALLY_PAID", "PAID", "OVERDUE"]),
  paidAmount: z.number(),
  dueAmount: z.number(),
  dueDate: z.coerce.date(),
});
