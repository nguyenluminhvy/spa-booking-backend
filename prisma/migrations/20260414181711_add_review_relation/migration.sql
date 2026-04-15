/*
  Warnings:

  - A unique constraint covering the columns `[appointmentId]` on the table `reviews` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `appointmentId` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "appointmentId" INTEGER NOT NULL,
ADD COLUMN     "tags" TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "reviews_appointmentId_key" ON "reviews"("appointmentId");

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "appointments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
