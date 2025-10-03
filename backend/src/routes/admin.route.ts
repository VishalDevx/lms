import { Router } from "express";
import {
  addStudent,
  allStudent,
  studentByRollnumber,
  updateStudent,
} from "../controllers/StudentControlles/students.controller";

import {
  getStaff,
  staffAdd,
  staffByname,
  updateStaff,
} from "../controllers/staffController/manageStaff.controller";

import {
   addTransaction,
  transactionsByMonth,
  transactionsByMonthRaw,
  transactionsByWeek,
  transactionsByWeekRaw,
  transactionsByYear,
} from "../controllers/expenseController/expense.controller";
import { createFeeStructure } from "../controllers/feeControllers/fee.controller";
import { payStudentFee } from "../controllers/feeControllers/pay-fee.controller";

const adminRoutes = Router();

// Student Management
adminRoutes.get("/students", allStudent); // plural
adminRoutes.post("/students", addStudent);
adminRoutes.put("/students/:rollNumber", updateStudent); // use rollNumber in URL
adminRoutes.get("/students/:rollNumber", studentByRollnumber);

// Fee Management
adminRoutes.post("/students/:studentId/pay-fee", payStudentFee);
adminRoutes.post("/fee-structure", createFeeStructure);
// staff Management

adminRoutes.post("/staff", staffAdd);
adminRoutes.get("/staff", getStaff);
adminRoutes.get("/staff/:email", staffByname);
adminRoutes.put("/staff/:email", updateStaff);
// Expense tracker
adminRoutes.post("/add", addTransaction);
adminRoutes.get("/transactions/week", transactionsByWeek);
adminRoutes.get("/transactions/month", transactionsByMonth);
adminRoutes.get("/transactions/year", transactionsByYear);
adminRoutes.get("/transactions/weekly",transactionsByWeekRaw);
adminRoutes.get("/transactions/monthly",transactionsByMonthRaw);

export default adminRoutes;
