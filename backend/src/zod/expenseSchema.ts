import z from "zod";
export const TrancationType = z.enum(["CREDIT", "DEBIT"]);
export const expenseSchema = z.object({
  title: z.string(),
  amount: z.number().positive(),
  type: TrancationType,
  description: z.string(),
  date: z.coerce.date(),
  paidTo: z.string().optional(),
  paidBy: z.string(),
  attechment: z.string().url(),
});
