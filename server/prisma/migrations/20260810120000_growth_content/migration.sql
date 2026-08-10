CREATE TYPE "ReviewStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
CREATE TYPE "JournalStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

ALTER TABLE "Collection"
ADD COLUMN "storyHeadline" TEXT,
ADD COLUMN "storyBody" TEXT,
ADD COLUMN "storyImageUrl" TEXT,
ADD COLUMN "materialNotes" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
ADD COLUMN "campaignLabel" TEXT;

ALTER TABLE "Review"
ADD COLUMN "status" "ReviewStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN "verifiedPurchase" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "moderatedAt" TIMESTAMP(3);

CREATE TABLE "JournalArticle" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "eyebrow" TEXT,
  "excerpt" TEXT NOT NULL,
  "body" TEXT NOT NULL,
  "coverImageUrl" TEXT,
  "authorName" TEXT NOT NULL DEFAULT 'AVELIS Editorial',
  "tags" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "readingTimeMinutes" INTEGER NOT NULL DEFAULT 4,
  "status" "JournalStatus" NOT NULL DEFAULT 'DRAFT',
  "isFeatured" BOOLEAN NOT NULL DEFAULT false,
  "publishedAt" TIMESTAMP(3),
  "seoTitle" TEXT,
  "seoDescription" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "JournalArticle_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "JournalArticle_slug_key" ON "JournalArticle"("slug");
CREATE INDEX "JournalArticle_status_publishedAt_idx" ON "JournalArticle"("status", "publishedAt");
CREATE INDEX "JournalArticle_isFeatured_idx" ON "JournalArticle"("isFeatured");
CREATE INDEX "Review_status_createdAt_idx" ON "Review"("status", "createdAt");
