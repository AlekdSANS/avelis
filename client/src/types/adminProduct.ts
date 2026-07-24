import type { ApiResponse, PaginatedResponse } from "./api";
import type {
	FragranceNoteType,
	ProductImageType,
	ProductVariantFormat,
} from "./product";

export type AdminProductStatusFilter =
	| "all"
	| "active"
	| "inactive"
	| "featured"
	| "new"
	| "limited";

export type AdminProductStockFilter =
	| "all"
	| "in-stock"
	| "low-stock"
	| "out-of-stock";

export type AdminProductSort =
	| "newest"
	| "oldest"
	| "name-asc"
	| "name-desc"
	| "price-asc"
	| "price-desc"
	| "stock-asc"
	| "stock-desc";

export interface AdminProductListParams {
	search?: string;
	status?: AdminProductStatusFilter;
	family?: string;
	concentration?: string;
	format?: "all" | ProductVariantFormat;
	collection?: string;
	stock?: AdminProductStockFilter;
	sort?: AdminProductSort;
	page?: number;
	limit?: number;
}

export interface AdminProductPrimaryImage {
	url: string;
	alt: string;
}

export interface AdminProductListItem {
	id: string;
	slug: string;
	name: string;
	fragranceFamily: string;
	concentration: string;
	isActive: boolean;
	isFeatured: boolean;
	isNew: boolean;
	isLimited: boolean;
	primaryImage: AdminProductPrimaryImage | null;
	startingPrice: number | null;
	variantCount: number;
	totalStock: number;
	lowStockVariantCount: number;
	outOfStockVariantCount: number;
	collectionCount: number;
	updatedAt: string;
}

export interface AdminProductVariant {
	id: string;
	format: ProductVariantFormat;
	volumeMl: number;
	price: number;
	compareAtPrice: number | null;
	sku: string;
	stock: number;
}

export interface AdminProductImage {
	id: string;
	url: string;
	alt: string;
	position: number;
	isPrimary: boolean;
	imageType: ProductImageType;
}

export interface AdminProductNote {
	noteId: string;
	name: string;
	type: FragranceNoteType;
	position: number;
}

export interface AdminProductCollection {
	id: string;
	slug: string;
	name: string;
}

export interface AdminProductDetail {
	id: string;
	slug: string;
	name: string;
	subtitle: string | null;
	description: string;
	fragranceFamily: string;
	concentration: string;
	gender: string | null;
	longevity: string | null;
	season: string[];
	occasion: string[];
	isActive: boolean;
	isFeatured: boolean;
	isNew: boolean;
	isLimited: boolean;
	variants: AdminProductVariant[];
	images: AdminProductImage[];
	notes: AdminProductNote[];
	collections: AdminProductCollection[];
	createdAt: string;
	updatedAt: string;
}

export interface AdminProductVariantCreateInput {
	format: ProductVariantFormat;
	volumeMl: number;
	price: number;
	compareAtPrice: number | null;
	sku: string;
	stock: number;
}

export interface AdminProductVariantUpdateInput
	extends AdminProductVariantCreateInput {
	id?: string;
}

export interface AdminProductImageCreateInput {
	url: string;
	alt: string;
	position: number;
	isPrimary: boolean;
	imageType: ProductImageType;
}

export interface AdminProductImageUpdateInput
	extends AdminProductImageCreateInput {
	id?: string;
}

export interface AdminProductNoteInput {
	noteId: string;
	type: FragranceNoteType;
	position: number;
}

export interface AdminProductCreateInput {
	name: string;
	slug: string;
	subtitle?: string | null;
	description: string;
	fragranceFamily: string;
	concentration: string;
	gender?: string | null;
	longevity?: string | null;
	season?: string[];
	occasion?: string[];
	isActive?: boolean;
	isFeatured?: boolean;
	isNew?: boolean;
	isLimited?: boolean;
	variants: AdminProductVariantCreateInput[];
	images?: AdminProductImageCreateInput[];
	notes?: AdminProductNoteInput[];
	collectionIds?: string[];
}

export interface AdminProductUpdateInput {
	name?: string;
	slug?: string;
	subtitle?: string | null;
	description?: string;
	fragranceFamily?: string;
	concentration?: string;
	gender?: string | null;
	longevity?: string | null;
	season?: string[];
	occasion?: string[];
	isActive?: boolean;
	isFeatured?: boolean;
	isNew?: boolean;
	isLimited?: boolean;
	variants?: AdminProductVariantUpdateInput[];
	images?: AdminProductImageUpdateInput[];
	notes?: AdminProductNoteInput[];
	collectionIds?: string[];
}

export interface AdminProductStatusInput {
	isActive?: boolean;
	isFeatured?: boolean;
	isNew?: boolean;
	isLimited?: boolean;
}

export type AdminProductListResponse =
	PaginatedResponse<AdminProductListItem>;
export type AdminProductDetailResponse = ApiResponse<AdminProductDetail>;
export type AdminProductSummaryResponse = ApiResponse<AdminProductListItem>;
export type AdminProductDeleteResponse = AdminProductSummaryResponse & {
	message: string;
};
