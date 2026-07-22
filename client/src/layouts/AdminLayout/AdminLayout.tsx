import { Outlet } from "react-router-dom";

export function AdminLayout() {
	return (
		<div>
			<aside>Admin navigation</aside>

			<main>
				<Outlet />
			</main>
		</div>
	);
}
