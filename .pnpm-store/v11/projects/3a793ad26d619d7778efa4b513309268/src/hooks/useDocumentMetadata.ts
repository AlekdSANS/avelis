import { useEffect } from "react";
import { absoluteAssetUrl, absoluteSiteUrl, type StructuredData } from "../utils/seo";

type DocumentMetadata = {
	canonicalPath: string;
	description: string;
	image?: string;
	robots?: "index,follow" | "noindex,nofollow";
	structuredData?: StructuredData;
	title: string;
	type?: "website" | "product" | "article";
};

function upsertMeta(selector: string, attribute: "name" | "property", value: string) {
	let element = document.querySelector<HTMLMetaElement>(selector);
	if (!element) {
		element = document.createElement("meta");
		element.setAttribute(attribute, selector.match(/\[.+?="(.+?)"\]/)?.[1] ?? "");
		document.head.append(element);
	}
	element.content = value;
	return element;
}

export function useDocumentMetadata({
	canonicalPath,
	description,
	image = "/images/hero/home_hero_frost.png",
	robots = "index,follow",
	structuredData,
	title,
	type = "website",
}: DocumentMetadata) {
	const structuredDataJson = structuredData ? JSON.stringify(structuredData) : "";
	useEffect(() => {
		const canonicalUrl = absoluteSiteUrl(canonicalPath);
		const imageUrl = absoluteAssetUrl(image);
		const existingDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
		const existingCanonical = document.querySelector<HTMLLinkElement>(
			'link[rel="canonical"]',
		);
		const descriptionElement =
			existingDescription ?? document.createElement("meta");
		const canonicalElement =
			existingCanonical ?? document.createElement("link");

		if (!existingDescription) {
			descriptionElement.name = "description";
			document.head.append(descriptionElement);
		}
		if (!existingCanonical) {
			canonicalElement.rel = "canonical";
			document.head.append(canonicalElement);
		}

		document.title = title;
		descriptionElement.content = description;
		canonicalElement.href = canonicalUrl;
		upsertMeta('meta[name="robots"]', "name", robots);
		upsertMeta('meta[property="og:site_name"]', "property", "AVELIS Parfums");
		upsertMeta('meta[property="og:title"]', "property", title);
		upsertMeta('meta[property="og:description"]', "property", description);
		upsertMeta('meta[property="og:type"]', "property", type);
		upsertMeta('meta[property="og:url"]', "property", canonicalUrl);
		upsertMeta('meta[property="og:image"]', "property", imageUrl);
		upsertMeta('meta[property="og:image:alt"]', "property", `${title} — AVELIS`);
		upsertMeta('meta[name="twitter:card"]', "name", "summary_large_image");
		upsertMeta('meta[name="twitter:title"]', "name", title);
		upsertMeta('meta[name="twitter:description"]', "name", description);
		upsertMeta('meta[name="twitter:image"]', "name", imageUrl);

		const existingJsonLd = document.querySelector<HTMLScriptElement>('script[data-avelis-seo="json-ld"]');
		if (structuredDataJson) {
			const jsonLd = existingJsonLd ?? document.createElement("script");
			jsonLd.type = "application/ld+json";
			jsonLd.dataset.avelisSeo = "json-ld";
			jsonLd.textContent = structuredDataJson;
			if (!existingJsonLd) document.head.append(jsonLd);
		} else {
			existingJsonLd?.remove();
		}
	}, [canonicalPath, description, image, robots, structuredDataJson, title, type]);
}
