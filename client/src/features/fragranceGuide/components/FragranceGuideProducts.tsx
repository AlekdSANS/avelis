import { useMemo } from "react";

import { ProductGrid } from "../../../components/commerce/ProductGrid/ProductGrid";
import { useLocalWishlist } from "../../products/hooks/useLocalWishlist";
import { useFeaturedProducts } from "../../products/hooks/useProducts";
import type { Product } from "../../../types/product";
import { GuideSectionHeading } from "./GuideSectionHeading";
import styles from "../../../pages/FragranceGuidePage/FragranceGuidePage.module.scss";

type FragranceGuideProductsProps = {
  fallbackProducts: Product[];
};

export function FragranceGuideProducts({
  fallbackProducts,
}: FragranceGuideProductsProps) {
  const featuredQuery = useFeaturedProducts(3);
  const { wishlist, toggleWishlist } = useLocalWishlist();
  const products = useMemo(() => {
    const featured = featuredQuery.data ?? [];
    return (featured.length > 0 ? featured : fallbackProducts).slice(0, 3);
  }, [fallbackProducts, featuredQuery.data]);
  const hasFallback = products.length > 0;

  if (featuredQuery.isError && !hasFallback) {
    return null;
  }

  if (featuredQuery.isSuccess && products.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="guide-products-title"
      className={[styles.section, styles.productsSection].join(" ")}
    >
      <div className={styles.inner}>
        <GuideSectionHeading
          description="Three AVELIS compositions selected as a starting point. Follow the notes that hold your attention, then let the fragrance develop on skin."
          eyebrow="A place to begin"
          heading="Begin with these fragrances"
          id="guide-products-title"
        />

        <ProductGrid
          className={styles.guideProductGrid}
          emptyDescription="Return soon to discover the next AVELIS composition."
          emptyLabel="The next chapter"
          emptyTitle="New fragrances are being composed."
          items={products.map((product) => ({ product }))}
          onWishlistToggle={toggleWishlist}
          skeletonCount={3}
          status={
            featuredQuery.isLoading && !hasFallback ? "loading" : "ready"
          }
          wishlist={wishlist}
        />
      </div>
    </section>
  );
}
