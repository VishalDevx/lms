import express, { Router } from "express"; // Import express to use Router

import { signupValidation } from "../middlewares/SignupValidation";
import { login, signup } from "../controllers/adminControllers/authControllers";

const router: Router = express.Router(); // Use the imported express to call Router
router.post("/signup", signupValidation, signup);
router.post("/login", login);
// router.post("/verify", verifyToken);

export default router;
