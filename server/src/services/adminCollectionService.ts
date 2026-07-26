import {
	archiveAdminCollectionRecord,
	countAdminCollections,
	createAdminCollectionRecord,
	findAdminCollectionById,
	findAdminCollectionBySlug,
	findAdminCollections,
	updateAdminCollectionRecord,
} from "../repositories/adminCollectionRepository.js";
import type {
	AdminCollectionCreateInput,
	AdminCollectionListQuery,
	AdminCollectionUpdateInput,
} from "../schemas/adminCollectionSchemas.js";
import { normalizeCollectionSlug } from "../schemas/adminCollectionSchemas.js";
import { HttpError } from "../utils/httpError.js";
import { deleteAdminProductUpload } from "./adminUploadService.js";

function mapCollectionListItem(
	collection: Awaited<ReturnType<typeof findAdminCollections>>[number],
) {
	return {
		...collection,
		productCount: collection._count.products,
		publishedAt: collection.publishedAt?.toISOString() ?? null,
		createdAt: collection.createdAt.toISOString(),
		updatedAt: collection.updatedAt.toISOString(),
		_count: undefined,
	};
}

function mapCollectionDetail(
	collection: NonNullable<Awaited<ReturnType<typeof findAdminCollectionById>>>,
) {
	const products = collection.products.map(({ product, sortOrder }) => ({
		id: product.id,
		name: product.name,
		slug: product.slug,
		sku: product.variants[0]?.sku ?? null,
		image: product.images[0] ?? null,
		isActive: product.isActive,
		sortOrder,
	}));

	return {
		...collection,
		productIds: products.map((product) => product.id),
		products,
		publishedAt: collection.publishedAt?.toISOString() ?? null,
		createdAt: collection.createdAt.toISOString(),
		updatedAt: collection.updatedAt.toISOString(),
	};
}

function isPrismaError(error: unknown, code: string) {
	return (
		typeof error === "object" &&
		error !== null &&
		"code" in error &&
		error.code === code
	);
}

function mapCollectionPersistenceError(error: unknown): never {
	if (
		(error instanceof Error && error.message === "ADMIN_COLLECTION_NOT_FOUND") ||
		isPrismaError(error, "P2025")
	) {
		throw new HttpError(404, "Collection not found");
	}
	if (
		error instanceof Error &&
		error.message === "ADMIN_COLLECTION_PRODUCT_NOT_FOUND"
	) {
		throw new HttpError(400, "One or more products were not found");
	}
	if (isPrismaError(error, "P2002")) {
		throw new HttpError(409, "A collection with this slug already exists");
	}
	throw error;
}

async function ensureUniqueSlug(slug: string, excludingId?: string) {
	if ((await findAdminCollectionBySlug(slug, excludingId)) !== null) {
		throw new HttpError(409, "A collection with this slug already exists");
	}
}

function assertPublishable(input: {
	description: string;
	heroImageUrl: string | null;
	cardImageUrl: string | null;
	productIds: readonly string[];
	status: string;
}) {
	if (
		input.status === "PUBLISHED" &&
		(input.description.trim().length === 0 ||
			(input.heroImageUrl === null && input.cardImageUrl === null) ||
			input.productIds.length === 0)
	) {
		throw new HttpError(409, "This collection cannot be published yet");
	}
}

function managedStorageKey(url: string | null) {
	if (url === null) return null;
	const match = url.match(
		/^\/uploads\/(products\/[0-9a-f-]+\.(?:jpg|png|webp))$/i,
	);
	return match?.[1] ?? null;
}

export async function listAdminCollections(query: AdminCollectionListQuery) {
	const [total, collections] = await Promise.all([
		countAdminCollections(query),
		findAdminCollections(query),
	]);

	return {
		data: collections.map(mapCollectionListItem),
		page: query.page,
		limit: query.limit,
		total,
		totalPages: Math.ceil(total / query.limit),
	};
}

export async function getAdminCollection(id: string) {
	const collection = await findAdminCollectionById(id);
	if (collection === null) throw new HttpError(404, "Collection not found");
	return { data: mapCollectionDetail(collection) };
}

export async function createAdminCollection(input: AdminCollectionCreateInput) {
	const slug = input.slug ?? normalizeCollectionSlug(input.name);
	if (slug.length === 0) throw new HttpError(400, "Collection slug is required");
	await ensureUniqueSlug(slug);
	assertPublishable({
		description: input.description,
		heroImageUrl: input.heroImageUrl ?? null,
		cardImageUrl: input.cardImageUrl ?? null,
		productIds: input.productIds,
		status: input.status,
	});

	try {
		return {
			data: mapCollectionDetail(
				await createAdminCollectionRecord({ ...input, slug }),
			),
		};
	} catch (error) {
		mapCollectionPersistenceError(error);
	}
}

export async function updateAdminCollection(
	id: string,
	input: AdminCollectionUpdateInput,
) {
	const current = await findAdminCollectionById(id);
	if (current === null) throw new HttpError(404, "Collection not found");

	if (input.slug !== undefined) await ensureUniqueSlug(input.slug, id);

	assertPublishable({
		description: input.description ?? current.description,
		heroImageUrl:
			input.heroImageUrl === undefined
				? current.heroImageUrl
				: input.heroImageUrl,
		cardImageUrl:
			input.cardImageUrl === undefined
				? current.cardImageUrl
				: input.cardImageUrl,
		productIds:
			input.productIds ?? current.products.map(({ product }) => product.id),
		status: input.status ?? current.status,
	});

	try {
		const previousImageUrls = [
			current.heroImageUrl,
			current.cardImageUrl,
			current.mobileImageUrl,
		];
		const updated = await updateAdminCollectionRecord(id, input);
		const nextImageUrls = new Set([
			updated.heroImageUrl,
			updated.cardImageUrl,
			updated.mobileImageUrl,
		]);
		const detachedStorageKeys = previousImageUrls
			.filter((url) => url !== null && !nextImageUrls.has(url))
			.map(managedStorageKey)
			.filter((key): key is string => key !== null);

		await Promise.allSettled(
			[...new Set(detachedStorageKeys)].map((storageKey) =>
				deleteAdminProductUpload({ storageKey }),
			),
		);

		return {
			data: mapCollectionDetail(updated),
		};
	} catch (error) {
		mapCollectionPersistenceError(error);
	}
}

export async function archiveAdminCollection(id: string) {
	try {
		return {
			data: mapCollectionDetail(await archiveAdminCollectionRecord(id)),
			message:
				"Collection archived. Product records and assignments were preserved.",
		};
	} catch (error) {
		mapCollectionPersistenceError(error);
	}
}
