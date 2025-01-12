-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('Pending', 'Paid', 'Overdue');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Teacher', 'Clerk');

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "role" "Role" NOT NULL,
    "profileImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "lastLogin" TIMESTAMP(3),

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Staff" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "phoneNumber" TEXT,
    "salary" DOUBLE PRECISION NOT NULL,
    "adminId" TEXT,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Students" (
    "adharNumber" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "fatherName" TEXT,
    "motherName" TEXT,
    "profileImage" TEXT,
    "dob" TIMESTAMP(3) NOT NULL,
    "address" TEXT NOT NULL,
    "bloodGroup" TEXT,
    "adminId" TEXT,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Students_pkey" PRIMARY KEY ("adharNumber")
);

-- CreateTable
CREATE TABLE "FeeStructure" (
    "id" SERIAL NOT NULL,
    "feeType" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "grade" TEXT,
    "description" TEXT,

    CONSTRAINT "FeeStructure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fee" (
    "id" SERIAL NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "amountDue" DOUBLE PRECISION NOT NULL,
    "amountPaid" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "paymentDate" TIMESTAMP(3),
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'Pending',
    "lateFee" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "outstandingBalance" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "feeStructureId" INTEGER,
    "studentsAdharNumber" TEXT,
    "adminId" TEXT,

    CONSTRAINT "Fee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "amountPaid" DOUBLE PRECISION NOT NULL,
    "receiptNumber" TEXT NOT NULL,
    "feeId" INTEGER,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_email_key" ON "Staff"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_receiptNumber_key" ON "Payment"("receiptNumber");

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fee" ADD CONSTRAINT "Fee_feeStructureId_fkey" FOREIGN KEY ("feeStructureId") REFERENCES "FeeStructure"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fee" ADD CONSTRAINT "Fee_studentsAdharNumber_fkey" FOREIGN KEY ("studentsAdharNumber") REFERENCES "Students"("adharNumber") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fee" ADD CONSTRAINT "Fee_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_feeId_fkey" FOREIGN KEY ("feeId") REFERENCES "Fee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
