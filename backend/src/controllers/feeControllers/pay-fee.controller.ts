import { Request, Response } from "express";
import prisma from "../../config/db";
import { uuidv4 } from "zod/v4";
// For unique receipt numbers

export const payStudentFee = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params; // studentId from URL
    const { studentFeeId, amountPaid, paymentMethod } = req.body;

    // Validate required fields
    if (!studentId || !studentFeeId || !amountPaid || !paymentMethod) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const studentIdNum = Number(studentId);
    if (isNaN(studentIdNum)) {
      return res.status(400).json({ msg: "Invalid studentId" });
    }

    // Find the student
    const student = await prisma.student.findUnique({
      where: { id: studentIdNum }, // Use studentIdNum here
    });

    if (!student) {
      return res.status(404).json({ msg: "Student not found" });
    }

    // Validate studentFeeId
    const feeId = Number(studentFeeId);
    if (isNaN(feeId)) {
      return res.status(400).json({ msg: "Invalid studentFeeId" });
    }

    // Find the student fee
    const studentFee = await prisma.studentFee.findUnique({
      where: { id: feeId },
      include: { FeeStructure: true, payments: true, feeHistories: true },
    });

    if (!studentFee || studentFee.studentId !== student.id) {
      return res.status(404).json({ msg: "Student fee not found or does not belong to this student" });
    }

    // Convert amountPaid to number
    const paidAmountNum = Number(amountPaid);
    if (isNaN(paidAmountNum) || paidAmountNum <= 0) {
      return res.status(400).json({ msg: "Invalid amountPaid" });
    }

    // Calculate updated amounts
    const newPaidAmount = studentFee.paidAmount + paidAmountNum;
    const newDueAmount = studentFee.totalFee - newPaidAmount;

    // Determine fee status
    let newStatus: "PENDING" | "PARTIALLY_PAID" | "PAID" | "OVERDUE" = "PENDING";
    if (newDueAmount <= 0) {
      newStatus = "PAID";
    } else if (newPaidAmount > 0 && newDueAmount > 0) {
      newStatus = "PARTIALLY_PAID";
    } else if (studentFee.dueDate && new Date(studentFee.dueDate) < new Date()) {
      newStatus = "OVERDUE";
    }

    // Update Student Fee
    const updatedFee = await prisma.studentFee.update({
      where: { id: feeId },
      data: {
        paidAmount: newPaidAmount,
        dueAmount: newDueAmount,
        status: newStatus,
      },
      include: { FeeStructure: true },
    });

    // Save fee history
    await prisma.feeHistory.create({
      data: {
        changeType: "Payment",
        oldAmount: studentFee.paidAmount,
        newAmount: newPaidAmount,
        status: newStatus,
        studentFeeId: studentFee.id,
      },
    });

    // Create payment receipt
    const receipt = await prisma.paymentReceipt.create({
      data: {
        studentId: student.id,
        studentFeeId: studentFee.id,
        amountPaid: paidAmountNum,
        paymentMethod,
        receiptNo: `RCPT-${uuidv4()}`, // Unique receipt number
        paymentDate: new Date(),
      },
    });

    return res.status(200).json({
      msg: "Fee paid successfully",
      fee: updatedFee,
      receipt,
    });
  } catch (err) {
    console.error("Error paying fee:", err);
    return res.status(500).json({ msg: "Failed to pay fee", error: (err as Error).message });
  }
};