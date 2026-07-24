export type FragranceNoteType = "TOP" | "HEART" | "BASE";
export type ProductVariantFormat = "BOTTLE" | "REFILL";
export type ProductImageType = "MAIN" | "GALLERY" | "HOVER" | "REFILL";

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  position: number;
  isPrimary: boolean;
  imageType: ProductImageType;
}

export interface ProductVariant {
  id: string;
  format: ProductVariantFormat;
  volumeMl: number;
  price: number;
  compareAtPrice: number | null;
  sku: string;
  stock: number;
}

export interface ProductNote {
  name: string;
  type: FragranceNoteType;
  position: number;
}

export interface ProductCollectionSummary {
  id: string;
  slug: string;
  name: string;
  description: string;
  imageUrl: string | null;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  fragranceFamily: string;
  concentration: string;
  gender: string | null;
  longevity: string | null;
  season: string[];
  occasion: string[];
  images: ProductImage[];
  variants: ProductVariant[];
  notes: ProductNote[];
  collections: ProductCollectionSummary[];
  isFeatured: boolean;
  isNew: boolean;
  isLimited: boolean;
  isActive: boolean;
  rating: number | null;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}
