-- Managed product-image metadata lets the storage adapter delete only files it owns.
ALTER TABLE "ProductImage"
ADD COLUMN "storageKey" TEXT,
ADD COLUMN "mimeType" TEXT,
ADD COLUMN "sizeBytes" INTEGER;

CREATE UNIQUE INDEX "ProductImage_storageKey_key" ON "ProductImage"("storageKey");

-- Reference records use soft deactivation so existing product relations remain valid.
ALTER TABLE "Note"
ADD COLUMN "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

CREATE INDEX "Note_isActive_idx" ON "Note"("isActive");

ALTER TABLE "Collection"
ADD COLUMN "isActive" BOOLEAN NOT NULL DEFAULT true;

CREATE INDEX "Collection_isActive_idx" ON "Collection"("isActive");
