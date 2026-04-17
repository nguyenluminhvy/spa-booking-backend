/*
  Warnings:

  - You are about to drop the column `message` on the `notifications` table. All the data in the column will be lost.
  - Added the required column `body` to the `notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `notifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "message",
ADD COLUMN     "body" TEXT NOT NULL,
ADD COLUMN     "data" JSONB,
ADD COLUMN     "type" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "notifications_userId_idx" ON "notifications"("userId");
