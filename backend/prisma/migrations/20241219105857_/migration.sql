/*
  Warnings:

  - Made the column `studentsId` on table `Fees` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Fees" DROP CONSTRAINT "Fees_studentsId_fkey";

-- AlterTable
ALTER TABLE "Fees" ALTER COLUMN "studentsId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Fees" ADD CONSTRAINT "Fees_studentsId_fkey" FOREIGN KEY ("studentsId") REFERENCES "Students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
