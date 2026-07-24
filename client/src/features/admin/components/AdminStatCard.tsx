import type { ReactNode } from "react";

import { Skeleton } from "../../../components/ui/Skeleton/Skeleton";
import styles from "./AdminStatCard.module.scss";

type AdminStatCardProps = {
	helper?: ReactNode;
	label: string;
	value: ReactNode;
};

export function AdminStatCard({
	helper,
	label,
	value,
}: AdminStatCardProps) {
	return (
		<article className={styles.card}>
			<p className={styles.label}>{label}</p>
			<p className={styles.value}>{value}</p>
			{helper === undefined ? null : (
				<p className={styles.helper}>{helper}</p>
			)}
		</article>
	);
}

export function AdminStatCardSkeleton() {
	return (
		<div aria-hidden="true" className={styles.card}>
			<Skeleton className={styles.labelSkeleton} />
			<Skeleton className={styles.valueSkeleton} />
			<Skeleton className={styles.helperSkeleton} />
		</div>
	);
}
