import express, {
  Express,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import cors from "cors";
import dotenv from "dotenv";
import adminRoutes from "./routes/admin.route";

// import paymentRoutes from "./routes/payment.route";
import bodyParser from "body-parser";
// import authRoutes from "./routes/auth.route";

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes

app.use("/api/v1/admin/", adminRoutes);

// app.use("/api/payment/", paymentRoutes);
// app.use("/api/v1/auth/", authRoutes);

// Error-handling middleware - ✅ returns void
const jsonErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof SyntaxError && "body" in err) {
    res.status(400).json({ error: "Invalid JSON provided" });
    return;
  }
  next();
};

app.use(jsonErrorHandler);

app.listen(port, () => {
  console.log(`Your Server is running on the Port : ${port}`);
});
