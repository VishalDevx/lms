/*
  Warnings:

  - Added the required column `grade` to the `FeeStructure` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FeeStructure" ADD COLUMN     "grade" "Grade" NOT NULL;
