import styles from "./ProductPage.module.scss";
import { Heart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import { AddToCartButton } from "../../components/commerce/AddToCartButton/AddToCartButton";
import { ProductGallery } from "../../components/commerce/ProductGallery/ProductGallery";
import { ProductGrid } from "../../components/commerce/ProductGrid/ProductGrid";
import { QuantitySelector } from "../../components/commerce/QuantitySelector/QuantitySelector";
import { VariantSelector } from "../../components/commerce/VariantSelector/VariantSelector";
import { Accordion } from "../../components/ui/Accordion/Accordion";
import { Badge } from "../../components/ui/Badge/Badge";
import { Button, ButtonLink } from "../../components/ui/Button/Button";
import { IconButton } from "../../components/ui/IconButton/IconButton";
import { Price } from "../../components/ui/Price/Price";
import { Skeleton } from "../../components/ui/Skeleton/Skeleton";
import { ApiClientError } from "../../services/apiClient";
import { useCart } from "../../features/cart/hooks/useCart";
import { useLocalWishlist } from "../../features/products/hooks/useLocalWishlist";
import {
  useProduct,
  useRelatedProducts,
} from "../../features/products/hooks/useProducts";
import { useRecentlyViewed } from "../../features/products/hooks/useRecentlyViewed";
import {
  getCollectionLabel,
  getComposition,
  getFullDescription,
  getIngredients,
  getShortDescription,
} from "../../features/products/utils/productCatalog";
import type { FragranceNoteType, Product, ProductVariant } from "../../types/product";
import {
  trackViewItem,
  trackWishlistChange,
} from "../../services/analytics";
import { ProductReviews } from "../../features/reviews/ProductReviews";
import { ProductMerchandisingPanel } from "../../features/merchandising/ProductMerchandisingPanel";
import { useDocumentMetadata } from "../../hooks/useDocumentMetadata";
import { buildProductStructuredData, getPrimaryProductImage } from "../../utils/seo";

const noteLabels: Record<FragranceNoteType, string> = {
  TOP: "Top notes",
  HEART: "Heart notes",
  BASE: "Base notes",
};

function getDefaultVariant(product: Product) {
  return [...product.variants]
    .sort((left, right) => {
      const formatDelta =
        Number(left.format === "REFILL") - Number(right.format === "REFILL");
      return formatDelta === 0 ? left.volumeMl - right.volumeMl : formatDelta;
    })
    .find((variant) => variant.stock > 0);
}

export function ProductPage() {
  const { slug } = useParams();
  const location = useLocation();
  const productQuery = useProduct(slug);
  const product = productQuery.data;
  const productNotFound =
    productQuery.error instanceof ApiClientError &&
    productQuery.error.statusCode === 404;
  const relatedQuery = useRelatedProducts(product?.id);
  const recentlyViewed = useRecentlyViewed(product?.slug ?? "");
  const { addItem } = useCart();
  const { wishlist, toggleWishlist } = useLocalWishlist();
  const [selectedVariantState, setSelectedVariantState] = useState<{
    id: string;
    slug: string;
  }>();
  const [quantityState, setQuantityState] = useState({ slug: "", value: 1 });
  const [bagStatusState, setBagStatusState] = useState<{
    message: string;
    slug: string;
  }>();

  useDocumentMetadata({
    canonicalPath: `/products/${slug ?? ""}`,
    description: product?.description ?? "Discover an AVELIS fragrance composition.",
    image: product ? getPrimaryProductImage(product) : undefined,
    robots: productNotFound ? "noindex,nofollow" : "index,follow",
    structuredData: product ? buildProductStructuredData(product) : undefined,
    title: product ? `${product.name} Eau de Parfum | AVELIS` : productNotFound ? "Fragrance not found | AVELIS" : "AVELIS fragrance",
    type: "product",
  });

  /* eslint-disable react-hooks/set-state-in-effect -- Query-backed product
     changes must reset the selected purchasable variant and related UI state. */
  useEffect(() => {
    if (!product) {
      return;
    }

    const selectedVariant =
      selectedVariantState?.slug === product.slug
        ? product.variants.find((variant) => variant.id === selectedVariantState.id)
        : undefined;

    if (selectedVariant && selectedVariant.stock > 0) {
      return;
    }

    const defaultVariant = getDefaultVariant(product);
    setSelectedVariantState(
      defaultVariant ? { id: defaultVariant.id, slug: product.slug } : undefined,
    );
    setQuantityState({ slug: product.slug, value: 1 });
    setBagStatusState(undefined);
  }, [product, selectedVariantState]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const selectedVariantId =
    product && selectedVariantState?.slug === product.slug
      ? selectedVariantState.id
      : undefined;
  const selectedVariant = product?.variants.find(
    (variant) => variant.id === selectedVariantId,
  );

  useEffect(() => {
    if (product && selectedVariant) {
      trackViewItem(product, selectedVariant, location.key);
    }
  }, [location.key, product, selectedVariant]);

  if (productQuery.isLoading) {
    return <ProductPageSkeleton />;
  }

  if (productNotFound) {
    return (
      <section className={styles.notFound}>
        <p className={styles.eyebrow}>Fragrance not found</p>
        <h1>This composition is not in the current collection.</h1>
        <p>
          The address may have changed, or the fragrance may no longer be part of
          the API catalogue.
        </p>
        <ButtonLink to="/shop">Return to Shop</ButtonLink>
      </section>
    );
  }

  if (productQuery.isError || !product) {
    return (
      <section className={styles.notFound}>
        <p className={styles.eyebrow}>Product unavailable</p>
        <h1>The fragrance could not be loaded.</h1>
        <p>Check the backend connection and try again.</p>
        <Button onClick={() => void productQuery.refetch()}>Try again</Button>
      </section>
    );
  }

  const quantity =
    quantityState.slug === product.slug
      ? Math.min(quantityState.value, selectedVariant?.stock ?? 1)
      : 1;
  const bagStatus =
    bagStatusState && bagStatusState.slug === product.slug
      ? bagStatusState.message
      : undefined;
  const relatedProducts = relatedQuery.data ?? [];

  const handleVariantChange = (variant: ProductVariant) => {
    setSelectedVariantState({ id: variant.id, slug: product.slug });
    setQuantityState({ slug: product.slug, value: 1 });
    setBagStatusState(undefined);
  };

  const handleLocalAdd = () => {
    if (!selectedVariant) {
      setBagStatusState({
        message: "Choose a bottle or refill size before adding this selection.",
        slug: product.slug,
      });
      return;
    }

    addItem({
      product,
      quantity,
      variant: selectedVariant,
    });
    setBagStatusState({
      message: `${quantity} x ${product.name}, ${selectedVariant.volumeMl} ml ${
        selectedVariant.format === "BOTTLE" ? "bottle" : "refill"
      } added to your bag.`,
      slug: product.slug,
    });
  };

  const accordionItems = [
    {
      id: "composition",
      title: "Composition",
      content: getComposition(product),
    },
    {
      id: "concentration",
      title: "Concentration",
      content: `${product.concentration}. ${
        product.gender ?? "Unisex"
      } positioning with an expected wear of ${product.longevity ?? "varied longevity"}.`,
    },
    {
      id: "longevity",
      title: "Longevity",
      content: `${
        product.longevity ?? "Longevity varies"
      } on average. Wear varies with skin, climate and application.`,
    },
    {
      id: "season-occasion",
      title: "Season & occasion",
      content: `Designed for ${product.season.join(" and ").toLocaleLowerCase()}, with ${product.occasion.join(", ").toLocaleLowerCase()} in mind.`,
    },
    {
      id: "delivery",
      title: "Delivery & returns",
      content:
        "Delivery and return policies are presented for catalogue layout only in this step. Final delivery estimates and return eligibility will come from checkout services later.",
    },
    {
      id: "ingredients",
      title: "Ingredients",
      content: getIngredients(),
    },
  ];

  return (
    <div className={styles.page}>
      <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
        <Link to="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link to="/shop">Shop</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{product.name}</span>
      </nav>

      <div className={styles.productLayout}>
        <ProductGallery
          images={product.images}
          key={product.id}
          productName={product.name}
        />

        <section className={styles.productInfo}>
          <div className={styles.badges}>
            {product.isNew ? <Badge>New</Badge> : null}
            {product.isLimited ? <Badge tone="dark">Limited</Badge> : null}
            {product.isFeatured ? <Badge>Featured</Badge> : null}
          </div>

          <p className={styles.collection}>{getCollectionLabel(product)}</p>
          <h1>{product.name}</h1>
          <p className={styles.subtitle}>{product.subtitle}</p>

          <div className={styles.rating}>
            <Star aria-hidden="true" fill="currentColor" />
            <strong>{product.rating?.toFixed(1) ?? "New"}</strong>
            <span>{product.reviewCount} reviews</span>
          </div>

          <p className={styles.shortDescription}>{getShortDescription(product)}</p>

          <div className={styles.selectedPrice} aria-live="polite">
            {selectedVariant ? (
              <>
                <Price
                  compareAtPrice={selectedVariant.compareAtPrice}
                  value={selectedVariant.price}
                />
                <span>
                  {selectedVariant.stock > 0
                    ? `${selectedVariant.stock} in stock / SKU ${selectedVariant.sku}`
                    : `Out of stock / SKU ${selectedVariant.sku}`}
                </span>
				{selectedVariant.stock > 0 && selectedVariant.stock <= product.lowStockThreshold ? <strong>Only {selectedVariant.stock} left</strong> : null}
              </>
            ) : (
              <span>Select a format and size</span>
            )}
          </div>

          <VariantSelector
            onChange={handleVariantChange}
            selectedVariantId={selectedVariantId}
            variants={product.variants}
          />

          <div className={styles.purchase}>
            <QuantitySelector
              disabled={!selectedVariant}
              max={selectedVariant?.stock ?? 1}
              onChange={(nextQuantity) =>
                setQuantityState({ slug: product.slug, value: nextQuantity })
              }
              value={quantity}
            />
            <AddToCartButton
              className={styles.addToBag}
              disabled={!selectedVariant || selectedVariant.stock === 0}
              onAdd={handleLocalAdd}
              statusMessage={bagStatus}
            />
            <IconButton
              aria-label={
                wishlist.has(product.id)
                  ? `Remove ${product.name} from local wishlist`
                  : `Add ${product.name} to local wishlist`
              }
              aria-pressed={wishlist.has(product.id)}
              className={styles.wishlist}
              onClick={() => {
                const action = wishlist.has(product.id) ? "remove" : "add";
                toggleWishlist(product.id);
                trackWishlistChange(action, product, selectedVariant);
              }}
              variant="outline"
            >
              <Heart
                aria-hidden="true"
                fill={wishlist.has(product.id) ? "currentColor" : "none"}
              />
            </IconButton>
          </div>

          <Accordion defaultOpenIds={["composition"]} items={accordionItems} />
        </section>
      </div>

      <section aria-labelledby="fragrance-story-title" className={styles.story}>
        <div>
          <p className={styles.eyebrow}>The composition</p>
          <h2 id="fragrance-story-title">{product.subtitle}</h2>
          <p>{getFullDescription(product)}</p>
        </div>
        <dl className={styles.attributes}>
          <div>
            <dt>Family</dt>
            <dd>{product.fragranceFamily}</dd>
          </div>
          <div>
            <dt>Concentration</dt>
            <dd>{product.concentration}</dd>
          </div>
          <div>
            <dt>Wear</dt>
            <dd>{product.longevity ?? "Varies"}</dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="pyramid-title" className={styles.pyramid}>
        <header>
          <p className={styles.eyebrow}>Fragrance pyramid</p>
          <h2 id="pyramid-title">From first impression to lasting trace.</h2>
        </header>
        <div className={styles.noteColumns}>
          {(["TOP", "HEART", "BASE"] as const).map((type) => (
            <section key={type}>
              <p>{noteLabels[type]}</p>
              <ul>
                {product.notes
                  .filter((note) => note.type === type)
                  .map((note) => (
                    <li key={`${note.type}-${note.position}-${note.name}`}>
                      {note.name}
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <ProductMerchandisingPanel productId={product.id} productName={product.name} />
      <ProductReviews slug={product.slug} />

      {relatedQuery.isLoading || relatedProducts.length > 0 ? (
        <ProductShelf
          isLoading={relatedQuery.isLoading}
          products={relatedProducts}
          title="Related compositions"
          itemListId="related_products"
          itemListName="Related products"
          wishlist={wishlist}
          onWishlistToggle={toggleWishlist}
        />
      ) : null}

      {recentlyViewed.isLoading || recentlyViewed.products.length > 0 ? (
        <ProductShelf
          isLoading={recentlyViewed.isLoading}
          products={recentlyViewed.products}
          title="Recently viewed"
          itemListId="recently_viewed"
          itemListName="Recently viewed"
          wishlist={wishlist}
          onWishlistToggle={toggleWishlist}
        />
      ) : null}
    </div>
  );
}

function ProductPageSkeleton() {
  return (
    <div className={styles.page}>
      <div className={styles.breadcrumbs}>
        <Skeleton style={{ height: "1rem", width: "14rem" }} />
      </div>
      <div className={styles.productLayout}>
        <Skeleton style={{ aspectRatio: "4 / 5", width: "100%" }} />
        <section className={styles.productInfo}>
          <Skeleton style={{ height: "1rem", width: "10rem" }} />
          <Skeleton style={{ height: "6rem", width: "70%" }} />
          <Skeleton style={{ height: "1.5rem", width: "85%" }} />
          <Skeleton style={{ height: "4rem", width: "100%" }} />
          <Skeleton style={{ height: "10rem", width: "100%" }} />
        </section>
      </div>
    </div>
  );
}

type ProductShelfProps = {
  itemListId: string;
  itemListName: string;
  isLoading?: boolean;
  onWishlistToggle: (productId: string) => void;
  products: Product[];
  title: string;
  wishlist: Set<string>;
};

function ProductShelf({
  itemListId,
  itemListName,
  isLoading = false,
  onWishlistToggle,
  products: shelfProducts,
  title,
  wishlist,
}: ProductShelfProps) {
  return (
    <section
      aria-labelledby={`${title.toLocaleLowerCase().replaceAll(" ", "-")}-title`}
      className={styles.shelf}
    >
      <header>
        <h2 id={`${title.toLocaleLowerCase().replaceAll(" ", "-")}-title`}>
          {title}
        </h2>
        <Link to="/shop">Explore all fragrances</Link>
      </header>
      <ProductGrid
        itemListId={itemListId}
        itemListName={itemListName}
        items={shelfProducts.map((shelfProduct) => ({ product: shelfProduct }))}
        onWishlistToggle={onWishlistToggle}
        status={isLoading ? "loading" : "ready"}
        wishlist={wishlist}
      />
    </section>
  );
}
