import { ArrowLeft, RefreshCcw } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { ProductGrid } from "../../components/commerce/ProductGrid/ProductGrid";
import { Button } from "../../components/ui/Button/Button";
import { Skeleton } from "../../components/ui/Skeleton/Skeleton";
import { CollectionImage } from "../../features/collections/components/CollectionImage";
import { useCollection } from "../../features/collections/hooks/useCollections";
import { useLocalWishlist } from "../../features/products/hooks/useLocalWishlist";
import { ApiClientError } from "../../services/apiClient";
import { useDocumentMetadata } from "../../hooks/useDocumentMetadata";
import styles from "./CollectionPage.module.scss";
import { useEffect } from "react";
import { trackGrowth } from "../../services/analytics";

type AccentStyle = React.CSSProperties & {
	"--collection-accent": string;
};

function CollectionLoading() {
	return (
		<div
			aria-busy="true"
			aria-label="Loading collection"
			className={styles.loading}
			role="status"
		>
			<Skeleton />
			<div>
				<Skeleton />
				<Skeleton />
				<Skeleton />
			</div>
		</div>
	);
}

export function CollectionPage() {
	const { slug } = useParams();
	const collectionQuery = useCollection(slug);
	const collection = collectionQuery.data;
	const { wishlist, toggleWishlist } = useLocalWishlist();
	const isNotFound =
		collectionQuery.error instanceof ApiClientError &&
		collectionQuery.error.statusCode === 404;
	useEffect(() => { if (collection?.campaignLabel) trackGrowth({ event: "collection_campaign_view", content_id: collection.id, campaign_id: collection.campaignLabel }); }, [collection]);

	useDocumentMetadata({
		title: `${collection?.seoTitle ?? collection?.name ?? "Collection"} | AVELIS`,
		description:
			collection?.seoDescription ??
			collection?.shortDescription ??
			"Discover an AVELIS perfume collection and its fragrances.",
		canonicalPath: `/collections/${slug ?? ""}`,
	});

	if (collectionQuery.isLoading) {
		return <CollectionLoading />;
	}

	if (collectionQuery.isError) {
		return (
			<section className={styles.state} role={isNotFound ? undefined : "alert"}>
				<p>{isNotFound ? "Collection not found" : "Collection unavailable"}</p>
				<h1>
					{isNotFound
						? "This world is no longer in the archive."
						: "The collection could not be shown."}
				</h1>
				<span>
					{isNotFound
						? "Explore the current AVELIS collections instead."
						: "Please try loading the collection again."}
				</span>
				{isNotFound ? (
					<Link to="/collections">
						<ArrowLeft aria-hidden="true" />
						All collections
					</Link>
				) : (
					<Button onClick={() => void collectionQuery.refetch()}>
						<RefreshCcw aria-hidden="true" />
						Try again
					</Button>
				)}
			</section>
		);
	}

	if (!collection) return null;

	const style: AccentStyle = {
		"--collection-accent": collection.accentColor ?? "#727052",
	};
	const products = collection.products ?? [];

	return (
		<article className={styles.page} style={style}>
			<header className={styles.hero}>
				<div className={styles.heroMedia}>
					<CollectionImage
						alt={`${collection.name} collection`}
						mobileSrc={collection.mobileImageUrl}
						src={collection.heroImageUrl ?? collection.cardImageUrl}
					/>
				</div>
				<div className={styles.heroContent}>
					<Link to="/collections">
						<ArrowLeft aria-hidden="true" />
						All collections
					</Link>
					<p>{collection.eyebrow ?? "Avelis collection"}</p>
					<h1>{collection.name}</h1>
					<span>
						{collection.shortDescription ?? collection.description}
					</span>
				</div>
			</header>

			<section aria-labelledby="collection-story-title" className={styles.story}>
				<div>
					<p>{collection.campaignLabel ?? "The collection story"}</p>
					<h2 id="collection-story-title">{collection.storyHeadline ?? "An atmosphere, held in fragrance."}</h2>
				</div>
				<div>
					{(collection.storyBody ?? collection.description)
						.split(/\n{2,}/)
						.filter(Boolean)
						.map((paragraph) => (
							<p key={paragraph}>{paragraph}</p>
						))}
				</div>
			</section>

			{collection.storyImageUrl || collection.materialNotes.length > 0 ? (
				<section className={styles.materialStory} aria-label="Collection materials">
					{collection.storyImageUrl ? <CollectionImage alt={`${collection.name} materials`} src={collection.storyImageUrl} /> : null}
					{collection.materialNotes.length > 0 ? <div><p>Palette and materials</p><ul>{collection.materialNotes.map((note) => <li key={note}>{note}</li>)}</ul></div> : null}
				</section>
			) : null}

			<section
				aria-labelledby="collection-products-title"
				className={styles.products}
			>
				<header>
					<p>The compositions</p>
					<h2 id="collection-products-title">
						Fragrances in this collection
					</h2>
					<span>
						{products.length}{" "}
						{products.length === 1 ? "fragrance" : "fragrances"}
					</span>
				</header>
				<ProductGrid
					emptyDescription="New fragrances may be added as this collection evolves."
					emptyLabel="A collection in progress"
					emptyTitle="No fragrances are available here yet."
					itemListId={`collection_${collection.slug}`}
					itemListName={collection.name}
					items={products.map((product) => ({ product }))}
					onWishlistToggle={toggleWishlist}
					wishlist={wishlist}
				/>
			</section>
		</article>
	);
}
