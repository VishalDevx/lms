const express = require("express");
const adminRoutes = express.Router();
const { PrismaClient, Gender } = require("@prisma/client");

const prisma = new PrismaClient();

// Post students Id
adminRoutes.post("/students", async (req, res) => {
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
adminRoutes.get("/students", async (req, res) => {
  try {
    const students = await prisma.students.findMany(); // Fetch all students
    res.status(200).json(students); // Send the response
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Unable to fetch students" });
  }
});
adminRoutes.get("/students/:id", async (req, res) => {
  const { id } = req.params;

  console.log("req.params:", req.params); // Debugging the incoming request
  console.log("Received ID:", id);

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

module.exports = adminRoutes;
