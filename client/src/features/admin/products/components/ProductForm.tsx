import { zodResolver } from "@hookform/resolvers/zod";
import { ExternalLink } from "lucide-react";
import { useState, type BaseSyntheticEvent } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import type { AdminProductDetail } from "../../../../types/adminProduct";
import { useCollections } from "../../../collections/hooks/useCollections";
import {
	useAdminProductReferenceNotes,
	useCreateAdminProduct,
	useUpdateAdminProduct,
} from "../../hooks/useAdminProducts";
import {
	adminProductFormSchema,
	type AdminProductFormValues,
} from "../schemas/adminProductFormSchema";
import {
	productFormDefaultValues,
	type ProductFormMode,
} from "../types";
import { applyProductFormError } from "../utils/productFormError";
import {
	mapFormToCreatePayload,
	mapFormToUpdatePayload,
	mapProductToForm,
} from "../utils/productFormMappers";
import { ProductBasicsSection } from "./ProductBasicsSection";
import { ProductCollectionsSection } from "./ProductCollectionsSection";
import { ProductFormActions } from "./ProductFormActions";
import { ProductImagesSection } from "./ProductImagesSection";
import { ProductNotesSection } from "./ProductNotesSection";
import { ProductStatusSection } from "./ProductStatusSection";
import { ProductVariantsSection } from "./ProductVariantsSection";
import styles from "./ProductForm.module.scss";

export function ProductForm({
	initialProduct,
	initialSuccess,
	mode,
}: {
	initialProduct?: AdminProductDetail;
	initialSuccess?: string;
	mode: ProductFormMode;
}) {
	const navigate = useNavigate();
	const createMutation = useCreateAdminProduct();
	const updateMutation = useUpdateAdminProduct();
	const notesQuery = useAdminProductReferenceNotes();
	const collectionsQuery = useCollections();
	const [feedback, setFeedback] = useState<{
		kind: "error" | "success";
		message: string;
	} | null>(
		initialSuccess === undefined
			? null
			: { kind: "success", message: initialSuccess },
	);
	const form = useForm<AdminProductFormValues>({
		defaultValues:
			initialProduct === undefined
				? productFormDefaultValues
				: mapProductToForm(initialProduct),
		mode: "onBlur",
		resolver: zodResolver(adminProductFormSchema),
		shouldFocusError: true,
	});
	const {
		formState: { isSubmitting },
		handleSubmit,
		reset,
		setError,
	} = form;
	const isSaving =
		isSubmitting || createMutation.isPending || updateMutation.isPending;
	const referenceDataReady =
		!notesQuery.isLoading &&
		!notesQuery.isError &&
		!collectionsQuery.isLoading &&
		!collectionsQuery.isError;

	const submitProduct = async (
		values: AdminProductFormValues,
		event?: BaseSyntheticEvent,
	) => {
		if (isSaving) return;
		const submitter = (event?.nativeEvent as SubmitEvent | undefined)
			?.submitter as HTMLButtonElement | null | undefined;
		const saveIntent = submitter?.value === "return" ? "return" : "stay";

		if (!referenceDataReady) {
			setFeedback({
				kind: "error",
				message:
					"Notes and collections must load successfully before saving.",
			});
			return;
		}

		setFeedback(null);

		try {
			if (mode === "create") {
				const response = await createMutation.mutateAsync(
					mapFormToCreatePayload(values),
				);
				reset(mapProductToForm(response.data));

				if (saveIntent === "return") {
					navigate("/admin/products");
					return;
				}

				navigate(
					`/admin/products/${encodeURIComponent(response.data.id)}/edit`,
					{
						replace: true,
						state: {
							productFormSuccess: "Product created successfully.",
						},
					},
				);
				return;
			}

			if (initialProduct === undefined) return;

			const response = await updateMutation.mutateAsync({
				id: initialProduct.id,
				input: mapFormToUpdatePayload(values),
			});
			reset(mapProductToForm(response.data));

			if (saveIntent === "return") {
				navigate("/admin/products");
				return;
			}

			setFeedback({
				kind: "success",
				message: "Product updated successfully.",
			});
		} catch (error) {
			setFeedback({
				kind: "error",
				message: applyProductFormError(error, setError),
			});
		}
	};

	const previewSlug = useWatch({ control: form.control, name: "slug" });
	const isActive = useWatch({ control: form.control, name: "isActive" });

	return (
		<FormProvider {...form}>
			<form
				className={styles.form}
				noValidate
				onChange={() => {
					if (feedback?.kind === "error") setFeedback(null);
				}}
				onSubmit={handleSubmit(submitProduct)}
			>
				<header className={styles.formHeading}>
					<div>
						<p>
							{mode === "create"
								? "New catalogue entry"
								: "Catalogue editor"}
						</p>
						<h2>
							{mode === "create"
								? "Create a product"
								: initialProduct?.name}
						</h2>
						<span>
							{mode === "create"
								? "New products start inactive so they can be reviewed safely."
								: "Update the storefront record and its related catalogue metadata."}
						</span>
					</div>
					{mode === "edit" && previewSlug.length > 0 ? (
						isActive ? (
							<Link
								rel="noreferrer"
								target="_blank"
								to={`/products/${encodeURIComponent(previewSlug)}`}
							>
								View in store
								<ExternalLink aria-hidden="true" />
							</Link>
						) : (
							<span className={styles.inactivePreview}>
								Store preview unavailable while inactive
							</span>
						)
					) : null}
				</header>

				{feedback === null ? null : (
					<div
						className={[
							styles.feedback,
							feedback.kind === "error" ? styles.feedbackError : "",
						]
							.filter(Boolean)
							.join(" ")}
						role={feedback.kind === "error" ? "alert" : "status"}
					>
						{feedback.message}
					</div>
				)}

				{form.formState.errors.root?.server?.message ? (
					<div
						className={[styles.feedback, styles.feedbackError].join(" ")}
						role="alert"
					>
						{form.formState.errors.root.server.message}
					</div>
				) : null}

				<div className={styles.formLayout}>
					<div className={styles.mainColumn}>
						<ProductBasicsSection mode={mode} />
						<ProductVariantsSection />
						<ProductImagesSection />
						<ProductNotesSection />
					</div>
					<aside className={styles.sideColumn}>
						<ProductStatusSection />
						<ProductCollectionsSection />
						<ProductFormActions
							isSaving={isSaving}
							mode={mode}
							onCancel={() => navigate("/admin/products")}
							referenceDataReady={referenceDataReady}
						/>
					</aside>
				</div>
			</form>
		</FormProvider>
	);
}
