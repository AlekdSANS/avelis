import { z } from "zod";
const optionalString = z.preprocess((value) => (value === "" ? undefined : value), z.string().trim().min(1).optional());
const listFromQuery = (value) => {
    if (value === "" || value === undefined) {
        return undefined;
    }
    const rawValues = Array.isArray(value) ? value : [value];
    const values = rawValues
        .flatMap((item) => String(item).split(","))
        .map((item) => item.trim())
        .filter(Boolean);
    return values.length > 0 ? values : undefined;
};
const optionalStringList = z.preprocess(listFromQuery, z.array(z.string().min(1)).optional());
const optionalFormatList = z.preprocess(listFromQuery, z.array(z.enum(["BOTTLE", "REFILL"])).optional());
const optionalPositiveIntList = z.preprocess((value) => {
    const values = listFromQuery(value);
    return values?.map(Number);
}, z.array(z.number().int().positive()).optional());
const optionalPositiveInt = z.preprocess((value) => (value === "" ? undefined : value), z.coerce.number().int().positive().optional());
const optionalNonNegativeNumber = z.preprocess((value) => (value === "" ? undefined : value), z.coerce.number().nonnegative().optional());
const booleanQuery = z.preprocess((value) => (value === "" ? undefined : value), z
    .enum(["true", "false"])
    .transform((value) => value === "true")
    .optional());
export const productListQuerySchema = z.object({
    search: optionalString,
    family: optionalStringList,
    season: optionalStringList,
    concentration: optionalStringList,
    format: optionalFormatList,
    volume: optionalPositiveIntList,
    collection: optionalStringList,
    inStock: booleanQuery,
    minPrice: optionalNonNegativeNumber,
    maxPrice: optionalNonNegativeNumber,
    sort: z
        .enum(["featured", "newest", "price-asc", "price-desc", "rating"])
        .default("featured"),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(48).default(12),
});
export const featuredProductsQuerySchema = z.object({
    limit: z.coerce.number().int().positive().max(24).default(8),
});
//# sourceMappingURL=productSchemas.js.map