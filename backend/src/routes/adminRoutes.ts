import express, { Router } from "express";
import { studentValidation } from "../middlewares/studentValidations";
import {
  createStudent,
  uniqueStudents,
  students,
} from "../controllers/adminControllers/studentControllers";
import { feeValidation } from "../middlewares/feesValidation";
import {
  createStudentFee,
  studentFee,
} from "../controllers/adminControllers/feesControllers";
const router: Router = express.Router();

router.post("/createstudent", studentValidation, createStudent);
router.get("/uniqueStudents/:rollNumber", uniqueStudents);
router.get("/students", students);
router.post("/create_student_fee", feeValidation, createStudentFee);
router.get("/student_fee/:id", studentFee);
export default router;
