import express, { Router } from "express";
import { studentSchema } from "../../middlewares/studentValidation";

const adminRoutes = Router();
adminRoutes.post("/addStudent", adminRoutes);

export default adminRoutes;
