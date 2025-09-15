// import { Request, Response } from "express";
// import { razorpayInstance } from "../../config/razorpay";
// import prisma from "../../config/db";

// export const createOrder = async (
//   req: Request,
//   res: Response
// ): Promise<any> => {
//   try {
//     const { studentFeeId } = req.body;

//     const studentFee = await prisma.studentFee.findUnique({
//       where: { id: studentFeeId },
//       include: { Student: true },
//     });

//     if (!studentFee) {
//       return res.status(404).json({
//         msg: "Student does not have any pending fee record.",
//       });
//     }

//     const amount = studentFee.dueAmount;

//     const options = {
//       amount: Math.round(amount * 100), // always safer to round
//       currency: "INR",
//       receipt: `receipt_order_${Date.now()}`, // ✅ fixed typo here
//       payment_capture: 1,
//     };

//     const order = await razorpayInstance.orders.create(options);

//     return res.status(200).json({
//       success: true,
//       order,
//     });
//   } catch (error) {
//     console.error("Razorpay order error:", error); // for debug
//     return res.status(500).json({
//       msg: "Failed to create Razorpay order",
//     });
//   }
// };
