/*
  Warnings:

  - Added the required column `address` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `class` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fatherName` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motherName` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "bloodGroup" TEXT,
ADD COLUMN     "class" TEXT NOT NULL,
ADD COLUMN     "fatherName" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "mobileNumber" INTEGER,
ADD COLUMN     "motherName" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "profilePic" TEXT;
