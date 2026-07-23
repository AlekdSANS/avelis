import styles from "./QuantitySelector.module.scss";
import { Minus, Plus } from "lucide-react";

type QuantitySelectorProps = {
  className?: string;
  disabled?: boolean;
  max: number;
  onChange: (quantity: number) => void;
  value: number;
};

export function QuantitySelector({
  className,
  disabled = false,
  max,
  onChange,
  value,
}: QuantitySelectorProps) {
  const clamp = (nextValue: number) => Math.min(Math.max(nextValue, 1), Math.max(max, 1));

  return (
    <div
      className={[styles.quantity, className ?? ""].filter(Boolean).join(" ")}
    >
      <button
        aria-label="Decrease quantity"
        disabled={disabled || value <= 1}
        onClick={() => onChange(clamp(value - 1))}
        type="button"
      >
        <Minus aria-hidden="true" />
      </button>
      <label>
        <span className="visually-hidden">Quantity</span>
        <input
          aria-label="Quantity"
          disabled={disabled}
          inputMode="numeric"
          max={max}
          min={1}
          onBlur={(event) => onChange(clamp(Number(event.target.value) || 1))}
          onChange={(event) => onChange(clamp(Number(event.target.value) || 1))}
          type="number"
          value={value}
        />
      </label>
      <button
        aria-label="Increase quantity"
        disabled={disabled || value >= max}
        onClick={() => onChange(clamp(value + 1))}
        type="button"
      >
        <Plus aria-hidden="true" />
      </button>
    </div>
  );
}
