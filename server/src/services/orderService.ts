import { createHash } from "node:crypto";
import {
	createOrderAtomically,
	type MergedOrderItem,
} from "../repositories/orderRepository.js";
import type { CreateOrderInput } from "../schemas/orderSchemas.js";
import { HttpError } from "../utils/httpError.js";
import { mapOrderDetail } from "../utils/orderMapper.js";

const MAX_QUANTITY_PER_VARIANT = 20;

export function mergeOrderItems(
	items: CreateOrderInput["items"],
): MergedOrderItem[] {
	const quantityByVariant = new Map<string, number>();

	for (const item of items) {
		const quantity =
			(quantityByVariant.get(item.variantId) ?? 0) + item.quantity;

		if (quantity > MAX_QUANTITY_PER_VARIANT) {
			throw new HttpError(
				400,
				`Quantity for variant ${item.variantId} exceeds the per-item limit`,
			);
		}

		quantityByVariant.set(item.variantId, quantity);
	}

	return [...quantityByVariant]
		.map(([variantId, quantity]) => ({
			variantId,
			quantity,
		}))
		.sort((left, right) => left.variantId.localeCompare(right.variantId));
}

export function getIdempotencyScope(
	userId: string | null,
	email: string,
	phone: string,
) {
	if (userId !== null) {
		return `user:${userId}`;
	}

	const guestIdentityHash = createHash("sha256")
		.update(`${email}\0${phone}`)
		.digest("hex");

	return `guest:${guestIdentityHash}`;
}

export async function createOrder(
	input: CreateOrderInput,
	userId: string | null,
) {
	const result = await createOrderAtomically({
		userId,
		idempotencyScope:
			input.idempotencyKey === undefined
				? null
				: getIdempotencyScope(userId, input.customer.email, input.customer.phone),
		idempotencyKey: input.idempotencyKey ?? null,
		customer: input.customer,
		shippingAddress: {
			...input.shippingAddress,
			apartment: input.shippingAddress.apartment ?? null,
			deliveryNotes: input.shippingAddress.deliveryNotes ?? null,
		},
		shippingMethod: input.shippingMethod,
		paymentMethod: input.paymentMethod,
		items: mergeOrderItems(input.items),
	});

	return {
		data: mapOrderDetail(result.order),
		replayed: result.replayed,
	};
}
