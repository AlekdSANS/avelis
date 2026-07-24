import {
	ArrowRight,
	PackageOpen,
	Plus,
	RefreshCcw,
	Search,
	X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { Badge } from "../../components/ui/Badge/Badge";
import { Button, ButtonLink } from "../../components/ui/Button/Button";
import { Input } from "../../components/ui/Input/Input";
import { Pagination } from "../../components/ui/Pagination/Pagination";
import { Price } from "../../components/ui/Price/Price";
import { Select } from "../../components/ui/Select/Select";
import { Skeleton } from "../../components/ui/Skeleton/Skeleton";
import { useAdminProductFilters } from "../../features/admin/hooks/useAdminProductFilters";
import { useAdminProducts } from "../../features/admin/hooks/useAdminProducts";
import { useCollections } from "../../features/collections/hooks/useCollections";
import { productFilterOptions } from "../../features/products/data/productFilterOptions";
import { ProductImage } from "../../features/products/components/ProductImage";
import type {
	AdminProductListItem,
	AdminProductListParams,
} from "../../types/adminProduct";
import styles from "./AdminProductsPage.module.scss";

const adminSortOptions = [
	{ value: "newest", label: "Newest" },
	{ value: "oldest", label: "Oldest" },
	{ value: "name-asc", label: "Name: A–Z" },
	{ value: "name-desc", label: "Name: Z–A" },
	{ value: "price-asc", label: "Price: low to high" },
	{ value: "price-desc", label: "Price: high to low" },
	{ value: "stock-asc", label: "Stock: low to high" },
	{ value: "stock-desc", label: "Stock: high to low" },
] as const;

const statusLabels = {
	active: "Active",
	inactive: "Inactive",
	featured: "Featured",
	new: "New",
	limited: "Limited",
} as const;

const stockLabels = {
	"in-stock": "In stock",
	"low-stock": "Low stock",
	"out-of-stock": "Out of stock",
} as const;

function formatUpdatedAt(value: string) {
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return "Date unavailable";

	return new Intl.DateTimeFormat("en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	}).format(date);
}

function AdminProductSearch({
	onCommit,
	value,
}: {
	onCommit: (value: string) => void;
	value: string;
}) {
	const [draft, setDraft] = useState(value);

	useEffect(() => {
		if (draft.trim() === value) {
			return;
		}

		const timeoutId = window.setTimeout(() => {
			onCommit(draft.trim());
		}, 350);

		return () => window.clearTimeout(timeoutId);
	}, [draft, onCommit, value]);

	return (
		<div className={styles.search}>
			<Search aria-hidden="true" />
			<Input
				aria-label="Search products or SKU"
				autoComplete="off"
				onChange={(event) => setDraft(event.target.value)}
				placeholder="Search products or SKU"
				type="search"
				value={draft}
			/>
			{draft.length > 0 ? (
				<button
					aria-label="Clear product search"
					onClick={() => {
						setDraft("");
						onCommit("");
					}}
					type="button"
				>
					<X aria-hidden="true" />
				</button>
			) : null}
		</div>
	);
}

function ProductBadges({ product }: { product: AdminProductListItem }) {
	const badges = [
		product.isNew ? "New" : null,
		product.isFeatured ? "Featured" : null,
		product.isLimited ? "Limited" : null,
	].filter((badge): badge is string => badge !== null);

	if (badges.length === 0) {
		return <span className={styles.noBadges}>None</span>;
	}

	return (
		<div className={styles.badges}>
			{badges.map((badge) => (
				<Badge key={badge}>{badge}</Badge>
			))}
		</div>
	);
}

function ProductIdentity({ product }: { product: AdminProductListItem }) {
	return (
		<div className={styles.productIdentity}>
			<ProductImage
				alt={product.primaryImage?.alt ?? ""}
				className={styles.productImage}
				src={
					product.primaryImage?.url ??
					"/images/placeholders/product_placeholder.png"
				}
			/>
			<div>
				<strong>{product.name}</strong>
				<span>{product.slug}</span>
				<small>{product.fragranceFamily}</small>
			</div>
		</div>
	);
}

function ProductStatus({ product }: { product: AdminProductListItem }) {
	return (
		<span
			className={[
				styles.status,
				product.isActive ? styles.active : styles.inactive,
			].join(" ")}
		>
			<span aria-hidden="true" />
			{product.isActive ? "Active" : "Inactive"}
		</span>
	);
}

function StockSummary({ product }: { product: AdminProductListItem }) {
	return (
		<div className={styles.stockSummary}>
			<strong>{product.totalStock}</strong>
			{product.lowStockVariantCount > 0 ? (
				<small>{product.lowStockVariantCount} low</small>
			) : product.outOfStockVariantCount > 0 ? (
				<small>{product.outOfStockVariantCount} out</small>
			) : null}
		</div>
	);
}

function ProductActions({ product }: { product: AdminProductListItem }) {
	return (
		<div className={styles.rowActions}>
			<Link to={`/admin/products/${encodeURIComponent(product.id)}/edit`}>
				Edit
				<ArrowRight aria-hidden="true" />
			</Link>
		</div>
	);
}

function ProductTable({ products }: { products: AdminProductListItem[] }) {
	return (
		<div className={styles.tableWrap}>
			<table>
				<caption className={styles.visuallyHidden}>
					AVELIS admin product catalogue
				</caption>
				<thead>
					<tr>
						<th scope="col">Product</th>
						<th scope="col">Status</th>
						<th scope="col">Badges</th>
						<th scope="col">Starting price</th>
						<th scope="col">Variants</th>
						<th scope="col">Total stock</th>
						<th scope="col">Updated</th>
						<th scope="col">Actions</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product) => (
						<tr key={product.id}>
							<td>
								<ProductIdentity product={product} />
							</td>
							<td>
								<ProductStatus product={product} />
							</td>
							<td>
								<ProductBadges product={product} />
							</td>
							<td>
								{product.startingPrice === null ? (
									<span className={styles.muted}>Unavailable</span>
								) : (
									<Price value={product.startingPrice} />
								)}
							</td>
							<td>{product.variantCount}</td>
							<td>
								<StockSummary product={product} />
							</td>
							<td>
								<time dateTime={product.updatedAt}>
									{formatUpdatedAt(product.updatedAt)}
								</time>
							</td>
							<td>
								<ProductActions product={product} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

function ProductCards({ products }: { products: AdminProductListItem[] }) {
	return (
		<div className={styles.cards}>
			{products.map((product) => (
				<article className={styles.card} key={product.id}>
					<div className={styles.cardHeading}>
						<ProductIdentity product={product} />
						<ProductStatus product={product} />
					</div>
					<ProductBadges product={product} />
					<dl>
						<div>
							<dt>Starting price</dt>
							<dd>
								{product.startingPrice === null ? (
									"Unavailable"
								) : (
									<Price value={product.startingPrice} />
								)}
							</dd>
						</div>
						<div>
							<dt>Variants</dt>
							<dd>{product.variantCount}</dd>
						</div>
						<div>
							<dt>Total stock</dt>
							<dd>
								<StockSummary product={product} />
							</dd>
						</div>
						<div>
							<dt>Updated</dt>
							<dd>
								<time dateTime={product.updatedAt}>
									{formatUpdatedAt(product.updatedAt)}
								</time>
							</dd>
						</div>
					</dl>
					<ProductActions product={product} />
				</article>
			))}
		</div>
	);
}

function ProductListSkeleton() {
	return (
		<div
			aria-label="Loading products"
			aria-live="polite"
			className={styles.skeleton}
			role="status"
		>
			<span className={styles.visuallyHidden}>Loading products</span>
			{Array.from({ length: 6 }, (_, index) => (
				<div className={styles.skeletonRow} key={index}>
					<Skeleton className={styles.skeletonImage} />
					<div>
						<Skeleton />
						<Skeleton />
					</div>
					<Skeleton />
					<Skeleton />
					<Skeleton />
				</div>
			))}
		</div>
	);
}

function getActiveFilters(filters: AdminProductListParams) {
	const items: Array<{ key: keyof AdminProductListParams; label: string }> = [];
	if (filters.search) items.push({ key: "search", label: `“${filters.search}”` });
	if (filters.status && filters.status !== "all") {
		items.push({ key: "status", label: statusLabels[filters.status] });
	}
	if (filters.family) items.push({ key: "family", label: filters.family });
	if (filters.concentration) {
		items.push({ key: "concentration", label: filters.concentration });
	}
	if (filters.format && filters.format !== "all") {
		items.push({
			key: "format",
			label: filters.format === "BOTTLE" ? "Bottle" : "Refill",
		});
	}
	if (filters.collection) {
		items.push({ key: "collection", label: filters.collection });
	}
	if (filters.stock && filters.stock !== "all") {
		items.push({ key: "stock", label: stockLabels[filters.stock] });
	}
	return items;
}

export function AdminProductsPage() {
	const resultsRef = useRef<HTMLDivElement>(null);
	const { filters, updateFilters, clearFilters, setPage } =
		useAdminProductFilters();
	const collectionsQuery = useCollections();
	const productsQuery = useAdminProducts(filters);
	const products = productsQuery.data?.data ?? [];
	const total = productsQuery.data?.total ?? 0;
	const totalPages = productsQuery.data?.totalPages ?? 0;
	const page = filters.page ?? 1;
	const activeFilters = getActiveFilters(filters);

	useEffect(() => {
		if (totalPages > 0 && page > totalPages) {
			setPage(totalPages);
		}
	}, [page, setPage, totalPages]);

	const collectionOptions = useMemo(() => {
		const collections = collectionsQuery.data ?? [];
		if (
			filters.collection &&
			!collections.some((collection) => collection.slug === filters.collection)
		) {
			return [
				{ slug: filters.collection, name: filters.collection },
				...collections,
			];
		}
		return collections;
	}, [collectionsQuery.data, filters.collection]);

	const handlePageChange = (nextPage: number) => {
		setPage(nextPage);
		const reduceMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		resultsRef.current?.scrollIntoView({
			behavior: reduceMotion ? "auto" : "smooth",
			block: "start",
		});
	};

	const setFilter = (
		key: keyof AdminProductListParams,
		value: string,
	) => updateFilters({ [key]: value });

	return (
		<section className={styles.page}>
			<header className={styles.heading}>
				<div>
					<p className={styles.eyebrow}>Catalogue management</p>
					<h2>Products</h2>
					<p>
						Search the live catalogue, review stock, and control storefront
						visibility.
					</p>
				</div>
				<ButtonLink to="/admin/products/new">
					<Plus aria-hidden="true" />
					Add product
				</ButtonLink>
			</header>

			<div className={styles.controls} ref={resultsRef}>
				<AdminProductSearch
					key={filters.search ?? ""}
					onCommit={(search) =>
						updateFilters({ search }, { replace: true })
					}
					value={filters.search ?? ""}
				/>

				<div className={styles.filters}>
					<label>
						<span>Status</span>
						<Select
							onChange={(event) => setFilter("status", event.target.value)}
							value={filters.status}
						>
							<option value="all">All statuses</option>
							<option value="active">Active</option>
							<option value="inactive">Inactive</option>
							<option value="featured">Featured</option>
							<option value="new">New</option>
							<option value="limited">Limited</option>
						</Select>
					</label>
					<label>
						<span>Family</span>
						<Select
							onChange={(event) => setFilter("family", event.target.value)}
							value={filters.family ?? ""}
						>
							<option value="">All families</option>
							{productFilterOptions.families.map((family) => (
								<option key={family} value={family}>
									{family}
								</option>
							))}
						</Select>
					</label>
					<label>
						<span>Concentration</span>
						<Select
							onChange={(event) =>
								setFilter("concentration", event.target.value)
							}
							value={filters.concentration ?? ""}
						>
							<option value="">All concentrations</option>
							{productFilterOptions.concentrations.map((concentration) => (
								<option key={concentration} value={concentration}>
									{concentration}
								</option>
							))}
						</Select>
					</label>
					<label>
						<span>Format</span>
						<Select
							onChange={(event) => setFilter("format", event.target.value)}
							value={filters.format}
						>
							<option value="all">All formats</option>
							<option value="BOTTLE">Bottle</option>
							<option value="REFILL">Refill</option>
						</Select>
					</label>
					<label>
						<span>Collection</span>
						<Select
							onChange={(event) =>
								setFilter("collection", event.target.value)
							}
							value={filters.collection ?? ""}
						>
							<option value="">All collections</option>
							{collectionOptions.map((collection) => (
								<option key={collection.slug} value={collection.slug}>
									{collection.name}
								</option>
							))}
						</Select>
					</label>
					<label>
						<span>Stock</span>
						<Select
							onChange={(event) => setFilter("stock", event.target.value)}
							value={filters.stock}
						>
							<option value="all">All stock</option>
							<option value="in-stock">In stock</option>
							<option value="low-stock">Low stock</option>
							<option value="out-of-stock">Out of stock</option>
						</Select>
					</label>
				</div>

				<div className={styles.controlFooter}>
					<div aria-live="polite" className={styles.resultCount}>
						<strong>{total}</strong>{" "}
						{total === 1 ? "product" : "products"}
					</div>
					<label className={styles.sort}>
						<span>Sort by</span>
						<Select
							onChange={(event) => setFilter("sort", event.target.value)}
							value={filters.sort}
						>
							{adminSortOptions.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</Select>
					</label>
				</div>

				{activeFilters.length > 0 ? (
					<div className={styles.activeFilters}>
						<span>Active filters</span>
						<div>
							{activeFilters.map((filter) => (
								<button
									aria-label={`Remove ${filter.label} filter`}
									key={filter.key}
									onClick={() => updateFilters({ [filter.key]: "" })}
									type="button"
								>
									{filter.label}
									<X aria-hidden="true" />
								</button>
							))}
						</div>
						<button onClick={clearFilters} type="button">
							Clear filters
						</button>
					</div>
				) : null}
			</div>

			{productsQuery.isLoading ? <ProductListSkeleton /> : null}

			{productsQuery.isError ? (
				<div className={styles.state} role="alert">
					<RefreshCcw aria-hidden="true" />
					<h3>We could not load the product catalogue.</h3>
					<p>Check your connection and try the request again.</p>
					<Button onClick={() => void productsQuery.refetch()}>
						Try again
					</Button>
				</div>
			) : null}

			{!productsQuery.isLoading &&
			!productsQuery.isError &&
			products.length === 0 ? (
				<div className={styles.state}>
					<PackageOpen aria-hidden="true" />
					<h3>
						{activeFilters.length > 0
							? "No products match the selected filters."
							: "No products have been created yet."}
					</h3>
					<p>
						{activeFilters.length > 0
							? "Adjust or clear the filters to review the rest of the catalogue."
							: "Use Add product to open the Part 2B form placeholder."}
					</p>
					{activeFilters.length > 0 ? (
						<Button onClick={clearFilters} variant="secondary">
							Clear filters
						</Button>
					) : (
						<ButtonLink to="/admin/products/new">Add product</ButtonLink>
					)}
				</div>
			) : null}

			{products.length > 0 ? (
				<div
					aria-busy={productsQuery.isFetching}
					aria-live="polite"
					className={styles.results}
				>
					<ProductTable products={products} />
					<ProductCards products={products} />
					<Pagination
						ariaLabel="Admin product pages"
						currentPage={Math.min(page, Math.max(totalPages, 1))}
						onPageChange={handlePageChange}
						totalPages={totalPages}
					/>
				</div>
			) : null}
		</section>
	);
}
