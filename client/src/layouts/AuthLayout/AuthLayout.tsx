import styles from "./AuthLayout.module.scss";
import { ArrowLeft } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

import { Logo } from "../../components/common/Logo/Logo";

export function AuthLayout() {
	return (
		<div className={styles.layout}>
			<header className={styles.header}>
				<Logo className={styles.logo} showDescriptor />
				<Link className={styles.shopLink} to="/shop">
					<ArrowLeft aria-hidden="true" />
					<span>Return to the boutique</span>
				</Link>
			</header>
			<main className={styles.main}>
				<Outlet />
			</main>
		</div>
	);
}
