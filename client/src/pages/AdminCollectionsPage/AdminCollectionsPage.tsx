import { Edit3, FolderOpen, Plus, RefreshCcw, Search } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../../components/ui/Button/Button";
import { Input } from "../../components/ui/Input/Input";
import { Modal } from "../../components/ui/Modal/Modal";
import { Pagination } from "../../components/ui/Pagination/Pagination";
import { Select } from "../../components/ui/Select/Select";
import { Skeleton } from "../../components/ui/Skeleton/Skeleton";
import {
	useAdminCollections,
	useCreateAdminCollection,
	useDeleteAdminCollection,
	useUpdateAdminCollection,
} from "../../features/admin/hooks/useAdminCollections";
import { ProductImage } from "../../features/products/components/ProductImage";
import { ApiClientError } from "../../services/apiClient";
import type { AdminCollection } from "../../types/adminCollection";
import type { AdminReferenceStatus } from "../../types/adminNote";
import styles from "../AdminReferencePage/AdminReferencePage.module.scss";

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
	day: "2-digit",
	month: "short",
	year: "numeric",
});

function createSlug(value: string) {
	return value
		.normalize("NFKD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.trim()
		.replace(/['’]/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

function safePage(value: string | null) {
	const page = Number(value);
	return Number.isInteger(page) && page > 0 ? page : 1;
}

function errorMessage(error: unknown) {
	return error instanceof ApiClientError
		? error.message
		: "The collection could not be saved.";
}

export function AdminCollectionsPage() {
	const [searchParams, setSearchParams] = useSearchParams();
	const search = searchParams.get("search") ?? "";
	const statusParam = searchParams.get("status");
	const status: AdminReferenceStatus =
		statusParam === "active" || statusParam === "inactive"
			? statusParam
			: "all";
	const page = safePage(searchParams.get("page"));
	const collectionsQuery = useAdminCollections({
		...(search.length === 0 ? {} : { search }),
		status,
		page,
		limit: 20,
	});
	const createMutation = useCreateAdminCollection();
	const updateMutation = useUpdateAdminCollection();
	const deleteMutation = useDeleteAdminCollection();
	const [editor, setEditor] = useState<AdminCollection | "new" | null>(null);
	const [name, setName] = useState("");
	const [slug, setSlug] = useState("");
	const [description, setDescription] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [isActive, setIsActive] = useState(true);
	const [slugTouched, setSlugTouched] = useState(false);
	const [editorError, setEditorError] = useState<string | null>(null);
	const [deactivateTarget, setDeactivateTarget] =
		useState<AdminCollection | null>(null);
	const [feedback, setFeedback] = useState<string | null>(null);
	const [actionError, setActionError] = useState<string | null>(null);

	const updateParams = (updates: Record<string, string | undefined>) => {
		setSearchParams((current) => {
			const next = new URLSearchParams(current);
			Object.entries(updates).forEach(([key, value]) => {
				if (
					value === undefined ||
					value.length === 0 ||
					(key === "status" && value === "all") ||
					(key === "page" && value === "1")
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

	const openEditor = (collection?: AdminCollection) => {
		setEditor(collection ?? "new");
		setName(collection?.name ?? "");
		setSlug(collection?.slug ?? "");
		setDescription(collection?.description ?? "");
		setImageUrl(collection?.imageUrl ?? "");
		setIsActive(collection?.isActive ?? true);
		setSlugTouched(collection !== undefined);
		setEditorError(null);
		setActionError(null);
	};

	const saveCollection = async (event: FormEvent) => {
		event.preventDefault();
		const normalizedSlug = createSlug(slug);
		if (name.trim().length === 0 || normalizedSlug.length === 0) {
			setEditorError("Collection name and slug are required.");
			return;
		}
		if (description.trim().length === 0) {
			setEditorError("Collection description is required.");
			return;
		}
		if (
			imageUrl.trim().length > 0 &&
			!imageUrl.startsWith("/") &&
			!imageUrl.startsWith("http://") &&
			!imageUrl.startsWith("https://")
		) {
			setEditorError("Use an absolute image URL or root-relative path.");
			return;
		}

		const input = {
			name: name.trim(),
			slug: normalizedSlug,
			description: description.trim(),
			imageUrl: imageUrl.trim().length === 0 ? null : imageUrl.trim(),
			isActive,
		};

		try {
			if (editor === "new") {
				await createMutation.mutateAsync(input);
				setFeedback("Collection created.");
			} else if (editor !== null) {
				await updateMutation.mutateAsync({ id: editor.id, input });
				setFeedback("Collection updated.");
			}
			setEditor(null);
			setActionError(null);
		} catch (error) {
			setEditorError(errorMessage(error));
		}
	};

	const setCollectionActive = async (
		collection: AdminCollection,
		nextActive: boolean,
	) => {
		try {
			await updateMutation.mutateAsync({
				id: collection.id,
				input: { isActive: nextActive },
			});
			setFeedback(nextActive ? "Collection activated." : "Collection updated.");
			setActionError(null);
		} catch (error) {
			setActionError(errorMessage(error));
		}
	};

	const deactivateCollection = async () => {
		if (deactivateTarget === null) return;
		try {
			await deleteMutation.mutateAsync(deactivateTarget.id);
			setFeedback("Collection deactivated.");
			setDeactivateTarget(null);
			setActionError(null);
		} catch (error) {
			setActionError(errorMessage(error));
		}
	};

	const collections = collectionsQuery.data?.data ?? [];

	return (
		<section className={styles.page}>
			<header className={styles.heading}>
				<div>
					<p>Product reference data</p>
					<h2>Collections</h2>
					<span>
						Manage the curated catalogue groupings available to products and
						the storefront.
					</span>
				</div>
				<Button onClick={() => openEditor()}>
					<Plus aria-hidden="true" />
					Add collection
				</Button>
			</header>

			{feedback === null ? null : (
				<p className={styles.feedback} role="status">
					{feedback}
				</p>
			)}
			{actionError === null ? null : (
				<p className={styles.error} role="alert">
					{actionError}
				</p>
			)}

			<div className={styles.toolbar}>
				<form
					className={styles.search}
					onSubmit={(event) => {
						event.preventDefault();
						const data = new FormData(event.currentTarget);
						updateParams({
							search: String(data.get("search") ?? "").trim(),
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
						placeholder="Search name or slug"
					/>
					<Button size="sm" type="submit" variant="secondary">
						Search
					</Button>
				</form>
				<label>
					<span>Status</span>
					<Select
						aria-label="Filter collections by status"
						onChange={(event) =>
							updateParams({ status: event.target.value })
						}
						value={status}
					>
						<option value="all">All statuses</option>
						<option value="active">Active</option>
						<option value="inactive">Inactive</option>
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
					<p>Check the connection and try this request again.</p>
					<Button
						onClick={() => void collectionsQuery.refetch()}
						variant="secondary"
					>
						Try again
					</Button>
				</div>
			) : null}

			{!collectionsQuery.isLoading &&
			!collectionsQuery.isError &&
			collections.length === 0 ? (
				<div className={styles.state}>
					<FolderOpen aria-hidden="true" />
					<h3>
						{search.length > 0 || status !== "all"
							? "No collections match these filters"
							: "No collections yet"}
					</h3>
					<p>
						{search.length > 0 || status !== "all"
							? "Adjust the search or status filter."
							: "Create the first reusable product collection."}
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
									<th scope="col">Updated</th>
									<th scope="col">Actions</th>
								</tr>
							</thead>
							<tbody>
								{collections.map((collection) => (
									<tr key={collection.id}>
										<td>
											<div className={styles.collectionName}>
												<ProductImage
													alt=""
													src={
														collection.imageUrl ??
														"/images/placeholders/product_placeholder.png"
													}
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
													collection.isActive
														? styles.active
														: styles.inactive,
												].join(" ")}
											>
												{collection.isActive ? "Active" : "Inactive"}
											</span>
										</td>
										<td>{collection.productCount}</td>
										<td>
											{dateFormatter.format(new Date(collection.updatedAt))}
										</td>
										<td>
											<div className={styles.rowActions}>
												<button
													onClick={() => openEditor(collection)}
													type="button"
												>
													<Edit3 aria-hidden="true" />
													Edit
												</button>
												{collection.isActive ? (
													<button
														onClick={() =>
															setDeactivateTarget(collection)
														}
														type="button"
													>
														Deactivate
													</button>
												) : (
													<button
														onClick={() =>
															void setCollectionActive(collection, true)
														}
														type="button"
													>
														Activate
													</button>
												)}
											</div>
										</td>
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
										<ProductImage
											alt=""
											src={
												collection.imageUrl ??
												"/images/placeholders/product_placeholder.png"
											}
										/>
										<span>
											<strong>{collection.name}</strong>
											<small>{collection.slug}</small>
										</span>
									</div>
									<span
										className={[
											styles.status,
											collection.isActive
												? styles.active
												: styles.inactive,
										].join(" ")}
									>
										{collection.isActive ? "Active" : "Inactive"}
									</span>
								</header>
								<dl>
									<div>
										<dt>Products</dt>
										<dd>{collection.productCount}</dd>
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
								<div className={styles.rowActions}>
									<button
										onClick={() => openEditor(collection)}
										type="button"
									>
										<Edit3 aria-hidden="true" />
										Edit
									</button>
									{collection.isActive ? (
										<button
											onClick={() => setDeactivateTarget(collection)}
											type="button"
										>
											Deactivate
										</button>
									) : (
										<button
											onClick={() =>
												void setCollectionActive(collection, true)
											}
											type="button"
										>
											Activate
										</button>
									)}
								</div>
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
				description="Collections group products across the admin and storefront."
				footer={
					<>
						<Button onClick={() => setEditor(null)} variant="secondary">
							Cancel
						</Button>
						<Button
							disabled={
								createMutation.isPending || updateMutation.isPending
							}
							form="admin-collection-form"
							type="submit"
						>
							{createMutation.isPending || updateMutation.isPending
								? "Saving…"
								: "Save collection"}
						</Button>
					</>
				}
				isOpen={editor !== null}
				onClose={() => setEditor(null)}
				title={editor === "new" ? "Add collection" : "Edit collection"}
			>
				<form
					className={styles.editorForm}
					id="admin-collection-form"
					onSubmit={(event) => void saveCollection(event)}
				>
					<div className={styles.editorGrid}>
						<label>
							<span>Name</span>
							<Input
								autoFocus
								maxLength={160}
								onChange={(event) => {
									setName(event.target.value);
									if (!slugTouched) setSlug(createSlug(event.target.value));
								}}
								value={name}
							/>
						</label>
						<label>
							<span>Slug</span>
							<Input
								maxLength={120}
								onChange={(event) => {
									setSlugTouched(true);
									setSlug(event.target.value);
								}}
								value={slug}
							/>
						</label>
					</div>
					<label>
						<span>Description</span>
						<textarea
							maxLength={2_000}
							onChange={(event) => setDescription(event.target.value)}
							rows={5}
							value={description}
						/>
					</label>
					<label>
						<span>Image URL or path</span>
						<Input
							maxLength={2_000}
							onChange={(event) => setImageUrl(event.target.value)}
							placeholder="/images/collections/summer.webp"
							value={imageUrl}
						/>
					</label>
					{imageUrl.length > 0 ? (
						<ProductImage
							alt="Collection image preview"
							className={styles.imagePreview}
							src={imageUrl}
						/>
					) : null}
					<label className={styles.check}>
						<input
							checked={isActive}
							onChange={(event) => setIsActive(event.target.checked)}
							type="checkbox"
						/>
						<span>Available for new product selections</span>
					</label>
					{editorError === null ? null : (
						<p className={styles.error} role="alert">
							{editorError}
						</p>
					)}
				</form>
			</Modal>

			<Modal
				description="Existing product relations will remain intact."
				footer={
					<>
						<Button
							onClick={() => setDeactivateTarget(null)}
							variant="secondary"
						>
							Cancel
						</Button>
						<Button
							disabled={deleteMutation.isPending}
							onClick={() => void deactivateCollection()}
						>
							{deleteMutation.isPending
								? "Deactivating…"
								: "Deactivate collection"}
						</Button>
					</>
				}
				isOpen={deactivateTarget !== null}
				onClose={() => setDeactivateTarget(null)}
				title="Deactivate collection?"
			>
				<>
					<p>
						{deactivateTarget?.name} will be hidden from new product
						selections and public collection listings.
					</p>
					{actionError === null ? null : (
						<p className={styles.error} role="alert">
							{actionError}
						</p>
					)}
				</>
			</Modal>
		</section>
	);
}
