-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "googleOauthId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Website" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "googleTag" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "customCodeForHead" TEXT NOT NULL,
    "draftPages" JSONB[],
    "pages" JSONB[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Website_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserToWebsite" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserToWebsite_AB_unique" ON "_UserToWebsite"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToWebsite_B_index" ON "_UserToWebsite"("B");

-- AddForeignKey
ALTER TABLE "_UserToWebsite" ADD CONSTRAINT "_UserToWebsite_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToWebsite" ADD CONSTRAINT "_UserToWebsite_B_fkey" FOREIGN KEY ("B") REFERENCES "Website"("id") ON DELETE CASCADE ON UPDATE CASCADE;
