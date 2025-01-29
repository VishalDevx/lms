import express, { Router } from "express";
import { add_student } from "../../controllers/adminControllers/students.controllers";
const adminRoutes = Router();
adminRoutes.post("/add_student", add_student);

export default adminRoutes;
