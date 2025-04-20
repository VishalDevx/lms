import { z } from "zod";

export const PaymentGatewayEnum = z.enum(["RAZORPAY", "STRIPE", "PAYPAL"]); // add all you support
export const PaymentMethodEnum = z.enum([
  "CARD",
  "NETBANKING",
  "UPI",
  "WALLET",
  "CASH",
]); // include relevant ones

export const createPaymentSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
  method: PaymentMethodEnum,
  transactionId: z.string().optional(), // optional in case of CASH
  paymentGateway: PaymentGatewayEnum,
  studentId: z.number().int().optional(), // optional because Prisma allows null
  studentFeeId: z.number().int().optional(),
});
