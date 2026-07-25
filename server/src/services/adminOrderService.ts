import {
	findAdminOrderByNumber,
	findAdminOrderPage,
} from "../repositories/adminOrderRepository.js";
import type { AdminOrderListQuery } from "../schemas/adminOrderSchemas.js";
import {
	mapAdminOrderDetail,
	mapAdminOrderSummary,
} from "../utils/adminOrderMapper.js";
import { HttpError } from "../utils/httpError.js";

export async function listAdminOrders(query: AdminOrderListQuery) {
	const [total, orders] = await findAdminOrderPage(query);

	return {
		data: orders.map(mapAdminOrderSummary),
		page: query.page,
		limit: query.limit,
		total,
		totalPages: Math.ceil(total / query.limit),
	};
}

export async function getAdminOrder(orderNumber: string) {
	const order = await findAdminOrderByNumber(orderNumber);

	if (order === null) {
		throw new HttpError(404, "Order not found");
	}

	return {
		data: mapAdminOrderDetail(order),
	};
}
