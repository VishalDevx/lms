/*
  Warnings:

  - You are about to drop the column `amountPaid` on the `PaymentReceipt` table. All the data in the column will be lost.
  - You are about to drop the column `paymentDate` on the `PaymentReceipt` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `PaymentReceipt` table. All the data in the column will be lost.
  - You are about to drop the column `studentFeeId` on the `PaymentReceipt` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `PaymentReceipt` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[paymentId]` on the table `PaymentReceipt` will be added. If there are existing duplicate values, this will fail.
  - Made the column `studentFeeId` on table `Payment` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `paymentId` to the `PaymentReceipt` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Payment" DROP CONSTRAINT "Payment_studentFeeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PaymentReceipt" DROP CONSTRAINT "PaymentReceipt_studentFeeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PaymentReceipt" DROP CONSTRAINT "PaymentReceipt_studentId_fkey";

-- AlterTable
ALTER TABLE "public"."Payment" ALTER COLUMN "studentFeeId" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."PaymentReceipt" DROP COLUMN "amountPaid",
DROP COLUMN "paymentDate",
DROP COLUMN "paymentMethod",
DROP COLUMN "studentFeeId",
DROP COLUMN "studentId",
ADD COLUMN     "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "paymentId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."ClassTeacher" (
    "id" SERIAL NOT NULL,
    "staffId" INTEGER NOT NULL,
    "grade" "public"."Grade" NOT NULL,

    CONSTRAINT "ClassTeacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Exam" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "maxMarks" INTEGER NOT NULL,
    "grade" "public"."Grade" NOT NULL,

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Result" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "examId" INTEGER NOT NULL,
    "marks" INTEGER NOT NULL,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_PaymentReceiptToStudentFee" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PaymentReceiptToStudentFee_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_PaymentReceiptToStudent" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PaymentReceiptToStudent_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClassTeacher_staffId_key" ON "public"."ClassTeacher"("staffId");

-- CreateIndex
CREATE UNIQUE INDEX "ClassTeacher_grade_key" ON "public"."ClassTeacher"("grade");

-- CreateIndex
CREATE INDEX "_PaymentReceiptToStudentFee_B_index" ON "public"."_PaymentReceiptToStudentFee"("B");

-- CreateIndex
CREATE INDEX "_PaymentReceiptToStudent_B_index" ON "public"."_PaymentReceiptToStudent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentReceipt_paymentId_key" ON "public"."PaymentReceipt"("paymentId");

-- AddForeignKey
ALTER TABLE "public"."ClassTeacher" ADD CONSTRAINT "ClassTeacher_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "public"."Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_studentFeeId_fkey" FOREIGN KEY ("studentFeeId") REFERENCES "public"."StudentFee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PaymentReceipt" ADD CONSTRAINT "PaymentReceipt_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "public"."Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Result" ADD CONSTRAINT "Result_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Result" ADD CONSTRAINT "Result_examId_fkey" FOREIGN KEY ("examId") REFERENCES "public"."Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PaymentReceiptToStudentFee" ADD CONSTRAINT "_PaymentReceiptToStudentFee_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."PaymentReceipt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PaymentReceiptToStudentFee" ADD CONSTRAINT "_PaymentReceiptToStudentFee_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."StudentFee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PaymentReceiptToStudent" ADD CONSTRAINT "_PaymentReceiptToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."PaymentReceipt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PaymentReceiptToStudent" ADD CONSTRAINT "_PaymentReceiptToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
