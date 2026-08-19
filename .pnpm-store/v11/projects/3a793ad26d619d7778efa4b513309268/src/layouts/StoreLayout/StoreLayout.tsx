import { Outlet, useLocation } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

import { CartDrawer } from "../../components/commerce/CartDrawer/CartDrawer";
import { CookieBanner } from "../../components/common/CookieBanner/CookieBanner";
import { Footer } from "../../components/common/Footer/Footer";
import { Header } from "../../components/common/Header/Header";
import { SearchOverlay } from "../../components/common/SearchOverlay/SearchOverlay";
import { useCart } from "../../features/cart/hooks/useCart";
import "./StoreLayout.scss";
import { CustomerContinuity } from "../../features/account/CustomerContinuity";

export function StoreLayout() {
	const { pathname } = useLocation();
	const { totalQuantity } = useCart();
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [isCookiePreferencesOpen, setIsCookiePreferencesOpen] =
		useState(false);

	const closeSearch = useCallback(() => setIsSearchOpen(false), []);
	const closeCart = useCallback(() => setIsCartOpen(false), []);

	const openSearch = () => {
		setIsCartOpen(false);
		setIsSearchOpen(true);
	};

	const openCart = () => {
		setIsSearchOpen(false);
		setIsCartOpen(true);
	};

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "auto" });
	}, [pathname]);

	return (
		<div className="store-layout">
			<CustomerContinuity />
			<Header
				cartCount={totalQuantity}
				onCartOpen={openCart}
				onSearchOpen={openSearch}
			/>

			<main className="store-layout__main">
				<Outlet />
			</main>

			<Footer
				onCookieSettingsOpen={() => setIsCookiePreferencesOpen(true)}
			/>
			<CookieBanner
				isPreferencesOpen={isCookiePreferencesOpen}
				onPreferencesClose={() => setIsCookiePreferencesOpen(false)}
				onPreferencesOpen={() => setIsCookiePreferencesOpen(true)}
			/>
			<SearchOverlay isOpen={isSearchOpen} onClose={closeSearch} />
			<CartDrawer isOpen={isCartOpen} onClose={closeCart} />
		</div>
	);
}
