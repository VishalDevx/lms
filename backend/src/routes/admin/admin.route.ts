import { Router } from "express";
import {
  addStudent,
  allStudent,
  studentByRollnumber,
  updateStudent,
} from "../../controllers/StudentControlles/students.controller";
import { assignFee } from "../../controllers/feeControllers.ts/feeStructure.controller";

const adminRoutes = Router();

adminRoutes.post("/add_student", addStudent);
adminRoutes.put("/update_student", updateStudent);
adminRoutes.get("/all_student", allStudent);
adminRoutes.get("/:rollNumber", studentByRollnumber);

adminRoutes.post("/add_fee", assignFee);

export default adminRoutes;
