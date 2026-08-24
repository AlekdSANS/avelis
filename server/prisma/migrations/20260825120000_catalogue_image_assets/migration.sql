-- Midnightwood was renamed to Noxwood in the storefront and asset library.
-- Keep the existing product id so variants, campaigns, and orders remain linked.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM "Product" WHERE "slug" = 'midnightwood')
     AND NOT EXISTS (SELECT 1 FROM "Product" WHERE "slug" = 'noxwood') THEN
    UPDATE "Product"
    SET
      "slug" = 'noxwood',
      "name" = 'Noxwood',
      "themeMode" = 'PRESET',
      "themePreset" = 'MIDNIGHT'
    WHERE "slug" = 'midnightwood';
  END IF;
END $$;

-- A local database may already contain Noxwood plus an empty, obsolete
-- Midnightwood row. Keep that orphan out of the public catalogue.
UPDATE "Product"
SET
  "isActive" = false,
  "isFeatured" = false,
  "isLimited" = false
WHERE "slug" = 'midnightwood'
  AND EXISTS (SELECT 1 FROM "Product" WHERE "slug" = 'noxwood');

UPDATE "ProductImage" AS image
SET "url" = mapping.url
FROM "Product" AS product,
(
  VALUES
    ('peachwood', 'MAIN', '/images/products/avelis_peachwood/peach1.png'),
    ('peachwood', 'GALLERY', '/images/products/avelis_peachwood/peach2.png'),
    ('peachwood', 'HOVER', '/images/products/avelis_peachwood/peachbox1.png'),
    ('peachwood', 'REFILL', '/images/products/avelis_peachwood/peachrefill.png'),
    ('azurewood', 'MAIN', '/images/products/avelis_azurewood/azure1.png'),
    ('azurewood', 'GALLERY', '/images/products/avelis_azurewood/azure2.png'),
    ('azurewood', 'HOVER', '/images/products/avelis_azurewood/azure_box.png'),
    ('azurewood', 'REFILL', '/images/products/avelis_azurewood/azure_refill.png'),
    ('redwood', 'MAIN', '/images/products/avelis_redwood/red1.png'),
    ('redwood', 'GALLERY', '/images/products/avelis_redwood/red2.png'),
    ('redwood', 'HOVER', '/images/products/avelis_redwood/red_box.png'),
    ('redwood', 'REFILL', '/images/products/avelis_redwood/red_refill.png'),
    ('noxwood', 'MAIN', '/images/products/avelis_noxwood/nox1.png'),
    ('noxwood', 'GALLERY', '/images/products/avelis_noxwood/nox2.png'),
    ('noxwood', 'HOVER', '/images/products/avelis_noxwood/nox_box.png'),
    ('noxwood', 'REFILL', '/images/products/avelis_noxwood/nox_refill.png'),
    ('ashwood', 'MAIN', '/images/products/avelis_ashwood/ash1.png'),
    ('ashwood', 'GALLERY', '/images/products/avelis_ashwood/ash2.png'),
    ('ashwood', 'HOVER', '/images/products/avelis_ashwood/ash_box.png'),
    ('ashwood', 'REFILL', '/images/products/avelis_ashwood/ash_refill.png'),
    ('serenade', 'MAIN', '/images/products/avelis_serenade/serenade4.png'),
    ('serenade', 'GALLERY', '/images/products/avelis_serenade/serenade3.png'),
    ('serenade', 'HOVER', '/images/products/avelis_serenade/serenade_box.png'),
    ('serenade', 'REFILL', '/images/products/avelis_serenade/serenade_refill.png'),
    ('tremolo', 'MAIN', '/images/products/avelis_tremolo/tremolo3.png'),
    ('tremolo', 'GALLERY', '/images/products/avelis_tremolo/tremolo2.png'),
    ('tremolo', 'HOVER', '/images/products/avelis_tremolo/tremolo_box.png'),
    ('tremolo', 'REFILL', '/images/products/avelis_tremolo/tremolo_refill.png'),
    ('distortion', 'MAIN', '/images/products/avelis_distortion/distortion2.png'),
    ('distortion', 'GALLERY', '/images/products/avelis_distortion/distortion3.png'),
    ('distortion', 'HOVER', '/images/products/avelis_distortion/distortion_box2.png'),
    ('distortion', 'REFILL', '/images/products/avelis_distortion/distortion_refill.png'),
    ('nocturne', 'MAIN', '/images/products/avelis_nocturne/nocturne2.png'),
    ('nocturne', 'GALLERY', '/images/products/avelis_nocturne/nocturne3.png'),
    ('nocturne', 'HOVER', '/images/products/avelis_nocturne/nocturne_box.png'),
    ('nocturne', 'REFILL', '/images/products/avelis_nocturne/nocturne_refill.png')
) AS mapping(slug, image_type, url)
WHERE image."productId" = product."id"
  AND product."slug" = mapping.slug
  AND image."imageType"::text = mapping.image_type;

UPDATE "ProductImage" AS image
SET "alt" = replace(image."alt", 'Midnightwood', 'Noxwood')
FROM "Product" AS product
WHERE image."productId" = product."id"
  AND product."slug" = 'noxwood';
