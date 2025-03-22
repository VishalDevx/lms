import { date, z } from "zod";
export const feeStructureSchema = z.object({
  name: z.string().min(4).max(50),
  amount: z.number(),
  dueDate: z.date(),
  frequency: z.enum(["MONTHLY", "QUARTERLY", "YEARLY", "ONE_TIME"]),
});
