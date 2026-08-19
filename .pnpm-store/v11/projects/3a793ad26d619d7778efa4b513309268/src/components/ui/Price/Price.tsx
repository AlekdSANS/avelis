import styles from "./Price.module.scss";
import { formatCurrency, STORE_CURRENCY } from "../../../utils/currency";

type PriceProps = {
  className?: string;
  compareAtPrice?: number | null;
  currency?: string;
  prefix?: string;
  value: number;
};

export function Price({
  className,
  compareAtPrice,
  currency = STORE_CURRENCY,
  prefix,
  value,
}: PriceProps) {
  const format = (price: number) => formatCurrency(price, currency);

  return (
    <span className={[styles.price, className ?? ""].filter(Boolean).join(" ")}>
      <span>
        {prefix ? `${prefix} ` : ""}
        {format(value)}
      </span>
      {compareAtPrice && compareAtPrice > value ? (
        <del aria-label={`Previous price ${format(compareAtPrice)}`}>
          {format(compareAtPrice)}
        </del>
      ) : null}
    </span>
  );
}
