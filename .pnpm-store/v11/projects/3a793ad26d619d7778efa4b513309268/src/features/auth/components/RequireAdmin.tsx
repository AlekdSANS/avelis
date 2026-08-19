import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { ForbiddenPage } from "../../../pages/ForbiddenPage/ForbiddenPage";
import { useCurrentUser } from "../hooks/useAuth";
import styles from "./RouteGuards.module.scss";

type RequireAdminProps = {
	children: ReactNode;
};

export function RequireAdmin({ children }: RequireAdminProps) {
	const location = useLocation();
	const { data: user, isError, isLoading, refetch } = useCurrentUser();

	if (isLoading) {
		return (
			<section
				aria-busy="true"
				aria-live="polite"
				className={styles.adminStatus}
			>
				<div aria-hidden="true" className={styles.adminStatusMark}>
					A
				</div>
				<p>Preparing the admin workspace</p>
			</section>
		);
	}

	if (isError) {
		return (
			<section className={styles.adminStatus} role="alert">
				<div aria-hidden="true" className={styles.adminStatusMark}>
					A
				</div>
				<h1>We could not verify your session</h1>
				<p>Check your connection and try again.</p>
				<button
					onClick={() => {
						void refetch();
					}}
					type="button"
				>
					Try again
				</button>
			</section>
		);
	}

	if (user === null || user === undefined) {
		return <Navigate replace state={{ from: location }} to="/login" />;
	}

	if (user.role !== "ADMIN") {
		return <ForbiddenPage />;
	}

	return children;
}
