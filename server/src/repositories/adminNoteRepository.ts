import type { Prisma } from "../generated/prisma/client.js";
import { prisma } from "../lib/prisma.js";
import type {
	AdminNoteCreateInput,
	AdminNoteListQuery,
	AdminNoteUpdateInput,
} from "../schemas/adminNoteSchemas.js";

const adminNoteSelect = {
	id: true,
	name: true,
	isActive: true,
	createdAt: true,
	updatedAt: true,
	_count: {
		select: {
			products: true,
		},
	},
} satisfies Prisma.NoteSelect;

function buildNoteWhere(
	query: AdminNoteListQuery,
): Prisma.NoteWhereInput {
	return {
		...(query.search === undefined
			? {}
			: {
					name: {
						contains: query.search,
						mode: "insensitive" as const,
					},
				}),
		...(query.status === "all"
			? {}
			: { isActive: query.status === "active" }),
	};
}

export function countAdminNotes(query: AdminNoteListQuery) {
	return prisma.note.count({ where: buildNoteWhere(query) });
}

export function findAdminNotes(query: AdminNoteListQuery) {
	return prisma.note.findMany({
		where: buildNoteWhere(query),
		select: adminNoteSelect,
		orderBy: [{ name: "asc" }, { id: "asc" }],
		skip: (query.page - 1) * query.limit,
		take: query.limit,
	});
}

export function findAdminNoteByName(name: string, excludingId?: string) {
	return prisma.note.findFirst({
		where: {
			name: { equals: name, mode: "insensitive" },
			...(excludingId === undefined ? {} : { id: { not: excludingId } }),
		},
		select: { id: true },
	});
}

export function createAdminNoteRecord(input: AdminNoteCreateInput) {
	return prisma.note.create({
		data: input,
		select: adminNoteSelect,
	});
}

export function updateAdminNoteRecord(
	id: string,
	input: AdminNoteUpdateInput,
) {
	const data: Prisma.NoteUpdateInput = {};
	if (input.name !== undefined) data.name = input.name;
	if (input.isActive !== undefined) data.isActive = input.isActive;

	return prisma.note.update({
		where: { id },
		data,
		select: adminNoteSelect,
	});
}

export function deactivateAdminNoteRecord(id: string) {
	return prisma.note.update({
		where: { id },
		data: { isActive: false },
		select: adminNoteSelect,
	});
}
