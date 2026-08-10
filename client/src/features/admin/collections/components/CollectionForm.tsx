import { zodResolver } from "@hookform/resolvers/zod";
import {
	ArrowDown,
	ArrowUp,
	Eye,
	ImagePlus,
	Plus,
	Search,
	Trash2,
} from "lucide-react";
import {
	useDeferredValue,
	useEffect,
	useMemo,
	useState,
	type ChangeEvent,
} from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button, ButtonLink } from "../../../../components/ui/Button/Button";
import { Input } from "../../../../components/ui/Input/Input";
import { Modal } from "../../../../components/ui/Modal/Modal";
import { Select } from "../../../../components/ui/Select/Select";
import { CollectionImage } from "../../../collections/components/CollectionImage";
import { ProductImage } from "../../../products/components/ProductImage";
import { useAdminProducts } from "../../hooks/useAdminProducts";
import { useUploadAdminCollectionImages } from "../../hooks/useAdminUploads";
import type {
	AdminCollection,
	AdminCollectionProduct,
} from "../../../../types/adminCollection";
import type { AdminProductListItem } from "../../../../types/adminProduct";
import {
	adminCollectionFormSchema,
	createCollectionSlug,
	type AdminCollectionFormValues,
} from "../schemas/adminCollectionFormSchema";
import styles from "./CollectionForm.module.scss";

type CollectionFormProps = {
	initialCollection?: AdminCollection;
	isSaving: boolean;
	onSubmit: (values: AdminCollectionFormValues) => Promise<void>;
};

type ImageFieldName =
	| "cardImageUrl"
	| "heroImageUrl"
	| "mobileImageUrl";

function productFromListItem(
	product: AdminProductListItem,
	sortOrder: number,
): AdminCollectionProduct {
	return {
		id: product.id,
		name: product.name,
		slug: product.slug,
		sku: null,
		image: product.primaryImage,
		isActive: product.isActive,
		sortOrder,
	};
}

function FieldError({
	id,
	message,
}: {
	id: string;
	message?: string;
}) {
	return message ? (
		<span className={styles.fieldError} id={id} role="alert">
			{message}
		</span>
	) : null;
}

export function CollectionForm({
	initialCollection,
	isSaving,
	onSubmit,
}: CollectionFormProps) {
	const defaultValues: AdminCollectionFormValues = {
		name: initialCollection?.name ?? "",
		slug: initialCollection?.slug ?? "",
		eyebrow: initialCollection?.eyebrow ?? "",
		shortDescription: initialCollection?.shortDescription ?? "",
		description: initialCollection?.description ?? "",
		heroImageUrl: initialCollection?.heroImageUrl ?? "",
		cardImageUrl: initialCollection?.cardImageUrl ?? "",
		mobileImageUrl: initialCollection?.mobileImageUrl ?? "",
		accentColor: initialCollection?.accentColor ?? "#727052",
		status: initialCollection?.status ?? "DRAFT",
		isFeatured: initialCollection?.isFeatured ?? false,
		sortOrder: initialCollection?.sortOrder ?? 0,
		seoTitle: initialCollection?.seoTitle ?? "",
		seoDescription: initialCollection?.seoDescription ?? "",
		storyHeadline: initialCollection?.storyHeadline ?? "",
		storyBody: initialCollection?.storyBody ?? "",
		storyImageUrl: initialCollection?.storyImageUrl ?? "",
		materialNotes: initialCollection?.materialNotes.join(", ") ?? "",
		campaignLabel: initialCollection?.campaignLabel ?? "",
		productIds: initialCollection?.productIds ?? [],
	};
	const form = useForm<AdminCollectionFormValues>({
		defaultValues,
		resolver: zodResolver(adminCollectionFormSchema),
	});
	const {
		formState: { errors, isDirty },
		handleSubmit,
		register,
		setError,
		setValue,
	} = form;
	const values = useWatch({ control: form.control });
	const [slugTouched, setSlugTouched] = useState(Boolean(initialCollection));
	const [productSearch, setProductSearch] = useState("");
	const deferredProductSearch = useDeferredValue(productSearch.trim());
	const productsQuery = useAdminProducts({
		...(deferredProductSearch
			? { search: deferredProductSearch }
			: {}),
		status: "all",
		sort: "name-asc",
		page: 1,
		limit: 50,
	});
	const uploadMutation = useUploadAdminCollectionImages();
	const [uploadField, setUploadField] = useState<ImageFieldName | null>(null);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [uploadMessage, setUploadMessage] = useState<string | null>(null);
	const [knownProducts, setKnownProducts] = useState<
		Map<string, AdminCollectionProduct>
	>(
		() =>
			new Map(
				(initialCollection?.products ?? []).map((product) => [
					product.id,
					product,
				]),
			),
	);
	const [pendingSlugChange, setPendingSlugChange] =
		useState<AdminCollectionFormValues | null>(null);
	const productIds = useMemo(
		() => values.productIds ?? [],
		[values.productIds],
	);
	const availableProducts = productsQuery.data?.data ?? [];
	const selectedProducts = productIds
		.map((id) => knownProducts.get(id))
		.filter((product): product is AdminCollectionProduct => Boolean(product));

	useEffect(() => {
		const handleBeforeUnload = (event: BeforeUnloadEvent) => {
			if (!isDirty || isSaving) return;
			event.preventDefault();
		};
		window.addEventListener("beforeunload", handleBeforeUnload);
		return () => window.removeEventListener("beforeunload", handleBeforeUnload);
	}, [isDirty, isSaving]);

	const productLookup = useMemo(
		() => new Set(productIds),
		[productIds],
	);

	const setProductIds = (nextIds: string[]) => {
		setValue("productIds", nextIds, {
			shouldDirty: true,
			shouldValidate: true,
		});
	};

	const addProduct = (product: AdminProductListItem) => {
		if (productLookup.has(product.id)) return;
		setKnownProducts((current) => {
			const next = new Map(current);
			next.set(product.id, productFromListItem(product, productIds.length));
			return next;
		});
		setProductIds([...productIds, product.id]);
	};

	const removeProduct = (productId: string) => {
		setProductIds(productIds.filter((id) => id !== productId));
	};

	const moveProduct = (index: number, direction: -1 | 1) => {
		const target = index + direction;
		if (target < 0 || target >= productIds.length) return;
		const next = [...productIds];
		[next[index], next[target]] = [next[target]!, next[index]!];
		setProductIds(next);
	};

	const uploadImage = async (
		field: ImageFieldName,
		event: ChangeEvent<HTMLInputElement>,
	) => {
		const file = event.target.files?.[0];
		event.target.value = "";
		if (!file) return;

		setUploadField(field);
		setUploadProgress(0);
		setUploadMessage(null);
		try {
			const response = await uploadMutation.mutateAsync({
				files: [file],
				onProgress: setUploadProgress,
			});
			const image = response.data[0];
			if (!image) throw new Error("Image upload returned no file");
			setValue(field, image.url, {
				shouldDirty: true,
				shouldValidate: true,
			});
			setUploadMessage("Image uploaded. Save the collection to keep this change.");
		} catch {
			setUploadMessage("The image could not be uploaded. Try another file.");
		} finally {
			setUploadField(null);
		}
	};

	const persistValues = async (submittedValues: AdminCollectionFormValues) => {
		try {
			await onSubmit(submittedValues);
		} catch (error) {
			setError("root.server", {
				message:
					error instanceof Error
						? error.message
						: "The collection could not be saved.",
			});
		}
	};

	const submitValues = async (submittedValues: AdminCollectionFormValues) => {
		const normalized = {
			...submittedValues,
			slug: createCollectionSlug(submittedValues.slug),
		};
		if (
			initialCollection?.status === "PUBLISHED" &&
			normalized.slug !== initialCollection.slug
		) {
			setPendingSlugChange(normalized);
			return;
		}
		await persistValues(normalized);
	};

	const saveWithStatus = (status: "DRAFT" | "PUBLISHED") => {
		setValue("status", status, { shouldDirty: true, shouldValidate: true });
		void handleSubmit(submitValues)();
	};

	const nameRegistration = register("name");
	const slugRegistration = register("slug");

	const renderImageField = (
		field: ImageFieldName,
		label: string,
		description: string,
	) => {
		const error = errors[field]?.message;
		const currentUrl = values[field] ?? "";
		const errorId = `${field}-error`;
		return (
			<article className={styles.imageField}>
				<div className={styles.imagePreview}>
					<CollectionImage
						alt={currentUrl ? `${label} preview` : ""}
						src={currentUrl || null}
					/>
				</div>
				<div>
					<label htmlFor={field}>{label}</label>
					<p>{description}</p>
					<Input
						aria-describedby={error ? errorId : undefined}
						aria-invalid={Boolean(error)}
						id={field}
						placeholder="/uploads/products/managed-image.webp"
						{...register(field)}
					/>
					<FieldError id={errorId} message={error} />
					<div className={styles.imageActions}>
						<label className={styles.uploadButton}>
							<ImagePlus aria-hidden="true" />
							{uploadField === field
								? `Uploading ${uploadProgress}%`
								: "Upload image"}
							<input
								accept="image/jpeg,image/png,image/webp"
								disabled={uploadMutation.isPending}
								onChange={(event) => void uploadImage(field, event)}
								type="file"
							/>
						</label>
						{currentUrl ? (
							<button
								onClick={() =>
									setValue(field, "", {
										shouldDirty: true,
										shouldValidate: true,
									})
								}
								type="button"
							>
								<Trash2 aria-hidden="true" />
								Remove
							</button>
						) : null}
					</div>
				</div>
			</article>
		);
	};

	return (
		<>
			<form
				className={styles.form}
				noValidate
				onSubmit={handleSubmit(submitValues)}
			>
				{errors.root?.server?.message ? (
					<p className={styles.formError} role="alert">
						{errors.root.server.message}
					</p>
				) : null}

				<section aria-labelledby="collection-basics-title" className={styles.section}>
					<header>
						<p>Identity</p>
						<h2 id="collection-basics-title">Basic information</h2>
					</header>
					<div className={styles.fields}>
						<label className={styles.field}>
							<span>Name</span>
							<Input
								aria-describedby={
									errors.name ? "collection-name-error" : undefined
								}
								aria-invalid={Boolean(errors.name)}
								{...nameRegistration}
								onChange={(event) => {
									nameRegistration.onChange(event);
									if (!slugTouched) {
										setValue("slug", createCollectionSlug(event.target.value), {
											shouldDirty: true,
											shouldValidate: true,
										});
									}
								}}
							/>
							<FieldError
								id="collection-name-error"
								message={errors.name?.message}
							/>
						</label>
						<label className={styles.field}>
							<span>Slug</span>
							<Input
								aria-describedby={
									errors.slug ? "collection-slug-error" : undefined
								}
								aria-invalid={Boolean(errors.slug)}
								{...slugRegistration}
								onChange={(event) => {
									setSlugTouched(true);
									slugRegistration.onChange(event);
								}}
							/>
							<FieldError
								id="collection-slug-error"
								message={errors.slug?.message}
							/>
						</label>
						<label className={styles.field}>
							<span>Eyebrow</span>
							<Input
								placeholder="New collection"
								{...register("eyebrow")}
							/>
						</label>
						<label className={styles.field}>
							<span>Accent color</span>
							<div className={styles.colorField}>
								<input
									aria-label="Choose accent color"
									type="color"
									value={values.accentColor || "#727052"}
									onChange={(event) =>
										setValue("accentColor", event.target.value, {
											shouldDirty: true,
											shouldValidate: true,
										})
									}
								/>
								<Input {...register("accentColor")} />
							</div>
							<FieldError
								id="collection-accent-error"
								message={errors.accentColor?.message}
							/>
						</label>
						<label className={[styles.field, styles.full].join(" ")}>
							<span>Short description</span>
							<textarea
								aria-describedby={
									errors.shortDescription
										? "collection-short-description-error"
										: undefined
								}
								aria-invalid={Boolean(errors.shortDescription)}
								rows={3}
								{...register("shortDescription")}
							/>
							<FieldError
								id="collection-short-description-error"
								message={errors.shortDescription?.message}
							/>
						</label>
					</div>
				</section>

				<section aria-labelledby="collection-story-form-title" className={styles.section}>
					<header>
						<p>Editorial</p>
						<h2 id="collection-story-form-title">Collection story</h2>
					</header>
					<label className={styles.field}>
						<span>Full description</span>
						<textarea
							aria-describedby={
								errors.description
									? "collection-description-error"
									: undefined
							}
							aria-invalid={Boolean(errors.description)}
							rows={9}
							{...register("description")}
						/>
						<FieldError
							id="collection-description-error"
							message={errors.description?.message}
						/>
					</label>
					<div className={styles.fields}>
						<label className={styles.field}><span>Story headline</span><Input {...register("storyHeadline")} /></label>
						<label className={styles.field}><span>Campaign label</span><Input {...register("campaignLabel")} placeholder="e.g. blue-hour-2026" /></label>
						<label className={[styles.field, styles.full].join(" ")}><span>Extended story</span><textarea rows={8} {...register("storyBody")} /></label>
						<label className={styles.field}><span>Story image URL</span><Input {...register("storyImageUrl")} /></label>
						<label className={styles.field}><span>Material notes (comma separated)</span><Input {...register("materialNotes")} /></label>
					</div>
				</section>

				<section aria-labelledby="collection-images-title" className={styles.section}>
					<header>
						<p>Managed uploads or public paths</p>
						<h2 id="collection-images-title">Images</h2>
					</header>
					{uploadMessage ? (
						<p
							className={styles.uploadMessage}
							role={uploadMessage.startsWith("The image") ? "alert" : "status"}
						>
							{uploadMessage}
						</p>
					) : null}
					<div className={styles.imageFields}>
						{renderImageField(
							"cardImageUrl",
							"Card image",
							"Used in the collection grid. A 4:3 crop works best.",
						)}
						{renderImageField(
							"heroImageUrl",
							"Hero image",
							"Used across the collection detail hero.",
						)}
						{renderImageField(
							"mobileImageUrl",
							"Mobile hero image",
							"Optional alternate crop for small screens.",
						)}
					</div>
				</section>

				<section aria-labelledby="collection-products-form-title" className={styles.section}>
					<header>
						<p>Assignment and order</p>
						<h2 id="collection-products-form-title">Products</h2>
					</header>
					<div className={styles.productPicker}>
						<div className={styles.productSearch}>
							<label htmlFor="collection-product-search">Find products</label>
							<div>
								<Search aria-hidden="true" />
								<Input
									id="collection-product-search"
									onChange={(event) => setProductSearch(event.target.value)}
									placeholder="Search name, slug or SKU"
									type="search"
									value={productSearch}
								/>
							</div>
							<div
								aria-busy={productsQuery.isLoading}
								aria-label="Available products"
								className={styles.productResults}
							>
								{productsQuery.isError ? (
									<p role="alert">Products could not be loaded.</p>
								) : null}
								{availableProducts.map((product) => (
									<article key={product.id}>
										<ProductImage
											alt=""
											src={
												product.primaryImage?.url ??
												"/images/placeholders/product_placeholder.png"
											}
										/>
										<span>
											<strong>{product.name}</strong>
											<small>
												{product.slug} ·{" "}
												{product.isActive ? "Active" : "Inactive"}
											</small>
										</span>
										<Button
											aria-label={`Add ${product.name} to collection`}
											disabled={productLookup.has(product.id)}
											onClick={() => addProduct(product)}
											size="sm"
											variant="secondary"
										>
											<Plus aria-hidden="true" />
											{productLookup.has(product.id) ? "Added" : "Add"}
										</Button>
									</article>
								))}
							</div>
						</div>

						<div className={styles.selectedProducts}>
							<h3>Selected products ({selectedProducts.length})</h3>
							{selectedProducts.length === 0 ? (
								<p>No products selected yet.</p>
							) : (
								selectedProducts.map((product, index) => (
									<article key={product.id}>
										<span className={styles.order}>{index + 1}</span>
										<ProductImage
											alt=""
											src={
												product.image?.url ??
												"/images/placeholders/product_placeholder.png"
											}
										/>
										<span>
											<strong>{product.name}</strong>
											<small>
												{product.sku ?? product.slug} ·{" "}
												{product.isActive ? "Active" : "Inactive"}
											</small>
										</span>
										<div>
											<button
												aria-label={`Move ${product.name} up`}
												disabled={index === 0}
												onClick={() => moveProduct(index, -1)}
												type="button"
											>
												<ArrowUp aria-hidden="true" />
											</button>
											<button
												aria-label={`Move ${product.name} down`}
												disabled={index === selectedProducts.length - 1}
												onClick={() => moveProduct(index, 1)}
												type="button"
											>
												<ArrowDown aria-hidden="true" />
											</button>
											<button
												aria-label={`Remove ${product.name} from collection`}
												onClick={() => removeProduct(product.id)}
												type="button"
											>
												<Trash2 aria-hidden="true" />
											</button>
										</div>
									</article>
								))
							)}
							<FieldError
								id="collection-products-error"
								message={errors.productIds?.message}
							/>
						</div>
					</div>
				</section>

				<section aria-labelledby="collection-publishing-title" className={styles.section}>
					<header>
						<p>Visibility</p>
						<h2 id="collection-publishing-title">Publishing</h2>
					</header>
					<div className={styles.fields}>
						<label className={styles.field}>
							<span>Status</span>
							<Select {...register("status")}>
								<option value="DRAFT">Draft</option>
								<option value="PUBLISHED">Published</option>
								<option value="ARCHIVED">Archived</option>
							</Select>
						</label>
						<label className={styles.field}>
							<span>Sort order</span>
							<Input
								type="number"
								{...register("sortOrder", { valueAsNumber: true })}
							/>
						</label>
						<label className={styles.checkbox}>
							<input type="checkbox" {...register("isFeatured")} />
							<span>
								<strong>Featured collection</strong>
								Show prominently on the collection index.
							</span>
						</label>
					</div>
				</section>

				<section aria-labelledby="collection-seo-title" className={styles.section}>
					<header>
						<p>Search presentation</p>
						<h2 id="collection-seo-title">SEO</h2>
					</header>
					<div className={styles.fields}>
						<label className={styles.field}>
							<span>SEO title</span>
							<Input {...register("seoTitle")} />
						</label>
						<label className={styles.field}>
							<span>SEO description</span>
							<textarea rows={4} {...register("seoDescription")} />
						</label>
					</div>
				</section>

				<section aria-labelledby="collection-preview-title" className={styles.section}>
					<header>
						<p>Storefront treatment</p>
						<h2 id="collection-preview-title">Preview</h2>
					</header>
					<div
						className={styles.preview}
						style={
							{
								"--preview-accent": values.accentColor || "#727052",
							} as React.CSSProperties
						}
					>
						<CollectionImage
							alt=""
							src={values.cardImageUrl || values.heroImageUrl || null}
						/>
						<div>
							<p>{values.eyebrow || "Avelis collection"}</p>
							<h3>{values.name || "Untitled collection"}</h3>
							<span>
								{values.shortDescription ||
									values.description ||
									"Collection story will appear here."}
							</span>
							<small>{productIds.length} selected fragrances</small>
						</div>
					</div>
					{initialCollection?.status === "PUBLISHED" ? (
						<Link
							className={styles.publicPreview}
							rel="noreferrer"
							target="_blank"
							to={`/collections/${values.slug}`}
						>
							<Eye aria-hidden="true" />
							Open public collection
						</Link>
					) : null}
				</section>

				<footer className={styles.actions}>
					<div>
						<ButtonLink to="/admin/collections" variant="ghost">
							Cancel
						</ButtonLink>
						{isDirty ? <span>Unsaved changes</span> : null}
					</div>
					<div>
						<Button
							disabled={isSaving}
							onClick={() => saveWithStatus("DRAFT")}
							variant="secondary"
						>
							{isSaving ? "Saving…" : "Save as draft"}
						</Button>
						<Button
							disabled={isSaving}
							onClick={() => saveWithStatus("PUBLISHED")}
						>
							{isSaving
								? "Publishing…"
								: initialCollection?.status === "PUBLISHED"
									? "Save published changes"
									: "Publish collection"}
						</Button>
					</div>
				</footer>
			</form>

			<Modal
				description="Existing links to the previous collection address will stop working."
				footer={
					<>
						<Button
							onClick={() => setPendingSlugChange(null)}
							variant="secondary"
						>
							Keep current slug
						</Button>
						<Button
							onClick={() => {
								const pending = pendingSlugChange;
								setPendingSlugChange(null);
								if (pending) void persistValues(pending);
							}}
						>
							Change published slug
						</Button>
					</>
				}
				isOpen={pendingSlugChange !== null}
				onClose={() => setPendingSlugChange(null)}
				title="Change this published slug?"
			>
				<p>
					Confirm the change from <strong>{initialCollection?.slug}</strong>{" "}
					to <strong>{pendingSlugChange?.slug}</strong>.
				</p>
			</Modal>
		</>
	);
}
