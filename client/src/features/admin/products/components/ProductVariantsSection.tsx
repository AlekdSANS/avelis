import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import {
	useFieldArray,
	useFormContext,
	useWatch,
} from "react-hook-form";

import { Button } from "../../../../components/ui/Button/Button";
import { Input } from "../../../../components/ui/Input/Input";
import { Modal } from "../../../../components/ui/Modal/Modal";
import { Select } from "../../../../components/ui/Select/Select";
import type { AdminProductFormValues } from "../schemas/adminProductFormSchema";
import { FieldError } from "./ProductBasicsSection";
import styles from "./ProductForm.module.scss";

type VariantDraft = AdminProductFormValues["variants"][number];

const quickVariants: Array<{
	label: string;
	format: VariantDraft["format"];
	volumeMl: VariantDraft["volumeMl"];
}> = [
	{ label: "Add 50 ml Bottle", format: "BOTTLE", volumeMl: "50" },
	{ label: "Add 100 ml Bottle", format: "BOTTLE", volumeMl: "100" },
	{ label: "Add 150 ml Refill", format: "REFILL", volumeMl: "150" },
];

function createVariant(
	format: VariantDraft["format"],
	volumeMl: VariantDraft["volumeMl"],
): VariantDraft {
	return {
		format,
		volumeMl,
		price: "",
		compareAtPrice: "",
		sku: "",
		stock: "0",
	};
}

export function ProductVariantsSection() {
	const {
		control,
		clearErrors,
		formState: { errors },
		getValues,
		register,
		setError,
		setValue,
	} = useFormContext<AdminProductFormValues>();
	const { append, fields, remove } = useFieldArray({
		control,
		name: "variants",
		keyName: "fieldKey",
	});
	const variants = useWatch({ control, name: "variants" });
	const [removeIndex, setRemoveIndex] = useState<number | null>(null);

	const addVariant = (
		format: VariantDraft["format"],
		volumeMl: VariantDraft["volumeMl"],
	) => {
		const duplicate = getValues("variants").some(
			(variant) =>
				variant.format === format && variant.volumeMl === volumeMl,
		);

		if (duplicate) {
			setError("root.variantDuplicate", {
				message: `${format === "BOTTLE" ? "Bottle" : "Refill"} ${volumeMl} ml already exists.`,
			});
			return;
		}

		clearErrors("root.variantDuplicate");
		append(createVariant(format, volumeMl));
	};

	const requestRemove = (index: number) => {
		if (fields.length <= 1) {
			return;
		}

		if (getValues(`variants.${index}.id`) !== undefined) {
			setRemoveIndex(index);
			return;
		}

		remove(index);
	};

	const confirmedVariant =
		removeIndex === null ? null : getValues(`variants.${removeIndex}`);

	return (
		<section aria-labelledby="product-variants-title" className={styles.section}>
			<header className={styles.sectionHeading}>
				<div>
					<p>Sellable formats</p>
					<h2 id="product-variants-title">Variants</h2>
				</div>
				<span>{fields.length} configured</span>
			</header>

			<div className={styles.quickActions}>
				{quickVariants.map((variant) => (
					<button
						key={`${variant.format}-${variant.volumeMl}`}
						onClick={() => addVariant(variant.format, variant.volumeMl)}
						type="button"
					>
						<Plus aria-hidden="true" />
						{variant.label}
					</button>
				))}
			</div>

			{errors.root?.variantDuplicate?.message ? (
				<p className={styles.sectionError} role="alert">
					{errors.root.variantDuplicate.message}
				</p>
			) : null}

			<div className={styles.variantList}>
				{fields.map((field, index) => {
					const variant = variants[index] ?? field;
					const volumeOptions =
						variant.format === "BOTTLE"
							? (["50", "100"] as const)
							: (["50", "100", "150"] as const);
					const variantErrors = errors.variants?.[index];
					const heading = `${variant.format === "BOTTLE" ? "Bottle" : "Refill"} · ${variant.volumeMl} ml`;

					return (
						<article className={styles.variantCard} key={field.fieldKey}>
							<header>
								<div>
									<span>Variant {index + 1}</span>
									<h3>{heading}</h3>
								</div>
								<button
									aria-label={`Remove ${heading}`}
									disabled={fields.length <= 1}
									onClick={() => requestRemove(index)}
									type="button"
								>
									<Trash2 aria-hidden="true" />
									Remove
								</button>
							</header>

							<input type="hidden" {...register(`variants.${index}.id`)} />

							<div className={styles.variantGrid}>
								<label className={styles.field}>
									<span>Format</span>
									<Select
										aria-invalid={Boolean(variantErrors?.format)}
										{...register(`variants.${index}.format`, {
											onChange: (
												event: React.ChangeEvent<HTMLSelectElement>,
											) => {
												if (
													event.target.value === "BOTTLE" &&
													getValues(`variants.${index}.volumeMl`) === "150"
												) {
													setValue(`variants.${index}.volumeMl`, "50", {
														shouldDirty: true,
														shouldValidate: true,
													});
												}
											},
										})}
									>
										<option value="BOTTLE">Bottle</option>
										<option value="REFILL">Refill</option>
									</Select>
								</label>

								<label className={styles.field}>
									<span>Size</span>
									<Select
										aria-describedby={
											variantErrors?.volumeMl
												? `variant-${index}-volume-error`
												: undefined
										}
										aria-invalid={Boolean(variantErrors?.volumeMl)}
										{...register(`variants.${index}.volumeMl`)}
									>
										{volumeOptions.map((volume) => (
											<option key={volume} value={volume}>
												{volume} ml
											</option>
										))}
									</Select>
									<FieldError
										id={`variant-${index}-volume-error`}
										message={variantErrors?.volumeMl?.message}
									/>
								</label>

								<label className={styles.field}>
									<span>Price (PLN)</span>
									<Input
										aria-describedby={
											variantErrors?.price
												? `variant-${index}-price-error`
												: undefined
										}
										aria-invalid={Boolean(variantErrors?.price)}
										inputMode="decimal"
										min="0.01"
										step="0.01"
										type="number"
										{...register(`variants.${index}.price`)}
									/>
									<FieldError
										id={`variant-${index}-price-error`}
										message={variantErrors?.price?.message}
									/>
								</label>

								<label className={styles.field}>
									<span>Compare-at price</span>
									<Input
										aria-describedby={
											variantErrors?.compareAtPrice
												? `variant-${index}-compare-error`
												: undefined
										}
										aria-invalid={Boolean(variantErrors?.compareAtPrice)}
										inputMode="decimal"
										min="0.01"
										step="0.01"
										type="number"
										{...register(`variants.${index}.compareAtPrice`)}
									/>
									<FieldError
										id={`variant-${index}-compare-error`}
										message={variantErrors?.compareAtPrice?.message}
									/>
								</label>

								<label className={[styles.field, styles.skuField].join(" ")}>
									<span>SKU</span>
									<Input
										aria-describedby={
											variantErrors?.sku
												? `variant-${index}-sku-error`
												: undefined
										}
										aria-invalid={Boolean(variantErrors?.sku)}
										autoCapitalize="characters"
										autoComplete="off"
										{...register(`variants.${index}.sku`)}
									/>
									<FieldError
										id={`variant-${index}-sku-error`}
										message={variantErrors?.sku?.message}
									/>
								</label>

								<label className={styles.field}>
									<span>Stock</span>
									<Input
										aria-describedby={
											variantErrors?.stock
												? `variant-${index}-stock-error`
												: undefined
										}
										aria-invalid={Boolean(variantErrors?.stock)}
										inputMode="numeric"
										min="0"
										step="1"
										type="number"
										{...register(`variants.${index}.stock`)}
									/>
									<FieldError
										id={`variant-${index}-stock-error`}
										message={variantErrors?.stock?.message}
									/>
								</label>
							</div>
						</article>
					);
				})}
			</div>

			<Modal
				description="This change will be applied when you save the product."
				footer={
					<>
						<Button onClick={() => setRemoveIndex(null)} variant="secondary">
							Keep variant
						</Button>
						<Button
							onClick={() => {
								if (removeIndex !== null) {
									remove(removeIndex);
								}
								setRemoveIndex(null);
							}}
						>
							Remove variant
						</Button>
					</>
				}
				isOpen={removeIndex !== null}
				onClose={() => setRemoveIndex(null)}
				title="Remove existing variant?"
			>
				<p>
					{confirmedVariant === null
						? "This variant will be removed."
						: `${confirmedVariant.format === "BOTTLE" ? "Bottle" : "Refill"} · ${confirmedVariant.volumeMl} ml will be removed from this product after saving.`}
				</p>
			</Modal>
		</section>
	);
}
