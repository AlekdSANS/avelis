import type { Request, Response } from "express";
import type { CreateOrderInput } from "../schemas/orderSchemas.js";
import { createOrder } from "../services/orderService.js";

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
