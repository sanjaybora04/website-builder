/*
  Warnings:

  - You are about to drop the column `folderId` on the `Asset` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Asset" DROP CONSTRAINT "Asset_folderId_fkey";

-- AlterTable
ALTER TABLE "Asset" DROP COLUMN "folderId",
ADD COLUMN     "parentId" UUID;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
