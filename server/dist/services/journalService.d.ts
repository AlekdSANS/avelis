import type { JournalArticleInput, JournalArticleUpdateInput } from "../schemas/growthSchemas.js";
export declare function listPublishedArticles(): Promise<{
    data: any[];
}>;
export declare function getPublishedArticle(slug: string): Promise<{
    data: any;
}>;
export declare function listAdminArticles(): Promise<{
    data: any[];
}>;
export declare function createArticle(input: JournalArticleInput): Promise<{
    data: any;
}>;
export declare function updateArticle(id: string, input: JournalArticleUpdateInput): Promise<{
    data: any;
}>;
export declare function deleteArticle(id: string): Promise<{
    data: {
        id: string;
    };
    message: string;
}>;
//# sourceMappingURL=journalService.d.ts.map