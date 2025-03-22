/*
  Warnings:

  - You are about to drop the column `adminId` on the `FeeStructure` table. All the data in the column will be lost.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FeeStructure" DROP CONSTRAINT "FeeStructure_adminId_fkey";

-- AlterTable
ALTER TABLE "FeeStructure" DROP COLUMN "adminId";

-- DropTable
DROP TABLE "Admin";
