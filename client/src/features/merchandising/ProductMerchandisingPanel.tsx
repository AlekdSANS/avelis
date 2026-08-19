import { useQuery } from "@tanstack/react-query";
import { Bell, CheckCircle2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { ProductGrid } from "../../components/commerce/ProductGrid/ProductGrid";
import { useCurrentUser } from "../auth/hooks/useAuth";
import { useLocalWishlist } from "../products/hooks/useLocalWishlist";
import { merchandisingService } from "../../services/merchandisingService";
import { formatCurrency } from "../../utils/currency";
import styles from "./ProductMerchandisingPanel.module.scss";
export function ProductMerchandisingPanel({ productId, productName }: { productId: string; productName: string }) {
  const query = useQuery({ queryKey: ["product-merchandising", productId], queryFn: () => merchandisingService.getProduct(productId) });
  const user = useCurrentUser(); const { wishlist, toggleWishlist } = useLocalWishlist(); const [email, setEmail] = useState(user.data?.email ?? ""); const [saved, setSaved] = useState(false); const [error, setError] = useState("");
  const data = query.data; if (!data) return null;
  const submit = async (event: FormEvent) => { event.preventDefault(); setError(""); try { await merchandisingService.subscribeStock(productId, email); setSaved(true); } catch (caught) { setError(caught instanceof Error ? caught.message : "Alert could not be saved."); } };
  return <>
    {data.sampleAvailable || data.lowStock || data.outOfStock ? <aside className={styles.notices} aria-label="Availability details">
      {data.sampleAvailable ? <div><p>Try it first</p><h3>2 ml samples available{data.samplePrice !== null ? ` for ${formatCurrency(data.samplePrice)}` : ""}.</h3><span>Sample availability is managed by the atelier and shown before choosing a full format.</span></div> : null}
      {data.lowStock ? <div><p>Limited availability</p><h3>The remaining edition is running low.</h3><span>Stock messages reflect the threshold managed by the merchandising team.</span></div> : null}
      {data.outOfStock && data.backInStockEnabled ? <form onSubmit={submit}><Bell aria-hidden="true" /><h3>Let me know when {productName} returns.</h3>{saved ? <p><CheckCircle2 aria-hidden="true" />Alert saved for {email}.</p> : <><label>Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label><button type="submit">Save back-in-stock alert</button>{error ? <p role="alert">{error}</p> : null}</>}</form> : null}
    </aside> : null}
    {data.recommendations.length ? <section className={styles.recommendations} aria-labelledby="curated-recommendations"><header><p>Curated by AVELIS</p><h2 id="curated-recommendations">Continue the composition.</h2></header><ProductGrid itemListId="curated_recommendations" itemListName="Curated recommendations" items={data.recommendations.map((product) => ({ product }))} onWishlistToggle={toggleWishlist} wishlist={wishlist} /></section> : null}
  </>;
}
