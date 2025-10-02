/*
  Warnings:

  - You are about to drop the column `amount` on the `FeeHistory` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `FeeHistory` table. All the data in the column will be lost.
  - You are about to drop the column `paidDate` on the `FeeHistory` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `FeeHistory` table. All the data in the column will be lost.
  - Added the required column `changeType` to the `FeeHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `newAmount` to the `FeeHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oldAmount` to the `FeeHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentFeeId` to the `FeeHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalFee` to the `StudentFee` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."FeeHistory" DROP CONSTRAINT "FeeHistory_studentId_fkey";

-- AlterTable
ALTER TABLE "public"."FeeHistory" DROP COLUMN "amount",
DROP COLUMN "createdAt",
DROP COLUMN "paidDate",
DROP COLUMN "studentId",
ADD COLUMN     "changeType" TEXT NOT NULL,
ADD COLUMN     "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "newAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "note" TEXT,
ADD COLUMN     "oldAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "pdfUrl" TEXT,
ADD COLUMN     "studentFeeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."StudentFee" ADD COLUMN     "totalFee" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "public"."_FeeHistoryToStudent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_FeeHistoryToStudent_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_FeeHistoryToStudent_B_index" ON "public"."_FeeHistoryToStudent"("B");

-- AddForeignKey
ALTER TABLE "public"."FeeHistory" ADD CONSTRAINT "FeeHistory_studentFeeId_fkey" FOREIGN KEY ("studentFeeId") REFERENCES "public"."StudentFee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FeeHistoryToStudent" ADD CONSTRAINT "_FeeHistoryToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."FeeHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FeeHistoryToStudent" ADD CONSTRAINT "_FeeHistoryToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
