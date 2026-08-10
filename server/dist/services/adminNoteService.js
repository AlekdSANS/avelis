import { countAdminNotes, createAdminNoteRecord, deactivateAdminNoteRecord, findAdminNoteByName, findAdminNotes, updateAdminNoteRecord, } from "../repositories/adminNoteRepository.js";
import { HttpError } from "../utils/httpError.js";
function mapNote(note) {
    return {
        id: note.id,
        name: note.name,
        isActive: note.isActive,
        productCount: note._count.products,
        createdAt: note.createdAt.toISOString(),
        updatedAt: note.updatedAt.toISOString(),
    };
}
function isPrismaError(error, code) {
    return (typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === code);
}
function mapNotePersistenceError(error) {
    if (isPrismaError(error, "P2025")) {
        throw new HttpError(404, "Fragrance note not found");
    }
    if (isPrismaError(error, "P2002")) {
        throw new HttpError(409, "A fragrance note with this name already exists");
    }
    throw error;
}
async function ensureUniqueName(name, excludingId) {
    if ((await findAdminNoteByName(name, excludingId)) !== null) {
        throw new HttpError(409, "A fragrance note with this name already exists");
    }
}
export async function listAdminNotes(query) {
    const [total, notes] = await Promise.all([
        countAdminNotes(query),
        findAdminNotes(query),
    ]);
    return {
        data: notes.map(mapNote),
        page: query.page,
        limit: query.limit,
        total,
        totalPages: Math.ceil(total / query.limit),
    };
}
export async function createAdminNote(input) {
    await ensureUniqueName(input.name);
    try {
        return { data: mapNote(await createAdminNoteRecord(input)) };
    }
    catch (error) {
        mapNotePersistenceError(error);
    }
}
export async function updateAdminNote(id, input) {
    if (input.name !== undefined) {
        await ensureUniqueName(input.name, id);
    }
    try {
        return { data: mapNote(await updateAdminNoteRecord(id, input)) };
    }
    catch (error) {
        mapNotePersistenceError(error);
    }
}
export async function softDeleteAdminNote(id) {
    try {
        return {
            data: mapNote(await deactivateAdminNoteRecord(id)),
            message: "Fragrance note deactivated. Existing product relations are preserved.",
        };
    }
    catch (error) {
        mapNotePersistenceError(error);
    }
}
//# sourceMappingURL=adminNoteService.js.map