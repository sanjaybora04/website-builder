/*
  Warnings:

  - You are about to drop the `_UserToWebsite` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `adminId` on table `Website` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "_UserToWebsite" DROP CONSTRAINT "_UserToWebsite_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserToWebsite" DROP CONSTRAINT "_UserToWebsite_B_fkey";

-- AlterTable
ALTER TABLE "Website" ALTER COLUMN "adminId" SET NOT NULL;

-- DropTable
DROP TABLE "_UserToWebsite";

-- AddForeignKey
ALTER TABLE "Website" ADD CONSTRAINT "Website_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
