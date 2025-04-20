import z from "zod";
export const TrancationType = z.enum(["CREDIT", "DEBIT"]);
export const expenseSchema = z.object({
  title: z.string(),
  amout: z.number(),
  type: TrancationType,
  description: z.string().optional(),
  date: z.coerce.date(),
  paidTo: z.string().optional(),
  paidBy: z.string(),
  attechment: z.string().url(),
});

// description String
// date        DateTime
// paidTo      String?
// paidBy      String
// attechment  String?
// }
