/*
  Warnings:

  - You are about to drop the column `icon` on the `Website` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Website" DROP COLUMN "icon",
ADD COLUMN     "favicon" TEXT;
