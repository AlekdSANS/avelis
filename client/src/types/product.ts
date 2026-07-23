export type FragranceNoteType = "TOP" | "HEART" | "BASE";
export type ProductVariantFormat = "BOTTLE" | "REFILL";

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  position: number;
}

export interface ProductVariant {
  id: string;
  format: ProductVariantFormat;
  volumeMl: number;
  price: number;
  compareAtPrice?: number;
  sku: string;
  stock: number;
}

export interface ProductNote {
  id: string;
  name: string;
  type: FragranceNoteType;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
  description: string;
  fragranceFamily: string;
  concentration: string;
  genderPositioning: string;
  longevity: string;
  seasons: string[];
  occasions: string[];
  composition: string;
  ingredients: string;
  images: ProductImage[];
  variants: ProductVariant[];
  notes: ProductNote[];
  collectionSlugs: string[];
  isFeatured: boolean;
  isNew: boolean;
  isLimited: boolean;
  isBestSeller: boolean;
  isActive: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}
