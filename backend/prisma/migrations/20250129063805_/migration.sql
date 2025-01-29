-- CreateTable
CREATE TABLE "FeeHistory" (
    "id" SERIAL NOT NULL,
    "feeRecordId" INTEGER NOT NULL,
    "status" "FeeStatus" NOT NULL,
    "paymentDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FeeHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FeeHistory" ADD CONSTRAINT "FeeHistory_feeRecordId_fkey" FOREIGN KEY ("feeRecordId") REFERENCES "FeeRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
