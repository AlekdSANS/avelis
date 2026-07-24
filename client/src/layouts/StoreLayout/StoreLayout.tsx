import { Outlet } from "react-router-dom";
import { useCallback, useState } from "react";

import { CartDrawer } from "../../components/commerce/CartDrawer/CartDrawer";
import { Footer } from "../../components/common/Footer/Footer";
import { Header } from "../../components/common/Header/Header";
import { SearchOverlay } from "../../components/common/SearchOverlay/SearchOverlay";
import { useCart } from "../../features/cart/hooks/useCart";
import "./StoreLayout.scss";

export function StoreLayout() {
	const { totalQuantity } = useCart();
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [isCartOpen, setIsCartOpen] = useState(false);

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

	return (
		<div className="store-layout">
			<Header
				cartCount={totalQuantity}
				onCartOpen={openCart}
				onSearchOpen={openSearch}
			/>

			<main className="store-layout__main">
				<Outlet />
			</main>

			<Footer />
			<SearchOverlay isOpen={isSearchOpen} onClose={closeSearch} />
			<CartDrawer isOpen={isCartOpen} onClose={closeCart} />
		</div>
	);
}
