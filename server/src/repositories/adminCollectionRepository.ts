import type { Prisma } from "../generated/prisma/client.js";
import { prisma } from "../lib/prisma.js";
import type {
	AdminCollectionCreateInput,
	AdminCollectionListQuery,
	AdminCollectionUpdateInput,
} from "../schemas/adminCollectionSchemas.js";

const adminCollectionSelect = {
	id: true,
	name: true,
	slug: true,
	description: true,
	imageUrl: true,
	isActive: true,
	createdAt: true,
	updatedAt: true,
	_count: {
		select: {
			products: true,
		},
	},
} satisfies Prisma.CollectionSelect;

function buildCollectionWhere(
	query: AdminCollectionListQuery,
): Prisma.CollectionWhereInput {
	return {
		...(query.search === undefined
			? {}
			: {
					OR: [
						{
							name: {
								contains: query.search,
								mode: "insensitive" as const,
							},
						},
						{
							slug: {
								contains: query.search,
								mode: "insensitive" as const,
							},
						},
					],
				}),
		...(query.status === "all"
			? {}
			: { isActive: query.status === "active" }),
	};
}

export function countAdminCollections(query: AdminCollectionListQuery) {
	return prisma.collection.count({ where: buildCollectionWhere(query) });
}

export function findAdminCollections(query: AdminCollectionListQuery) {
	return prisma.collection.findMany({
		where: buildCollectionWhere(query),
		select: adminCollectionSelect,
		orderBy: [{ name: "asc" }, { id: "asc" }],
		skip: (query.page - 1) * query.limit,
		take: query.limit,
	});
}

export function findAdminCollectionBySlug(
	slug: string,
	excludingId?: string,
) {
	return prisma.collection.findFirst({
		where: {
			slug,
			...(excludingId === undefined ? {} : { id: { not: excludingId } }),
		},
		select: { id: true },
	});
}

export function createAdminCollectionRecord(
	input: AdminCollectionCreateInput,
) {
	return prisma.collection.create({
		data: input,
		select: adminCollectionSelect,
	});
}

export function updateAdminCollectionRecord(
	id: string,
	input: AdminCollectionUpdateInput,
) {
	const data: Prisma.CollectionUpdateInput = {};
	if (input.name !== undefined) data.name = input.name;
	if (input.slug !== undefined) data.slug = input.slug;
	if (input.description !== undefined) data.description = input.description;
	if (input.imageUrl !== undefined) data.imageUrl = input.imageUrl;
	if (input.isActive !== undefined) data.isActive = input.isActive;

	return prisma.collection.update({
		where: { id },
		data,
		select: adminCollectionSelect,
	});
}

export function deactivateAdminCollectionRecord(id: string) {
	return prisma.collection.update({
		where: { id },
		data: { isActive: false },
		select: adminCollectionSelect,
	});
}
