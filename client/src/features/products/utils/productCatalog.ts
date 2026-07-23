import type { Product, ProductVariant } from "../../../types/product";
import type { ProductSort, ShopFilters } from "../types";

const noteAliases: Record<string, string[]> = {
  Citrus: ["bergamot", "lemon", "mandarin", "grapefruit", "orange", "neroli"],
  Fig: ["fig", "fig leaf"],
};

export function getMatchingVariants(
  product: Product,
  filters: Pick<ShopFilters, "formats" | "volumes">,
): ProductVariant[] {
  return product.variants.filter((variant) => {
    const matchesFormat =
      filters.formats.length === 0 || filters.formats.includes(variant.format);
    const matchesVolume =
      filters.volumes.length === 0 || filters.volumes.includes(variant.volumeMl);

    return matchesFormat && matchesVolume;
  });
}

export function getCheapestVariant(variants: ProductVariant[]): ProductVariant | undefined {
  return variants
    .filter((variant) => variant.stock > 0)
    .sort((left, right) => left.price - right.price)[0];
}

function matchesSearch(product: Product, search: string) {
  if (!search.trim()) {
    return true;
  }

  const haystack = [
    product.name,
    product.subtitle,
    product.fragranceFamily,
    product.shortDescription,
    product.fullDescription,
    ...product.notes.map((note) => note.name),
  ]
    .join(" ")
    .toLocaleLowerCase();

  return search
    .trim()
    .toLocaleLowerCase()
    .split(/\s+/)
    .every((term) => haystack.includes(term));
}

function matchesNotes(product: Product, selectedNotes: string[]) {
  if (selectedNotes.length === 0) {
    return true;
  }

  const productNotes = product.notes.map((note) => note.name.toLocaleLowerCase());

  return selectedNotes.some((selectedNote) => {
    const candidates = noteAliases[selectedNote] ?? [selectedNote.toLocaleLowerCase()];
    return candidates.some((candidate) =>
      productNotes.some((note) => note.includes(candidate.toLocaleLowerCase())),
    );
  });
}

export function filterProducts(products: Product[], filters: ShopFilters): Product[] {
  return products.filter((product) => {
    const matchingVariants = getMatchingVariants(product, filters);
    const cheapestVariant = getCheapestVariant(matchingVariants);

    if (matchingVariants.length === 0) {
      return false;
    }

    if (!matchesSearch(product, filters.search)) {
      return false;
    }

    if (
      filters.families.length > 0 &&
      !filters.families.includes(product.fragranceFamily)
    ) {
      return false;
    }

    if (
      filters.seasons.length > 0 &&
      !filters.seasons.some((season) => product.seasons.includes(season))
    ) {
      return false;
    }

    if (
      filters.concentrations.length > 0 &&
      !filters.concentrations.includes(product.concentration)
    ) {
      return false;
    }

    if (
      filters.collections.length > 0 &&
      !filters.collections.some((collection) =>
        product.collectionSlugs.includes(collection),
      )
    ) {
      return false;
    }

    if (!matchesNotes(product, filters.notes)) {
      return false;
    }

    if (
      filters.inStockOnly &&
      !matchingVariants.some((variant) => variant.stock > 0)
    ) {
      return false;
    }

    if (
      filters.minPrice !== undefined &&
      (!cheapestVariant || cheapestVariant.price < filters.minPrice)
    ) {
      return false;
    }

    if (
      filters.maxPrice !== undefined &&
      (!cheapestVariant || cheapestVariant.price > filters.maxPrice)
    ) {
      return false;
    }

    return true;
  });
}

function featuredScore(product: Product) {
  return (
    Number(product.isFeatured) * 4 +
    Number(product.isBestSeller) * 3 +
    Number(product.isNew) * 2 +
    product.rating / 5
  );
}

export function sortProducts(
  products: Product[],
  sort: ProductSort,
  filters: Pick<ShopFilters, "formats" | "volumes">,
): Product[] {
  return [...products].sort((left, right) => {
    const leftPrice = getCheapestVariant(getMatchingVariants(left, filters))?.price;
    const rightPrice = getCheapestVariant(getMatchingVariants(right, filters))?.price;

    switch (sort) {
      case "newest":
        return Date.parse(right.createdAt) - Date.parse(left.createdAt);
      case "price-asc":
        return (leftPrice ?? Number.POSITIVE_INFINITY) - (rightPrice ?? Number.POSITIVE_INFINITY);
      case "price-desc":
        return (rightPrice ?? Number.NEGATIVE_INFINITY) - (leftPrice ?? Number.NEGATIVE_INFINITY);
      case "rating":
        return right.rating - left.rating || right.reviewCount - left.reviewCount;
      case "featured":
      default:
        return featuredScore(right) - featuredScore(left);
    }
  });
}

export function getRelatedProducts(
  currentProduct: Product,
  allProducts: Product[],
  limit = 4,
): Product[] {
  const currentNotes = new Set(
    currentProduct.notes.map((note) => note.name.toLocaleLowerCase()),
  );

  return allProducts
    .filter((product) => product.id !== currentProduct.id)
    .map((product) => {
      const sharedNotes = product.notes.filter((note) =>
        currentNotes.has(note.name.toLocaleLowerCase()),
      ).length;
      const sharedCollections = product.collectionSlugs.filter((collection) =>
        currentProduct.collectionSlugs.includes(collection),
      ).length;
      const score =
        Number(product.fragranceFamily === currentProduct.fragranceFamily) * 5 +
        sharedNotes * 2 +
        sharedCollections;

      return { product, score };
    })
    .sort((left, right) => right.score - left.score || right.product.rating - left.product.rating)
    .slice(0, limit)
    .map(({ product }) => product);
}
