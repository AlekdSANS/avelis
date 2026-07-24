import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useCurrentUser } from "../hooks/useAuth";
import styles from "./RouteGuards.module.scss";

type GuestOnlyRouteProps = {
	children: ReactNode;
};

export function GuestOnlyRoute({ children }: GuestOnlyRouteProps) {
	const location = useLocation();
	const { data: user, isError, isLoading } = useCurrentUser();
	const fallback = getSafeRedirect(location.state);

	if (isLoading) {
		return (
			<section className={styles.status} aria-live="polite">
				<p>Restoring your session</p>
			</section>
		);
	}

	if (!isError && user !== null && user !== undefined) {
		return <Navigate replace to={fallback} />;
	}

	return children;
}

function getSafeRedirect(state: unknown) {
	if (
		typeof state === "object" &&
		state !== null &&
		"from" in state &&
		typeof state.from === "object" &&
		state.from !== null &&
		"pathname" in state.from &&
		typeof state.from.pathname === "string" &&
		state.from.pathname.startsWith("/") &&
		!state.from.pathname.startsWith("//")
	) {
		return state.from.pathname;
	}

	return "/account";
}
