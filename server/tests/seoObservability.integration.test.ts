import assert from "node:assert/strict";
import { once } from "node:events";
import test from "node:test";
import app from "../src/app.js";
import { prisma } from "../src/lib/prisma.js";
import { classifyOperation } from "../src/observability/metrics.js";

test("operation classification covers sensitive workflows", () => {
	assert.equal(classifyOperation("/api/admin/products"), "admin");
	assert.equal(classifyOperation("/api/orders"), "checkout");
	assert.equal(classifyOperation("/api/payments/webhook"), "payment");
	assert.equal(classifyOperation("/api/products"), "request");
});

test("SEO discovery and health endpoints expose deployable data", async (t) => {
	const server = app.listen(0);
	await once(server, "listening");
	t.after(() => new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve())));
	const address = server.address();
	assert.ok(address && typeof address === "object");
	const origin = `http://127.0.0.1:${address.port}`;

	const healthResponse = await fetch(`${origin}/api/health/live`, {
		headers: { "x-request-id": "seo-observability-test" },
	});
	assert.equal(healthResponse.status, 200);
	assert.equal(healthResponse.headers.get("x-request-id"), "seo-observability-test");
	const health = await healthResponse.json() as { requestId: string; status: string };
	assert.equal(health.status, "ok");
	assert.equal(health.requestId, "seo-observability-test");

	const sitemapResponse = await fetch(`${origin}/api/seo/sitemap.xml`);
	assert.equal(sitemapResponse.status, 200);
	assert.match(sitemapResponse.headers.get("content-type") ?? "", /xml/);
	const sitemap = await sitemapResponse.text();
	assert.match(sitemap, /<urlset/);
	const product = await prisma.product.findFirst({ where: { isActive: true }, select: { slug: true } });
	assert.ok(product);
	assert.match(sitemap, new RegExp(`/products/${product.slug}`));
	assert.doesNotMatch(sitemap, /\/admin/);

	const robotsResponse = await fetch(`${origin}/api/seo/robots.txt`);
	const robots = await robotsResponse.text();
	assert.match(robots, /Disallow: \/admin/);
	assert.match(robots, /Sitemap: .*\/sitemap\.xml/);
});
