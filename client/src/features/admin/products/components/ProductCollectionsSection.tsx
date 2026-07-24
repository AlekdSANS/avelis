import { RefreshCcw } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { Skeleton } from "../../../../components/ui/Skeleton/Skeleton";
import { useCollections } from "../../../collections/hooks/useCollections";
import type { AdminProductFormValues } from "../schemas/adminProductFormSchema";
import styles from "./ProductForm.module.scss";

export function ProductCollectionsSection() {
	const { register } = useFormContext<AdminProductFormValues>();
	const collectionsQuery = useCollections();

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

			{collectionsQuery.data?.length === 0 ? (
				<p className={styles.groupEmpty}>No collections are available.</p>
			) : null}

			<div className={styles.collectionList}>
				{collectionsQuery.data?.map((collection) => (
					<label key={collection.id}>
						<input
							type="checkbox"
							value={collection.id}
							{...register("collectionIds")}
						/>
						<span>
							<strong>{collection.name}</strong>
							<small>{collection.slug}</small>
						</span>
					</label>
				))}
			</div>
		</section>
	);
}
