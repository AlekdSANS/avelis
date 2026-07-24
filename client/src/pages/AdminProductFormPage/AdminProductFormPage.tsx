import { ArrowLeft, PackageX, RefreshCcw } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";

import { Button } from "../../components/ui/Button/Button";
import { Skeleton } from "../../components/ui/Skeleton/Skeleton";
import { useAdminProduct } from "../../features/admin/hooks/useAdminProducts";
import { ProductForm } from "../../features/admin/products/components/ProductForm";
import { ApiClientError } from "../../services/apiClient";
import styles from "./AdminProductFormPage.module.scss";

function ProductFormSkeleton() {
	return (
		<div
			aria-label="Loading product editor"
			aria-live="polite"
			className={styles.loading}
			role="status"
		>
			<div>
				<Skeleton />
				<Skeleton />
			</div>
			<div className={styles.loadingLayout}>
				<div>
					<Skeleton />
					<Skeleton />
					<Skeleton />
				</div>
				<div>
					<Skeleton />
					<Skeleton />
				</div>
			</div>
		</div>
	);
}

export function AdminProductFormPage() {
	const { id } = useParams();
	const location = useLocation();
	const isEdit = id !== undefined;
	const productQuery = useAdminProduct(isEdit ? id : undefined);
	const locationState = location.state as
		| { productFormSuccess?: string }
		| null;

	if (isEdit && productQuery.isLoading) {
		return <ProductFormSkeleton />;
	}

	if (isEdit && productQuery.isError) {
		const isNotFound =
			productQuery.error instanceof ApiClientError &&
			productQuery.error.statusCode === 404;

		return (
			<section className={styles.state} role={isNotFound ? undefined : "alert"}>
				{isNotFound ? (
					<PackageX aria-hidden="true" />
				) : (
					<RefreshCcw aria-hidden="true" />
				)}
				<p className={styles.eyebrow}>Product editor</p>
				<h2>
					{isNotFound
						? "This product could not be found."
						: "The product editor could not be loaded."}
				</h2>
				<p>
					{isNotFound
						? "It may have been removed or the link may be incorrect."
						: "Check your connection and retry the product request."}
				</p>
				<div>
					{isNotFound ? null : (
						<Button onClick={() => void productQuery.refetch()}>
							Try again
						</Button>
					)}
					<Link to="/admin/products">
						<ArrowLeft aria-hidden="true" />
						Return to products
					</Link>
				</div>
			</section>
		);
	}

	return (
		<ProductForm
			initialProduct={productQuery.data?.data}
			initialSuccess={locationState?.productFormSuccess}
			mode={isEdit ? "edit" : "create"}
		/>
	);
}
