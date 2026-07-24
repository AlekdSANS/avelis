import styles from "./Price.module.scss";

type PriceProps = {
  className?: string;
  compareAtPrice?: number | null;
  currency?: string;
  prefix?: string;
  value: number;
};

const formatter = new Intl.NumberFormat("pl-PL", {
  currency: "PLN",
  maximumFractionDigits: 0,
  style: "currency",
});

export function Price({
  className,
  compareAtPrice,
  currency = "PLN",
  prefix,
  value,
}: PriceProps) {
  const format = (price: number) =>
    currency === "PLN" ? formatter.format(price) : `${price} ${currency}`;

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
