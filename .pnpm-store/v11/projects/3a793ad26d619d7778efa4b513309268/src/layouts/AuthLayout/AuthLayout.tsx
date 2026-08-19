import { Outlet } from "react-router-dom";

export function AuthLayout() {
	return (
		<main>
			<section>
				<h1>AVELIS</h1>
				<Outlet />
			</section>
		</main>
	);
}
