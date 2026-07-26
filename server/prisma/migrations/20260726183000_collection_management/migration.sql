-- Preserve existing collection visibility and imagery while expanding the model.
CREATE TYPE "CollectionStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

ALTER TABLE "Collection"
ADD COLUMN "eyebrow" TEXT,
ADD COLUMN "shortDescription" TEXT,
ADD COLUMN "heroImageUrl" TEXT,
ADD COLUMN "cardImageUrl" TEXT,
ADD COLUMN "mobileImageUrl" TEXT,
ADD COLUMN "accentColor" TEXT,
ADD COLUMN "status" "CollectionStatus" NOT NULL DEFAULT 'DRAFT',
ADD COLUMN "isFeatured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "sortOrder" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "publishedAt" TIMESTAMP(3),
ADD COLUMN "seoTitle" TEXT,
ADD COLUMN "seoDescription" TEXT;

UPDATE "Collection"
SET
  "shortDescription" = LEFT("description", 260),
  "heroImageUrl" = "imageUrl",
  "cardImageUrl" = "imageUrl",
  "status" = CASE
    WHEN "isActive" THEN 'PUBLISHED'::"CollectionStatus"
    ELSE 'ARCHIVED'::"CollectionStatus"
  END,
  "publishedAt" = CASE WHEN "isActive" THEN "createdAt" ELSE NULL END;

ALTER TABLE "Collection"
DROP COLUMN "imageUrl",
DROP COLUMN "isActive";

ALTER TABLE "ProductCollection"
ADD COLUMN "sortOrder" INTEGER NOT NULL DEFAULT 0;

CREATE INDEX "Collection_status_idx" ON "Collection"("status");
CREATE INDEX "Collection_isFeatured_idx" ON "Collection"("isFeatured");
CREATE INDEX "Collection_sortOrder_idx" ON "Collection"("sortOrder");
CREATE INDEX "Collection_status_isFeatured_sortOrder_idx"
ON "Collection"("status", "isFeatured", "sortOrder");

DROP INDEX IF EXISTS "ProductCollection_collectionId_idx";
CREATE INDEX "ProductCollection_collectionId_sortOrder_idx"
ON "ProductCollection"("collectionId", "sortOrder");
