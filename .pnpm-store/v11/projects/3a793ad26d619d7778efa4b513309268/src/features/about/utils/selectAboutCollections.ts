import type { Collection } from "../../../types/collection";

export function selectAboutCollections(collections: Collection[]) {
  return [...collections]
    .sort(
      (left, right) => Number(right.isFeatured) - Number(left.isFeatured),
    )
    .slice(0, 3);
}
