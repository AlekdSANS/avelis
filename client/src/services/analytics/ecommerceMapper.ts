import type { CartItem } from "../../types/cart";
import type { OrderItem } from "../../types/order";
import type {
  Product,
  ProductVariant,
  ProductVariantFormat,
} from "../../types/product";
import type { AnalyticsItem, AnalyticsListContext } from "./types";

function normalizeFormat(
  format: ProductVariantFormat,
): AnalyticsItem["item_category3"] {
  return format === "BOTTLE" ? "Bottle" : "Refill";
}

function normalizeQuantity(quantity: number): number {
  return Number.isFinite(quantity) ? Math.max(1, Math.floor(quantity)) : 1;
}

function normalizePrice(price: number): number {
  return Number.isFinite(price) ? Math.max(0, price) : 0;
}

export function getDefaultAnalyticsVariant(
  product: Product,
): ProductVariant | undefined {
  return [...product.variants]
    .sort((left, right) => {
      const formatDelta =
        Number(left.format === "REFILL") - Number(right.format === "REFILL");
      return formatDelta === 0
        ? left.volumeMl - right.volumeMl
        : formatDelta;
    })
    .find((variant) => variant.stock > 0);
}

export function mapProductToAnalyticsItem(
  product: Product,
  variant: ProductVariant,
  quantity = 1,
  listContext?: AnalyticsListContext,
): AnalyticsItem {
  return {
    item_id: variant.sku,
    item_name: product.name,
    item_brand: "AVELIS",
    item_category: product.fragranceFamily,
    item_category2: product.concentration,
    item_category3: normalizeFormat(variant.format),
    item_variant: `${variant.volumeMl} ml`,
    price: normalizePrice(variant.price),
    quantity: normalizeQuantity(quantity),
    ...(listContext
      ? {
          item_list_id: listContext.itemListId,
          item_list_name: listContext.itemListName,
          ...(listContext.itemIndex === undefined
            ? {}
            : { index: listContext.itemIndex }),
        }
      : {}),
  };
}

export function mapCartItemToAnalyticsItem(
  item: CartItem,
  quantity = item.quantity,
): AnalyticsItem {
  return mapProductToAnalyticsItem(
    item.product,
    item.variant,
    quantity,
  );
}

export function mapOrderItemToAnalyticsItem(item: OrderItem): AnalyticsItem {
  return {
    item_id: item.sku,
    item_name: item.productName,
    item_brand: "AVELIS",
    item_category3: normalizeFormat(item.format),
    item_variant: `${item.volumeMl} ml`,
    price: normalizePrice(item.unitPrice),
    quantity: normalizeQuantity(item.quantity),
  };
}
