import cron from "node-cron";
import prisma from "../config/db";
import { FeeStatusEnum } from "../zod";

// ------------------------
// Fee Scheduler
// ------------------------
cron.schedule("0 0 1 * *", async () => {
  try {
    const today = new Date();
    const academicYearStartMonth = 3; // April
    let academicYearStartYear = today.getFullYear();

    if (today.getMonth() < academicYearStartMonth) {
      academicYearStartYear -= 1;
    }

    const currentMonth = new Date(academicYearStartYear, today.getMonth(), 1);

    // Fetch fee structures with Prisma model types
    const feeStructures = await prisma.feeStructure.findMany({
      where: { month: currentMonth },
      orderBy: { updatedAt: "desc" },
    });

    for (const fee of feeStructures) {
      // Fetch students by grade
      const students = await prisma.student.findMany({
        where: { grade: fee.grade },
      });

      let createdCount = 0;

      for (const student of students) {
        const existingFee = await prisma.studentFee.findFirst({
          where: { studentId: student.id, feeStructureId: fee.id },
        });

        if (!existingFee) {
          // Create student fee
          const studentFee = await prisma.studentFee.create({
            data: {
              studentId: student.id,
              feeStructureId: fee.id,
              totalFee: fee.amount,
              paidAmount: 0,
              dueAmount: fee.amount,
              status: "PENDING", // literal works fine
              dueDate: new Date(today.getFullYear(), today.getMonth(), 10),
            },
          });

          // Fee history
          await prisma.feeHistory.create({
            data: {
              changeType: "Auto Update",
              oldAmount: 0,
              newAmount: fee.amount,
              status: "PENDING",
              studentFeeId: studentFee.id,
            },
          });

          createdCount++;
        }
      }

      console.log(
        `[${new Date().toISOString()}] Assigned ${createdCount} fees for grade ${fee.grade}`
      );
    }

    console.log(`[${new Date().toISOString()}] Fee scheduler completed successfully.`);
  } catch (err) {
    console.error(`[${new Date().toISOString()}] Error in fee scheduler:`, err);
  }
});
