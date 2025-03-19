import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import adminRoutes from "./routes/admin/admin.route";

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/v1/admin/", adminRoutes);
app.listen(port, () => {
  console.log(`Your Server is running on the Port : ${port}`);
});
