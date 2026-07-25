import {
	ArrowDown,
	ArrowUp,
	ImagePlus,
	RefreshCcw,
	Star,
	Trash2,
	Upload,
} from "lucide-react";
import { useState } from "react";
import {
	useFieldArray,
	useFormContext,
	useWatch,
} from "react-hook-form";

import { Input } from "../../../../components/ui/Input/Input";
import { Button } from "../../../../components/ui/Button/Button";
import { Modal } from "../../../../components/ui/Modal/Modal";
import { Select } from "../../../../components/ui/Select/Select";
import { ApiClientError } from "../../../../services/apiClient";
import { useDeleteAdminProductUpload, useUploadAdminProductImages } from "../../hooks/useAdminUploads";
import { ProductImage } from "../../../products/components/ProductImage";
import type { AdminProductFormValues } from "../schemas/adminProductFormSchema";
import { FieldError } from "./ProductBasicsSection";
import styles from "./ProductForm.module.scss";

const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
const allowedUploadTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

interface PendingUpload {
	id: string;
	file: File;
	progress: number;
	status: "uploading" | "error";
	error?: string;
}

function uploadErrorMessage(error: unknown) {
	return error instanceof ApiClientError
		? error.message
		: "The image could not be uploaded. Try again.";
}

export function ProductImagesSection() {
	const {
		control,
		formState: { errors },
		getValues,
		register,
		setValue,
	} = useFormContext<AdminProductFormValues>();
	const { append, fields, move, remove } = useFieldArray({
		control,
		name: "images",
		keyName: "fieldKey",
	});
	const images = useWatch({ control, name: "images" });
	const uploadMutation = useUploadAdminProductImages();
	const deleteMutation = useDeleteAdminProductUpload();
	const [pendingUploads, setPendingUploads] = useState<PendingUpload[]>([]);
	const [deletingKeys, setDeletingKeys] = useState<Set<string>>(new Set());
	const [uploadFeedback, setUploadFeedback] = useState<{
		kind: "error" | "success";
		message: string;
	} | null>(null);
	const [isDragActive, setIsDragActive] = useState(false);
	const [primaryRemovalIndex, setPrimaryRemovalIndex] = useState<
		number | null
	>(null);

	const normalizePositions = () => {
		getValues("images").forEach((_image, index) => {
			setValue(`images.${index}.position`, index, {
				shouldDirty: true,
			});
		});
	};

	const moveImage = (index: number, target: number) => {
		move(index, target);
		normalizePositions();
	};

	const removeImage = async (index: number) => {
		const image = getValues(`images.${index}`);
		const removedWasPrimary = image.isPrimary;

		if (image.id === undefined && image.storageKey !== undefined) {
			setDeletingKeys((current) => new Set(current).add(image.storageKey!));
			setUploadFeedback(null);

			try {
				await deleteMutation.mutateAsync(image.storageKey);
			} catch (error) {
				setUploadFeedback({
					kind: "error",
					message: uploadErrorMessage(error),
				});
				setDeletingKeys((current) => {
					const next = new Set(current);
					next.delete(image.storageKey!);
					return next;
				});
				return;
			}

			setDeletingKeys((current) => {
				const next = new Set(current);
				next.delete(image.storageKey!);
				return next;
			});
		}

		remove(index);
		normalizePositions();

		if (removedWasPrimary && getValues("images").length > 0) {
			setValue("images.0.isPrimary", true, {
				shouldDirty: true,
				shouldValidate: true,
			});
		}
	};

	const setPrimary = (primaryIndex: number) => {
		getValues("images").forEach((_image, index) => {
			setValue(`images.${index}.isPrimary`, index === primaryIndex, {
				shouldDirty: true,
				shouldValidate: true,
			});
		});
	};

	const requestImageRemoval = (index: number) => {
		if (getValues(`images.${index}.isPrimary`)) {
			setPrimaryRemovalIndex(index);
			return;
		}

		void removeImage(index);
	};

	const uploadFile = async (entry: PendingUpload) => {
		setPendingUploads((current) =>
			current.map((candidate) =>
				candidate.id === entry.id
					? {
							...candidate,
							progress: 0,
							status: "uploading",
							error: undefined,
						}
					: candidate,
			),
		);

		try {
			const response = await uploadMutation.mutateAsync({
				files: [entry.file],
				onProgress: (progress) => {
					setPendingUploads((current) =>
						current.map((candidate) =>
							candidate.id === entry.id
								? { ...candidate, progress }
								: candidate,
						),
					);
				},
			});
			const uploaded = response.data[0];

			if (uploaded === undefined) {
				throw new Error("UPLOAD_RESPONSE_EMPTY");
			}

			const currentImages = getValues("images");
			append({
				url: uploaded.url,
				storageKey: uploaded.storageKey,
				mimeType: uploaded.mimeType,
				sizeBytes: uploaded.sizeBytes,
				alt: entry.file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "),
				position: currentImages.length,
				isPrimary: currentImages.length === 0,
				imageType: currentImages.length === 0 ? "MAIN" : "GALLERY",
			});
			setPendingUploads((current) =>
				current.filter((candidate) => candidate.id !== entry.id),
			);
			setUploadFeedback({
				kind: "success",
				message: "Image uploaded. Add descriptive alt text before saving.",
			});
		} catch (error) {
			setPendingUploads((current) =>
				current.map((candidate) =>
					candidate.id === entry.id
						? {
								...candidate,
								status: "error",
								error: uploadErrorMessage(error),
							}
						: candidate,
				),
			);
		}
	};

	const queueFiles = (files: File[]) => {
		const entries = files.map<PendingUpload>((file, index) => {
			let error: string | undefined;

			if (!allowedUploadTypes.has(file.type)) {
				error = "Choose a JPEG, PNG, or WebP image.";
			} else if (file.size > MAX_UPLOAD_BYTES) {
				error = "Each image must be 8 MB or smaller.";
			}

			return {
				id: `${Date.now()}-${index}-${file.name}`,
				file,
				progress: 0,
				status: error === undefined ? "uploading" : "error",
				...(error === undefined ? {} : { error }),
			};
		});

		setPendingUploads((current) => [...current, ...entries]);
		entries
			.filter((entry) => entry.error === undefined)
			.forEach((entry) => void uploadFile(entry));
	};

	return (
		<section aria-labelledby="product-images-title" className={styles.section}>
			<header className={styles.sectionHeading}>
				<div>
					<p>Managed uploads and external paths</p>
					<h2 id="product-images-title">Images</h2>
				</div>
				<button
					className={styles.sectionAdd}
					onClick={() =>
						append({
							url: "",
							alt: "",
							position: fields.length,
							isPrimary: fields.length === 0,
							imageType: fields.length === 0 ? "MAIN" : "GALLERY",
						})
					}
					type="button"
				>
					<ImagePlus aria-hidden="true" />
					Add URL
				</button>
			</header>

			<div
				className={[
					styles.uploadZone,
					isDragActive ? styles.uploadZoneActive : "",
				]
					.filter(Boolean)
					.join(" ")}
				onDragEnter={(event) => {
					event.preventDefault();
					setIsDragActive(true);
				}}
				onDragLeave={(event) => {
					event.preventDefault();
					if (event.currentTarget === event.target) setIsDragActive(false);
				}}
				onDragOver={(event) => event.preventDefault()}
				onDrop={(event) => {
					event.preventDefault();
					setIsDragActive(false);
					queueFiles(Array.from(event.dataTransfer.files));
				}}
			>
				<Upload aria-hidden="true" />
				<div>
					<strong>Upload product imagery</strong>
					<span>JPEG, PNG, or WebP. Up to 8 MB per image.</span>
				</div>
				<label>
					Choose images
					<input
						accept="image/jpeg,image/png,image/webp"
						multiple
						onChange={(event) => {
							queueFiles(Array.from(event.target.files ?? []));
							event.target.value = "";
						}}
						type="file"
					/>
				</label>
			</div>
			<dl className={styles.imageTypeGuide}>
				<div>
					<dt>Main</dt>
					<dd>Core product presentation</dd>
				</div>
				<div>
					<dt>Gallery</dt>
					<dd>Additional product view</dd>
				</div>
				<div>
					<dt>Hover</dt>
					<dd>Alternate catalogue-card view</dd>
				</div>
				<div>
					<dt>Refill</dt>
					<dd>Refill-specific presentation</dd>
				</div>
			</dl>

			{pendingUploads.length > 0 ? (
				<ul
					aria-label="Image upload progress"
					aria-live="polite"
					className={styles.uploadList}
				>
					{pendingUploads.map((entry) => (
						<li key={entry.id}>
							<div>
								<strong>{entry.file.name}</strong>
								<span role={entry.status === "error" ? "alert" : undefined}>
									{entry.status === "error"
										? entry.error
										: `Uploading ${entry.progress}%`}
								</span>
							</div>
							{entry.status === "uploading" ? (
								<progress max={100} value={entry.progress}>
									{entry.progress}%
								</progress>
							) : (
								<div className={styles.uploadActions}>
									<button onClick={() => void uploadFile(entry)} type="button">
										<RefreshCcw aria-hidden="true" />
										Retry
									</button>
									<button
										onClick={() =>
											setPendingUploads((current) =>
												current.filter(
													(candidate) => candidate.id !== entry.id,
												),
											)
										}
										type="button"
									>
										<Trash2 aria-hidden="true" />
										Remove
									</button>
								</div>
							)}
						</li>
					))}
				</ul>
			) : null}

			{uploadFeedback === null ? null : (
				<p
					className={styles.uploadFeedback}
					role={uploadFeedback.kind === "error" ? "alert" : "status"}
				>
					{uploadFeedback.message}
				</p>
			)}

			{errors.images?.message ?? errors.images?.root?.message ? (
				<p className={styles.sectionError} role="alert">
					{errors.images?.message ?? errors.images?.root?.message}
				</p>
			) : null}

			{fields.length === 0 ? (
				<div className={styles.sectionEmpty}>
					<ImagePlus aria-hidden="true" />
					<p>No product images yet.</p>
					<span>
						Upload an image above or add a public path or absolute URL.
					</span>
				</div>
			) : (
				<div className={styles.imageList}>
					{fields.map((field, index) => {
						const image = images[index] ?? field;
						const imageErrors = errors.images?.[index];
						const isDeleting =
							image.storageKey !== undefined &&
							deletingKeys.has(image.storageKey);

						return (
							<article className={styles.imageCard} key={field.fieldKey}>
								<div className={styles.imagePreview}>
									<ProductImage
										alt={
											image.alt.trim().length > 0
												? image.alt
												: `Preview for image ${index + 1}`
										}
										src={
											image.url.trim().length > 0
												? image.url
												: "/images/placeholders/product_placeholder.png"
										}
									/>
									<div>
										<span>{image.imageType}</span>
										{image.storageKey === undefined ? null : (
											<span>Managed</span>
										)}
										{image.isPrimary ? (
											<strong>
												<Star aria-hidden="true" />
												Primary
											</strong>
										) : null}
									</div>
								</div>

								<input type="hidden" {...register(`images.${index}.id`)} />
								<input
									type="hidden"
									{...register(`images.${index}.storageKey`)}
								/>
								<input
									type="hidden"
									{...register(`images.${index}.mimeType`)}
								/>
								<input
									type="hidden"
									{...register(`images.${index}.sizeBytes`, {
										valueAsNumber: true,
									})}
								/>
								<input
									type="hidden"
									{...register(`images.${index}.position`, {
										valueAsNumber: true,
									})}
								/>

								<div className={styles.imageFields}>
									<label className={[styles.field, styles.fullWidth].join(" ")}>
										<span>Image URL or path</span>
										<Input
											aria-describedby={
												imageErrors?.url
													? `image-${index}-url-error`
													: undefined
											}
											aria-invalid={Boolean(imageErrors?.url)}
											disabled={image.storageKey !== undefined}
											placeholder="/images/products/night-bloom/main.webp"
											{...register(`images.${index}.url`)}
										/>
										<FieldError
											id={`image-${index}-url-error`}
											message={imageErrors?.url?.message}
										/>
									</label>

									<label className={[styles.field, styles.fullWidth].join(" ")}>
										<span>Alt text</span>
										<Input
											aria-describedby={
												imageErrors?.alt
													? `image-${index}-alt-error`
													: undefined
											}
											aria-invalid={Boolean(imageErrors?.alt)}
											{...register(`images.${index}.alt`)}
										/>
										<FieldError
											id={`image-${index}-alt-error`}
											message={imageErrors?.alt?.message}
										/>
									</label>

									<label className={styles.field}>
										<span>Image type</span>
										<Select {...register(`images.${index}.imageType`)}>
											<option value="MAIN">Main</option>
											<option value="GALLERY">Gallery</option>
											<option value="HOVER">Hover</option>
											<option value="REFILL">Refill</option>
										</Select>
									</label>

									<label className={styles.primaryCheck}>
										<input
											checked={image.isPrimary}
											name="primaryImage"
											onChange={() => setPrimary(index)}
											type="radio"
											value={String(index)}
										/>
										<span>
											<Star aria-hidden="true" />
											Use as primary image
										</span>
									</label>
								</div>

								<footer className={styles.imageActions}>
									<button
										aria-label={`Move image ${index + 1} up`}
										disabled={index === 0 || isDeleting}
										onClick={() => moveImage(index, index - 1)}
										type="button"
									>
										<ArrowUp aria-hidden="true" />
										Move up
									</button>
									<button
										aria-label={`Move image ${index + 1} down`}
										disabled={index === fields.length - 1 || isDeleting}
										onClick={() => moveImage(index, index + 1)}
										type="button"
									>
										<ArrowDown aria-hidden="true" />
										Move down
									</button>
									<button
										aria-label={`Remove image ${index + 1}`}
										disabled={isDeleting}
										onClick={() => requestImageRemoval(index)}
										type="button"
									>
										<Trash2 aria-hidden="true" />
										{isDeleting ? "Removing…" : "Remove"}
									</button>
								</footer>
							</article>
						);
					})}
				</div>
			)}

			<Modal
				description="Primary imagery is used as the product's default presentation."
				footer={
					<>
						<Button
							onClick={() => setPrimaryRemovalIndex(null)}
							variant="secondary"
						>
							Keep image
						</Button>
						<Button
							onClick={() => {
								if (primaryRemovalIndex === null) return;
								const index = primaryRemovalIndex;
								setPrimaryRemovalIndex(null);
								void removeImage(index);
							}}
						>
							Remove primary image
						</Button>
					</>
				}
				isOpen={primaryRemovalIndex !== null}
				onClose={() => setPrimaryRemovalIndex(null)}
				title="Remove the primary image?"
			>
				<p>
					{getValues("images").length > 1
						? "The next image will become primary. Review that choice before saving."
						: "The product will have no image until another one is added."}
				</p>
			</Modal>
		</section>
	);
}
