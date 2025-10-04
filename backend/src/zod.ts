import { z } from "zod";

// ------------------------
// Enums
// ------------------------
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

export const FeeStatusEnum = z.enum([
  "PENDING",
  "PARTIALLY_PAID",
  "PAID",
  "OVERDUE",
]);

export const PaymentGatewayEnum = z.enum([
  "RAZORPAY",
  "STRIPE",
  "PAYPAL",
  "PAYTM",
]);

export const PaymentMethodEnum = z.enum([
  "CASH",
  "BANK_TRANSFER",
  "CREDIT_CARD",
  "UPI",
  "PAYPAL",
]);

export const GenderEnum = z.enum(["MALE", "FEMALE", "OTHERS"]);

export const BloodGroupEnum = z.enum([
  "A+",
  "A-",
  "B+",
  "B-",
  "O+",
  "O-",
  "AB+",
  "AB-",
]);

export const TransactionTypeEnum = z.enum(["CREDIT", "DEBIT"]);

export const ExamTypeEnum = z.enum([
  "UNIT_TEST",
  "MID_TERM",
  "FINAL",
  "OTHER",
]);

// ------------------------
// Student Schema
// ------------------------
export const studentSchema = z.object({
  name: z.string().min(3).max(30),
  dob: z.coerce.date(),
  fatherName: z.string().min(3).max(30),
  motherName: z.string().min(3).max(30),
  gender: GenderEnum,
  grade: GradeEnum,
  address: z.string().min(3).max(100),
  profilePic: z.string().url().optional(),
  rollNumber: z.string().min(3).max(10),
  mobileNumber: z.string().regex(/^\+\d{10,15}$/),
  bloodGroup: BloodGroupEnum,
});
export type StudentType = z.infer<typeof studentSchema>;

// ------------------------
// Staff Schema
// ------------------------
export const staffSchema = z.object({
  name: z.string(),
  gender: GenderEnum,
  dob: z.coerce.date(),
  phoneNumber: z.string().regex(/^\+\d{10,15}$/),
  email: z.string().email(),
  password: z.string().min(6).max(50),
  address: z.string(),
  profilePic: z.string().url().optional(),
  qualification: z.string().optional(),
  subject: z.string(),
  university: z.string().optional(),
});
export type StaffType = z.infer<typeof staffSchema>;

// ------------------------
// Class Teacher Schema
// ------------------------
export const classTeacherSchema = z.object({
  staffId: z.number().int(), // Link to staff
  grade: GradeEnum,          // Assigned grade
});
export type ClassTeacherType = z.infer<typeof classTeacherSchema>;

// ------------------------
// Expense Schema
// ------------------------
export const expenseSchema = z.object({
  title: z.string(),
  amount: z.number().positive(),
  type: TransactionTypeEnum,
  description: z.string(),
  date: z.preprocess((val) => new Date(val as string), z.date()),
  category: z.string().optional(),
});
export type ExpenseFormType = z.infer<typeof expenseSchema>;

// ------------------------
// Fee Structure Schema
// ------------------------
export const feeStructureSchema = z.object({
  name: z.string().min(1, "Fee name is required"),
  amount: z.number().positive("Amount must be positive"),
  month: z.coerce.date(),
  grade: GradeEnum,
});
export type FeeStructureType = z.infer<typeof feeStructureSchema>;

// ------------------------
// Student Fee Schema
// ------------------------
export const studentFeeSchema = z.object({
  status: FeeStatusEnum.optional(),
  totalFee: z.number().positive(),
  paidAmount: z.number().min(0).default(0),
  dueAmount: z.number().min(0.01),
  dueDate: z.coerce.date({ required_error: "Due date is required" }),
  studentId: z.number().int(),
  feeStructureId: z.number().int(),
});
export type StudentFeeType = z.infer<typeof studentFeeSchema>;

// ------------------------
// Payment Schema
// ------------------------
export const createPaymentSchema = z.object({
  amount: z.number().positive(),
  method: PaymentMethodEnum,
  transactionId: z.string().optional(),
  paymentGateway: PaymentGatewayEnum,
  studentId: z.number().int().optional(),
  studentFeeId: z.number().int().optional(),
});
export type CreatePaymentType = z.infer<typeof createPaymentSchema>;

// ------------------------
// Result Schema
// ------------------------
export const resultSchema = z.object({
  studentId: z.number().int(),
  classTeacherId: z.number().int(),
  examId: z.number().int(),
  subject: z.string(),
  marksObtained: z.number().min(0),
  totalMarks: z.number().min(1),
  examType: z.string(),
  remarks: z.string().optional(),
  date: z.coerce.date().optional(),
});

export type ResultType = z.infer<typeof resultSchema>;

// ------------------------
// Extra Types for Relations
// ------------------------
export type StudentFeeWithStructure = StudentFeeType & {
  FeeStructure: FeeStructureType;
};

export type StudentWithFees = StudentType & {
  studentFees: StudentFeeWithStructure[];
};
