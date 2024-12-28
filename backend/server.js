const express = require("express");
const adminRoutes = require("./src/routes/adminRoutes");
const authRoutes = require("./src/middlewares/authMiddlewares");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
port = process.env.PORT || 3000;
app.use(express.json());
app.use("/lms/api/v1/admin/", adminRoutes);

app.use("lms/api/v1/auth/", authRoutes);
// app.use("/api/v1/admin", adminRoutes);
// app.use("/api/v1/staff", staffRotes);
// app.use("/api/v1/students", studentsRoutes);
app.listen(port, () => {
  console.log(`Your app is runnig at ${port} port`);
});
