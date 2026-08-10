import { prisma } from "../lib/prisma.js";
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
};
function buildNoteWhere(query) {
    return {
        ...(query.search === undefined
            ? {}
            : {
                name: {
                    contains: query.search,
                    mode: "insensitive",
                },
            }),
        ...(query.status === "all"
            ? {}
            : { isActive: query.status === "active" }),
    };
}
export function countAdminNotes(query) {
    return prisma.note.count({ where: buildNoteWhere(query) });
}
export function findAdminNotes(query) {
    return prisma.note.findMany({
        where: buildNoteWhere(query),
        select: adminNoteSelect,
        orderBy: [{ name: "asc" }, { id: "asc" }],
        skip: (query.page - 1) * query.limit,
        take: query.limit,
    });
}
export function findAdminNoteByName(name, excludingId) {
    return prisma.note.findFirst({
        where: {
            name: { equals: name, mode: "insensitive" },
            ...(excludingId === undefined ? {} : { id: { not: excludingId } }),
        },
        select: { id: true },
    });
}
export function createAdminNoteRecord(input) {
    return prisma.note.create({
        data: input,
        select: adminNoteSelect,
    });
}
export function updateAdminNoteRecord(id, input) {
    const data = {};
    if (input.name !== undefined)
        data.name = input.name;
    if (input.isActive !== undefined)
        data.isActive = input.isActive;
    return prisma.note.update({
        where: { id },
        data,
        select: adminNoteSelect,
    });
}
export function deactivateAdminNoteRecord(id) {
    return prisma.note.update({
        where: { id },
        data: { isActive: false },
        select: adminNoteSelect,
    });
}
//# sourceMappingURL=adminNoteRepository.js.map