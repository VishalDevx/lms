const express = require("express");
const authRoutes = express.Router();
const { prismaClient } = require("@prisma/client");

const prisma = new prismaClient();

authRoutes.post("/login", (req, res, next) => {
  const { name, email, password } = req.body;
});
