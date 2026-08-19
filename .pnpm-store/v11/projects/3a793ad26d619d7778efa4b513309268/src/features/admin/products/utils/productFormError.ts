import type { FieldPath, UseFormSetError } from "react-hook-form";

import { ApiClientError } from "../../../../services/apiClient";
import type { AdminProductFormValues } from "../schemas/adminProductFormSchema";

export function applyProductFormError(
	error: unknown,
	setError: UseFormSetError<AdminProductFormValues>,
) {
	if (!(error instanceof ApiClientError)) {
		return "Product changes could not be saved. Check your connection and try again.";
	}

	if (error.statusCode === 401) {
		return "Your session has ended. Sign in again before saving.";
	}
	if (error.statusCode === 403) {
		return "Your account does not have permission to save admin products.";
	}
	if (error.statusCode === 409 && /slug/i.test(error.message)) {
		setError("slug", {
			message: "A product with this slug already exists.",
		});
		return "Choose another product slug, then save again.";
	}
	if (error.statusCode === 409 && /sku/i.test(error.message)) {
		setError("root.server", {
			message: "This SKU is already used by another product variant.",
		});
		return "Review the variant SKUs and use a unique value.";
	}
	if (/notes? (were|was) not found/i.test(error.message)) {
		return "One of the selected notes no longer exists. Reload the note list and review the selection.";
	}
	if (/collections? (were|was) not found/i.test(error.message)) {
		return "One of the selected collections no longer exists. Reload the collection list and review the selection.";
	}
	if (/do not belong to this product/i.test(error.message)) {
		return "Some product data changed elsewhere. Reload the product before trying again.";
	}
	if (error.issues !== undefined) {
		error.issues.forEach((issue) => {
			if (issue.path.length > 0) {
				setError(issue.path as FieldPath<AdminProductFormValues>, {
					message: issue.message,
				});
			}
		});
		return "Review the highlighted product fields.";
	}

	return error.statusCode !== undefined && error.statusCode >= 500
		? "The server could not save this product. Try again shortly."
		: "Product changes could not be saved. Review the form and try again.";
}
