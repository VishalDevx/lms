import z from "zod";
export declare const TrancationType: z.ZodEnum<["CREDIT", "DEBIT"]>;
export declare const expenseSchema: z.ZodObject<{
    title: z.ZodString;
    amount: z.ZodNumber;
    type: z.ZodEnum<["CREDIT", "DEBIT"]>;
    description: z.ZodString;
    date: z.ZodDate;
    paidTo: z.ZodOptional<z.ZodString>;
    paidBy: z.ZodString;
    attechment: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    amount: number;
    type: "CREDIT" | "DEBIT";
    description: string;
    date: Date;
    paidBy: string;
    attechment: string;
    paidTo?: string | undefined;
}, {
    title: string;
    amount: number;
    type: "CREDIT" | "DEBIT";
    description: string;
    date: Date;
    paidBy: string;
    attechment: string;
    paidTo?: string | undefined;
}>;
export declare const GradeEnum: z.ZodEnum<["NURSERY", "LKG", "UKG", "FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH", "SIXTH", "SEVENTH", "EIGHTH", "NINTH", "TENTH"]>;
export declare const FeeStatusEnum: z.ZodEnum<["PENDING", "PAID", "PARTIALLY_PAID"]>;
export declare const feeStructureSchema: z.ZodObject<{
    name: z.ZodString;
    amount: z.ZodNumber;
    month: z.ZodDate;
    grade: z.ZodEnum<["NURSERY", "LKG", "UKG", "FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH", "SIXTH", "SEVENTH", "EIGHTH", "NINTH", "TENTH"]>;
}, "strip", z.ZodTypeAny, {
    amount: number;
    name: string;
    month: Date;
    grade: "NURSERY" | "LKG" | "UKG" | "FIRST" | "SECOND" | "THIRD" | "FOURTH" | "FIFTH" | "SIXTH" | "SEVENTH" | "EIGHTH" | "NINTH" | "TENTH";
}, {
    amount: number;
    name: string;
    month: Date;
    grade: "NURSERY" | "LKG" | "UKG" | "FIRST" | "SECOND" | "THIRD" | "FOURTH" | "FIFTH" | "SIXTH" | "SEVENTH" | "EIGHTH" | "NINTH" | "TENTH";
}>;
export declare const studentFeeSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<["PENDING", "PAID", "PARTIALLY_PAID"]>>;
    paidAmount: z.ZodDefault<z.ZodNumber>;
    dueAmount: z.ZodNumber;
    dueDate: z.ZodDate;
    studentId: z.ZodNumber;
    feeStructureId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    paidAmount: number;
    dueAmount: number;
    dueDate: Date;
    studentId: number;
    feeStructureId: number;
    status?: "PENDING" | "PAID" | "PARTIALLY_PAID" | undefined;
}, {
    dueAmount: number;
    dueDate: Date;
    studentId: number;
    feeStructureId: number;
    status?: "PENDING" | "PAID" | "PARTIALLY_PAID" | undefined;
    paidAmount?: number | undefined;
}>;
export declare const PaymentGatewayEnum: z.ZodEnum<["RAZORPAY", "STRIPE", "PAYPAL"]>;
export declare const PaymentMethodEnum: z.ZodEnum<["CARD", "NETBANKING", "UPI", "WALLET", "CASH"]>;
export declare const createPaymentSchema: z.ZodObject<{
    amount: z.ZodNumber;
    method: z.ZodEnum<["CARD", "NETBANKING", "UPI", "WALLET", "CASH"]>;
    transactionId: z.ZodOptional<z.ZodString>;
    paymentGateway: z.ZodEnum<["RAZORPAY", "STRIPE", "PAYPAL"]>;
    studentId: z.ZodOptional<z.ZodNumber>;
    studentFeeId: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    amount: number;
    method: "CARD" | "NETBANKING" | "UPI" | "WALLET" | "CASH";
    paymentGateway: "RAZORPAY" | "STRIPE" | "PAYPAL";
    studentId?: number | undefined;
    transactionId?: string | undefined;
    studentFeeId?: number | undefined;
}, {
    amount: number;
    method: "CARD" | "NETBANKING" | "UPI" | "WALLET" | "CASH";
    paymentGateway: "RAZORPAY" | "STRIPE" | "PAYPAL";
    studentId?: number | undefined;
    transactionId?: string | undefined;
    studentFeeId?: number | undefined;
}>;
export declare const Gender: z.ZodEnum<["MALE", "FEMALE", "OTHERS"]>;
export declare const staffSchema: z.ZodObject<{
    name: z.ZodString;
    gender: z.ZodEnum<["MALE", "FEMALE", "OTHERS"]>;
    dob: z.ZodDate;
    phoneNumber: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    address: z.ZodString;
    profilePic: z.ZodOptional<z.ZodString>;
    qualification: z.ZodOptional<z.ZodString>;
    subject: z.ZodString;
    university: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    gender: "MALE" | "FEMALE" | "OTHERS";
    dob: Date;
    phoneNumber: string;
    email: string;
    password: string;
    address: string;
    subject: string;
    profilePic?: string | undefined;
    qualification?: string | undefined;
    university?: string | undefined;
}, {
    name: string;
    gender: "MALE" | "FEMALE" | "OTHERS";
    dob: Date;
    phoneNumber: string;
    email: string;
    password: string;
    address: string;
    subject: string;
    profilePic?: string | undefined;
    qualification?: string | undefined;
    university?: string | undefined;
}>;
export declare const studentSchema: z.ZodObject<{
    name: z.ZodString;
    fatherName: z.ZodString;
    motherName: z.ZodString;
    gender: z.ZodEnum<["MALE", "FEMALE", "OTHERS"]>;
    grade: z.ZodEnum<["NURSERY", "LKG", "UKG", "FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH", "SIXTH", "SEVENTH", "EIGHTH", "NINTH", "TENTH"]>;
    address: z.ZodString;
    profilePic: z.ZodOptional<z.ZodString>;
    rollNumber: z.ZodString;
    mobileNumber: z.ZodString;
    bloodGroup: z.ZodEnum<["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]>;
}, "strip", z.ZodTypeAny, {
    name: string;
    grade: "NURSERY" | "LKG" | "UKG" | "FIRST" | "SECOND" | "THIRD" | "FOURTH" | "FIFTH" | "SIXTH" | "SEVENTH" | "EIGHTH" | "NINTH" | "TENTH";
    gender: "MALE" | "FEMALE" | "OTHERS";
    address: string;
    fatherName: string;
    motherName: string;
    rollNumber: string;
    mobileNumber: string;
    bloodGroup: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
    profilePic?: string | undefined;
}, {
    name: string;
    grade: "NURSERY" | "LKG" | "UKG" | "FIRST" | "SECOND" | "THIRD" | "FOURTH" | "FIFTH" | "SIXTH" | "SEVENTH" | "EIGHTH" | "NINTH" | "TENTH";
    gender: "MALE" | "FEMALE" | "OTHERS";
    address: string;
    fatherName: string;
    motherName: string;
    rollNumber: string;
    mobileNumber: string;
    bloodGroup: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
    profilePic?: string | undefined;
}>;
