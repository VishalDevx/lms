import { Hono } from "hono";
import dotenv from "dotenv";
dotenv.config();
const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
