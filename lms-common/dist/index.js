"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentSchema = exports.staffSchema = exports.Gender = exports.createPaymentSchema = exports.PaymentMethodEnum = exports.PaymentGatewayEnum = exports.studentFeeSchema = exports.feeStructureSchema = exports.FeeStatusEnum = exports.GradeEnum = exports.expenseSchema = exports.TrancationType = void 0;
const zod_1 = __importDefault(require("zod"));
exports.TrancationType = zod_1.default.enum(["CREDIT", "DEBIT"]);
exports.expenseSchema = zod_1.default.object({
    title: zod_1.default.string(),
    amount: zod_1.default.number().positive(),
    type: exports.TrancationType,
    description: zod_1.default.string(),
    date: zod_1.default.coerce.date(),
    paidTo: zod_1.default.string().optional(),
    paidBy: zod_1.default.string(),
    attechment: zod_1.default.string().url(),
});
// Zod enum for Grade (must match Prisma enum exactly)
exports.GradeEnum = zod_1.default.enum([
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
exports.FeeStatusEnum = zod_1.default.enum(["PENDING", "PAID", "PARTIALLY_PAID"]);
// Zod validation schema for FeeStructure
exports.feeStructureSchema = zod_1.default.object({
    name: zod_1.default.string().min(1, "Fee name is required"),
    amount: zod_1.default.number().positive("Amount must be a positive number"),
    month: zod_1.default.coerce.date(), // Parses "2025-04-01" to Date
    grade: exports.GradeEnum,
});
exports.studentFeeSchema = zod_1.default.object({
    status: zod_1.default.enum(["PENDING", "PAID", "PARTIALLY_PAID"]).optional(), // Adjust enum if more values exist
    paidAmount: zod_1.default
        .number()
        .min(0, { message: "Paid amount cannot be negative" })
        .default(0),
    dueAmount: zod_1.default
        .number()
        .min(0.01, { message: "Due amount must be greater than 0" }),
    dueDate: zod_1.default.coerce.date({ required_error: "Due date is required" }),
    studentId: zod_1.default.number().int({ message: "Student ID must be an integer" }),
    feeStructureId: zod_1.default
        .number()
        .int({ message: "FeeStructure ID must be an integer" }),
});
exports.PaymentGatewayEnum = zod_1.default.enum(["RAZORPAY", "STRIPE", "PAYPAL"]); // add all you support
exports.PaymentMethodEnum = zod_1.default.enum([
    "CARD",
    "NETBANKING",
    "UPI",
    "WALLET",
    "CASH",
]); // include relevant ones
exports.createPaymentSchema = zod_1.default.object({
    amount: zod_1.default.number().positive("Amount must be positive"),
    method: exports.PaymentMethodEnum,
    transactionId: zod_1.default.string().optional(), // optional in case of CASH
    paymentGateway: exports.PaymentGatewayEnum,
    studentId: zod_1.default.number().int().optional(), // optional because Prisma allows null
    studentFeeId: zod_1.default.number().int().optional(),
});
exports.Gender = zod_1.default.enum(["MALE", "FEMALE", "OTHERS"]);
exports.staffSchema = zod_1.default.object({
    name: zod_1.default.string(),
    gender: exports.Gender,
    dob: zod_1.default.coerce.date(),
    phoneNumber: zod_1.default.string().regex(/^\+\d{10,15}$/),
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6).max(50),
    address: zod_1.default.string(),
    profilePic: zod_1.default.string().optional(),
    qualification: zod_1.default.string().optional(),
    subject: zod_1.default.string(),
    university: zod_1.default.string().optional(),
});
exports.studentSchema = zod_1.default.object({
    name: zod_1.default.string().min(3).max(30),
    fatherName: zod_1.default.string().min(3).max(30),
    motherName: zod_1.default.string().min(3).max(30),
    gender: zod_1.default.enum(["MALE", "FEMALE", "OTHERS"]),
    grade: exports.GradeEnum,
    address: zod_1.default.string().min(3).max(100),
    profilePic: zod_1.default.string().url().optional(),
    rollNumber: zod_1.default.string().min(3).max(10),
    mobileNumber: zod_1.default.string().regex(/^\+\d{10,15}$/),
    bloodGroup: zod_1.default.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]),
});
