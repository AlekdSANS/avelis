import styles from "./SearchOverlay.module.scss";
import { ArrowRight, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { IconButton } from "../../ui/IconButton/IconButton";
import { Skeleton } from "../../ui/Skeleton/Skeleton";
import { usePresence } from "../../../hooks/usePresence";
import { useCollections } from "../../../features/collections/hooks/useCollections";
import { ProductImage } from "../../../features/products/components/ProductImage";
import { useProducts } from "../../../features/products/hooks/useProducts";
import {
  getCheapestVariant,
  getPrimaryProductImage,
} from "../../../features/products/utils/productCatalog";
import { formatCurrency } from "../../../utils/currency";

type SearchOverlayProps = {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
};

export function SearchOverlay({
  className,
  isOpen,
  onClose,
}: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const { isClosing, isMounted } = usePresence(isOpen);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const normalizedQuery = debouncedQuery.trim().toLocaleLowerCase();
  const productsQuery = useProducts({
    search: debouncedQuery.trim() || undefined,
    limit: 6,
    sort: "featured",
  });
  const collectionsQuery = useCollections();
  const products = productsQuery.data?.data ?? [];
  const collections = useMemo(() => {
    const availableCollections = collectionsQuery.data ?? [];

    if (!normalizedQuery) {
      return availableCollections.slice(0, 4);
    }

    return availableCollections
      .filter((collection) =>
        [
          collection.name,
          collection.slug,
          collection.eyebrow ?? "",
          collection.shortDescription ?? "",
          collection.description,
        ].some((value) => value.toLocaleLowerCase().includes(normalizedQuery)),
      )
      .slice(0, 4);
  }, [collectionsQuery.data, normalizedQuery]);

  useEffect(() => {
    const timeoutId = window.setTimeout(
      () => setDebouncedQuery(query),
      180,
    );

    return () => window.clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    inputRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isMounted) {
    return null;
  }

  const isLoading =
    query.trim() !== debouncedQuery.trim() || productsQuery.isFetching;
  const hasResults = products.length > 0 || collections.length > 0;

  const closeAndNavigate = (to: string) => {
    onClose();
    navigate(to);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = query.trim();

    closeAndNavigate(value ? `/shop?search=${encodeURIComponent(value)}` : "/shop");
  };

  const classes = [
    styles.overlay,
    isClosing ? styles.closing : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      aria-labelledby="search-overlay-title"
      aria-modal="true"
      className={classes}
      role="dialog"
    >
      <button
        aria-label="Close search"
        className={styles.backdrop}
        onClick={onClose}
        type="button"
      />
      <div className={styles.panel}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Search fragrances</p>
          <IconButton aria-label="Close search" onClick={onClose}>
            <X />
          </IconButton>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} role="search">
          <label className="visuallyHidden" htmlFor="storefront-search">
            Search fragrances, notes or collections
          </label>
          <Search aria-hidden="true" />
          <input
            autoComplete="off"
            id="storefront-search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search fragrances, notes or collections"
            ref={inputRef}
            type="search"
            value={query}
          />
          {query ? (
            <button
              aria-label="Clear search"
              className={styles.clearButton}
              onClick={() => setQuery("")}
              type="button"
            >
              Clear
            </button>
          ) : null}
          <button className={styles.submitButton} type="submit">
            View all
            <ArrowRight aria-hidden="true" />
          </button>
        </form>

        <div aria-live="polite" className={styles.results}>
          <div className={styles.resultsHeading}>
            <div>
              <p className={styles.eyebrow}>
                {query.trim() ? "Search results" : "A place to begin"}
              </p>
              <h2 id="search-overlay-title">
                {query.trim() ? `Results for “${query.trim()}”` : "Featured compositions"}
              </h2>
            </div>
            {!isLoading && hasResults ? (
              <span>
                {products.length} {products.length === 1 ? "fragrance" : "fragrances"}
                {collections.length > 0
                  ? ` · ${collections.length} ${collections.length === 1 ? "collection" : "collections"}`
                  : ""}
              </span>
            ) : null}
          </div>

          {isLoading ? (
            <div aria-label="Searching fragrances" className={styles.productGrid} role="status">
              {Array.from({ length: 3 }, (_, index) => (
                <div className={styles.productSkeleton} key={index}>
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </div>
              ))}
            </div>
          ) : null}

          {!isLoading && productsQuery.isError ? (
            <div className={styles.message} role="alert">
              <h3>Search is temporarily unavailable.</h3>
              <p>You can still browse the complete catalogue.</p>
              <button onClick={() => closeAndNavigate("/shop")} type="button">
                Open the shop
                <ArrowRight aria-hidden="true" />
              </button>
            </div>
          ) : null}

          {!isLoading && !productsQuery.isError && hasResults ? (
            <div className={styles.resultLayout}>
              <div className={styles.productGrid}>
                {products.map((product) => {
                  const image = getPrimaryProductImage(product);
                  const cheapestVariant = getCheapestVariant(product.variants);

                  return (
                    <Link
                      className={styles.productResult}
                      key={product.slug}
                      onClick={onClose}
                      to={`/products/${product.slug}`}
                    >
                      <ProductImage
                        alt={image.alt}
                        className={styles.productImage}
                        src={image.url}
                      />
                      <div>
                        <p>{product.fragranceFamily}</p>
                        <h3>{product.name}</h3>
                        <span>
                          {cheapestVariant
                            ? `From ${formatCurrency(cheapestVariant.price)}`
                            : "Currently unavailable"}
                        </span>
                      </div>
                      <ArrowRight aria-hidden="true" />
                    </Link>
                  );
                })}
              </div>

              {collections.length > 0 ? (
                <aside className={styles.collectionResults}>
                  <p className={styles.eyebrow}>Collections</p>
                  <ul>
                    {collections.map((collection) => (
                      <li key={collection.slug}>
                        <Link
                          onClick={onClose}
                          to={`/collections/${collection.slug}`}
                        >
                          <span>{collection.name}</span>
                          <small>
                            {collection.productCount} {collection.productCount === 1 ? "composition" : "compositions"}
                          </small>
                          <ArrowRight aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </aside>
              ) : null}
            </div>
          ) : null}

          {!isLoading && !productsQuery.isError && !hasResults ? (
            <div className={styles.message}>
              <h3>No exact composition found.</h3>
              <p>Try a note, fragrance family or collection name, or explore the full catalogue.</p>
              <button onClick={() => closeAndNavigate("/shop")} type="button">
                Browse all fragrances
                <ArrowRight aria-hidden="true" />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
