/*
  Warnings:

  - Added the required column `userId` to the `FormSubmission` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "FormSubmission_websiteId_idx";

-- AlterTable
ALTER TABLE "FormSubmission" ADD COLUMN     "userId" UUID NOT NULL;

-- CreateIndex
CREATE INDEX "FormSubmission_websiteId_userId_idx" ON "FormSubmission"("websiteId", "userId");

-- AddForeignKey
ALTER TABLE "FormSubmission" ADD CONSTRAINT "FormSubmission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
