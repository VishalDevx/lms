import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import adminRoutes from "./routes/admin/admin.route";

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/v1/admin/", adminRoutes);
app.listen(port, () => {
  console.log(`Your Server is running on the Port : ${port}`);
});
