/*
  Warnings:

  - The primary key for the `FeeHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `FeeHistory` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `studentId` column on the `FeeHistory` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `FeeStructure` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `FeeStructure` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `studentFeeId` column on the `Payment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `studentId` column on the `Payment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Student` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `StudentFee` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `StudentFee` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `feeStructureId` column on the `StudentFee` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `studentId` column on the `StudentFee` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "FeeHistory" DROP CONSTRAINT "FeeHistory_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_studentFeeId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_studentId_fkey";

-- DropForeignKey
ALTER TABLE "StudentFee" DROP CONSTRAINT "StudentFee_feeStructureId_fkey";

-- DropForeignKey
ALTER TABLE "StudentFee" DROP CONSTRAINT "StudentFee_studentId_fkey";

-- DropIndex
DROP INDEX "StudentFee_feeStructureId_key";

-- AlterTable
ALTER TABLE "FeeHistory" DROP CONSTRAINT "FeeHistory_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "studentId",
ADD COLUMN     "studentId" INTEGER,
ADD CONSTRAINT "FeeHistory_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "FeeStructure" DROP CONSTRAINT "FeeStructure_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "FeeStructure_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "studentFeeId",
ADD COLUMN     "studentFeeId" INTEGER,
DROP COLUMN "studentId",
ADD COLUMN     "studentId" INTEGER;

-- AlterTable
ALTER TABLE "Student" DROP CONSTRAINT "Student_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Student_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "StudentFee" DROP CONSTRAINT "StudentFee_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "feeStructureId",
ADD COLUMN     "feeStructureId" INTEGER,
DROP COLUMN "studentId",
ADD COLUMN     "studentId" INTEGER,
ADD CONSTRAINT "StudentFee_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "StudentFee" ADD CONSTRAINT "StudentFee_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentFee" ADD CONSTRAINT "StudentFee_feeStructureId_fkey" FOREIGN KEY ("feeStructureId") REFERENCES "FeeStructure"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_studentFeeId_fkey" FOREIGN KEY ("studentFeeId") REFERENCES "StudentFee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeeHistory" ADD CONSTRAINT "FeeHistory_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;
