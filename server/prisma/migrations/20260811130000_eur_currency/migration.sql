ALTER TABLE "Order"
ALTER COLUMN "currency" SET DEFAULT 'EUR';

UPDATE "Order"
SET "currency" = 'EUR'
WHERE "currency" = 'PLN';
