import {
	countAdminProducts,
	deactivateAdminProduct,
	findAdminProductById,
	findAdminProducts,
	updateAdminProductStatus,
} from "../repositories/adminProductRepository.js";
import type {
	AdminProductListQuery,
	AdminProductStatusInput,
} from "../schemas/adminProductSchemas.js";
import {
	mapAdminProductDetail,
	mapAdminProductSummary,
} from "../utils/adminProductMapper.js";
import { HttpError } from "../utils/httpError.js";

function isMissingRecordError(error: unknown) {
	return (
		typeof error === "object" &&
		error !== null &&
		"code" in error &&
		error.code === "P2025"
	);
}

export async function listAdminProducts(query: AdminProductListQuery) {
	const [total, products] = await Promise.all([
		countAdminProducts(query),
		findAdminProducts(query),
	]);

	return {
		data: products.map(mapAdminProductSummary),
		page: query.page,
		limit: query.limit,
		total,
		totalPages: Math.ceil(total / query.limit),
	};
}

export async function getAdminProduct(id: string) {
	const product = await findAdminProductById(id);

	if (product === null) {
		throw new HttpError(404, "Product not found");
	}

	return {
		data: mapAdminProductDetail(product),
	};
}

export async function setAdminProductStatus(
	id: string,
	input: AdminProductStatusInput,
) {
	try {
		const product = await updateAdminProductStatus(id, input);

		return {
			data: mapAdminProductSummary(product),
		};
	} catch (error) {
		if (isMissingRecordError(error)) {
			throw new HttpError(404, "Product not found");
		}

		throw error;
	}
}

export async function softDeleteAdminProduct(id: string) {
	try {
		const product = await deactivateAdminProduct(id);

		return {
			data: mapAdminProductSummary(product),
			message:
				"Product deactivated. Storefront visibility is disabled and historical order data is preserved.",
		};
	} catch (error) {
		if (isMissingRecordError(error)) {
			throw new HttpError(404, "Product not found");
		}

		throw error;
	}
}
