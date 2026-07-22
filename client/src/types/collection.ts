import type { Product } from "./product";

export interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string;
  imageUrl?: string;
  products?: Product[];
  createdAt?: string;
  updatedAt?: string;
}
