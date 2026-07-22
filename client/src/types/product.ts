export type FragranceNoteType = "TOP" | "HEART" | "BASE";

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  position: number;
}

export interface ProductVariant {
  id: string;
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
  subtitle?: string;
  description: string;
  fragranceFamily: string;
  concentration: string;
  gender?: string;
  longevity?: string;
  season?: string[];
  occasion?: string[];
  images: ProductImage[];
  variants: ProductVariant[];
  notes: ProductNote[];
  isFeatured: boolean;
  isNew: boolean;
  isLimited: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
