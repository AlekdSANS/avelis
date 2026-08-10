import { ArrowLeft, Store } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";

import "./AccountLayout.scss";

const accountNavigation = [
	{ label: "Profile", to: "/account", end: true },
	{ label: "Orders", to: "/account/orders" },
	{ label: "Wishlist", to: "/account/wishlist" },
];

export function AccountLayout() {
	return (
		<div className="account-layout">
			<aside className="account-layout__sidebar" aria-label="Account navigation">
				<p>Account</p>
				<nav>
					{accountNavigation.map((item) => (
						<NavLink
							className={({ isActive }) =>
								[
									"account-layout__link",
									isActive ? "account-layout__link--active" : "",
								]
									.filter(Boolean)
									.join(" ")
							}
							end={item.end}
							key={item.to}
							to={item.to}
						>
							{item.label}
						</NavLink>
					))}
				</nav>
				<Link className="account-layout__storefront" to="/">
					<Store aria-hidden="true" />
					<span>Back to storefront</span>
					<ArrowLeft aria-hidden="true" />
				</Link>
			</aside>

			<main className="account-layout__main">
				<Outlet />
			</main>
		</div>
	);
}
