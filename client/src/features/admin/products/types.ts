import type { AdminProductFormValues } from "./schemas/adminProductFormSchema";

export type ProductFormMode = "create" | "edit";
export type ProductSaveIntent = "stay" | "return";

export type ProductFormSubmitHandler = (
	values: AdminProductFormValues,
	intent: ProductSaveIntent,
) => Promise<void>;

export const productFormDefaultValues: AdminProductFormValues = {
	name: "",
	slug: "",
	subtitle: "",
	description: "",
	fragranceFamily: "",
	concentration: "",
	gender: "",
	longevity: "",
	season: [],
	occasion: [],
	isActive: false,
	isFeatured: false,
	isNew: true,
	isLimited: false,
	variants: [
		{
			format: "BOTTLE",
			volumeMl: "50",
			price: "",
			compareAtPrice: "",
			sku: "",
			stock: "0",
		},
	],
	images: [],
	notes: [],
	collectionIds: [],
};
