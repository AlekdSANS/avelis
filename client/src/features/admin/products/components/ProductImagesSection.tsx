import {
	ArrowDown,
	ArrowUp,
	ImagePlus,
	Star,
	Trash2,
} from "lucide-react";
import {
	useFieldArray,
	useFormContext,
	useWatch,
} from "react-hook-form";

import { Input } from "../../../../components/ui/Input/Input";
import { Select } from "../../../../components/ui/Select/Select";
import { ProductImage } from "../../../products/components/ProductImage";
import type { AdminProductFormValues } from "../schemas/adminProductFormSchema";
import { FieldError } from "./ProductBasicsSection";
import styles from "./ProductForm.module.scss";

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

	const removeImage = (index: number) => {
		const removedWasPrimary = getValues(`images.${index}.isPrimary`);
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

	return (
		<section aria-labelledby="product-images-title" className={styles.section}>
			<header className={styles.sectionHeading}>
				<div>
					<p>URL and path metadata</p>
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
					Add image
				</button>
			</header>

			{errors.images?.message ? (
				<p className={styles.sectionError} role="alert">
					{errors.images.message}
				</p>
			) : null}

			{fields.length === 0 ? (
				<div className={styles.sectionEmpty}>
					<ImagePlus aria-hidden="true" />
					<p>No image metadata has been added.</p>
					<span>
						Add a public path or absolute URL. File uploads are not connected
						yet.
					</span>
				</div>
			) : (
				<div className={styles.imageList}>
					{fields.map((field, index) => {
						const image = images[index] ?? field;
						const imageErrors = errors.images?.[index];

						return (
							<article className={styles.imageCard} key={field.fieldKey}>
								<div className={styles.imagePreview}>
									<ProductImage
										alt={
											image.alt.trim().length > 0
												? image.alt
												: `Preview for image ${index + 1}`
										}
										src={image.url}
									/>
									<div>
										<span>{image.imageType}</span>
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
										disabled={index === 0}
										onClick={() => moveImage(index, index - 1)}
										type="button"
									>
										<ArrowUp aria-hidden="true" />
										Move up
									</button>
									<button
										aria-label={`Move image ${index + 1} down`}
										disabled={index === fields.length - 1}
										onClick={() => moveImage(index, index + 1)}
										type="button"
									>
										<ArrowDown aria-hidden="true" />
										Move down
									</button>
									<button
										aria-label={`Remove image ${index + 1}`}
										onClick={() => removeImage(index)}
										type="button"
									>
										<Trash2 aria-hidden="true" />
										Remove
									</button>
								</footer>
							</article>
						);
					})}
				</div>
			)}
		</section>
	);
}
