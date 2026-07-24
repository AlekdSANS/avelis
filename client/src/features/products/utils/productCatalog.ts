import type { Product, ProductVariant } from "../../../types/product";
import type { ShopFilters } from "../types";

const productPlaceholder = "/images/placeholders/product_placeholder.png";

export function getMatchingVariants(
  product: Product,
  filters: Pick<ShopFilters, "formats" | "volumes" | "inStockOnly" | "minPrice" | "maxPrice">,
): ProductVariant[] {
  return product.variants.filter((variant) => {
    const matchesFormat =
      filters.formats.length === 0 || filters.formats.includes(variant.format);
    const matchesVolume =
      filters.volumes.length === 0 || filters.volumes.includes(variant.volumeMl);

    const matchesStock = !filters.inStockOnly || variant.stock > 0;
    const matchesMin =
      filters.minPrice === undefined || variant.price >= filters.minPrice;
    const matchesMax =
      filters.maxPrice === undefined || variant.price <= filters.maxPrice;

    return matchesFormat && matchesVolume && matchesStock && matchesMin && matchesMax;
  });
}

export function getCheapestVariant(variants: ProductVariant[]): ProductVariant | undefined {
  return variants
    .filter((variant) => variant.stock > 0)
    .sort((left, right) => left.price - right.price)[0];
}

export function getPrimaryProductImage(product: Product) {
  return (
    product.images.find((image) => image.isPrimary) ??
    product.images.find((image) => image.imageType === "MAIN") ??
    product.images[0] ?? {
      id: `${product.id}-placeholder`,
      url: productPlaceholder,
      alt: `${product.name} fragrance`,
      position: 0,
      isPrimary: true,
      imageType: "MAIN" as const,
    }
  );
}

export function getHoverProductImage(product: Product) {
  const primaryImage = getPrimaryProductImage(product);

  return (
    product.images.find((image) => image.imageType === "HOVER") ??
    product.images.find((image) => image.id !== primaryImage.id) ??
    primaryImage
  );
}

export function getCollectionLabel(product: Product) {
  return product.collections[0]?.name ?? "AVELIS collection";
}

export function getCollectionSlugs(product: Product) {
  return product.collections.map((collection) => collection.slug);
}

export function getShortDescription(product: Product) {
  return product.description;
}

export function getFullDescription(product: Product) {
  return product.description;
}

export function getComposition(product: Product) {
  const top = product.notes
    .filter((note) => note.type === "TOP")
    .map((note) => note.name)
    .join(", ");
  const heart = product.notes
    .filter((note) => note.type === "HEART")
    .map((note) => note.name)
    .join(", ");
  const base = product.notes
    .filter((note) => note.type === "BASE")
    .map((note) => note.name)
    .join(", ");

  return [`Top: ${top}`, `Heart: ${heart}`, `Base: ${base}`]
    .filter((line) => !line.endsWith(": "))
    .join(". ");
}

export function getIngredients() {
  return "Alcohol denat., Parfum (Fragrance), Aqua (Water). Ingredient information may change; refer to the packaging for the current list.";
}
