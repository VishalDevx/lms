import { Request, Response, NextFunction } from "express";
import { addStudentSchema } from "../../middlewares/studentValidation"; // Assuming the path is correct

export const studentValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Perform validation
    const validationResult = addStudentSchema.safeParse(req.body); // Use req.body here

    if (!validationResult.success) {
      res.status(400).json({
        msg: "Validation failed",
        errors: validationResult.error.format(),
      });
      return;
    }

    // Attach validated data to request body for further use
    req.body = validationResult.data.body;

    next();
  } catch (error) {
    console.error("Validation Error:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
