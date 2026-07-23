import styles from "./ProductPage.module.scss";
import { Heart, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { AddToCartButton } from "../../components/commerce/AddToCartButton/AddToCartButton";
import { ProductGallery } from "../../components/commerce/ProductGallery/ProductGallery";
import { ProductGrid } from "../../components/commerce/ProductGrid/ProductGrid";
import { QuantitySelector } from "../../components/commerce/QuantitySelector/QuantitySelector";
import { VariantSelector } from "../../components/commerce/VariantSelector/VariantSelector";
import { Accordion } from "../../components/ui/Accordion/Accordion";
import { Badge } from "../../components/ui/Badge/Badge";
import { ButtonLink } from "../../components/ui/Button/Button";
import { IconButton } from "../../components/ui/IconButton/IconButton";
import { Price } from "../../components/ui/Price/Price";
import { productBySlug, productFilterOptions, products } from "../../features/products/data/products";
import { useLocalWishlist } from "../../features/products/hooks/useLocalWishlist";
import { useRecentlyViewed } from "../../features/products/hooks/useRecentlyViewed";
import { getRelatedProducts } from "../../features/products/utils/productCatalog";
import type { FragranceNoteType, ProductVariant } from "../../types/product";

const collectionLabels = new Map<string, string>(
  productFilterOptions.collections.map((collection) => [
    collection.value,
    collection.label,
  ]),
);

const noteLabels: Record<FragranceNoteType, string> = {
  TOP: "Top notes",
  HEART: "Heart notes",
  BASE: "Base notes",
};

export function ProductPage() {
  const { slug } = useParams();
  const product = slug ? productBySlug.get(slug) : undefined;
  const recentlyViewed = useRecentlyViewed(product?.slug ?? "");
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
  const selectedVariantId =
    selectedVariantState && selectedVariantState.slug === product?.slug
      ? selectedVariantState.id
      : undefined;
  const selectedVariant = product?.variants.find(
    (variant) => variant.id === selectedVariantId,
  );
  const quantity =
    quantityState.slug === product?.slug
      ? Math.min(quantityState.value, selectedVariant?.stock ?? 1)
      : 1;
  const bagStatus =
    bagStatusState && bagStatusState.slug === product?.slug
      ? bagStatusState.message
      : undefined;
  const relatedProducts = useMemo(
    () => (product ? getRelatedProducts(product, products) : []),
    [product],
  );

  if (!product) {
    return (
      <section className={styles.notFound}>
        <p className={styles.eyebrow}>Fragrance not found</p>
        <h1>This composition is not in the current collection.</h1>
        <p>
          The address may have changed, or the fragrance may no longer be part of
          this local catalogue.
        </p>
        <ButtonLink to="/shop">Return to Shop</ButtonLink>
      </section>
    );
  }

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

    setBagStatusState({
      message: `${quantity} × ${product.name}, ${selectedVariant.volumeMl} ml ${
        selectedVariant.format === "BOTTLE" ? "bottle" : "refill"
      } selected locally. Checkout persistence is not connected.`,
      slug: product.slug,
    });
  };

  const accordionItems = [
    {
      id: "composition",
      title: "Composition",
      content: product.composition,
    },
    {
      id: "concentration",
      title: "Concentration",
      content: `${product.concentration}. ${product.genderPositioning} positioning with an expected wear of ${product.longevity}.`,
    },
    {
      id: "longevity",
      title: "Longevity",
      content: `${product.longevity} on average. Wear varies with skin, climate and application.`,
    },
    {
      id: "season-occasion",
      title: "Season & occasion",
      content: `Designed for ${product.seasons.join(" and ").toLocaleLowerCase()}, with ${product.occasions.join(", ").toLocaleLowerCase()} in mind.`,
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
      content: product.ingredients,
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
            {product.isBestSeller ? <Badge>Best seller</Badge> : null}
          </div>

          <p className={styles.collection}>
            {collectionLabels.get(product.collectionSlugs[0] ?? "") ??
              "AVELIS collection"}
          </p>
          <h1>{product.name}</h1>
          <p className={styles.subtitle}>{product.subtitle}</p>

          <div className={styles.rating}>
            <Star aria-hidden="true" fill="currentColor" />
            <strong>{product.rating.toFixed(1)}</strong>
            <span>{product.reviewCount} reviews</span>
          </div>

          <p className={styles.shortDescription}>{product.shortDescription}</p>

          <div className={styles.selectedPrice} aria-live="polite">
            {selectedVariant ? (
              <>
                <Price
                  compareAtPrice={selectedVariant.compareAtPrice}
                  value={selectedVariant.price}
                />
                <span>
                  {selectedVariant.stock > 0
                    ? `${selectedVariant.stock} in local stock data`
                    : "Out of stock"}
                </span>
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
              onClick={() => toggleWishlist(product.id)}
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
          <p>{product.fullDescription}</p>
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
            <dd>{product.longevity}</dd>
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
                    <li key={note.id}>{note.name}</li>
                  ))}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <ProductShelf
        products={relatedProducts}
        title="Related compositions"
        wishlist={wishlist}
        onWishlistToggle={toggleWishlist}
      />

      {recentlyViewed.length > 0 ? (
        <ProductShelf
          products={recentlyViewed}
          title="Recently viewed"
          wishlist={wishlist}
          onWishlistToggle={toggleWishlist}
        />
      ) : null}
    </div>
  );
}

type ProductShelfProps = {
  onWishlistToggle: (productId: string) => void;
  products: NonNullable<ReturnType<typeof productBySlug.get>>[];
  title: string;
  wishlist: Set<string>;
};

function ProductShelf({
  onWishlistToggle,
  products: shelfProducts,
  title,
  wishlist,
}: ProductShelfProps) {
  return (
    <section aria-labelledby={`${title.toLocaleLowerCase().replaceAll(" ", "-")}-title`} className={styles.shelf}>
      <header>
        <h2 id={`${title.toLocaleLowerCase().replaceAll(" ", "-")}-title`}>{title}</h2>
        <Link to="/shop">Explore all fragrances</Link>
      </header>
      <ProductGrid
        items={shelfProducts.map((shelfProduct) => ({ product: shelfProduct }))}
        onWishlistToggle={onWishlistToggle}
        wishlist={wishlist}
      />
    </section>
  );
}
