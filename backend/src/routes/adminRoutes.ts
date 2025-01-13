import express from "express";
import { login, verifyToken } from "../controllers/authControllers";

const router = express.Router();
router.get("/login", login);
router.post("/verify", verifyToken);
export default router;
