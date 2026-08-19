import styles from "./WishlistPage.module.scss";
import { useQuery } from "@tanstack/react-query";
import { ProductGrid } from "../../components/commerce/ProductGrid/ProductGrid";
import { useLocalWishlist } from "../../features/products/hooks/useLocalWishlist";
import { productService } from "../../services/productService";

export function WishlistPage() {
	const { wishlist, toggleWishlist } = useLocalWishlist();
	const products = useQuery({ queryKey: ["wishlist-catalogue"], queryFn: () => productService.getProducts({ limit: 48 }) });
	const selected = (products.data?.data ?? []).filter((product) => wishlist.has(product.id));
	return (
		<section className={styles.page}>
			<h1>Wishlist</h1>
			<p>Your saved fragrances follow your AVELIS account across signed-in devices.</p>
			<ProductGrid itemListId="account_wishlist" itemListName="Account wishlist" items={selected.map((product) => ({ product }))} onWishlistToggle={toggleWishlist} wishlist={wishlist} />
		</section>
	);
}
