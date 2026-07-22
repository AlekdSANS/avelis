import styles from "./VariantSelector.module.scss";

type VariantSelectorProps = {
  className?: string;
};

export function VariantSelector({ className }: VariantSelectorProps) {
  return (
    <div className={` ${className ?? ""}`.trim()}>
      VariantSelector
    </div>
  );
}
