import { Outlet } from "react-router-dom";

export function StoreLayout() {
	return (
		<div>
			<header>AVELIS Header</header>

			<main>
				<Outlet />
			</main>

			<footer>AVELIS Footer</footer>
		</div>
	);
}
