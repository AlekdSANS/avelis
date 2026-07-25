import type { Request, Response } from "express";
import type { AdminOrderListQuery } from "../schemas/adminOrderSchemas.js";
import {
	getAdminOrder,
	listAdminOrders,
} from "../services/adminOrderService.js";

export async function listAdminOrdersController(
	_req: Request,
	res: Response,
) {
	const query = res.locals.query as AdminOrderListQuery;
	const result = await listAdminOrders(query);

	res.status(200).json(result);
}

export async function adminOrderDetailController(
	req: Request,
	res: Response,
) {
	const result = await getAdminOrder(String(req.params.orderNumber ?? ""));

	res.status(200).json(result);
}
