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
  incomeByCategory,
  incomeByMonth,
  incomeByWeek,
  incomeByYear,
  expenseByCategory,
  expenseByMonth,
  expenseByWeek,
  expenseByYear,
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
adminRoutes.post("/expenses", addTransaction);
adminRoutes.get("/income/category", incomeByCategory);
adminRoutes.get("/income/week", incomeByWeek);
adminRoutes.get("/income/month", incomeByMonth);
adminRoutes.get("/expense/category", expenseByCategory);
adminRoutes.get("/expense/week", expenseByWeek);
adminRoutes.get("/expense/month", expenseByMonth);
adminRoutes.get("/expense/year",expenseByYear);
adminRoutes.get("/income/year",incomeByYear)
export default adminRoutes;
