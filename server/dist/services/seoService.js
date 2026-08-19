import { env } from "../config/env.js";
import { prisma } from "../lib/prisma.js";
const staticEntries = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/shop", changeFrequency: "daily", priority: 0.9 },
    { path: "/collections", changeFrequency: "weekly", priority: 0.8 },
    { path: "/gift-sets", changeFrequency: "weekly", priority: 0.8 },
    { path: "/scent-finder", changeFrequency: "monthly", priority: 0.7 },
    { path: "/fragrance-guide", changeFrequency: "monthly", priority: 0.7 },
    { path: "/journal", changeFrequency: "weekly", priority: 0.7 },
    { path: "/about", changeFrequency: "monthly", priority: 0.5 },
    { path: "/materials", changeFrequency: "monthly", priority: 0.5 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.3 },
    { path: "/delivery-returns", changeFrequency: "monthly", priority: 0.3 },
    { path: "/faq", changeFrequency: "monthly", priority: 0.4 },
];
function escapeXml(value) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&apos;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
}
function publicUrl(path) {
    return new URL(path, `${env.CLIENT_ORIGIN.replace(/\/$/, "")}/`).href;
}
export async function buildSitemapXml() {
    const [products, collections, articles] = await Promise.all([
        prisma.product.findMany({
            where: { isActive: true },
            select: { slug: true, updatedAt: true },
            orderBy: { slug: "asc" },
        }),
        prisma.collection.findMany({
            where: { status: "PUBLISHED" },
            select: { slug: true, updatedAt: true },
            orderBy: { slug: "asc" },
        }),
        prisma.journalArticle.findMany({
            where: { status: "PUBLISHED" },
            select: { slug: true, updatedAt: true },
            orderBy: { slug: "asc" },
        }),
    ]);
    const entries = [
        ...staticEntries,
        ...products.map((item) => ({ path: `/products/${item.slug}`, lastModified: item.updatedAt, changeFrequency: "weekly", priority: 0.8 })),
        ...collections.map((item) => ({ path: `/collections/${item.slug}`, lastModified: item.updatedAt, changeFrequency: "weekly", priority: 0.8 })),
        ...articles.map((item) => ({ path: `/journal/${item.slug}`, lastModified: item.updatedAt, changeFrequency: "monthly", priority: 0.6 })),
    ];
    const urls = entries.map((entry) => [
        "  <url>",
        `    <loc>${escapeXml(publicUrl(entry.path))}</loc>`,
        ...(entry.lastModified ? [`    <lastmod>${entry.lastModified.toISOString()}</lastmod>`] : []),
        `    <changefreq>${entry.changeFrequency}</changefreq>`,
        `    <priority>${entry.priority.toFixed(1)}</priority>`,
        "  </url>",
    ].join("\n"));
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
}
export function buildRobotsTxt() {
    return [
        "User-agent: *",
        "Allow: /",
        "Disallow: /admin",
        "Disallow: /account",
        "Disallow: /checkout",
        `Sitemap: ${publicUrl("/sitemap.xml")}`,
        "",
    ].join("\n");
}
//# sourceMappingURL=seoService.js.map