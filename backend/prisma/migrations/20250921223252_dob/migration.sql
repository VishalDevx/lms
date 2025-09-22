/*
  Warnings:

  - Added the required column `dob` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Student" ADD COLUMN     "dob" TIMESTAMP(3) NOT NULL;
