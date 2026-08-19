import type { AdminDashboardResponse } from "../types/admin";
import { apiClient } from "./apiClient";

export const adminService = {
	async getDashboard(): Promise<AdminDashboardResponse> {
		const response = await apiClient.get<AdminDashboardResponse>(
			"/admin/dashboard",
		);

		return response.data;
	},
};
