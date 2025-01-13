import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { dot } from "node:test/reporters";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.get("/", (req: Request, res: Response) => {
  res.send("TypeScript + Express");
});

app.listen(port, () => {
  console.log(`Your Server is running on the Port : ${port}`);
});
