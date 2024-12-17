const express = require("express");
const adminRoutes = express.Router();
const { PrismaClient, Gender } = require("@prisma/client");

const prisma = new PrismaClient();

// Post students Id
adminRoutes.post("/students/generate_id", async (req, res) => {
  try {
    const {
      name,
      gender, // Expecting "MALE", "FEMALE", "OTHER"
      section,
      classId,
      dateOfBirth,
      address,
      guardianName,
      guardianContact,
    } = req.body;

    // Convert gender to uppercase to match the enum case
    const genderValue = Gender[gender.toUpperCase()];

    if (!genderValue) {
      return res.status(400).json({ msg: "Invalid gender value" });
    }

    const student = await prisma.students.create({
      data: {
        name,
        gender: genderValue, // Use the enum value
        section,
        classId,
        dateOfBirth: new Date(dateOfBirth),
        address,
        guardianName,
        guardianContact,
      },
    });

    res.status(201).json({
      msg: "Student added successfully",
      student,
    });
  } catch (error) {
    console.error("Error adding student", error);
    res.status(500).json({
      msg: "Failed to add student",
      error: error.message,
    });
  }
});

// Other routes...
adminRoutes.get("/students/total_students", async (req, res) => {
  try {
    const totalStudents = await prisma.students.count();
    res.status(200).json({ totalStudents });
  } catch (error) {
    console.error("Error fetching total students", error);
    res.status(500).json({
      msg: "Failed to fetch total students",
      error: error.message,
    });
  }
});

adminRoutes.get("/students/single_students", async (req, res) => {
  try {
    const studentId = req.query.id; // Assuming ID is passed as a query parameter
    const student = await prisma.students.findUnique({
      where: { id: Number(studentId) },
    });

    if (student) {
      res.status(200).json({ student });
    } else {
      res.status(404).json({ msg: "Student not found" });
    }
  } catch (error) {
    console.error("Error fetching student", error);
    res.status(500).json({
      msg: "Failed to fetch student",
      error: error.message,
    });
  }
});

// Post Staff Id
adminRoutes.post("/staff/generate_id", async (req, res) => {
  try {
    const {
      name,
      gender, // Expecting "MALE", "FEMALE", "OTHER"
      section,
      classId,
      dateOfBirth,
      address,
      guardianName,
      guardianContact,
    } = req.body;

    // Convert gender to uppercase to match the enum case
    const genderValue = Gender[gender.toUpperCase()];

    if (!genderValue) {
      return res.status(400).json({ msg: "Invalid gender value" });
    }

    const staff = await prisma.staff.create({
      data: {
        name,
        gender: genderValue, // Use the enum value
        section,
        classId,
        dateOfBirth: new Date(dateOfBirth),
        address,
        guardianName,
        guardianContact,
      },
    });

    res.status(201).json({
      msg: "Staff added successfully",
      staff,
    });
  } catch (error) {
    console.error("Error adding staff", error);
    res.status(500).json({
      msg: "Failed to add staff",
      error: error.message,
    });
  }
});

// Get staff Profile
adminRoutes.get("/staff/staff_name", async (req, res) => {
  try {
    const staffId = req.query.id; // Assuming ID is passed as a query parameter
    const staff = await prisma.staff.findUnique({
      where: { id: Number(staffId) },
    });

    if (staff) {
      res.status(200).json({ staff });
    } else {
      res.status(404).json({ msg: "Staff not found" });
    }
  } catch (error) {
    console.error("Error fetching staff", error);
    res.status(500).json({
      msg: "Failed to fetch staff",
      error: error.message,
    });
  }
});

// Post Expense
adminRoutes.post("/expense/new", async (req, res) => {
  try {
    const { name, amount, date } = req.body;

    const expense = await prisma.expense.create({
      data: {
        name,
        amount,
        date: new Date(date),
      },
    });

    res.status(201).json({
      msg: "Expense added successfully",
      expense,
    });
  } catch (error) {
    console.error("Error adding expense", error);
    res.status(500).json({
      msg: "Failed to add expense",
      error: error.message,
    });
  }
});

// Get Expense
adminRoutes.get("/expense/get", async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany();
    res.status(200).json({ expenses });
  } catch (error) {
    console.error("Error fetching expenses", error);
    res.status(500).json({
      msg: "Failed to fetch expenses",
      error: error.message,
    });
  }
});

module.exports = adminRoutes;
