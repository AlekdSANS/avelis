import type { Prisma } from "../generated/prisma/client.js";
import type { AdminNoteCreateInput, AdminNoteListQuery, AdminNoteUpdateInput } from "../schemas/adminNoteSchemas.js";
export declare function countAdminNotes(query: AdminNoteListQuery): Prisma.PrismaPromise<number>;
export declare function findAdminNotes(query: AdminNoteListQuery): Prisma.PrismaPromise<{
    _count: {
        products: number;
    };
    createdAt: Date;
    id: string;
    isActive: boolean;
    name: string;
    updatedAt: Date;
}[]>;
export declare function findAdminNoteByName(name: string, excludingId?: string): Prisma.Prisma__NoteClient<{
    id: string;
} | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
    omit: Prisma.GlobalOmitConfig | undefined;
}>;
export declare function createAdminNoteRecord(input: AdminNoteCreateInput): Prisma.Prisma__NoteClient<{
    _count: {
        products: number;
    };
    createdAt: Date;
    id: string;
    isActive: boolean;
    name: string;
    updatedAt: Date;
}, never, import("@prisma/client/runtime/client").DefaultArgs, {
    omit: Prisma.GlobalOmitConfig | undefined;
}>;
export declare function updateAdminNoteRecord(id: string, input: AdminNoteUpdateInput): Prisma.Prisma__NoteClient<{
    _count: {
        products: number;
    };
    createdAt: Date;
    id: string;
    isActive: boolean;
    name: string;
    updatedAt: Date;
}, never, import("@prisma/client/runtime/client").DefaultArgs, {
    omit: Prisma.GlobalOmitConfig | undefined;
}>;
export declare function deactivateAdminNoteRecord(id: string): Prisma.Prisma__NoteClient<{
    _count: {
        products: number;
    };
    createdAt: Date;
    id: string;
    isActive: boolean;
    name: string;
    updatedAt: Date;
}, never, import("@prisma/client/runtime/client").DefaultArgs, {
    omit: Prisma.GlobalOmitConfig | undefined;
}>;
//# sourceMappingURL=adminNoteRepository.d.ts.map