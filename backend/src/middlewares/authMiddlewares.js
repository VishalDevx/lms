const express = require("express");
const authRoutes = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const { prismaClient } = require("@prisma/client");

const prisma = new prismaClient();

authRoutes.post("/signup", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    res.status(201).json("Your id is created", newUser);
  } catch (error) {
    console.error("semothing went wrong ", error);
    res.status(400).json(error);
  }
  let token;
  try {
    token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email,
      }[(process.env.JWT_SECRET, { expiresIn: "1h" })]
    );
  } catch (err) {
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }
  res.status(201).json({
    success: true,
    data: {
      userId: newUser.id,
      email: newUser.email,
      token: token,
    },
  });
});
module.exports = authRoutes;
