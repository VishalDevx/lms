import express from "express";
import { feeStructureSchema } from "../../middlewares/feeValidation";

import prisma from "../../config/db";
import { z } from "zod";

const router = express.Router();

// POST /api/fee-structures
router.post("/fee-structures", async (req, res) => {
  try {
    // Validate request data
    const validatedData = feeStructureSchema.parse(req.body);

    // Create a new Fee Structure in the database
    const feeStructure = await prisma.feeStructure.create({
      data: validatedData,
    });

    res.status(201).json({
      message: "Fee structure created successfully",
      feeStructure,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Send validation errors
      res.status(400).json({ errors: error.errors });
    } else {
      // Handle other errors
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

export default router;
