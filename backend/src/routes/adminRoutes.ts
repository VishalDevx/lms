import express, { Router } from "express";
import { studentValidation } from "../middlewares/studentValidations";

const router: Router = express.Router();

router.post("/createstudent", studentValidation, createStudent);
