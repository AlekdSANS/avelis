import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useCurrentUser } from "../hooks/useAuth";
import styles from "./RouteGuards.module.scss";

type RequireAuthProps = {
	children: ReactNode;
};

export function RequireAuth({ children }: RequireAuthProps) {
	const location = useLocation();
	const { data: user, isError, isLoading } = useCurrentUser();

	if (isLoading) {
		return <RouteGuardStatus message="Restoring your session" />;
	}

	if (isError) {
		return <RouteGuardStatus message="We could not check your session." />;
	}

	if (user === null || user === undefined) {
		return <Navigate replace state={{ from: location }} to="/login" />;
	}

	return children;
}

function RouteGuardStatus({ message }: { message: string }) {
	return (
		<section className={styles.status} aria-live="polite">
			<p>{message}</p>
		</section>
	);
}
