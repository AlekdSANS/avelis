import type { ApiResponse, PaginatedResponse } from "./api";

export type CollectionStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";
export type AdminCollectionStatusFilter = "all" | CollectionStatus;
export type AdminCollectionFeaturedFilter = "all" | "true" | "false";
export type AdminCollectionSort =
	| "newest"
	| "oldest"
	| "name-asc"
	| "name-desc"
	| "sort-order";

export interface AdminCollectionListParams {
	search?: string;
	status?: AdminCollectionStatusFilter;
	featured?: AdminCollectionFeaturedFilter;
	sort?: AdminCollectionSort;
	page?: number;
	limit?: number;
}

export interface AdminCollectionListItem {
	id: string;
	name: string;
	slug: string;
	status: CollectionStatus;
	isFeatured: boolean;
	productCount: number;
	cardImageUrl: string | null;
	sortOrder: number;
	publishedAt: string | null;
	createdAt: string;
	updatedAt: string;
}

export interface AdminCollectionProduct {
	id: string;
	name: string;
	slug: string;
	sku: string | null;
	image: { url: string; alt: string } | null;
	isActive: boolean;
	sortOrder: number;
}

export interface AdminCollection {
	id: string;
	name: string;
	slug: string;
	eyebrow: string | null;
	shortDescription: string | null;
	description: string;
	heroImageUrl: string | null;
	cardImageUrl: string | null;
	mobileImageUrl: string | null;
	accentColor: string | null;
	status: CollectionStatus;
	isFeatured: boolean;
	sortOrder: number;
	publishedAt: string | null;
	seoTitle: string | null;
	seoDescription: string | null;
	storyHeadline: string | null;
	storyBody: string | null;
	storyImageUrl: string | null;
	materialNotes: string[];
	campaignLabel: string | null;
	productIds: string[];
	products: AdminCollectionProduct[];
	createdAt: string;
	updatedAt: string;
}

export interface AdminCollectionCreateInput {
	name: string;
	slug?: string;
	eyebrow?: string | null;
	shortDescription?: string | null;
	description: string;
	heroImageUrl?: string | null;
	cardImageUrl?: string | null;
	mobileImageUrl?: string | null;
	accentColor?: string | null;
	status?: CollectionStatus;
	isFeatured?: boolean;
	sortOrder?: number;
	seoTitle?: string | null;
	seoDescription?: string | null;
	storyHeadline?: string | null;
	storyBody?: string | null;
	storyImageUrl?: string | null;
	materialNotes?: string[];
	campaignLabel?: string | null;
	productIds?: string[];
}

export type AdminCollectionUpdateInput =
	Partial<AdminCollectionCreateInput>;

export type AdminCollectionListResponse =
	PaginatedResponse<AdminCollectionListItem>;
export type AdminCollectionResponse = ApiResponse<AdminCollection>;
export type AdminCollectionDeleteResponse = AdminCollectionResponse & {
	message: string;
};
