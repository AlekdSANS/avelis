import type { Request, Response } from "express";
import type {
	AdminOrderListQuery,
	AdminOrderStatusUpdateInput,
	AdminPaymentStatusUpdateInput,
} from "../schemas/adminOrderSchemas.js";
import {
	getAdminOrder,
	listAdminOrders,
	setAdminOrderStatus,
	setAdminPaymentStatus,
} from "../services/adminOrderService.js";

export async function listAdminOrdersController(
	_req: Request,
	res: Response,
) {
	const query = res.locals.query as AdminOrderListQuery;
	const result = await listAdminOrders(query);

	res.status(200).json(result);
}

export async function updateAdminOrderStatusController(
	req: Request,
	res: Response,
) {
	const input = res.locals.body as AdminOrderStatusUpdateInput;
	const result = await setAdminOrderStatus(
		String(req.params.orderNumber ?? ""),
		input,
	);

	res.status(200).json(result);
}

export async function updateAdminPaymentStatusController(
	req: Request,
	res: Response,
) {
	const input = res.locals.body as AdminPaymentStatusUpdateInput;
	const result = await setAdminPaymentStatus(
		String(req.params.orderNumber ?? ""),
		input,
	);

	res.status(200).json(result);
}

export async function adminOrderDetailController(
	req: Request,
	res: Response,
) {
	const result = await getAdminOrder(String(req.params.orderNumber ?? ""));

	res.status(200).json(result);
}
