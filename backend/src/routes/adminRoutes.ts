import express from "express";
import { login, verifyToken } from "../controllers/authControllers";

const router = express.Router();
router.post("/login", login);
router.get("/verify", verifyToken);
export default router;
