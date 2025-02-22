import { Router } from "express";
import { add_student } from "../../controllers/adminControllers/students.controllers";
import { validateStudent } from "../../middlewares/studentValidation";
import { fee_structures } from "../../controllers/adminControllers/feeController";

const adminRoutes = Router();

adminRoutes.post("/add_student", validateStudent, add_student);
adminRoutes.use("/api", fee_structures);

export default adminRoutes;
