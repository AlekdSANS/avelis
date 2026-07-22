import styles from "./ProductGallery.module.scss";

type ProductGalleryProps = {
  className?: string;
};

export function ProductGallery({ className }: ProductGalleryProps) {
  return (
    <div className={[styles.root, className ?? ""].filter(Boolean).join(" ")}>
      ProductGallery
    </div>
  );
}
