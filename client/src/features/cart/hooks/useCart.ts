import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { CartItem } from "../../../types/cart";
import type { Product, ProductVariant } from "../../../types/product";

const CART_STORAGE_KEY = "avelis-local-cart";

type AddCartItem = {
	product: Product;
	quantity: number;
	variant: ProductVariant;
};

type CartStore = {
	hasHydrated: boolean;
	items: CartItem[];
	addItem: (item: AddCartItem) => void;
	clearCart: () => void;
	markHydrated: () => void;
	removeItem: (itemId: string) => void;
	updateQuantity: (itemId: string, quantity: number) => void;
};

function normalizeQuantity(quantity: number, stock: number) {
	const safeStock = Number.isFinite(stock) ? Math.max(0, Math.floor(stock)) : 0;
	const safeQuantity = Number.isFinite(quantity)
		? Math.max(1, Math.floor(quantity))
		: 1;

	return Math.min(safeQuantity, safeStock);
}

const useCartStore = create<CartStore>()(
	persist(
		(set) => ({
			hasHydrated: false,
			items: [],
			addItem: ({ product, quantity, variant }) => {
				set((state) => {
					const itemId = `${product.id}:${variant.id}`;
					const existingItem = state.items.find((item) => item.id === itemId);
					const nextQuantity = normalizeQuantity(
						(existingItem?.quantity ?? 0) + quantity,
						variant.stock,
					);

					if (nextQuantity === 0) {
						return state;
					}

					const nextItem: CartItem = {
						id: itemId,
						productId: product.id,
						variantId: variant.id,
						quantity: nextQuantity,
						product,
						variant,
					};

					return {
						items:
							existingItem === undefined
								? [...state.items, nextItem]
								: state.items.map((item) =>
										item.id === itemId ? nextItem : item,
									),
					};
				});
			},
			clearCart: () => set({ items: [] }),
			markHydrated: () => set({ hasHydrated: true }),
			removeItem: (itemId) =>
				set((state) => ({
					items: state.items.filter((item) => item.id !== itemId),
				})),
			updateQuantity: (itemId, quantity) =>
				set((state) => ({
					items: state.items.map((item) =>
						item.id === itemId
							? {
									...item,
									quantity: normalizeQuantity(quantity, item.variant.stock),
								}
							: item,
					),
				})),
		}),
		{
			name: CART_STORAGE_KEY,
			storage: createJSONStorage(() => window.localStorage),
			partialize: (state) => ({ items: state.items }),
			onRehydrateStorage: () => (state) => {
				state?.markHydrated();
			},
		},
	),
);

export function useCart() {
	const store = useCartStore();
	const subtotalCents = store.items.reduce((sum, item) => {
		const unitPriceCents = Number.isFinite(item.variant.price)
			? Math.max(0, Math.round(item.variant.price * 100))
			: 0;
		const quantity = Number.isFinite(item.quantity)
			? Math.max(0, Math.floor(item.quantity))
			: 0;

		return sum + unitPriceCents * quantity;
	}, 0);

	return {
		...store,
		subtotalCents,
		totalQuantity: store.items.reduce(
			(sum, item) =>
				sum +
				(Number.isFinite(item.quantity)
					? Math.max(0, Math.floor(item.quantity))
					: 0),
			0,
		),
	};
}
