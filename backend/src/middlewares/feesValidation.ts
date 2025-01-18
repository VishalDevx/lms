import { Request, Response, NextFunction } from "express";
import { z } from "zod";

// Define the Zod schema for fee validation
const feeSchema = z.object({
  studentId: z.number().min(1, "StudentId is Required!"),
  amount: z.number().min(1, "Amount is required"),
  dueDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  paid: z.boolean().default(false),
});

// Middleware for validating the request body
export const feeValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Parse and validate the request body
    feeSchema.parse(req.body);
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Format Zod error messages
      const validationErrors = error.errors.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      }));

      res.status(400).json({
        msg: "Validation Error",
        errors: validationErrors,
      });
    } else {
      // Handle other unexpected errors
      console.error("Unexpected error during validation:", error);
      res.status(500).json({
        msg: "Internal Server Error",
      });
    }
  }
};
