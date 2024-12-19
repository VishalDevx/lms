const express = require("express");
const adminRoutes = express.Router();
const {
  PrismaClient,
  Gender,
  Section,
  PaymentStatus,
} = require("@prisma/client");

const prisma = new PrismaClient();

// Post students Id

adminRoutes.post("/students", async (req, res) => {
  try {
    const {
      name,
      gender,
      section,
      dateOfBirth,
      address,
      gaurdianName,
      gaurdianContact,
    } = req.body;
    const genderValue = Gender[gender.toUpperCase()];
    const sectionValue = Section[section.toUpperCase()];
    if (!genderValue) {
      res.status(400).json({
        msg: "gender is not selected correctly",
      });
    }
    if (!sectionValue) {
      res.status(400).json({
        msg: "You are not give the sections ",
      });
    }
    const student = await prisma.students.create({
      data: {
        name,
        gender: genderValue,
        section: sectionValue,
        dateOfBirth: new Date(dateOfBirth),
        address,
        gaurdianName,
        gaurdianContact,
      },
    });
    return res.status(201).json({ msg: "Student added successfully", student });
  } catch (error) {
    console.error("Failed to add the student:", error);
    return res.status(500).json({
      msg: "An error occurred while adding the student",
      error: error.message,
    });
  }
});
adminRoutes.get("/students", async (req, res) => {
  try {
    const student = await prisma.students.findMany();
    res.status(200).json(student);
  } catch (error) {
    console.error("error while fetching the data", error);
    res.status(500).json({
      msg: "failed in fetching",
      error,
    });
  }
});
adminRoutes.get("/students/:id", async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    console.log("Invalid ID received:", id); // Logs invalid input
    return res
      .status(400)
      .json({ msg: "Invalid student ID. Must be a numeric value." });
  }

  try {
    const student = await prisma.students.findUnique({
      where: { id: Number(id) },
    });

    if (!student) {
      return res.status(404).json({ msg: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ error: "Unable to fetch the student" });
  }
});
adminRoutes.delete("/students/:id", async (req, res) => {
  const { id } = req.params;

  // Validate ID
  if (!id || isNaN(Number(id))) {
    console.log("Invalid ID received:", id);
    return res.status(400).json({
      msg: "Invalid student ID. Must be a numeric value.",
    });
  }

  try {
    // Delete the student
    const student = await prisma.students.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json({
      msg: "Student removed successfully.",
      student,
    });
  } catch (error) {
    // Handle errors
    if (error.code === "P2025") {
      // Prisma error for "Record not found"
      return res.status(404).json({ msg: "Student not found." });
    }

    console.error("Error deleting student:", error);
    return res.status(500).json({ error: "Unable to delete the student." });
  }
});

adminRoutes.post("/students/:id/fees", async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    return res
      .status(400)
      .json({ msg: "Invalid student ID. Must be a numeric value." });
  }
  const { amount, totalAmount, paymentStatus, startMonth, paidDate } = req.body;

  try {
    // Check if student exists
    const student = await prisma.students.findUnique({
      where: { id: Number(id) },
    });

    if (!student) {
      return res.status(404).json({ msg: "Student not found." });
    }
    const statusValues = PaymentStatus[paymentStatus.toUpperCase()];
    // Validate paymentStatus
    if (!statusValues) {
      return res.status(400).json({ msg: "Invalid payment status." });
    }

    // Create fee
    const fee = await prisma.fees.create({
      data: {
        class: String(),
        amount: Number(amount),

        totalAmount: Number(totalAmount),
        paymentStatus: statusValues,
        startMonth: new Date(startMonth),
        paidDate: paidDate ? new Date(paidDate) : null,
        Students: {
          connect: { id: Number(id) },
        },
      },
    });

    res.status(201).json({ msg: "Fee created successfully.", fee });
  } catch (error) {
    console.error("Error adding fee:", error);
    res.status(500).json({ error: "Unable to create fee." });
  }
});

module.exports = adminRoutes;
