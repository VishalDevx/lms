import express, { Router } from "express";
import { studentValidation } from "../middlewares/studentValidations";
import {
  createStudent,
  uniqueStudents,
  students,
} from "../controllers/adminControllers/studentControllers";
const router: Router = express.Router();

router.post("/createstudent", studentValidation, createStudent);
router.get("/uniqueStudents/:rollNumber", uniqueStudents);
router.get("/students", students);
export default router;
