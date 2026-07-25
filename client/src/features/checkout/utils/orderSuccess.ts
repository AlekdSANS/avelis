import type { Order } from "../../../types/order";
import { trackPurchase } from "../../../services/analytics";

export function onOrderCreationConfirmed(order: Order) {
  try {
    trackPurchase(order);
  } catch {
    // Analytics must never interrupt cart clearing or confirmation navigation.
  }
}
