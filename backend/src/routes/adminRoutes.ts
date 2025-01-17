import express, { Router } from "express";
import { studentValidation } from "../middlewares/studentValidations";
import { createStudent } from "../controllers/adminControllers/studentControllers";
const router: Router = express.Router();

router.post("/createstudent", studentValidation, createStudent);

export default router;
