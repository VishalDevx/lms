import express, { Router } from "express"; // Import express to use Router
import { login, verifyToken } from "../controllers/authControllers";

const router: Router = express.Router(); // Use the imported express to call Router
authRoute.get("api/login", login);
authRoute.post("api/verify", verifyToken);

export default router;
