import styles from "./ActiveFilterChips.module.scss";
import { X } from "lucide-react";

import { productFilterOptions } from "../data/productFilterOptions";
import type { FilterKey, ShopFilters } from "../types";

type ActiveFilterChipsProps = {
  filters: ShopFilters;
  onClearAll: () => void;
  onClearAvailability: () => void;
  onClearLoved: () => void;
  onClearPrice: () => void;
  onClearSearch: () => void;
  onRemove: (key: FilterKey, value: string | number) => void;
};

const formatLabels = new Map<string, string>(
  productFilterOptions.formats.map((option) => [option.value, option.label]),
);
const collectionLabels = new Map<string, string>(
  productFilterOptions.collections.map((option) => [option.value, option.label]),
);

export function ActiveFilterChips({
  filters,
  onClearAll,
  onClearAvailability,
  onClearLoved,
  onClearPrice,
  onClearSearch,
  onRemove,
}: ActiveFilterChipsProps) {
  const chips: {
    key: string;
    label: string;
    onRemove: () => void;
  }[] = [];

  if (filters.search) {
    chips.push({
      key: "search",
      label: `Search: “${filters.search}”`,
      onRemove: onClearSearch,
    });
  }

  const addGroup = (
    key: FilterKey,
    values: (string | number)[],
    label: (value: string | number) => string,
  ) => {
    values.forEach((value) => {
      chips.push({
        key: `${key}-${value}`,
        label: label(value),
        onRemove: () => onRemove(key, value),
      });
    });
  };

  addGroup("families", filters.families, String);
  addGroup("seasons", filters.seasons, String);
  addGroup("concentrations", filters.concentrations, String);
  addGroup(
    "formats",
    filters.formats,
    (value) => formatLabels.get(String(value)) ?? String(value),
  );
  addGroup("volumes", filters.volumes, (value) => `${value} ml`);
  addGroup(
    "collections",
    filters.collections,
    (value) => collectionLabels.get(String(value)) ?? String(value),
  );
  addGroup("notes", filters.notes, String);

  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    chips.push({
      key: "price",
      label: `${filters.minPrice ?? 0}–${filters.maxPrice ?? 750} PLN`,
      onRemove: onClearPrice,
    });
  }

  if (filters.inStockOnly) {
    chips.push({
      key: "availability",
      label: "In stock",
      onRemove: onClearAvailability,
    });
  }

  if (filters.lovedOnly) {
    chips.push({
      key: "loved",
      label: "Loved",
      onRemove: onClearLoved,
    });
  }

  return (
    <div className={styles.reserve}>
      {chips.length > 0 ? (
        <div aria-label="Active filters" className={styles.wrapper}>
          <div className={styles.chips}>
            {chips.map((chip) => (
              <button key={chip.key} onClick={chip.onRemove} type="button">
                {chip.label}
                <X aria-hidden="true" />
              </button>
            ))}
          </div>
          <button className={styles.clearAll} onClick={onClearAll} type="button">
            Clear all
          </button>
        </div>
      ) : null}
    </div>
  );
}
