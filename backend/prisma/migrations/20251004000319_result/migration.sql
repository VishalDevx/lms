/*
  Warnings:

  - You are about to drop the column `paymentGateway` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `marks` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the `ClassTeacher` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `classTeacherId` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `examType` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `marksObtained` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalMarks` to the `Result` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."ClassTeacher" DROP CONSTRAINT "ClassTeacher_staffId_fkey";

-- AlterTable
ALTER TABLE "public"."Payment" DROP COLUMN "paymentGateway",
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."Result" DROP COLUMN "marks",
ADD COLUMN     "classTeacherId" INTEGER NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "examType" TEXT NOT NULL,
ADD COLUMN     "marksObtained" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "remarks" TEXT,
ADD COLUMN     "subject" TEXT NOT NULL,
ADD COLUMN     "totalMarks" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "public"."ClassTeacher";

-- DropEnum
DROP TYPE "public"."PaymentGateway";

-- CreateTable
CREATE TABLE "public"."class_teacher" (
    "id" SERIAL NOT NULL,
    "staffId" INTEGER NOT NULL,
    "grade" "public"."Grade" NOT NULL,

    CONSTRAINT "class_teacher_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "class_teacher_staffId_key" ON "public"."class_teacher"("staffId");

-- CreateIndex
CREATE UNIQUE INDEX "class_teacher_grade_key" ON "public"."class_teacher"("grade");

-- AddForeignKey
ALTER TABLE "public"."class_teacher" ADD CONSTRAINT "class_teacher_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "public"."Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Result" ADD CONSTRAINT "Result_classTeacherId_fkey" FOREIGN KEY ("classTeacherId") REFERENCES "public"."class_teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
