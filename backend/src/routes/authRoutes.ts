import express, { Router } from "express"; // Import express to use Router
import { login, verifyToken } from "../controllers/authControllers";
import { signup } from "../controllers/signupControllers";
import { signupValidation } from "../middlewares/validation";

const router: Router = express.Router(); // Use the imported express to call Router
router.post("/signup", signupValidation, signup);
router.post("/login", login);
router.post("/verify", verifyToken);

export default router;
