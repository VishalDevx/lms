import z from "zod";


export const expenseSchema = z.object({
  title: z.string(),
  amount: z.number(),
  type: z.enum(["CREDIT", "DEBIT"]),
  description: z.string(),
  date: z.string().transform((val) => new Date(val)), // keep as Date
  category: z.string().optional(),
});

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
  status: z.enum(["PENDING", "PAID", "PARTIALLY_PAID"]).optional(), // Adjust enum if more values exist
  paidAmount: z
    .number()
    .min(0, { message: "Paid amount cannot be negative" })
    .default(0),
  dueAmount: z
    .number()
    .min(0.01, { message: "Due amount must be greater than 0" }),
  dueDate: z.coerce.date({ required_error: "Due date is required" }),

  studentId: z.number().int({ message: "Student ID must be an integer" }),
  feeStructureId: z
    .number()
    .int({ message: "FeeStructure ID must be an integer" }),
});

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

export const Gender = z.enum(["MALE", "FEMALE", "OTHERS"]);

export const staffSchema = z.object({
  name: z.string(),
  gender: Gender,
  dob: z.coerce.date(),
  phoneNumber: z.string().regex(/^\+\d{10,15}$/),
  email: z.string().email(),
  password: z.string().min(6).max(50),
  address: z.string(),
  profilePic: z.string().optional(),
  qualification: z.string().optional(),
  subject: z.string(),
  university: z.string().optional(),
});

export const studentSchema = z.object({
  name: z.string().min(3).max(30),
  fatherName: z.string().min(3).max(30),
  motherName: z.string().min(3).max(30),
  gender: z.enum(["MALE", "FEMALE", "OTHERS"]),
  grade: GradeEnum,
  address: z.string().min(3).max(100),
  profilePic: z.string().url().optional(),
  rollNumber: z.string().min(3).max(10),
  mobileNumber: z.string().regex(/^\+\d{10,15}$/),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]),
});
type StudentType = z.infer<typeof studentSchema>;
type StaffType = z.infer<typeof staffSchema>;
type CreatePaymentType = z.infer<typeof createPaymentSchema>;
type FeeStructureType = z.infer<typeof feeStructureSchema>;
type StudentFeeType = z.infer<typeof studentFeeSchema>;
type ExpenseFormType = z.infer<typeof expenseSchema>;