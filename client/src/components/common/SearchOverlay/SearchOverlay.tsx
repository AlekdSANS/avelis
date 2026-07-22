import styles from "./SearchOverlay.module.scss";

type SearchOverlayProps = {
  className?: string;
};

export function SearchOverlay({ className }: SearchOverlayProps) {
  return (
    <div className={` ${className ?? ""}`.trim()}>
      SearchOverlay
    </div>
  );
}
