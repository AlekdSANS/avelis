import {
	countAdminProducts,
	createAdminProductRecord,
	deactivateAdminProduct,
	findAdminProductById,
	findAdminProductReferenceNotes,
	findAdminProductReferenceCollections,
	findAdminProducts,
	updateAdminProductStatus,
	updateAdminProductRecord,
} from "../repositories/adminProductRepository.js";
import type {
	AdminProductCreateInput,
	AdminProductListQuery,
	AdminProductStatusInput,
	AdminProductUpdateInput,
} from "../schemas/adminProductSchemas.js";
import {
	mapAdminProductDetail,
	mapAdminProductSummary,
} from "../utils/adminProductMapper.js";
import { HttpError } from "../utils/httpError.js";
import { imageStorage } from "../storage/localImageStorage.js";

function isMissingRecordError(error: unknown) {
	return (
		typeof error === "object" &&
		error !== null &&
		"code" in error &&
		error.code === "P2025"
	);
}

function mapAdminProductPersistenceError(error: unknown): never {
	if (error instanceof Error) {
		switch (error.message) {
			case "ADMIN_PRODUCT_NOT_FOUND":
				throw new HttpError(404, "Product not found");
			case "ADMIN_PRODUCT_NOTE_NOT_FOUND":
				throw new HttpError(404, "One or more notes were not found");
			case "ADMIN_PRODUCT_COLLECTION_NOT_FOUND":
				throw new HttpError(404, "One or more collections were not found");
			case "ADMIN_PRODUCT_DUPLICATE_SLUG":
				throw new HttpError(409, "A product with this slug already exists");
			case "ADMIN_PRODUCT_DUPLICATE_SKU":
				throw new HttpError(409, "A product variant with this SKU already exists");
			case "ADMIN_PRODUCT_INVALID_VARIANT_ID":
				throw new HttpError(
					409,
					"One or more variant IDs do not belong to this product",
				);
			case "ADMIN_PRODUCT_INVALID_IMAGE_ID":
				throw new HttpError(
					409,
					"One or more image IDs do not belong to this product",
				);
		}
	}

	if (
		typeof error === "object" &&
		error !== null &&
		"code" in error &&
		error.code === "P2002"
	) {
		const target =
			"meta" in error &&
			typeof error.meta === "object" &&
			error.meta !== null &&
			"target" in error.meta
				? String(error.meta.target)
				: "";

		if (target.toLowerCase().includes("slug")) {
			throw new HttpError(409, "A product with this slug already exists");
		}
		if (target.toLowerCase().includes("sku")) {
			throw new HttpError(
				409,
				"A product variant with this SKU already exists",
			);
		}

		throw new HttpError(409, "Product data conflicts with an existing record");
	}

	throw error;
}

function normalizeCreateInput(
	input: AdminProductCreateInput,
): AdminProductCreateInput {
	return {
		...input,
		season: [...new Set(input.season)],
		occasion: [...new Set(input.occasion)],
		images: [...input.images]
			.sort((left, right) => left.position - right.position)
			.map((image, position) => ({ ...image, position })),
		notes: [...input.notes]
			.sort((left, right) => {
				const rank = { TOP: 0, HEART: 1, BASE: 2 } as const;
				return rank[left.type] - rank[right.type] || left.position - right.position;
			})
			.map((note, index, notes) => ({
				...note,
				position: notes
					.slice(0, index)
					.filter((candidate) => candidate.type === note.type).length,
			})),
	};
}

function normalizeUpdateInput(
	input: AdminProductUpdateInput,
): AdminProductUpdateInput {
	return {
		...input,
		...(input.season === undefined
			? {}
			: { season: [...new Set(input.season)] }),
		...(input.occasion === undefined
			? {}
			: { occasion: [...new Set(input.occasion)] }),
		...(input.images === undefined
			? {}
			: {
					images: [...input.images]
						.sort((left, right) => left.position - right.position)
						.map((image, position) => ({ ...image, position })),
				}),
		...(input.notes === undefined
			? {}
			: {
					notes: [...input.notes]
						.sort((left, right) => {
							const rank = { TOP: 0, HEART: 1, BASE: 2 } as const;
							return (
								rank[left.type] - rank[right.type] ||
								left.position - right.position
							);
						})
						.map((note, index, notes) => ({
							...note,
							position: notes
								.slice(0, index)
								.filter((candidate) => candidate.type === note.type)
								.length,
						})),
				}),
	};
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

export async function listAdminProductReferenceNotes() {
	return {
		data: await findAdminProductReferenceNotes(),
	};
}

export async function listAdminProductReferenceCollections() {
	return {
		data: await findAdminProductReferenceCollections(),
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

export async function createAdminProduct(input: AdminProductCreateInput) {
	try {
		const product = await createAdminProductRecord(normalizeCreateInput(input));

		return {
			data: mapAdminProductDetail(product),
		};
	} catch (error) {
		mapAdminProductPersistenceError(error);
	}
}

/**
 * Nested update contract for Part 2B:
 * omitted arrays are preserved; provided arrays fully replace membership.
 * Variant/image rows with a valid ID are updated in place, rows without an ID
 * are created, and omitted existing rows are removed within one transaction.
 */
export async function updateAdminProduct(
	id: string,
	input: AdminProductUpdateInput,
) {
	try {
		const { product, removedStorageKeys } = await updateAdminProductRecord(
			id,
			normalizeUpdateInput(input),
		);

		const cleanupResults = await Promise.allSettled(
			removedStorageKeys.map((storageKey) =>
				imageStorage.deleteProductImage(storageKey),
			),
		);

		if (
			process.env.NODE_ENV !== "production" &&
			cleanupResults.some((result) => result.status === "rejected")
		) {
			console.error(
				"One or more detached product image files could not be removed",
			);
		}

		return {
			data: mapAdminProductDetail(product),
		};
	} catch (error) {
		mapAdminProductPersistenceError(error);
	}
}
