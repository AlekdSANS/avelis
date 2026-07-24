import { useFormContext } from "react-hook-form";

import type { AdminProductFormValues } from "../schemas/adminProductFormSchema";
import styles from "./ProductForm.module.scss";

const statusFields = [
	{
		name: "isActive",
		label: "Active",
		description: "Visible to customers when it also has available catalogue data.",
	},
	{
		name: "isFeatured",
		label: "Featured",
		description: "Eligible for featured storefront placements.",
	},
	{
		name: "isNew",
		label: "New arrival",
		description: "Displays the New badge where storefront cards support it.",
	},
	{
		name: "isLimited",
		label: "Limited",
		description: "Marks the composition as a limited release.",
	},
] as const;

export function ProductStatusSection() {
	const { register } = useFormContext<AdminProductFormValues>();

	return (
		<section aria-labelledby="product-status-title" className={styles.sideSection}>
			<header>
				<p>Publication</p>
				<h2 id="product-status-title">Status and badges</h2>
			</header>
			<div className={styles.statusList}>
				{statusFields.map((field) => (
					<label key={field.name}>
						<input type="checkbox" {...register(field.name)} />
						<span>
							<strong>{field.label}</strong>
							<small>{field.description}</small>
						</span>
					</label>
				))}
			</div>
		</section>
	);
}
