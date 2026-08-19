import { RefreshCcw } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import { Skeleton } from "../../../../components/ui/Skeleton/Skeleton";
import { useAdminProductReferenceCollections } from "../../hooks/useAdminProducts";
import type { AdminProductFormValues } from "../schemas/adminProductFormSchema";
import styles from "./ProductForm.module.scss";

export function ProductCollectionsSection() {
	const { control, register } = useFormContext<AdminProductFormValues>();
	const selectedIds = useWatch({ control, name: "collectionIds" });
	const collectionsQuery = useAdminProductReferenceCollections();
	const collections = collectionsQuery.data?.data ?? [];

	return (
		<section
			aria-labelledby="product-collections-title"
			className={styles.sideSection}
		>
			<header>
				<p>Catalogue grouping</p>
				<h2 id="product-collections-title">Collections</h2>
			</header>

			{collectionsQuery.isLoading ? (
				<div
					aria-label="Loading collections"
					className={styles.referenceLoading}
					role="status"
				>
					<Skeleton />
					<Skeleton />
					<Skeleton />
				</div>
			) : null}

			{collectionsQuery.isError ? (
				<div className={styles.referenceError} role="alert">
					<p>Collections could not be loaded. Saving is unavailable.</p>
					<button onClick={() => void collectionsQuery.refetch()} type="button">
						<RefreshCcw aria-hidden="true" />
						Try again
					</button>
				</div>
			) : null}

			{collections.length === 0 && !collectionsQuery.isLoading ? (
				<p className={styles.groupEmpty}>No collections are available.</p>
			) : null}

			<div className={styles.collectionList}>
				{collections.map((collection) => {
					const isSelected = selectedIds.includes(collection.id);
					const isUnavailable = !collection.isActive && !isSelected;

					return (
						<label
							className={isUnavailable ? styles.referenceInactive : undefined}
							key={collection.id}
						>
							<input
								disabled={isUnavailable}
								type="checkbox"
								value={collection.id}
								{...register("collectionIds")}
							/>
							<span>
								<strong>
									{collection.name}
									{collection.isActive ? null : " (Inactive)"}
								</strong>
								<small>{collection.slug}</small>
							</span>
						</label>
					);
				})}
			</div>
		</section>
	);
}
