// import { Request, Response } from "express";
// import jwt, { sign } from "jsonwebtoken";
// import prisma from "../config/db";
// import { adminSignupInput } from "../zod";

// export const signUp = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const result = adminSignupInput.parse(req.body);
//     if (!result) {
//       res.status(411).json({
//         msg: " Input not correct ",
//       });
//       return;
//     }
//     const signup = await prisma.admin.create({
//       data: { ...result },
//     });
//     const token = sign({ id: signup.id }, process.env.JWT_SECRET as string, {
//       expiresIn: "1h",
//     });
//     // You may want to send the token in the response
//     res.status(201).json({ token });
//   } catch (error) {
//     res.status(500).json({ msg: "Internal server error" });
//   }
// };

// export const signIn = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const result = adminSignupInput.parse(req.body);
//     if (!result) {
//       res.status(411).json({
//         msg: " Input not correct",
//       });
//     }
//     const admin = await prisma.admin.findFirst({
//       where: {
//         email: result.email,
//         password: result.password,
//       },
//     });
//     if (!admin) {
//       res.status(411).json({
//         msg: " Incorrect Creds",
//       });
//       return;
//     }
//     const token = sign({ id: admin.id }, process.env.JWT_SECRET as string, {
//       expiresIn: "1h",
//     });
//     res.status(200).json({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(411).json({
//       msg: "Invlide",
//     });
//   }
// };
