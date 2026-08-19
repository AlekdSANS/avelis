CREATE TYPE "PromotionDiscountType" AS ENUM ('PERCENT', 'FIXED');
CREATE TYPE "MerchandisingCampaignType" AS ENUM ('GIFT_SET', 'CURATED_EDIT');
CREATE TYPE "MerchandisingStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');
CREATE TYPE "StockAlertStatus" AS ENUM ('PENDING', 'NOTIFIED', 'CANCELLED');

ALTER TABLE "Product" ADD COLUMN "lowStockThreshold" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN "sampleAvailable" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "samplePrice" DECIMAL(10,2),
ADD COLUMN "backInStockEnabled" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "Order" ADD COLUMN "promotionCode" TEXT;

CREATE TABLE "PromotionCode" ("id" TEXT NOT NULL, "code" TEXT NOT NULL, "description" TEXT NOT NULL, "discountType" "PromotionDiscountType" NOT NULL, "amount" DECIMAL(10,2) NOT NULL, "minSubtotal" DECIMAL(10,2) NOT NULL DEFAULT 0, "startsAt" TIMESTAMP(3), "endsAt" TIMESTAMP(3), "usageLimit" INTEGER, "usageCount" INTEGER NOT NULL DEFAULT 0, "isActive" BOOLEAN NOT NULL DEFAULT true, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "PromotionCode_pkey" PRIMARY KEY ("id"));
CREATE UNIQUE INDEX "PromotionCode_code_key" ON "PromotionCode"("code");
CREATE INDEX "PromotionCode_isActive_startsAt_endsAt_idx" ON "PromotionCode"("isActive", "startsAt", "endsAt");

CREATE TABLE "MerchandisingCampaign" ("id" TEXT NOT NULL, "slug" TEXT NOT NULL, "type" "MerchandisingCampaignType" NOT NULL, "title" TEXT NOT NULL, "eyebrow" TEXT, "description" TEXT NOT NULL, "imageUrl" TEXT, "status" "MerchandisingStatus" NOT NULL DEFAULT 'DRAFT', "isFeatured" BOOLEAN NOT NULL DEFAULT false, "startsAt" TIMESTAMP(3), "endsAt" TIMESTAMP(3), "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "MerchandisingCampaign_pkey" PRIMARY KEY ("id"));
CREATE UNIQUE INDEX "MerchandisingCampaign_slug_key" ON "MerchandisingCampaign"("slug");
CREATE INDEX "MerchandisingCampaign_status_type_isFeatured_idx" ON "MerchandisingCampaign"("status", "type", "isFeatured");

CREATE TABLE "MerchandisingCampaignProduct" ("campaignId" TEXT NOT NULL, "productId" TEXT NOT NULL, "sortOrder" INTEGER NOT NULL DEFAULT 0, CONSTRAINT "MerchandisingCampaignProduct_pkey" PRIMARY KEY ("campaignId", "productId"));
CREATE INDEX "MerchandisingCampaignProduct_productId_idx" ON "MerchandisingCampaignProduct"("productId");
ALTER TABLE "MerchandisingCampaignProduct" ADD CONSTRAINT "MerchandisingCampaignProduct_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "MerchandisingCampaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MerchandisingCampaignProduct" ADD CONSTRAINT "MerchandisingCampaignProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "StockAlert" ("id" TEXT NOT NULL, "email" TEXT NOT NULL, "userId" TEXT, "productId" TEXT NOT NULL, "status" "StockAlertStatus" NOT NULL DEFAULT 'PENDING', "notifiedAt" TIMESTAMP(3), "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "StockAlert_pkey" PRIMARY KEY ("id"));
CREATE UNIQUE INDEX "StockAlert_email_productId_key" ON "StockAlert"("email", "productId");
CREATE INDEX "StockAlert_status_createdAt_idx" ON "StockAlert"("status", "createdAt");
ALTER TABLE "StockAlert" ADD CONSTRAINT "StockAlert_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "StockAlert" ADD CONSTRAINT "StockAlert_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
