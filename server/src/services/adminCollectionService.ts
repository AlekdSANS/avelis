import {
	countAdminCollections,
	createAdminCollectionRecord,
	deactivateAdminCollectionRecord,
	findAdminCollectionBySlug,
	findAdminCollections,
	updateAdminCollectionRecord,
} from "../repositories/adminCollectionRepository.js";
import type {
	AdminCollectionCreateInput,
	AdminCollectionListQuery,
	AdminCollectionUpdateInput,
} from "../schemas/adminCollectionSchemas.js";
import { HttpError } from "../utils/httpError.js";

function mapCollection(
	collection: Awaited<ReturnType<typeof createAdminCollectionRecord>>,
) {
	return {
		id: collection.id,
		name: collection.name,
		slug: collection.slug,
		description: collection.description,
		imageUrl: collection.imageUrl,
		isActive: collection.isActive,
		productCount: collection._count.products,
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
	if (isPrismaError(error, "P2025")) {
		throw new HttpError(404, "Collection not found");
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

export async function listAdminCollections(query: AdminCollectionListQuery) {
	const [total, collections] = await Promise.all([
		countAdminCollections(query),
		findAdminCollections(query),
	]);

	return {
		data: collections.map(mapCollection),
		page: query.page,
		limit: query.limit,
		total,
		totalPages: Math.ceil(total / query.limit),
	};
}

export async function createAdminCollection(
	input: AdminCollectionCreateInput,
) {
	await ensureUniqueSlug(input.slug);
	try {
		return {
			data: mapCollection(await createAdminCollectionRecord(input)),
		};
	} catch (error) {
		mapCollectionPersistenceError(error);
	}
}

export async function updateAdminCollection(
	id: string,
	input: AdminCollectionUpdateInput,
) {
	if (input.slug !== undefined) {
		await ensureUniqueSlug(input.slug, id);
	}
	try {
		return {
			data: mapCollection(await updateAdminCollectionRecord(id, input)),
		};
	} catch (error) {
		mapCollectionPersistenceError(error);
	}
}

export async function softDeleteAdminCollection(id: string) {
	try {
		return {
			data: mapCollection(await deactivateAdminCollectionRecord(id)),
			message:
				"Collection deactivated. Existing product relations are preserved.",
		};
	} catch (error) {
		mapCollectionPersistenceError(error);
	}
}
