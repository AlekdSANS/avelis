import { z } from "zod";
export declare function normalizeCollectionSlug(value: string): string;
export declare const adminCollectionListQuerySchema: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    status: z.ZodDefault<z.ZodEnum<{
        ARCHIVED: "ARCHIVED";
        DRAFT: "DRAFT";
        PUBLISHED: "PUBLISHED";
        all: "all";
    }>>;
    featured: z.ZodDefault<z.ZodEnum<{
        all: "all";
        false: "false";
        true: "true";
    }>>;
    sort: z.ZodDefault<z.ZodEnum<{
        "name-asc": "name-asc";
        "name-desc": "name-desc";
        newest: "newest";
        oldest: "oldest";
        "sort-order": "sort-order";
    }>>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strict>;
export declare const adminCollectionCreateSchema: z.ZodObject<{
    name: z.ZodString;
    slug: z.ZodOptional<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodString>>;
    eyebrow: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNull]>>;
    shortDescription: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNull]>>;
    description: z.ZodString;
    heroImageUrl: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNull]>>;
    cardImageUrl: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNull]>>;
    mobileImageUrl: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNull]>>;
    accentColor: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNull]>>;
    seoTitle: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNull]>>;
    seoDescription: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNull]>>;
    storyHeadline: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNull]>>;
    storyBody: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNull]>>;
    storyImageUrl: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNull]>>;
    materialNotes: z.ZodDefault<z.ZodArray<z.ZodString>>;
    campaignLabel: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNull]>>;
    status: z.ZodDefault<z.ZodEnum<{
        ARCHIVED: "ARCHIVED";
        DRAFT: "DRAFT";
        PUBLISHED: "PUBLISHED";
    }>>;
    isFeatured: z.ZodDefault<z.ZodBoolean>;
    sortOrder: z.ZodDefault<z.ZodNumber>;
    productIds: z.ZodDefault<z.ZodArray<z.ZodString>>;
}, z.core.$strict>;
export declare const adminCollectionUpdateSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodString>>;
    eyebrow: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNull]>>;
    shortDescription: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNull]>>;
    description: z.ZodOptional<z.ZodString>;
    heroImageUrl: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNull]>>;
    cardImageUrl: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNull]>>;
    mobileImageUrl: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNull]>>;
    accentColor: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNull]>>;
    status: z.ZodOptional<z.ZodEnum<{
        ARCHIVED: "ARCHIVED";
        DRAFT: "DRAFT";
        PUBLISHED: "PUBLISHED";
    }>>;
    isFeatured: z.ZodOptional<z.ZodBoolean>;
    sortOrder: z.ZodOptional<z.ZodNumber>;
    seoTitle: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNull]>>;
    seoDescription: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNull]>>;
    storyHeadline: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNull]>>;
    storyBody: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNull]>>;
    storyImageUrl: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNull]>>;
    materialNotes: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString>>>;
    campaignLabel: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNull]>>;
    productIds: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strict>;
export type AdminCollectionListQuery = z.infer<typeof adminCollectionListQuerySchema>;
export type AdminCollectionCreateInput = z.infer<typeof adminCollectionCreateSchema>;
export type AdminCollectionUpdateInput = z.infer<typeof adminCollectionUpdateSchema>;
//# sourceMappingURL=adminCollectionSchemas.d.ts.map