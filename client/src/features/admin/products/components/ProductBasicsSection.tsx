import { RefreshCcw } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useState } from "react";

import { Input } from "../../../../components/ui/Input/Input";
import { Select } from "../../../../components/ui/Select/Select";
import type { AdminProductFormValues } from "../schemas/adminProductFormSchema";
import type { ProductFormMode } from "../types";
import { createProductSlug } from "../utils/productFormMappers";
import styles from "./ProductForm.module.scss";

const fragranceFamilies = [
	"Woody",
	"Floral",
	"Amber",
	"Fresh",
	"Spicy",
	"Gourmand",
	"Aquatic",
	"Powdery",
] as const;

const concentrations = [
	"Eau de Parfum",
	"Eau de Toilette",
	"Extrait de Parfum",
] as const;

const seasons = ["spring", "summer", "autumn", "winter"] as const;
const occasions = [
	"daytime",
	"evening",
	"work",
	"weekend",
	"special occasion",
] as const;

function FieldError({
	id,
	message,
}: {
	id: string;
	message?: string;
}) {
	if (message === undefined) {
		return null;
	}

	return (
		<p className={styles.fieldError} id={id} role="alert">
			{message}
		</p>
	);
}

export function ProductBasicsSection({ mode }: { mode: ProductFormMode }) {
	const {
		formState: { errors },
		getValues,
		register,
		setValue,
		watch,
	} = useFormContext<AdminProductFormValues>();
	const [isSlugManual, setIsSlugManual] = useState(mode === "edit");
	const currentFamily = watch("fragranceFamily");
	const currentConcentration = watch("concentration");

	const nameRegistration = register("name", {
		onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
			if (!isSlugManual) {
				setValue("slug", createProductSlug(event.target.value), {
					shouldDirty: true,
					shouldValidate: getValues("slug").length > 0,
				});
			}
		},
	});

	return (
		<section aria-labelledby="product-basics-title" className={styles.section}>
			<header className={styles.sectionHeading}>
				<div>
					<p>Product identity</p>
					<h2 id="product-basics-title">Basics</h2>
				</div>
				<span>Required fields are marked *</span>
			</header>

			<div className={styles.fieldGrid}>
				<label className={styles.field}>
					<span>Name *</span>
					<Input
						aria-describedby={
							errors.name ? "product-name-error" : undefined
						}
						aria-invalid={Boolean(errors.name)}
						autoComplete="off"
						{...nameRegistration}
					/>
					<FieldError
						id="product-name-error"
						message={errors.name?.message}
					/>
				</label>

				<label className={styles.field}>
					<span>Subtitle</span>
					<Input
						aria-describedby={
							errors.subtitle ? "product-subtitle-error" : undefined
						}
						aria-invalid={Boolean(errors.subtitle)}
						placeholder="A short editorial line"
						{...register("subtitle")}
					/>
					<FieldError
						id="product-subtitle-error"
						message={errors.subtitle?.message}
					/>
				</label>

				<div className={[styles.field, styles.fullWidth].join(" ")}>
					<label htmlFor="product-slug">Slug *</label>
					<div className={styles.inlineField}>
						<Input
							aria-describedby={
								errors.slug
									? "product-slug-error"
									: "product-slug-hint"
							}
							aria-invalid={Boolean(errors.slug)}
							id="product-slug"
							placeholder="night-bloom"
							{...register("slug", {
								onChange: () => setIsSlugManual(true),
							})}
						/>
						<button
							onClick={() => {
								setValue("slug", createProductSlug(getValues("name")), {
									shouldDirty: true,
									shouldValidate: true,
								});
								setIsSlugManual(true);
							}}
							type="button"
						>
							<RefreshCcw aria-hidden="true" />
							Regenerate from name
						</button>
					</div>
					<FieldError
						id="product-slug-error"
						message={errors.slug?.message}
					/>
					{errors.slug === undefined ? (
						<p className={styles.fieldHint} id="product-slug-hint">
							Used in the storefront product URL. Uniqueness is checked on
							save.
						</p>
					) : null}
				</div>

				<label className={[styles.field, styles.fullWidth].join(" ")}>
					<span>Description *</span>
					<textarea
						aria-describedby={
							errors.description
								? "product-description-error"
								: undefined
						}
						aria-invalid={Boolean(errors.description)}
						rows={7}
						{...register("description")}
					/>
					<FieldError
						id="product-description-error"
						message={errors.description?.message}
					/>
				</label>

				<label className={styles.field}>
					<span>Fragrance family *</span>
					<Select
						aria-describedby={
							errors.fragranceFamily
								? "product-family-error"
								: undefined
						}
						aria-invalid={Boolean(errors.fragranceFamily)}
						{...register("fragranceFamily")}
					>
						<option value="">Select family</option>
						{currentFamily.length > 0 &&
						!fragranceFamilies.includes(
							currentFamily as (typeof fragranceFamilies)[number],
						) ? (
							<option value={currentFamily}>{currentFamily}</option>
						) : null}
						{fragranceFamilies.map((family) => (
							<option key={family} value={family}>
								{family}
							</option>
						))}
					</Select>
					<FieldError
						id="product-family-error"
						message={errors.fragranceFamily?.message}
					/>
				</label>

				<label className={styles.field}>
					<span>Concentration *</span>
					<Select
						aria-describedby={
							errors.concentration
								? "product-concentration-error"
								: undefined
						}
						aria-invalid={Boolean(errors.concentration)}
						{...register("concentration")}
					>
						<option value="">Select concentration</option>
						{currentConcentration.length > 0 &&
						!concentrations.includes(
							currentConcentration as (typeof concentrations)[number],
						) ? (
							<option value={currentConcentration}>
								{currentConcentration}
							</option>
						) : null}
						{concentrations.map((concentration) => (
							<option key={concentration} value={concentration}>
								{concentration}
							</option>
						))}
					</Select>
					<FieldError
						id="product-concentration-error"
						message={errors.concentration?.message}
					/>
				</label>

				<label className={styles.field}>
					<span>Gender</span>
					<Input placeholder="Unisex" {...register("gender")} />
					<FieldError
						id="product-gender-error"
						message={errors.gender?.message}
					/>
				</label>

				<label className={styles.field}>
					<span>Longevity</span>
					<Input placeholder="8–10 hours" {...register("longevity")} />
					<FieldError
						id="product-longevity-error"
						message={errors.longevity?.message}
					/>
				</label>
			</div>

			<div className={styles.checkGroups}>
				<fieldset>
					<legend>Season</legend>
					<div>
						{seasons.map((season) => (
							<label key={season}>
								<input
									type="checkbox"
									value={season}
									{...register("season")}
								/>
								<span>{season}</span>
							</label>
						))}
					</div>
				</fieldset>

				<fieldset>
					<legend>Occasion</legend>
					<div>
						{occasions.map((occasion) => (
							<label key={occasion}>
								<input
									type="checkbox"
									value={occasion}
									{...register("occasion")}
								/>
								<span>{occasion}</span>
							</label>
						))}
					</div>
				</fieldset>
			</div>
		</section>
	);
}

export { FieldError };
