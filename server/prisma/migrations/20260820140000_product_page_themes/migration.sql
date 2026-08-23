CREATE TYPE "ProductThemeMode" AS ENUM ('DEFAULT', 'PRESET', 'CUSTOM');
CREATE TYPE "ProductThemePreset" AS ENUM ('MIDNIGHT', 'FOREST', 'BURGUNDY');

ALTER TABLE "Product"
ADD COLUMN "themeMode" "ProductThemeMode" NOT NULL DEFAULT 'DEFAULT',
ADD COLUMN "themePreset" "ProductThemePreset",
ADD COLUMN "themeBackground" TEXT,
ADD COLUMN "themeSurface" TEXT,
ADD COLUMN "themeAccent" TEXT;
