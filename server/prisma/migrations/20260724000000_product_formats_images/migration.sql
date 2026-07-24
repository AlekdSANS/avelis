-- CreateEnum
CREATE TYPE "ProductFormat" AS ENUM ('BOTTLE', 'REFILL');

-- CreateEnum
CREATE TYPE "ProductImageType" AS ENUM ('MAIN', 'GALLERY', 'HOVER', 'REFILL');

-- AlterTable
ALTER TABLE "ProductVariant" ADD COLUMN "format" "ProductFormat" NOT NULL DEFAULT 'BOTTLE';

-- AlterTable
ALTER TABLE "ProductImage" ADD COLUMN "isPrimary" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "imageType" "ProductImageType" NOT NULL DEFAULT 'GALLERY';

-- DropIndex
DROP INDEX "ProductVariant_productId_volumeMl_key";

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariant_productId_format_volumeMl_key" ON "ProductVariant"("productId", "format", "volumeMl");
