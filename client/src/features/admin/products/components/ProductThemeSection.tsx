import { Check, Palette } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { Input } from "../../../../components/ui/Input/Input";
import type { ProductThemePreset } from "../../../../types/product";
import {
	createProductThemeStyle,
	productThemePresets,
} from "../../../products/utils/productTheme";
import type { AdminProductFormValues } from "../schemas/adminProductFormSchema";
import { FieldError } from "./ProductBasicsSection";
import styles from "./ProductForm.module.scss";

const themeModes = [
	{
		value: "DEFAULT",
		label: "Store default",
		description: "Neutral warm white; the safe AVELIS baseline.",
	},
	{
		value: "PRESET",
		label: "Curated preset",
		description: "Choose an approved atmosphere with balanced contrast.",
	},
	{
		value: "CUSTOM",
		label: "Custom colors",
		description: "Control the page, surface and accent colors.",
	},
] as const;

const customColors = [
	{ field: "themeBackground", label: "Page background" },
	{ field: "themeSurface", label: "Surface background" },
	{ field: "themeAccent", label: "Primary accent" },
] as const;

export function ProductThemeSection() {
	const {
		formState: { errors },
		register,
		setValue,
		watch,
	} = useFormContext<AdminProductFormValues>();
	const themeMode = watch("themeMode");
	const themePreset = watch("themePreset");
	const themeBackground = watch("themeBackground");
	const themeSurface = watch("themeSurface");
	const themeAccent = watch("themeAccent");
	const previewStyle = createProductThemeStyle({
		themeMode,
		themePreset,
		themeBackground,
		themeSurface,
		themeAccent,
	});

	return (
		<section aria-labelledby="product-theme-title" className={styles.section}>
			<header className={styles.sectionHeading}>
				<div>
					<p>Storefront presentation</p>
					<h2 id="product-theme-title">Product page theme</h2>
				</div>
				<span>Text and borders are generated automatically</span>
			</header>

			<fieldset className={styles.themeModes}>
				<legend className={styles.visuallyHidden}>Theme type</legend>
				{themeModes.map((mode) => (
					<label key={mode.value}>
						<input
							type="radio"
							value={mode.value}
							{...register("themeMode")}
						/>
						<span>
							<strong>{mode.label}</strong>
							<small>{mode.description}</small>
						</span>
					</label>
				))}
			</fieldset>

			{themeMode === "PRESET" ? (
				<div className={styles.presetGrid}>
					{(
						Object.entries(productThemePresets) as Array<
							[ProductThemePreset, (typeof productThemePresets)[ProductThemePreset]]
						>
					).map(([value, preset]) => (
						<button
							aria-pressed={themePreset === value}
							key={value}
							onClick={() =>
								setValue("themePreset", value, {
									shouldDirty: true,
									shouldValidate: true,
								})
							}
							type="button"
						>
							<span className={styles.presetSwatches}>
								<i style={{ background: preset.background }} />
								<i style={{ background: preset.surface }} />
								<i style={{ background: preset.accent }} />
							</span>
							<span>
								<strong>{preset.label}</strong>
								<small>{preset.description}</small>
							</span>
							{themePreset === value ? <Check aria-hidden="true" /> : null}
						</button>
					))}
				</div>
			) : null}

			{themeMode === "CUSTOM" ? (
				<div className={styles.customColorGrid}>
					{customColors.map(({ field, label }) => {
						const value = watch(field);
						return (
							<label className={styles.field} key={field}>
								<span>{label}</span>
								<span className={styles.colorField}>
									<input
										aria-label={`${label} color picker`}
										onChange={(event) =>
											setValue(field, event.target.value.toUpperCase(), {
												shouldDirty: true,
												shouldValidate: true,
											})
										}
										type="color"
										value={value}
									/>
									<Input
										aria-invalid={Boolean(errors[field])}
										spellCheck="false"
										{...register(field)}
									/>
								</span>
								<FieldError
									id={`${field}-error`}
									message={errors[field]?.message}
								/>
							</label>
						);
					})}
				</div>
			) : null}

			<div className={styles.themePreview} style={previewStyle}>
				<div className={styles.themePreviewImage}>
					<Palette aria-hidden="true" />
					<span>Image area</span>
				</div>
				<div className={styles.themePreviewContent}>
					<p>Chromatic woods</p>
					<h3>Product name</h3>
					<span>A short editorial description supported by the selected palette.</span>
					<button type="button">Add to bag</button>
				</div>
			</div>
			<p className={styles.themeHint}>
				The global header and navigation remain unchanged so the store always feels
				consistent.
			</p>
		</section>
	);
}
