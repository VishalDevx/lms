/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `staff` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dob` to the `staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `staff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "staff" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "dob" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "profilePic" TEXT,
ADD COLUMN     "qualification" TEXT,
ADD COLUMN     "subject" TEXT NOT NULL,
ADD COLUMN     "university" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "staff_email_key" ON "staff"("email");
