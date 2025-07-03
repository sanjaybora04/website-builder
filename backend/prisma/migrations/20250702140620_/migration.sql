-- AlterTable
ALTER TABLE "User" ADD COLUMN     "maxFormSubmissions" INTEGER NOT NULL DEFAULT 100;

-- CreateTable
CREATE TABLE "FormSubmission" (
    "id" UUID NOT NULL,
    "websiteId" UUID NOT NULL,
    "page" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FormSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FormSubmission_websiteId_idx" ON "FormSubmission"("websiteId");

-- AddForeignKey
ALTER TABLE "FormSubmission" ADD CONSTRAINT "FormSubmission_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
