import { getAdminDashboard } from "../services/adminService.js";
export async function adminDashboardController(_req, res) {
    const dashboard = await getAdminDashboard();
    res.status(200).json(dashboard);
}
//# sourceMappingURL=adminController.js.map