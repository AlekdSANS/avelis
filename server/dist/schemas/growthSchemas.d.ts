import { z } from "zod";
export declare const reviewCreateSchema: z.ZodObject<{
    rating: z.ZodNumber;
    title: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    content: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strict>;
export declare const reviewModerationSchema: z.ZodObject<{
    status: z.ZodEnum<{
        APPROVED: "APPROVED";
        REJECTED: "REJECTED";
    }>;
}, z.core.$strict>;
export declare const journalArticleSchema: z.ZodObject<{
    slug: z.ZodString;
    title: z.ZodString;
    eyebrow: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    excerpt: z.ZodString;
    body: z.ZodString;
    coverImageUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    authorName: z.ZodDefault<z.ZodString>;
    tags: z.ZodDefault<z.ZodArray<z.ZodString>>;
    readingTimeMinutes: z.ZodDefault<z.ZodNumber>;
    status: z.ZodDefault<z.ZodEnum<{
        ARCHIVED: "ARCHIVED";
        DRAFT: "DRAFT";
        PUBLISHED: "PUBLISHED";
    }>>;
    isFeatured: z.ZodDefault<z.ZodBoolean>;
    seoTitle: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    seoDescription: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strict>;
export declare const journalArticleUpdateSchema: z.ZodObject<{
    slug: z.ZodOptional<z.ZodString>;
    title: z.ZodOptional<z.ZodString>;
    eyebrow: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    excerpt: z.ZodOptional<z.ZodString>;
    body: z.ZodOptional<z.ZodString>;
    coverImageUrl: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    authorName: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    tags: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString>>>;
    readingTimeMinutes: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        ARCHIVED: "ARCHIVED";
        DRAFT: "DRAFT";
        PUBLISHED: "PUBLISHED";
    }>>>;
    isFeatured: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    seoTitle: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    seoDescription: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
}, z.core.$strict>;
export type ReviewCreateInput = z.infer<typeof reviewCreateSchema>;
export type ReviewModerationInput = z.infer<typeof reviewModerationSchema>;
export type JournalArticleInput = z.infer<typeof journalArticleSchema>;
export type JournalArticleUpdateInput = z.infer<typeof journalArticleUpdateSchema>;
//# sourceMappingURL=growthSchemas.d.ts.map