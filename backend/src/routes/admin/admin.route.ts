import express, { Router } from "express";

import { studentSchema } from "../../controllers/adminControllers/studentsControllers";
const adminRoutes = Router();
adminRoutes.post("/addStudent", studentSchema, adminRoutes);

export default adminRoutes;
