import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ApiClientError } from "../../../services/apiClient";
import { authService } from "../../../services/authService";
import type {
	LoginInput,
	RegisterInput,
} from "../../../services/authService";
import type { AuthUser } from "../../../types";
import { orderKeys } from "../../orders/orderQueries";
import { adminKeys } from "../../admin/hooks/useAdminDashboard";

export const authKeys = {
	me: ["auth", "me"] as const,
};

export function useCurrentUser() {
	return useQuery<AuthUser | null>({
		queryKey: authKeys.me,
		queryFn: async () => {
			try {
				return await authService.getCurrentUser();
			} catch (error) {
				if (error instanceof ApiClientError && error.statusCode === 401) {
					return null;
				}

				throw error;
			}
		},
		retry: false,
	});
}

export function useLogin() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (input: LoginInput) => authService.login(input),
		onSuccess: (response) => {
			queryClient.removeQueries({ queryKey: orderKeys.all });
			queryClient.setQueryData(authKeys.me, response.data.user);
		},
	});
}

export function useRegister() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (input: RegisterInput) => authService.register(input),
		onSuccess: (response) => {
			queryClient.removeQueries({ queryKey: orderKeys.all });
			queryClient.setQueryData(authKeys.me, response.data.user);
		},
	});
}

export function useLogout() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => authService.logout(),
		onSuccess: () => {
			queryClient.removeQueries({ queryKey: adminKeys.all });
			queryClient.removeQueries({ queryKey: orderKeys.all });
			queryClient.setQueryData(authKeys.me, null);
			queryClient.invalidateQueries({ queryKey: authKeys.me });
		},
	});
}
