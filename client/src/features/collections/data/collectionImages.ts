import { COLLECTION_PLACEHOLDER_IMAGE } from "../../../constants/imagePlaceholders";

const collectionImageBySlug: Readonly<Record<string, string>> = {
  resonance: "/images/collections/resonance/resonance.png",
};

export function getCollectionImageSrc(slug: string) {
  return collectionImageBySlug[slug] ?? COLLECTION_PLACEHOLDER_IMAGE;
}

export function hasCollectionImage(slug: string) {
  return slug in collectionImageBySlug;
}
