import { useQuery } from "@tanstack/react-query";

import { ApiClientError } from "../../../services/apiClient";
import { adminService } from "../../../services/adminService";

export const adminKeys = {
	all: ["admin"] as const,
	dashboard: ["admin", "dashboard"] as const,
};

export function useAdminDashboard() {
	return useQuery({
		queryKey: adminKeys.dashboard,
		queryFn: () => adminService.getDashboard(),
		staleTime: 60_000,
		retry: (failureCount, error) => {
			if (
				error instanceof ApiClientError &&
				(error.statusCode === 401 || error.statusCode === 403)
			) {
				return false;
			}

			return failureCount < 1;
		},
	});
}
