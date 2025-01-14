import express, { Router } from "express"; // Import express to use Router
import { login, verifyToken } from "../controllers/authControllers";

const router: Router = express.Router(); // Use the imported express to call Router
router.get("api/login", login);
router.post("api/verify", verifyToken);

export default router;
