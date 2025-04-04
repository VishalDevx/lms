import z from "zod";

export const studentFeeSchema = z.object({
  status: z.enum(["PENDING", "PAID", "  PARTIALLY_PAID", "  OVERDUE"]),
  paidAmount: z.number(),
  dueAmount: z.number(),
  dueDate: z.coerce.date(),
});
