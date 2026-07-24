import type { Order } from "../../../types/order";

export function onOrderCreationConfirmed(order: Order) {
  // Future purchase analytics should be emitted here, after POST /orders succeeds.
  // Keeping the callback at the mutation-success boundary avoids refresh duplicates.
  void order;
}
