import type { Request, Response } from "express";
import { getAdminDashboard } from "../services/adminService.js";

export async function adminDashboardController(
	_req: Request,
	res: Response,
) {
	const dashboard = await getAdminDashboard();

	res.status(200).json(dashboard);
}
