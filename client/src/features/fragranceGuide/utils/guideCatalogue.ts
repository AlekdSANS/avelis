import type {
  FragranceNoteType,
  Product,
  ProductVariantFormat,
} from "../../../types/product";
import {
  guideFamilies,
  type GuideFamily,
  type GuideFamilyName,
} from "../data/fragranceGuideContent.ts";

export type GuideNote = {
  label: string;
  name: string;
};

function titleCase(value: string) {
  return value.replace(/\b\p{L}/gu, (letter) => letter.toLocaleUpperCase());
}

function rankedNotes(products: Product[], limit: number): GuideNote[] {
  const noteFrequency = new Map<string, { count: number; name: string }>();

  products.forEach((product) => {
    product.notes.forEach((note) => {
      const key = note.name.trim().toLocaleLowerCase();
      const current = noteFrequency.get(key);

      noteFrequency.set(key, {
        count: (current?.count ?? 0) + 1,
        name: current?.name ?? note.name.trim(),
      });
    });
  });

  return [...noteFrequency.values()]
    .sort((left, right) => {
      const frequencyDifference = right.count - left.count;
      return frequencyDifference || left.name.localeCompare(right.name);
    })
    .slice(0, limit)
    .map(({ name }) => ({
      name,
      label: titleCase(name),
    }));
}

function belongsToFamily(product: Product, family: GuideFamilyName) {
  return product.fragranceFamily
    .toLocaleLowerCase()
    .includes(family.toLocaleLowerCase());
}

export function getAvailableGuideFamilies(products: Product[]): GuideFamily[] {
  if (products.length === 0) {
    return guideFamilies;
  }

  return guideFamilies.filter((family) =>
    products.some((product) => belongsToFamily(product, family.name)),
  );
}

export function getFamilyNotes(
  products: Product[],
  family: GuideFamilyName,
  limit = 4,
) {
  return rankedNotes(
    products.filter((product) => belongsToFamily(product, family)),
    limit,
  );
}

export function getNotesByLayer(
  products: Product[],
  type: FragranceNoteType,
  limit = 12,
) {
  return rankedNotes(
    products.map((product) => ({
      ...product,
      notes: product.notes.filter((note) => note.type === type),
    })),
    limit,
  );
}

export function getFormatVolumes(
  products: Product[],
  format: ProductVariantFormat,
) {
  return [
    ...new Set(
      products.flatMap((product) =>
        product.variants
          .filter((variant) => variant.format === format)
          .map((variant) => variant.volumeMl),
      ),
    ),
  ].sort((left, right) => left - right);
}
