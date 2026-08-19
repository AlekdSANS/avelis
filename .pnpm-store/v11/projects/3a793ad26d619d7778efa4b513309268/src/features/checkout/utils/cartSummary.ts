import type { CartItem } from "../../../types/cart";
import type { ProductVariantFormat } from "../../../types/product";

export type CheckoutSummaryLine = {
	format: ProductVariantFormat;
	id: string;
	imageAlt: string;
	imageUrl?: string;
	lineTotalCents: number;
	productName: string;
	productSlug: string;
	quantity: number;
	sku: string;
	unitPriceCents: number;
	variantId: string;
	volumeMl: number;
};

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null;
}

function getImageSnapshot(product: Record<string, unknown>) {
	if (!Array.isArray(product.images)) {
		return undefined;
	}

	const images = product.images.filter(isRecord);
	const selected =
		images.find((image) => image.isPrimary === true) ??
		images.find((image) => image.imageType === "MAIN") ??
		images[0];

	return typeof selected?.url === "string" ? selected.url : undefined;
}

function mapCartItem(item: unknown): CheckoutSummaryLine | null {
	if (!isRecord(item) || !isRecord(item.product) || !isRecord(item.variant)) {
		return null;
	}

	const { product, variant } = item;
	const format = variant.format;
	const price = variant.price;
	const quantity = item.quantity;
	const volumeMl = variant.volumeMl;

	if (
		typeof item.id !== "string" ||
		typeof item.variantId !== "string" ||
		typeof product.name !== "string" ||
		typeof product.slug !== "string" ||
		typeof variant.id !== "string" ||
		typeof variant.sku !== "string" ||
		(format !== "BOTTLE" && format !== "REFILL") ||
		typeof price !== "number" ||
		!Number.isFinite(price) ||
		price < 0 ||
		typeof quantity !== "number" ||
		!Number.isInteger(quantity) ||
		quantity < 1 ||
		typeof volumeMl !== "number" ||
		!Number.isInteger(volumeMl) ||
		volumeMl < 1
	) {
		return null;
	}

	const unitPriceCents = Math.round(price * 100);

	return {
		format,
		id: item.id,
		imageAlt: `${product.name} fragrance`,
		imageUrl: getImageSnapshot(product),
		lineTotalCents: unitPriceCents * quantity,
		productName: product.name,
		productSlug: product.slug,
		quantity,
		sku: variant.sku,
		unitPriceCents,
		variantId: variant.id,
		volumeMl,
	};
}

export function createCheckoutSummaryLines(
	items: readonly CartItem[],
): CheckoutSummaryLine[] {
	return items
		.map((item) => mapCartItem(item))
		.filter((item): item is CheckoutSummaryLine => item !== null);
}

export function sumCheckoutLines(lines: readonly CheckoutSummaryLine[]) {
	return lines.reduce((sum, line) => sum + line.lineTotalCents, 0);
}
