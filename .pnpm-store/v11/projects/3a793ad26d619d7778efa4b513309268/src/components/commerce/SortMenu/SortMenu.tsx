import styles from "./SortMenu.module.scss";
import type { ProductSort } from "../../../features/products/types";
import { productSortOptions } from "../../../features/products/types";
import { Select } from "../../ui/Select/Select";

type SortMenuProps = {
  className?: string;
  id?: string;
  onChange: (sort: ProductSort) => void;
  value: ProductSort;
};

export function SortMenu({
  className,
  id = "product-sort",
  onChange,
  value,
}: SortMenuProps) {
  return (
    <label className={[styles.sort, className ?? ""].filter(Boolean).join(" ")}>
      <span>Sort by</span>
      <Select
        id={id}
        onChange={(event) => onChange(event.target.value as ProductSort)}
        value={value}
      >
        {productSortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </label>
  );
}
