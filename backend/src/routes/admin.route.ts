import { Router } from "express";
import {
  addStudent,
  allStudent,
  studentByRollnumber,
  updateStudent,
} from "../controllers/StudentControlles/students.controller";
import {
  assignFee,
  studentFee,
} from "../controllers/feeControllers/feeStructure.controller";
import { getStudentFees } from "../controllers/feeControllers/getStudentFee.controller";
import {
  getStaff,
  staffAdd,
  staffByname,
  updateStaff,
} from "../controllers/staffController/manageStaff.controller";
import {
  addTrascation,
  incomeByCategory,
  incomeBymonth,
  incomeByWeek,
} from "../controllers/expenseController/expense.controller";

const adminRoutes = Router();

// Student Management
adminRoutes.get("/students", allStudent); // plural
adminRoutes.post("/students", addStudent);
adminRoutes.put("/students/:rollNumber", updateStudent); // use rollNumber in URL
adminRoutes.get("/students/:rollNumber", studentByRollnumber);

// Fee Management
adminRoutes.post("/assign_fee", assignFee); // assign fee to a whole grade
adminRoutes.get("/student/:studentId/fees", getStudentFees); // view fees of a student (admin-side)
adminRoutes.get("/student_fee", studentFee);

// staff Management

adminRoutes.post("/staff", staffAdd);
adminRoutes.get("/staff", getStaff);
adminRoutes.get("/staff/:email", staffByname);
adminRoutes.put("/staff/:email", updateStaff);
// Expense tracker
adminRoutes.post("/expenses", addTrascation);
adminRoutes.get("/income-by-category", incomeByCategory);
adminRoutes.get("/income-by-week", incomeByWeek);
adminRoutes.get("/income-by-month", incomeBymonth);
export default adminRoutes;
