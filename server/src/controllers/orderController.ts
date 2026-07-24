import type { Request, Response } from "express";
import type {
	CreateOrderInput,
	OrderListQuery,
} from "../schemas/orderSchemas.js";
import {
	createOrder,
	getCustomerOrder,
	listCustomerOrders,
} from "../services/orderService.js";
import { HttpError } from "../utils/httpError.js";

function getAuthenticatedUserId(req: Request) {
	if (req.authUser === undefined) {
		throw new HttpError(401, "Authentication required");
	}

	return req.authUser.id;
}

export async function createOrderController(req: Request, res: Response) {
	const input = res.locals.body as CreateOrderInput;
	const result = await createOrder(input, req.authUser?.id ?? null);

	if (result.replayed) {
		res.setHeader("Idempotency-Replayed", "true");
	}

	res.status(result.replayed ? 200 : 201).json({
		data: result.data,
	});
}

export async function listOrdersController(req: Request, res: Response) {
	const query = res.locals.query as OrderListQuery;
	const result = await listCustomerOrders(getAuthenticatedUserId(req), query);

	res.status(200).json(result);
}

export async function orderDetailController(req: Request, res: Response) {
	const result = await getCustomerOrder(
		getAuthenticatedUserId(req),
		String(req.params.orderNumber ?? ""),
	);

	res.status(200).json(result);
}
