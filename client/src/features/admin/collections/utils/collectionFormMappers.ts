import {
	createCollectionSlug,
	type AdminCollectionFormValues,
} from "../schemas/adminCollectionFormSchema";

function emptyToNull(value: string) {
	return value.trim().length === 0 ? null : value.trim();
}

export function collectionFormValuesToInput(values: AdminCollectionFormValues) {
	return {
		name: values.name.trim(),
		slug: createCollectionSlug(values.slug),
		eyebrow: emptyToNull(values.eyebrow),
		shortDescription: emptyToNull(values.shortDescription),
		description: values.description.trim(),
		heroImageUrl: emptyToNull(values.heroImageUrl),
		cardImageUrl: emptyToNull(values.cardImageUrl),
		mobileImageUrl: emptyToNull(values.mobileImageUrl),
		accentColor: emptyToNull(values.accentColor),
		status: values.status,
		isFeatured: values.isFeatured,
		sortOrder: values.sortOrder,
		seoTitle: emptyToNull(values.seoTitle),
		seoDescription: emptyToNull(values.seoDescription),
		productIds: values.productIds,
	};
}
