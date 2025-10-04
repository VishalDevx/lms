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
  staffByEmail,
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

import {
  assignClassTeacher,
  getClassTeacherByGrade,
  getClassTeachers,
  removeClassTeacher,
  updateClassTeacher,
} from "../controllers/staffController/classTeacher.controller";

import {
  deleteResult,
  getAllResults,
  getResultsByGrade,
  getResultsByStudent,
  updateResult,
  uploadResult,
} from "../controllers/result.controller";

const adminRoutes = Router();

// ------------------------
// Student Management Routes
// ------------------------

// Get all students
adminRoutes.get("/students", allStudent);

// Add a new student
adminRoutes.post("/students", addStudent);

// Update student information by roll number
adminRoutes.put("/students/:rollNumber", updateStudent);

// Get a student by roll number
adminRoutes.get("/students/:rollNumber", studentByRollnumber);

// ------------------------
// Fee Management Routes
// ------------------------

// Pay a fee for a specific student
adminRoutes.post("/students/:studentId/pay-fee", payStudentFee);

// Create a new fee structure
adminRoutes.post("/fee-structure", createFeeStructure);

// ------------------------
// Staff Management Routes
// ------------------------

// Add a new staff member
adminRoutes.post("/staff", staffAdd);

// Get all staff members
adminRoutes.get("/staff", getStaff);

// Get staff member by email
adminRoutes.get("/staff/:email", staffByEmail);

// Update staff member by email
adminRoutes.put("/staff/:email", updateStaff);

// ------------------------
// Expense Tracker Routes
// ------------------------

// Add a new transaction
adminRoutes.post("/add", addTransaction);

// Get transactions for the current week
adminRoutes.get("/transactions/week", transactionsByWeek);

// Get transactions for the current month
adminRoutes.get("/transactions/month", transactionsByMonth);

// Get transactions for the current year
adminRoutes.get("/transactions/year", transactionsByYear);

// Get raw weekly transaction data
adminRoutes.get("/transactions/weekly", transactionsByWeekRaw);

// Get raw monthly transaction data
adminRoutes.get("/transactions/monthly", transactionsByMonthRaw);

// ------------------------
// Class Teacher Routes
// ------------------------

// Assign a new class teacher to a grade
adminRoutes.post("/class-teachers", assignClassTeacher);

// Get all class teachers
adminRoutes.get("/class-teachers", getClassTeachers);

// Get a class teacher by grade
adminRoutes.get("/class-teachers/grade/:grade", getClassTeacherByGrade);

// Update a class teacher by ID
adminRoutes.put("/class-teachers/:id", updateClassTeacher);

// Remove a class teacher by ID
adminRoutes.delete("/class-teachers/:id", removeClassTeacher);

// ------------------------
// Result Management Routes
// ------------------------

// Upload a new result for a student
adminRoutes.post("/results", uploadResult);

// Get all results
adminRoutes.get("/results", getAllResults);

// Get results for a specific student
adminRoutes.get("/results/student/:studentId", getResultsByStudent);

// Get results for a specific grade
adminRoutes.get("/results/grade/:grade", getResultsByGrade);

// Update a result by ID
adminRoutes.put("/results/:id", updateResult);

// Delete a result by ID
adminRoutes.delete("/results/:id", deleteResult);

export default adminRoutes;
