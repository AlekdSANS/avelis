import type { Product, ProductVariant } from "./product";

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  quantity: number;
  product: Product;
  variant: ProductVariant;
}

export interface Cart {
  id?: string;
  items: CartItem[];
  subtotal: number;
  totalQuantity: number;
}

export interface AddCartItemInput {
  productId: string;
  variantId: string;
  quantity: number;
}
