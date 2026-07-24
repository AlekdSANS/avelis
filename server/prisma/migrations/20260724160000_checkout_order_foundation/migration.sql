-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'REFUNDED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CARD', 'BLIK', 'CASH_ON_DELIVERY');

-- CreateEnum
CREATE TYPE "ShippingMethod" AS ENUM ('STANDARD', 'EXPRESS');

-- Evolve the existing order status values without invalidating historical rows.
ALTER TYPE "OrderStatus" RENAME VALUE 'PENDING' TO 'PENDING_PAYMENT';
ALTER TYPE "OrderStatus" RENAME VALUE 'PAID' TO 'CONFIRMED';
ALTER TYPE "OrderStatus" ADD VALUE 'REFUNDED';

-- Add nullable/defaulted columns first so existing orders remain valid while they
-- are backfilled from their owning user and existing shipping snapshot.
ALTER TABLE "Order"
ADD COLUMN "customerEmail" TEXT,
ADD COLUMN "customerFirstName" TEXT,
ADD COLUMN "customerLastName" TEXT,
ADD COLUMN "customerPhone" TEXT,
ADD COLUMN "shippingBuilding" TEXT NOT NULL DEFAULT '',
ADD COLUMN "shippingApartment" TEXT,
ADD COLUMN "deliveryNotes" TEXT,
ADD COLUMN "shippingMethod" "ShippingMethod" NOT NULL DEFAULT 'STANDARD',
ADD COLUMN "paymentMethod" "PaymentMethod" NOT NULL DEFAULT 'CARD',
ADD COLUMN "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN "discountTotal" DECIMAL(10,2) NOT NULL DEFAULT 0,
ADD COLUMN "currency" TEXT NOT NULL DEFAULT 'PLN',
ADD COLUMN "confirmedAt" TIMESTAMP(3),
ADD COLUMN "cancelledAt" TIMESTAMP(3),
ADD COLUMN "idempotencyScope" TEXT,
ADD COLUMN "idempotencyKey" TEXT;

UPDATE "Order" AS orders
SET
    "customerEmail" = users."email",
    "customerFirstName" = users."firstName",
    "customerLastName" = users."lastName",
    "customerPhone" = orders."shippingPhone"
FROM "User" AS users
WHERE orders."userId" = users."id";

ALTER TABLE "Order"
ALTER COLUMN "customerEmail" SET NOT NULL,
ALTER COLUMN "customerFirstName" SET NOT NULL,
ALTER COLUMN "customerLastName" SET NOT NULL,
ALTER COLUMN "customerPhone" SET NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- Preserve the existing address and money data under the new snapshot names.
ALTER TABLE "Order" RENAME COLUMN "shippingZip" TO "shippingPostalCode";
ALTER TABLE "Order" RENAME COLUMN "shippingCost" TO "shippingTotal";
ALTER TABLE "Order" DROP COLUMN "shippingName";
ALTER TABLE "Order" DROP COLUMN "shippingPhone";

-- Preserve existing order-item amounts and add the missing immutable snapshots.
ALTER TABLE "OrderItem" RENAME COLUMN "totalPrice" TO "lineTotal";
ALTER TABLE "OrderItem"
ADD COLUMN "sku" TEXT,
ADD COLUMN "format" "ProductFormat";

UPDATE "OrderItem" AS items
SET
    "sku" = variants."sku",
    "format" = variants."format"
FROM "ProductVariant" AS variants
WHERE items."variantId" = variants."id";

ALTER TABLE "OrderItem"
ALTER COLUMN "sku" SET NOT NULL,
ALTER COLUMN "format" SET NOT NULL,
ALTER COLUMN "productId" DROP NOT NULL,
ALTER COLUMN "variantId" DROP NOT NULL;

-- Replace restrictive historical relations with nullable snapshot-safe links.
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_productId_fkey";
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_variantId_fkey";

ALTER TABLE "Order"
ADD CONSTRAINT "Order_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "OrderItem"
ADD CONSTRAINT "OrderItem_productId_fkey"
FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "OrderItem"
ADD CONSTRAINT "OrderItem_variantId_fkey"
FOREIGN KEY ("variantId") REFERENCES "ProductVariant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Application-level validation is backed by database invariants for persisted data.
ALTER TABLE "Order"
ADD CONSTRAINT "Order_money_nonnegative_check"
CHECK (
    "subtotal" >= 0
    AND "shippingTotal" >= 0
    AND "discountTotal" >= 0
    AND "total" >= 0
);

ALTER TABLE "OrderItem"
ADD CONSTRAINT "OrderItem_quantity_positive_check" CHECK ("quantity" > 0),
ADD CONSTRAINT "OrderItem_money_nonnegative_check"
CHECK ("unitPrice" >= 0 AND "lineTotal" >= 0);

-- CreateIndex
CREATE INDEX "Order_customerEmail_idx" ON "Order"("customerEmail");

-- CreateIndex
CREATE INDEX "Order_createdAt_idx" ON "Order"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Order_idempotencyScope_idempotencyKey_key"
ON "Order"("idempotencyScope", "idempotencyKey");

-- CreateIndex
CREATE INDEX "OrderItem_variantId_idx" ON "OrderItem"("variantId");
