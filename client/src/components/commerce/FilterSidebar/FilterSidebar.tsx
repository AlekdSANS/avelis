import styles from "./FilterSidebar.module.scss";
import type { ReactNode } from "react";

import { productFilterOptions } from "../../../features/products/data/products";
import type {
  FilterKey,
  ShopFilters,
} from "../../../features/products/types";
import { Button } from "../../ui/Button/Button";
import { PriceRange } from "../PriceRange/PriceRange";

type FilterSidebarProps = {
  className?: string;
  filters: ShopFilters;
  onAvailabilityChange: (checked: boolean) => void;
  onClearAll: () => void;
  onPriceRangeChange: (minPrice?: number, maxPrice?: number) => void;
  onToggle: (key: FilterKey, value: string | number) => void;
};

type CheckGroupProps = {
  children: ReactNode;
  legend: string;
};

function CheckGroup({ children, legend }: CheckGroupProps) {
  return (
    <fieldset className={styles.group}>
      <legend>{legend}</legend>
      <div className={styles.options}>{children}</div>
    </fieldset>
  );
}

type CheckOptionProps = {
  checked: boolean;
  label: string;
  onChange: () => void;
};

function CheckOption({ checked, label, onChange }: CheckOptionProps) {
  return (
    <label className={styles.option}>
      <input checked={checked} onChange={onChange} type="checkbox" />
      <span aria-hidden="true" className={styles.checkbox} />
      <span>{label}</span>
    </label>
  );
}

export function FilterSidebar({
  className,
  filters,
  onAvailabilityChange,
  onClearAll,
  onPriceRangeChange,
  onToggle,
}: FilterSidebarProps) {
  return (
    <div className={[styles.filters, className ?? ""].filter(Boolean).join(" ")}>
      <div className={styles.heading}>
        <h2>Filter</h2>
        <Button onClick={onClearAll} size="sm" variant="ghost">
          Clear all
        </Button>
      </div>

      <CheckGroup legend="Product format">
        {productFilterOptions.formats.map((option) => (
          <CheckOption
            checked={filters.formats.includes(option.value)}
            key={option.value}
            label={option.label}
            onChange={() => onToggle("formats", option.value)}
          />
        ))}
      </CheckGroup>

      <CheckGroup legend="Size">
        {productFilterOptions.volumes.map((volume) => (
          <CheckOption
            checked={filters.volumes.includes(volume)}
            key={volume}
            label={`${volume} ml${volume === 150 ? " · refill only" : ""}`}
            onChange={() => onToggle("volumes", volume)}
          />
        ))}
      </CheckGroup>

      <CheckGroup legend="Fragrance family">
        {productFilterOptions.families.map((family) => (
          <CheckOption
            checked={filters.families.includes(family)}
            key={family}
            label={family}
            onChange={() => onToggle("families", family)}
          />
        ))}
      </CheckGroup>

      <CheckGroup legend="Season">
        {productFilterOptions.seasons.map((season) => (
          <CheckOption
            checked={filters.seasons.includes(season)}
            key={season}
            label={season}
            onChange={() => onToggle("seasons", season)}
          />
        ))}
      </CheckGroup>

      <CheckGroup legend="Concentration">
        {productFilterOptions.concentrations.map((concentration) => (
          <CheckOption
            checked={filters.concentrations.includes(concentration)}
            key={concentration}
            label={concentration}
            onChange={() => onToggle("concentrations", concentration)}
          />
        ))}
      </CheckGroup>

      <CheckGroup legend="Collection">
        {productFilterOptions.collections.map((collection) => (
          <CheckOption
            checked={filters.collections.includes(collection.value)}
            key={collection.value}
            label={collection.label}
            onChange={() => onToggle("collections", collection.value)}
          />
        ))}
      </CheckGroup>

      <CheckGroup legend="Key notes">
        {productFilterOptions.notes.map((note) => (
          <CheckOption
            checked={filters.notes.includes(note)}
            key={note}
            label={note}
            onChange={() => onToggle("notes", note)}
          />
        ))}
      </CheckGroup>

      <fieldset className={styles.group}>
        <legend>Price</legend>
        <PriceRange
          maxPrice={filters.maxPrice}
          minPrice={filters.minPrice}
          onChange={onPriceRangeChange}
        />
      </fieldset>

      <fieldset className={styles.group}>
        <legend>Availability</legend>
        <CheckOption
          checked={filters.inStockOnly}
          label="In stock only"
          onChange={() => onAvailabilityChange(!filters.inStockOnly)}
        />
      </fieldset>
    </div>
  );
}
