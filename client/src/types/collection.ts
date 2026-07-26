import type { Product } from "./product";

export interface Collection {
  id: string;
  slug: string;
  name: string;
  eyebrow: string | null;
  shortDescription: string | null;
  description: string;
  heroImageUrl: string | null;
  cardImageUrl: string | null;
  mobileImageUrl: string | null;
  accentColor: string | null;
  isFeatured: boolean;
  productCount: number;
  products?: Product[];
  seoTitle?: string | null;
  seoDescription?: string | null;
}
