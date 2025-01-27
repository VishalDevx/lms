import express, { Router } from "express";

const adminRoutes = Router();
adminRoutes.post("/addStudent", adminRoutes);

export default adminRoutes;
