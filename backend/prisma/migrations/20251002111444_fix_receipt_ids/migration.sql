/*
  Warnings:

  - Changed the type of `paymentMethod` on the `PaymentReceipt` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."PaymentReceipt" DROP COLUMN "paymentMethod",
ADD COLUMN     "paymentMethod" TEXT NOT NULL;
