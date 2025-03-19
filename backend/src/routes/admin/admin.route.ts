import { Router } from "express";
import { addStudent } from "../../controllers/adminControllers/students.controllers";

const adminRoutes = Router();

adminRoutes.post("/add_student", addStudent);
export default adminRoutes;
