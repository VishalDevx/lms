import { Router } from "express";
import { add_student } from "../../controllers/adminControllers/students.controllers";
import { validateStudent } from "../../middlewares/studentValidation";

const adminRoutes = Router();

adminRoutes.post("/add_student", validateStudent, add_student);

export default adminRoutes;
