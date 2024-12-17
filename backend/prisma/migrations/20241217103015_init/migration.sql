-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'STAFF', 'STUDENT', 'TEACHER');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('INCOME', 'EXPENSE');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PAID', 'PENDING', 'PARTIAL');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "Section" AS ENUM ('A', 'B', 'C', 'D', 'E');

-- CreateEnum
CREATE TYPE "Grade" AS ENUM ('GRADE_1', 'GRADE_2', 'GRADE_3', 'GRADE_4', 'GRADE_5', 'GRADE_6', 'GRADE_7', 'GRADE_8', 'GRADE_9', 'GRADE_10', 'GRADE_11', 'GRADE_12');

-- CreateEnum
CREATE TYPE "ResultGrade" AS ENUM ('A_PLUS', 'A', 'B_PLUS', 'B', 'C_PLUS', 'C', 'D', 'FAIL');

-- CreateEnum
CREATE TYPE "Position" AS ENUM ('TEACHER', 'PRINCIPAL', 'VICE_PRINCIPAL', 'LIBRARIAN', 'ACCOUNTANT', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'STUDENT',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Staff" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "monthlySalary" DOUBLE PRECISION NOT NULL,
    "payout" DOUBLE PRECISION NOT NULL,
    "pay" BOOLEAN NOT NULL,
    "month" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "Role" NOT NULL DEFAULT 'TEACHER',
    "position" "Position",
    "hiredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resignedAt" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastLogin" TIMESTAMP(3),
    "userId" INTEGER,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT,
    "photoUrl" TEXT,
    "position" TEXT,
    "contact" TEXT,
    "address" TEXT,
    "socialLinks" JSONB,
    "staffId" INTEGER NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Students" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "classId" INTEGER,
    "gender" "Gender",
    "section" "Section",
    "dateOfBirth" TIMESTAMP(3),
    "address" TEXT,
    "guardianContact" TEXT,
    "guardianName" TEXT,
    "userId" INTEGER,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Class" (
    "id" SERIAL NOT NULL,
    "grade" "Grade" NOT NULL,
    "section" "Section",
    "teacherId" INTEGER,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Results" (
    "id" SERIAL NOT NULL,
    "subject" TEXT NOT NULL,
    "grade" "ResultGrade" NOT NULL,
    "obtainMarks" INTEGER NOT NULL,
    "totalMarks" INTEGER NOT NULL,
    "studentsId" INTEGER,
    "staffId" INTEGER,
    "adminId" INTEGER,

    CONSTRAINT "Results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fees" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "totalAmount" INTEGER NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "class" TEXT NOT NULL,
    "startMonth" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paidDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "adminId" INTEGER,
    "staffId" INTEGER,
    "studentsId" INTEGER,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Fees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollegeExpenses" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "transactionId" TEXT NOT NULL,
    "category" TEXT,
    "transactionType" "TransactionType" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "adminId" INTEGER,

    CONSTRAINT "CollegeExpenses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_email_key" ON "Staff"("email");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_studentsId_fkey" FOREIGN KEY ("studentsId") REFERENCES "Students"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fees" ADD CONSTRAINT "Fees_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fees" ADD CONSTRAINT "Fees_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fees" ADD CONSTRAINT "Fees_studentsId_fkey" FOREIGN KEY ("studentsId") REFERENCES "Students"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollegeExpenses" ADD CONSTRAINT "CollegeExpenses_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
