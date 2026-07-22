import { Outlet } from "react-router-dom";

export function AccountLayout() {
	return (
		<div>
			<aside>Account navigation</aside>

			<main>
				<Outlet />
			</main>
		</div>
	);
}
