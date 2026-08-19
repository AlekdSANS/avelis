import { ArrowLeft, Store } from "lucide-react";
import { Link } from "react-router-dom";

import styles from "./ForbiddenPage.module.scss";

export function ForbiddenPage() {
	return (
		<main className={styles.page}>
			<section aria-labelledby="forbidden-title" className={styles.card}>
				<p className={styles.eyebrow}>Restricted area</p>
				<h1 id="forbidden-title">Admin access required</h1>
				<p className={styles.message}>
					Your account does not have permission to view this area.
				</p>
				<div className={styles.actions}>
					<Link className={styles.primaryAction} to="/account">
						<ArrowLeft aria-hidden="true" />
						Return to account
					</Link>
					<Link className={styles.secondaryAction} to="/">
						<Store aria-hidden="true" />
						Return to store
					</Link>
				</div>
			</section>
		</main>
	);
}
