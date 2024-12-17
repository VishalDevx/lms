const express = require("express");
const adminRoutes = express.Router();
const { PrismaClient } = require("@prisma/client");
const { error } = require("winston");
const prisma = new PrismaClient();

// Post students Id
adminRoutes.post("/students/generate_id", async (req, res) => {
  try {
    const {
      name,
      gender,
      section,
      classId,
      dateOfBirth,
      address,
      guardianName,
      guardianContact,
    } = req.body;
    const student = await prisma.students.create({
      date: {
        name,
        gender,
        section,
        classId,
        dateOfBirth: new date(dateOfBirth),
        address,
        guardianName,
        guardianContact,
      },
    });
    res.status(201).json({
      msg: " students added successfully",
      student,
    });
  } catch (error) {
    console.error("Error adding student", error);
    res.status(500).json({
      msg: " failed to add students",
      error: error.massage,
    });
  }
});
// Get total Students
adminRoutes.get("/students/total_students", (req, res) => {});
// Get single students
adminRoutes.get("/students/single_students", (req, res) => {});
// Post Staff Id
adminRoutes.post("/staff/generate_id", (req, res) => {});
// Get staff Profile
adminRoutes.get("/staff/staff_name", (req, res) => {});
//Post Expense
adminRoutes.post("/expense/new", (req, res) => {});
// Get Expense
adminRoutes.get("/expense/get", (req, res) => {});

module.exports = adminRoutes;
