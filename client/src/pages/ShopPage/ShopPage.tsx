import styles from "./ShopPage.module.scss";
import { SlidersHorizontal, Search, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { FilterSidebar } from "../../components/commerce/FilterSidebar/FilterSidebar";
import { ProductGrid } from "../../components/commerce/ProductGrid/ProductGrid";
import { SortMenu } from "../../components/commerce/SortMenu/SortMenu";
import { Button } from "../../components/ui/Button/Button";
import { Drawer } from "../../components/ui/Drawer/Drawer";
import { IconButton } from "../../components/ui/IconButton/IconButton";
import { Input } from "../../components/ui/Input/Input";
import { Pagination } from "../../components/ui/Pagination/Pagination";
import { ActiveFilterChips } from "../../features/products/components/ActiveFilterChips";
import { useLocalWishlist } from "../../features/products/hooks/useLocalWishlist";
import { useProductFilters } from "../../features/products/hooks/useProductFilters";
import { useProducts } from "../../features/products/hooks/useProducts";
import { getActiveFilterCount } from "../../features/products/types";
import { getMatchingVariants } from "../../features/products/utils/productCatalog";
import type { ProductQueryParams } from "../../types";

const PRODUCTS_PER_PAGE = 8;
const LOVED_PRODUCTS_LIMIT = 48;

function joinValues(values: (string | number)[]) {
  return values.length > 0 ? values.join(",") : undefined;
}

export function ShopPage() {
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const { wishlist, toggleWishlist } = useLocalWishlist();
  const {
    filters,
    sort,
    page,
    toggleFilter,
    setSearch,
    setSort,
    setPage,
    setAvailability,
    setPriceRange,
    setLovedOnly,
    clearAll,
    removeFilter,
  } = useProductFilters();

  const productParams = useMemo<ProductQueryParams>(
    () => ({
      search:
        [filters.search, ...filters.notes]
          .map((value) => value.trim())
          .filter(Boolean)
          .join(",") || undefined,
      family: joinValues(filters.families),
      season: joinValues(filters.seasons),
      concentration: joinValues(filters.concentrations),
      format:
        filters.formats.length === 1 ? filters.formats[0] : joinValues(filters.formats),
      volume:
        filters.volumes.length === 1
          ? filters.volumes[0]
          : joinValues(filters.volumes),
      collection: joinValues(filters.collections),
      inStock: filters.inStockOnly,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      sort,
      page: filters.lovedOnly ? 1 : page,
      limit: filters.lovedOnly ? LOVED_PRODUCTS_LIMIT : PRODUCTS_PER_PAGE,
    }),
    [filters, page, sort],
  );
  const productsQuery = useProducts(productParams);
  const products = productsQuery.data?.data ?? [];
  const visibleProducts = filters.lovedOnly
    ? products.filter((product) => wishlist.has(product.id))
    : products;
  const totalProducts = filters.lovedOnly
    ? visibleProducts.length
    : productsQuery.data?.total ?? 0;
  const totalPages = filters.lovedOnly
    ? 1
    : Math.max(1, productsQuery.data?.totalPages ?? 1);
  const currentPage = filters.lovedOnly ? 1 : Math.min(page, totalPages);
  const gridItems = visibleProducts.map((product) => ({
    product,
    variants: getMatchingVariants(product, filters),
  }));
  const activeFilterCount = getActiveFilterCount(filters);

  useEffect(() => {
    if (!filters.lovedOnly && page > totalPages) {
      setPage(totalPages);
    }
  }, [filters.lovedOnly, page, setPage, totalPages]);

  const closeFilterDrawer = useCallback(() => setIsFilterDrawerOpen(false), []);

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    resultsRef.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const filterControls = (
    <FilterSidebar
      filters={filters}
      onAvailabilityChange={setAvailability}
      onClearAll={clearAll}
      onLovedChange={setLovedOnly}
      onPriceRangeChange={setPriceRange}
      onToggle={toggleFilter}
    />
  );

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.wideContainer}>
          <p className={styles.eyebrow}>The AVELIS collection</p>
          <h1>Fragrances composed for a quieter kind of presence.</h1>
          <p className={styles.intro}>
            Explore perfume bottles and dedicated refills across luminous florals,
            considered woods, clean freshness and slow amber warmth.
          </p>
        </div>
      </header>

      <div className={[styles.wideContainer, styles.catalogueHeading].join(" ")}>
        <h2 id="catalogue-title">Fragrance catalogue</h2>
      </div>

      <div className={[styles.wideContainer, styles.catalogue].join(" ")}>
        <aside aria-label="Product filters" className={styles.desktopFilters}>
          {filterControls}
        </aside>

        <section aria-labelledby="catalogue-title" className={styles.results}>
          <div className={styles.toolbar} ref={resultsRef}>
            <form
              className={styles.search}
              onSubmit={(event) => event.preventDefault()}
              role="search"
            >
              <Search aria-hidden="true" />
              <Input
                aria-label="Search fragrances, notes or families"
                autoComplete="off"
                id="shop-search"
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search fragrances, notes or families"
                type="search"
                value={filters.search}
              />
              {filters.search ? (
                <IconButton
                  aria-label="Clear catalogue search"
                  className={styles.clearSearch}
                  onClick={() => setSearch("")}
                >
                  <X />
                </IconButton>
              ) : null}
            </form>

            <div aria-live="polite" className={styles.resultCount}>
              <strong>{totalProducts}</strong>
              <span>{totalProducts === 1 ? "fragrance" : "fragrances"}</span>
            </div>

            <SortMenu className={styles.desktopSort} onChange={setSort} value={sort} />
          </div>

          <div className={styles.mobileControls}>
            <Button
              onClick={() => setIsFilterDrawerOpen(true)}
              variant="secondary"
            >
              <SlidersHorizontal aria-hidden="true" />
              Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
            </Button>
            <SortMenu
              className={styles.mobileSort}
              id="mobile-product-sort"
              onChange={setSort}
              value={sort}
            />
          </div>

          <ActiveFilterChips
            filters={filters}
            onClearAll={clearAll}
            onClearAvailability={() => setAvailability(false)}
            onClearLoved={() => setLovedOnly(false)}
            onClearPrice={() => setPriceRange()}
            onClearSearch={() => setSearch("")}
            onRemove={removeFilter}
          />

          <ProductGrid
            errorMessage="The API catalogue could not be loaded. Check the backend connection and try again."
            items={gridItems}
            onRetry={() => void productsQuery.refetch()}
            onWishlistToggle={toggleWishlist}
            status={
              productsQuery.isLoading
                ? "loading"
                : productsQuery.isError
                  ? "error"
                  : "ready"
            }
            wishlist={wishlist}
          />

          {!filters.lovedOnly && totalPages > 1 ? (
            <Pagination
              currentPage={currentPage}
              onPageChange={handlePageChange}
              totalPages={totalPages}
            />
          ) : null}
        </section>
      </div>

      <Drawer
        isOpen={isFilterDrawerOpen}
        label={`${totalProducts} matching fragrances`}
        onClose={closeFilterDrawer}
        title="Filters"
      >
        {filterControls}
        <Button
          className={styles.drawerApply}
          fullWidth
          onClick={closeFilterDrawer}
        >
          Show {totalProducts} fragrances
        </Button>
      </Drawer>
    </div>
  );
}
