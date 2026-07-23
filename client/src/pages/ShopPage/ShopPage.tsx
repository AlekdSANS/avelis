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
import {
  ActiveFilterChips,
} from "../../features/products/components/ActiveFilterChips";
import { products } from "../../features/products/data/products";
import { useLocalWishlist } from "../../features/products/hooks/useLocalWishlist";
import { useProductFilters } from "../../features/products/hooks/useProductFilters";
import { getActiveFilterCount } from "../../features/products/types";
import {
  filterProducts,
  getMatchingVariants,
  sortProducts,
} from "../../features/products/utils/productCatalog";

const PRODUCTS_PER_PAGE = 8;

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
    clearAll,
    removeFilter,
  } = useProductFilters();

  const filteredProducts = useMemo(
    () => filterProducts(products, filters),
    [filters],
  );
  const sortedProducts = useMemo(
    () => sortProducts(filteredProducts, sort, filters),
    [filteredProducts, filters, sort],
  );
  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const pageProducts = sortedProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  );
  const gridItems = pageProducts.map((product) => ({
    product,
    variants: getMatchingVariants(product, filters),
  }));
  const activeFilterCount = getActiveFilterCount(filters);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, setPage, totalPages]);

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

      <div className={[styles.wideContainer, styles.catalogue].join(" ")}>
        <aside aria-label="Product filters" className={styles.desktopFilters}>
          {filterControls}
        </aside>

        <section aria-labelledby="catalogue-title" className={styles.results}>
          <h2 className="visually-hidden" id="catalogue-title">
            Fragrance catalogue
          </h2>

          <div className={styles.toolbar} ref={resultsRef}>
            <form
              className={styles.search}
              onSubmit={(event) => event.preventDefault()}
              role="search"
            >
              <label className="visually-hidden" htmlFor="shop-search">
                Search the fragrance catalogue
              </label>
              <Search aria-hidden="true" />
              <Input
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
              <strong>{filteredProducts.length}</strong>
              <span>{filteredProducts.length === 1 ? "fragrance" : "fragrances"}</span>
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
            onClearPrice={() => setPriceRange()}
            onClearSearch={() => setSearch("")}
            onRemove={removeFilter}
          />

          <ProductGrid
            items={gridItems}
            onWishlistToggle={toggleWishlist}
            wishlist={wishlist}
          />

          <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalPages={totalPages}
          />
        </section>
      </div>

      <Drawer
        isOpen={isFilterDrawerOpen}
        label={`${filteredProducts.length} matching fragrances`}
        onClose={closeFilterDrawer}
        title="Filters"
      >
        {filterControls}
        <Button
          className={styles.drawerApply}
          fullWidth
          onClick={closeFilterDrawer}
        >
          Show {filteredProducts.length} fragrances
        </Button>
      </Drawer>
    </div>
  );
}
