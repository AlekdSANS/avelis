import styles from "./PriceRange.module.scss";
import { Input } from "../../ui/Input/Input";

type PriceRangeProps = {
  className?: string;
  maxPrice?: number;
  minPrice?: number;
  onChange: (minPrice?: number, maxPrice?: number) => void;
};

function inputValue(value?: number) {
  return value === undefined ? "" : value;
}

export function PriceRange({
  className,
  maxPrice,
  minPrice,
  onChange,
}: PriceRangeProps) {
  return (
    <div className={[styles.range, className ?? ""].filter(Boolean).join(" ")}>
      <label>
        <span>Minimum</span>
        <span className={styles.inputWrap}>
          <Input
            aria-label="Minimum price in PLN"
            inputMode="numeric"
            min={0}
            onChange={(event) =>
              onChange(
                event.target.value === "" ? undefined : Number(event.target.value),
                maxPrice,
              )
            }
            placeholder="0"
            step={10}
            type="number"
            value={inputValue(minPrice)}
          />
          <span>PLN</span>
        </span>
      </label>
      <span aria-hidden="true" className={styles.separator}>—</span>
      <label>
        <span>Maximum</span>
        <span className={styles.inputWrap}>
          <Input
            aria-label="Maximum price in PLN"
            inputMode="numeric"
            min={0}
            onChange={(event) =>
              onChange(
                minPrice,
                event.target.value === "" ? undefined : Number(event.target.value),
              )
            }
            placeholder="750"
            step={10}
            type="number"
            value={inputValue(maxPrice)}
          />
          <span>PLN</span>
        </span>
      </label>
    </div>
  );
}
