import { legalConfig } from "../config/legalConfig";
import { resolvePublicAssetUrl } from "../services/apiClient";
import type { Collection } from "../types/collection";
import type { Product } from "../types/product";

export type StructuredData = Record<string, unknown> | Array<Record<string, unknown>>;

export function absoluteSiteUrl(pathOrUrl: string) {
	return new URL(pathOrUrl, `${legalConfig.siteUrl.replace(/\/$/, "")}/`).href;
}

export function absoluteAssetUrl(pathOrUrl: string) {
	return absoluteSiteUrl(resolvePublicAssetUrl(pathOrUrl) ?? pathOrUrl);
}

export function getPrimaryProductImage(product: Product) {
	const image = product.images.find((candidate) => candidate.isPrimary) ?? product.images[0];
	return image ? absoluteAssetUrl(image.url) : absoluteSiteUrl("/images/hero/home_hero_frost.png");
}

export function buildProductStructuredData(product: Product): StructuredData {
	const productUrl = absoluteSiteUrl(`/products/${product.slug}`);
	const offers = product.variants.map((variant) => ({
		"@type": "Offer",
		availability: `https://schema.org/${variant.stock > 0 ? "InStock" : "OutOfStock"}`,
		itemCondition: "https://schema.org/NewCondition",
		price: variant.price.toFixed(2),
		priceCurrency: "EUR",
		sku: variant.sku,
		url: productUrl,
	}));
	const breadcrumbs = [
		{ name: "Home", url: absoluteSiteUrl("/") },
		{ name: "Shop", url: absoluteSiteUrl("/shop") },
		{ name: product.name, url: productUrl },
	];

	return [
		{
			"@context": "https://schema.org",
			"@type": "Product",
			brand: { "@type": "Brand", name: "AVELIS" },
			description: product.description,
			image: product.images.map((image) => absoluteAssetUrl(image.url)),
			name: product.name,
			offers,
			sku: product.variants[0]?.sku,
			url: productUrl,
			...(product.rating !== null && product.reviewCount > 0
				? {
					aggregateRating: {
						"@type": "AggregateRating",
						ratingValue: product.rating,
						reviewCount: product.reviewCount,
					},
				}
				: {}),
		},
		{
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			itemListElement: breadcrumbs.map((item, index) => ({
				"@type": "ListItem",
				item: item.url,
				name: item.name,
				position: index + 1,
			})),
		},
	];
}

export function buildCollectionStructuredData(collection: Collection): StructuredData {
	const collectionUrl = absoluteSiteUrl(`/collections/${collection.slug}`);
	return [
		{
			"@context": "https://schema.org",
			"@type": "CollectionPage",
			description: collection.seoDescription ?? collection.shortDescription ?? collection.description,
			image: collection.heroImageUrl ? absoluteAssetUrl(collection.heroImageUrl) : undefined,
			mainEntity: {
				"@type": "ItemList",
				itemListElement: (collection.products ?? []).map((product, index) => ({
					"@type": "ListItem",
					item: absoluteSiteUrl(`/products/${product.slug}`),
					name: product.name,
					position: index + 1,
				})),
			},
			name: collection.seoTitle ?? collection.name,
			url: collectionUrl,
		},
		{
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			itemListElement: [
				{ "@type": "ListItem", item: absoluteSiteUrl("/"), name: "Home", position: 1 },
				{ "@type": "ListItem", item: absoluteSiteUrl("/collections"), name: "Collections", position: 2 },
				{ "@type": "ListItem", item: collectionUrl, name: collection.name, position: 3 },
			],
		},
	];
}
