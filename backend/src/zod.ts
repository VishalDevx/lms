import z from "zod";

export const expenseSchema = z.object({
  title: z.string(),
  amount: z.number().multipleOf(0.01),
  type: z.enum(["INCOME", "EXPENSE"]),
  description: z.string(),
  date: z.preprocess((arg) => new Date(arg as string), z.date()),
  category: z.string().optional(),
});
