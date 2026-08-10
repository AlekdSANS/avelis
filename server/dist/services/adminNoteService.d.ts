import type { AdminNoteCreateInput, AdminNoteListQuery, AdminNoteUpdateInput } from "../schemas/adminNoteSchemas.js";
export declare function listAdminNotes(query: AdminNoteListQuery): Promise<{
    data: {
        id: string;
        name: string;
        isActive: boolean;
        productCount: number;
        createdAt: string;
        updatedAt: string;
    }[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}>;
export declare function createAdminNote(input: AdminNoteCreateInput): Promise<{
    data: {
        id: string;
        name: string;
        isActive: boolean;
        productCount: number;
        createdAt: string;
        updatedAt: string;
    };
}>;
export declare function updateAdminNote(id: string, input: AdminNoteUpdateInput): Promise<{
    data: {
        id: string;
        name: string;
        isActive: boolean;
        productCount: number;
        createdAt: string;
        updatedAt: string;
    };
}>;
export declare function softDeleteAdminNote(id: string): Promise<{
    data: {
        id: string;
        name: string;
        isActive: boolean;
        productCount: number;
        createdAt: string;
        updatedAt: string;
    };
    message: string;
}>;
//# sourceMappingURL=adminNoteService.d.ts.map