import {
	LayoutDashboard,
	LogOut,
	Menu,
	Package,
	ShoppingBag,
	Store,
	X,
	Leaf,
	FolderOpen,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
	Link,
	NavLink,
	Outlet,
	useLocation,
	useNavigate,
} from "react-router-dom";

import { useCurrentUser, useLogout } from "../../features/auth/hooks/useAuth";
import type { AuthUser } from "../../types";
import "./AdminLayout.scss";

const adminNavigation = [
	{
		label: "Dashboard",
		to: "/admin",
		end: true,
		icon: LayoutDashboard,
	},
	{
		label: "Products",
		to: "/admin/products",
		icon: Package,
	},
	{
		label: "Orders",
		to: "/admin/orders",
		icon: ShoppingBag,
	},
	{
		label: "Notes",
		to: "/admin/notes",
		icon: Leaf,
	},
	{
		label: "Collections",
		to: "/admin/collections",
		icon: FolderOpen,
	},
];

function getPageTitle(pathname: string) {
	if (pathname === "/admin") return "Dashboard";
	if (pathname === "/admin/products") return "Products";
	if (pathname === "/admin/products/new") return "Add product";
	if (/^\/admin\/products\/[^/]+\/edit$/.test(pathname)) {
		return "Edit product";
	}
	if (/^\/admin\/orders\/[^/]+$/.test(pathname)) return "Order details";
	if (pathname.startsWith("/admin/orders")) return "Orders";
	if (pathname.startsWith("/admin/notes")) return "Fragrance notes";
	if (pathname === "/admin/collections/new") return "Create collection";
	if (/^\/admin\/collections\/[^/]+\/edit$/.test(pathname)) {
		return "Edit collection";
	}
	if (pathname.startsWith("/admin/collections")) return "Collections";

	return "Admin";
}

function getDisplayName(user: AuthUser | null | undefined) {
	if (user === null || user === undefined) {
		return "Administrator";
	}

	const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");

	return fullName.length > 0 ? fullName : user.email;
}

function AdminNavigation({
	onNavigate,
}: {
	onNavigate?: () => void;
}) {
	return (
		<nav aria-label="Admin navigation" className="admin-layout__navigation">
			<p className="admin-layout__navigation-label">Workspace</p>
			{adminNavigation.map((item) => {
				const Icon = item.icon;

				return (
					<NavLink
						className={({ isActive }) =>
							[
								"admin-layout__navigation-link",
								isActive
									? "admin-layout__navigation-link--active"
									: "",
							]
								.filter(Boolean)
								.join(" ")
						}
						end={item.end}
						key={item.to}
						onClick={onNavigate}
						to={item.to}
					>
						<Icon aria-hidden="true" />
						<span>{item.label}</span>
					</NavLink>
				);
			})}
		</nav>
	);
}

export function AdminLayout() {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const { data: user } = useCurrentUser();
	const logout = useLogout();
	const [mobileNavigationPath, setMobileNavigationPath] = useState<
		string | null
	>(null);
	const isMobileNavigationOpen = mobileNavigationPath === pathname;
	const menuButtonRef = useRef<HTMLButtonElement>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);
	const mobileDrawerRef = useRef<HTMLElement>(null);
	const wasNavigationOpenRef = useRef(false);
	const pageTitle = getPageTitle(pathname);
	const displayName = getDisplayName(user);

	useEffect(() => {
		if (!isMobileNavigationOpen) {
			if (wasNavigationOpenRef.current) {
				menuButtonRef.current?.focus();
			}

			wasNavigationOpenRef.current = false;
			return;
		}

		wasNavigationOpenRef.current = true;
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		closeButtonRef.current?.focus();

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setMobileNavigationPath(null);
				return;
			}

			if (event.key !== "Tab" || mobileDrawerRef.current === null) {
				return;
			}

			const focusableElements = Array.from(
				mobileDrawerRef.current.querySelectorAll<HTMLElement>(
					'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
				),
			);
			const firstElement = focusableElements[0];
			const lastElement = focusableElements.at(-1);

			if (firstElement === undefined || lastElement === undefined) {
				return;
			}

			if (event.shiftKey && document.activeElement === firstElement) {
				event.preventDefault();
				lastElement.focus();
			} else if (
				!event.shiftKey &&
				document.activeElement === lastElement
			) {
				event.preventDefault();
				firstElement.focus();
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.body.style.overflow = previousOverflow;
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isMobileNavigationOpen]);

	const handleLogout = async () => {
		try {
			await logout.mutateAsync();
			navigate("/login", { replace: true });
		} catch {
			return;
		}
	};

	return (
		<div className="admin-layout">
			<aside
				aria-label="Admin workspace"
				className="admin-layout__sidebar"
			>
				<Link
					aria-label="AVELIS admin dashboard"
					className="admin-layout__brand"
					to="/admin"
				>
					<span aria-hidden="true" className="admin-layout__brand-mark">
						A
					</span>
					<span>
						<strong>AVELIS</strong>
						<small>Administration</small>
					</span>
				</Link>

				<AdminNavigation />

				<div className="admin-layout__sidebar-footer">
					<div className="admin-layout__identity">
						<span aria-hidden="true">
							{displayName.slice(0, 1).toUpperCase()}
						</span>
						<div>
							<strong>{displayName}</strong>
							<small>{user?.email ?? "Admin account"}</small>
						</div>
					</div>
					<Link className="admin-layout__utility-link" to="/">
						<Store aria-hidden="true" />
						Back to store
					</Link>
					<button
						className="admin-layout__utility-link"
						disabled={logout.isPending}
						onClick={() => {
							void handleLogout();
						}}
						type="button"
					>
						<LogOut aria-hidden="true" />
						{logout.isPending ? "Signing out…" : "Sign out"}
					</button>
				</div>
			</aside>

			<div className="admin-layout__workspace">
				<header className="admin-layout__topbar">
					<div className="admin-layout__topbar-title">
						<button
							aria-controls="admin-mobile-navigation"
							aria-expanded={isMobileNavigationOpen}
							aria-label="Open admin navigation"
							className="admin-layout__menu-button"
							onClick={() => setMobileNavigationPath(pathname)}
							ref={menuButtonRef}
							type="button"
						>
							<Menu aria-hidden="true" />
						</button>
						<div>
							<span>Admin</span>
							<h1>{pageTitle}</h1>
						</div>
					</div>
					<div className="admin-layout__topbar-actions">
						<Link to="/">
							<Store aria-hidden="true" />
							<span>Storefront</span>
						</Link>
						<div className="admin-layout__topbar-identity">
							<strong>{displayName}</strong>
							<small>{user?.email ?? "Admin account"}</small>
						</div>
					</div>
				</header>

				<main className="admin-layout__content">
					<Outlet />
				</main>
			</div>

			{isMobileNavigationOpen ? (
				<div className="admin-layout__mobile-layer">
					<button
						aria-label="Close admin navigation"
						className="admin-layout__backdrop"
						onClick={() => setMobileNavigationPath(null)}
						type="button"
					/>
					<aside
						aria-label="Mobile admin workspace"
						className="admin-layout__mobile-drawer"
						id="admin-mobile-navigation"
						ref={mobileDrawerRef}
					>
						<div className="admin-layout__mobile-header">
							<Link
								aria-label="AVELIS admin dashboard"
								className="admin-layout__brand"
								onClick={() => setMobileNavigationPath(null)}
								to="/admin"
							>
								<span
									aria-hidden="true"
									className="admin-layout__brand-mark"
								>
									A
								</span>
								<span>
									<strong>AVELIS</strong>
									<small>Administration</small>
								</span>
							</Link>
							<button
								aria-label="Close admin navigation"
								className="admin-layout__close-button"
								onClick={() => setMobileNavigationPath(null)}
								ref={closeButtonRef}
								type="button"
							>
								<X aria-hidden="true" />
							</button>
						</div>

						<AdminNavigation
							onNavigate={() => setMobileNavigationPath(null)}
						/>

						<div className="admin-layout__sidebar-footer">
							<div className="admin-layout__identity">
								<span aria-hidden="true">
									{displayName.slice(0, 1).toUpperCase()}
								</span>
								<div>
									<strong>{displayName}</strong>
									<small>{user?.email ?? "Admin account"}</small>
								</div>
							</div>
							<Link
								className="admin-layout__utility-link"
								onClick={() => setMobileNavigationPath(null)}
								to="/"
							>
								<Store aria-hidden="true" />
								Back to store
							</Link>
							<button
								className="admin-layout__utility-link"
								disabled={logout.isPending}
								onClick={() => {
									void handleLogout();
								}}
								type="button"
							>
								<LogOut aria-hidden="true" />
								{logout.isPending ? "Signing out…" : "Sign out"}
							</button>
						</div>
					</aside>
				</div>
			) : null}
		</div>
	);
}
