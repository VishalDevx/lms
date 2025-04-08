import { Router } from "express";
import {
  addStudent,
  allStudent,
  studentByRollnumber,
  updateStudent,
} from "../../controllers/StudentControlles/students.controller";
import { assignFee } from "../../controllers/feeControllers.ts/feeStructure.controller";
import { getStudentFees } from "../../controllers/feeControllers.ts/getStudentFee.controller";

const adminRoutes = Router();

// Student Management
adminRoutes.post("/add_student", addStudent);
adminRoutes.put("/update_student", updateStudent);
adminRoutes.get("/all_student", allStudent);
adminRoutes.get("/:rollNumber", studentByRollnumber);

// Fee Management
adminRoutes.post("/assign_fee", assignFee); // assign fee to a whole grade
adminRoutes.get("/student/:studentId/fees", getStudentFees); // view fees of a student (admin-side)

export default adminRoutes;
