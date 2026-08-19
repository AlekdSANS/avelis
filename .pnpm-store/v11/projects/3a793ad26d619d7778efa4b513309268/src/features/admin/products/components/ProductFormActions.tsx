import { ArrowLeft, Save } from "lucide-react";

import { Button } from "../../../../components/ui/Button/Button";
import type { ProductFormMode } from "../types";
import styles from "./ProductForm.module.scss";

export function ProductFormActions({
	isSaving,
	mode,
	onCancel,
	referenceDataReady,
}: {
	isSaving: boolean;
	mode: ProductFormMode;
	onCancel: () => void;
	referenceDataReady: boolean;
}) {
	return (
		<section aria-labelledby="product-actions-title" className={styles.actions}>
			<div>
				<p>Product changes</p>
				<h2 id="product-actions-title">
					{mode === "create" ? "Create product" : "Save product"}
				</h2>
			</div>
			<p aria-live="polite" className={styles.saveStatus}>
				{isSaving
					? "Saving product..."
					: referenceDataReady
						? "Changes are saved only when you use an action below."
						: "Reference data must load before this product can be saved."}
			</p>
			<Button
				disabled={isSaving || !referenceDataReady}
				fullWidth
				name="saveIntent"
				type="submit"
				value="stay"
			>
				<Save aria-hidden="true" />
				{isSaving
					? "Saving product..."
					: mode === "create"
						? "Create product"
						: "Save changes"}
			</Button>
			<Button
				disabled={isSaving || !referenceDataReady}
				fullWidth
				name="saveIntent"
				type="submit"
				value="return"
				variant="secondary"
			>
				Save and return to products
			</Button>
			<button
				className={styles.cancelAction}
				disabled={isSaving}
				onClick={onCancel}
				type="button"
			>
				<ArrowLeft aria-hidden="true" />
				Cancel
			</button>
		</section>
	);
}
