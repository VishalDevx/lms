import { Router } from "express";
import { signIn, signUp } from "../middlewares/authAdmin";

const authRoutes = Router();
authRoutes.post("/sign-up", signUp);
authRoutes.post("/sign-in", signIn);

export default authRoutes;
