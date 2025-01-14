import express, { Router } from "express"; // Import express to use Router
import { login, verifyToken } from "../controllers/authControllers";

const router: Router = express.Router(); // Use the imported express to call Router
router.post("/login", login);
router.post("/verify", verifyToken);

export default router;
