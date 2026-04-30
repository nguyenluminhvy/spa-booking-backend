-- AlterTable
ALTER TABLE "appointments" ADD COLUMN     "discount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "finalPrice" DOUBLE PRECISION,
ADD COLUMN     "originalPrice" DOUBLE PRECISION,
ADD COLUMN     "voucherCode" TEXT;
