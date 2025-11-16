/*
  Warnings:

  - Made the column `filename` on table `Asset` required. This step will fail if there are existing NULL values in that column.
  - Made the column `size` on table `Asset` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contentType` on table `Asset` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Asset" ALTER COLUMN "filename" SET NOT NULL,
ALTER COLUMN "size" SET NOT NULL,
ALTER COLUMN "contentType" SET NOT NULL;
