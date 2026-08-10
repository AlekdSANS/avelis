import { prisma } from "../lib/prisma.js";
import { HttpError } from "../utils/httpError.js";
function mapArticle(article) {
    return { ...article, publishedAt: article.publishedAt?.toISOString() ?? null, createdAt: article.createdAt.toISOString(), updatedAt: article.updatedAt.toISOString() };
}
export async function listPublishedArticles() {
    const rows = await prisma.journalArticle.findMany({ where: { status: "PUBLISHED" }, orderBy: [{ isFeatured: "desc" }, { publishedAt: "desc" }, { createdAt: "desc" }] });
    return { data: rows.map(mapArticle) };
}
export async function getPublishedArticle(slug) {
    const row = await prisma.journalArticle.findFirst({ where: { slug, status: "PUBLISHED" } });
    if (!row)
        throw new HttpError(404, "Journal article not found");
    return { data: mapArticle(row) };
}
export async function listAdminArticles() {
    const rows = await prisma.journalArticle.findMany({ orderBy: { updatedAt: "desc" } });
    return { data: rows.map(mapArticle) };
}
export async function createArticle(input) {
    const row = await prisma.journalArticle.create({ data: {
            slug: input.slug, title: input.title, eyebrow: input.eyebrow ?? null,
            excerpt: input.excerpt, body: input.body, coverImageUrl: input.coverImageUrl ?? null,
            authorName: input.authorName, tags: input.tags, readingTimeMinutes: input.readingTimeMinutes,
            status: input.status, isFeatured: input.isFeatured, seoTitle: input.seoTitle ?? null,
            seoDescription: input.seoDescription ?? null,
            publishedAt: input.status === "PUBLISHED" ? new Date() : null,
        } });
    return { data: mapArticle(row) };
}
export async function updateArticle(id, input) {
    const current = await prisma.journalArticle.findUnique({ where: { id } });
    if (!current)
        throw new HttpError(404, "Journal article not found");
    const publishedAt = input.status === "PUBLISHED" && current.publishedAt === null ? new Date() : input.status && input.status !== "PUBLISHED" ? null : undefined;
    const data = Object.fromEntries(Object.entries(input).filter(([, value]) => value !== undefined));
    if (publishedAt !== undefined)
        data.publishedAt = publishedAt;
    const row = await prisma.journalArticle.update({ where: { id }, data });
    return { data: mapArticle(row) };
}
export async function deleteArticle(id) {
    const current = await prisma.journalArticle.findUnique({ where: { id } });
    if (!current)
        throw new HttpError(404, "Journal article not found");
    await prisma.journalArticle.delete({ where: { id } });
    return { data: { id }, message: "Article deleted" };
}
//# sourceMappingURL=journalService.js.map