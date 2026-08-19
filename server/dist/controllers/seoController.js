import { buildRobotsTxt, buildSitemapXml } from "../services/seoService.js";
export async function sitemapController(_req, res) {
    const sitemap = await buildSitemapXml();
    res.setHeader("Cache-Control", "public, max-age=300, stale-while-revalidate=3600");
    res.type("application/xml").status(200).send(sitemap);
}
export function robotsController(_req, res) {
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.type("text/plain").status(200).send(buildRobotsTxt());
}
//# sourceMappingURL=seoController.js.map