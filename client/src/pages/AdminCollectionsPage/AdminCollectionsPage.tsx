import {
	Archive,
	Edit3,
	Eye,
	FolderOpen,
	Plus,
	RefreshCcw,
	Search,
} from "lucide-react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button, ButtonLink } from "../../components/ui/Button/Button";
import { Input } from "../../components/ui/Input/Input";
import { Modal } from "../../components/ui/Modal/Modal";
import { Pagination } from "../../components/ui/Pagination/Pagination";
import { Select } from "../../components/ui/Select/Select";
import { Skeleton } from "../../components/ui/Skeleton/Skeleton";
import {
	useAdminCollections,
	useDeleteAdminCollection,
	useUpdateAdminCollection,
} from "../../features/admin/hooks/useAdminCollections";
import { CollectionImage } from "../../features/collections/components/CollectionImage";
import { getCollectionImageSrc } from "../../features/collections/data/collectionImages";
import type {
	AdminCollectionFeaturedFilter,
	AdminCollectionListItem,
	AdminCollectionSort,
	AdminCollectionStatusFilter,
} from "../../types/adminCollection";
import styles from "./AdminCollectionsPage.module.scss";

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
	day: "2-digit",
	month: "short",
	year: "numeric",
});

function safePage(value: string | null) {
	const parsed = Number(value);
	return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

function statusLabel(status: AdminCollectionListItem["status"]) {
	return status.charAt(0) + status.slice(1).toLowerCase();
}

export function AdminCollectionsPage() {
	const [searchParams, setSearchParams] = useSearchParams();
	const search = searchParams.get("search") ?? "";
	const statusValue = searchParams.get("status");
	const featuredValue = searchParams.get("featured");
	const sortValue = searchParams.get("sort");
	const status: AdminCollectionStatusFilter =
		statusValue === "DRAFT" ||
		statusValue === "PUBLISHED" ||
		statusValue === "ARCHIVED"
			? statusValue
			: "all";
	const featured: AdminCollectionFeaturedFilter =
		featuredValue === "true" || featuredValue === "false"
			? featuredValue
			: "all";
	const sort: AdminCollectionSort =
		sortValue === "oldest" ||
		sortValue === "name-asc" ||
		sortValue === "name-desc" ||
		sortValue === "sort-order"
			? sortValue
			: "newest";
	const page = safePage(searchParams.get("page"));
	const collectionsQuery = useAdminCollections({
		...(search ? { search } : {}),
		status,
		featured,
		sort,
		page,
		limit: 20,
	});
	const updateMutation = useUpdateAdminCollection();
	const archiveMutation = useDeleteAdminCollection();
	const [archiveTarget, setArchiveTarget] =
		useState<AdminCollectionListItem | null>(null);
	const [feedback, setFeedback] = useState<string | null>(null);
	const [actionError, setActionError] = useState<string | null>(null);
	const collections = collectionsQuery.data?.data ?? [];

	const updateParams = (updates: Record<string, string | undefined>) => {
		setSearchParams((current) => {
			const next = new URLSearchParams(current);
			Object.entries(updates).forEach(([key, value]) => {
				if (
					!value ||
					(key === "page" && value === "1") ||
					(key === "status" && value === "all") ||
					(key === "featured" && value === "all") ||
					(key === "sort" && value === "newest")
				) {
					next.delete(key);
				} else {
					next.set(key, value);
				}
			});
			if (!("page" in updates)) next.delete("page");
			return next;
		});
	};

	const togglePublishing = async (collection: AdminCollectionListItem) => {
		try {
			const nextStatus =
				collection.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
			await updateMutation.mutateAsync({
				id: collection.id,
				input: { status: nextStatus },
			});
			setFeedback(
				nextStatus === "PUBLISHED"
					? `${collection.name} published.`
					: `${collection.name} returned to draft.`,
			);
			setActionError(null);
		} catch (error) {
			setActionError(
				error instanceof Error
					? error.message
					: "The publishing status could not be changed.",
			);
		}
	};

	const archiveCollection = async () => {
		if (!archiveTarget) return;
		try {
			await archiveMutation.mutateAsync(archiveTarget.id);
			setFeedback(`${archiveTarget.name} archived.`);
			setArchiveTarget(null);
			setActionError(null);
		} catch (error) {
			setActionError(
				error instanceof Error
					? error.message
					: "The collection could not be archived.",
			);
		}
	};

	const actionsFor = (collection: AdminCollectionListItem) => (
		<div className={styles.rowActions}>
			<Link to={`/admin/collections/${collection.id}/edit`}>
				<Edit3 aria-hidden="true" />
				Edit
			</Link>
			{collection.status === "PUBLISHED" ? (
				<Link
					rel="noreferrer"
					target="_blank"
					to={`/collections/${collection.slug}`}
				>
					<Eye aria-hidden="true" />
					Preview
				</Link>
			) : null}
			{collection.status !== "ARCHIVED" ? (
				<button
					disabled={updateMutation.isPending}
					onClick={() => void togglePublishing(collection)}
					type="button"
				>
					{collection.status === "PUBLISHED" ? "Unpublish" : "Publish"}
				</button>
			) : null}
			{collection.status !== "ARCHIVED" ? (
				<button onClick={() => setArchiveTarget(collection)} type="button">
					<Archive aria-hidden="true" />
					Archive
				</button>
			) : null}
		</div>
	);

	return (
		<section className={styles.page}>
			<header className={styles.heading}>
				<div>
					<p>Storefront curation</p>
					<h2>Collections</h2>
					<span>
						Create editorial worlds, arrange their fragrances and control
						storefront visibility.
					</span>
				</div>
				<ButtonLink to="/admin/collections/new">
					<Plus aria-hidden="true" />
					Create collection
				</ButtonLink>
			</header>

			{feedback ? (
				<p className={styles.feedback} role="status">
					{feedback}
				</p>
			) : null}
			{actionError ? (
				<p className={styles.error} role="alert">
					{actionError}
				</p>
			) : null}

			<div className={styles.toolbar}>
				<form
					className={styles.search}
					onSubmit={(event) => {
						event.preventDefault();
						const formData = new FormData(event.currentTarget);
						updateParams({
							search: String(formData.get("search") ?? "").trim(),
						});
					}}
					role="search"
				>
					<Search aria-hidden="true" />
					<Input
						aria-label="Search collections"
						defaultValue={search}
						key={search}
						name="search"
						placeholder="Search name, slug or story"
						type="search"
					/>
					<Button size="sm" type="submit" variant="secondary">
						Search
					</Button>
				</form>
				<label>
					<span>Status</span>
					<Select
						onChange={(event) =>
							updateParams({ status: event.target.value })
						}
						value={status}
					>
						<option value="all">All statuses</option>
						<option value="DRAFT">Draft</option>
						<option value="PUBLISHED">Published</option>
						<option value="ARCHIVED">Archived</option>
					</Select>
				</label>
				<label>
					<span>Featured</span>
					<Select
						onChange={(event) =>
							updateParams({ featured: event.target.value })
						}
						value={featured}
					>
						<option value="all">All collections</option>
						<option value="true">Featured only</option>
						<option value="false">Not featured</option>
					</Select>
				</label>
				<label>
					<span>Sort</span>
					<Select
						onChange={(event) =>
							updateParams({ sort: event.target.value })
						}
						value={sort}
					>
						<option value="newest">Newest</option>
						<option value="oldest">Oldest</option>
						<option value="name-asc">Name A–Z</option>
						<option value="name-desc">Name Z–A</option>
						<option value="sort-order">Collection order</option>
					</Select>
				</label>
			</div>

			{collectionsQuery.isLoading ? (
				<div
					aria-label="Loading collections"
					className={styles.loading}
					role="status"
				>
					{Array.from({ length: 5 }, (_, index) => (
						<Skeleton key={index} />
					))}
				</div>
			) : null}

			{collectionsQuery.isError ? (
				<div className={styles.state} role="alert">
					<RefreshCcw aria-hidden="true" />
					<h3>Collections could not be loaded</h3>
					<p>Check the connection and try again.</p>
					<Button
						onClick={() => void collectionsQuery.refetch()}
						variant="secondary"
					>
						Try again
					</Button>
				</div>
			) : null}

			{collectionsQuery.isSuccess && collections.length === 0 ? (
				<div className={styles.state}>
					<FolderOpen aria-hidden="true" />
					<h3>
						{search || status !== "all" || featured !== "all"
							? "No collections match these filters"
							: "No collections have been created yet"}
					</h3>
					<p>
						{search || status !== "all" || featured !== "all"
							? "Adjust the search or filters."
							: "Create the first editorial storefront collection."}
					</p>
				</div>
			) : null}

			{collections.length > 0 ? (
				<>
					<div className={styles.tableWrap}>
						<table>
							<thead>
								<tr>
									<th scope="col">Collection</th>
									<th scope="col">Status</th>
									<th scope="col">Products</th>
									<th scope="col">Featured</th>
									<th scope="col">Order</th>
									<th scope="col">Updated</th>
									<th scope="col">Actions</th>
								</tr>
							</thead>
							<tbody>
								{collections.map((collection) => (
									<tr key={collection.id}>
										<td>
											<div className={styles.collectionName}>
												<CollectionImage
													alt=""
												src={getCollectionImageSrc(collection.slug)}
												/>
												<span>
													<strong>{collection.name}</strong>
													<small>{collection.slug}</small>
												</span>
											</div>
										</td>
										<td>
											<span
												className={[
													styles.status,
													styles[collection.status.toLowerCase()],
												].join(" ")}
											>
												{statusLabel(collection.status)}
											</span>
										</td>
										<td>{collection.productCount}</td>
										<td>{collection.isFeatured ? "Yes" : "No"}</td>
										<td>{collection.sortOrder}</td>
										<td>
											{dateFormatter.format(new Date(collection.updatedAt))}
										</td>
										<td>{actionsFor(collection)}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					<div className={styles.cards}>
						{collections.map((collection) => (
							<article key={collection.id}>
								<header>
									<div className={styles.collectionName}>
										<CollectionImage
											alt=""
											src={getCollectionImageSrc(collection.slug)}
										/>
										<span>
											<strong>{collection.name}</strong>
											<small>{collection.slug}</small>
										</span>
									</div>
									<span
										className={[
											styles.status,
											styles[collection.status.toLowerCase()],
										].join(" ")}
									>
										{statusLabel(collection.status)}
									</span>
								</header>
								<dl>
									<div>
										<dt>Products</dt>
										<dd>{collection.productCount}</dd>
									</div>
									<div>
										<dt>Featured</dt>
										<dd>{collection.isFeatured ? "Yes" : "No"}</dd>
									</div>
									<div>
										<dt>Order</dt>
										<dd>{collection.sortOrder}</dd>
									</div>
									<div>
										<dt>Updated</dt>
										<dd>
											{dateFormatter.format(
												new Date(collection.updatedAt),
											)}
										</dd>
									</div>
								</dl>
								{actionsFor(collection)}
							</article>
						))}
					</div>

					<Pagination
						ariaLabel="Collection pages"
						currentPage={collectionsQuery.data?.page ?? page}
						onPageChange={(nextPage) =>
							updateParams({ page: String(nextPage) })
						}
						totalPages={collectionsQuery.data?.totalPages ?? 1}
					/>
				</>
			) : null}

			<Modal
				description="Archiving removes this collection from the storefront without deleting products or assignments."
				footer={
					<>
						<Button
							onClick={() => setArchiveTarget(null)}
							variant="secondary"
						>
							Cancel
						</Button>
						<Button
							disabled={archiveMutation.isPending}
							onClick={() => void archiveCollection()}
						>
							{archiveMutation.isPending
								? "Archiving…"
								: "Archive collection"}
						</Button>
					</>
				}
				isOpen={archiveTarget !== null}
				onClose={() => setArchiveTarget(null)}
				title="Archive this collection?"
			>
				<p>
					<strong>{archiveTarget?.name}</strong> will no longer be public.
					Product records will remain unchanged.
				</p>
			</Modal>
		</section>
	);
}
