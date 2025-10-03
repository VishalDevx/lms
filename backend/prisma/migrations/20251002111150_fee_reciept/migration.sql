-- CreateTable
CREATE TABLE "public"."PaymentReceipt" (
    "id" TEXT NOT NULL,
    "receiptNo" TEXT NOT NULL,
    "amountPaid" DOUBLE PRECISION NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentMethod" "public"."PaymentMethod" NOT NULL,
    "studentId" INTEGER NOT NULL,
    "studentFeeId" INTEGER NOT NULL,

    CONSTRAINT "PaymentReceipt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PaymentReceipt_receiptNo_key" ON "public"."PaymentReceipt"("receiptNo");

-- AddForeignKey
ALTER TABLE "public"."PaymentReceipt" ADD CONSTRAINT "PaymentReceipt_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PaymentReceipt" ADD CONSTRAINT "PaymentReceipt_studentFeeId_fkey" FOREIGN KEY ("studentFeeId") REFERENCES "public"."StudentFee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
