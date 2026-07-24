import { getAdminDashboardSnapshot } from "../repositories/adminRepository.js";
import { mapAdminDashboard } from "../utils/adminMapper.js";

export async function getAdminDashboard() {
	const snapshot = await getAdminDashboardSnapshot();

	return {
		data: mapAdminDashboard(snapshot),
	};
}
