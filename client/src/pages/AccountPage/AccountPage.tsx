import styles from "./AccountPage.module.scss";
import { CalendarDays, Mail, Shield, UserRound } from "lucide-react";

import { useCurrentUser } from "../../features/auth/hooks/useAuth";

export function AccountPage() {
	const { data: user } = useCurrentUser();

	if (user === null || user === undefined) {
		return null;
	}

	const createdAt = new Intl.DateTimeFormat(undefined, {
		dateStyle: "medium",
	}).format(new Date(user.createdAt));

	return (
		<section className={styles.page}>
			<div className={styles.heading}>
				<p>Profile</p>
				<h1>
					{user.firstName} {user.lastName}
				</h1>
			</div>

			<div className={styles.details}>
				<div className={styles.detail}>
					<UserRound aria-hidden="true" />
					<span>Name</span>
					<strong>
						{user.firstName} {user.lastName}
					</strong>
				</div>
				<div className={styles.detail}>
					<Mail aria-hidden="true" />
					<span>Email</span>
					<strong>{user.email}</strong>
				</div>
				<div className={styles.detail}>
					<Shield aria-hidden="true" />
					<span>Role</span>
					<strong>{user.role}</strong>
				</div>
				<div className={styles.detail}>
					<CalendarDays aria-hidden="true" />
					<span>Customer since</span>
					<strong>{createdAt}</strong>
				</div>
			</div>
		</section>
	);
}
