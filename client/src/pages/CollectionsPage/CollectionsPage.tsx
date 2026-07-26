import { ArrowRight, RefreshCcw } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button/Button";
import { Skeleton } from "../../components/ui/Skeleton/Skeleton";
import { CollectionImage } from "../../features/collections/components/CollectionImage";
import { useCollections } from "../../features/collections/hooks/useCollections";
import type { Collection } from "../../types/collection";
import styles from "./CollectionsPage.module.scss";

type AccentStyle = React.CSSProperties & {
	"--collection-accent": string;
};

function accentStyle(collection: Collection): AccentStyle {
	return {
		"--collection-accent": collection.accentColor ?? "#727052",
	};
}

function CollectionCard({ collection }: { collection: Collection }) {
	return (
		<Link
			aria-label={`View ${collection.name} collection`}
			className={styles.card}
			style={accentStyle(collection)}
			to={`/collections/${collection.slug}`}
		>
			<div className={styles.cardMedia}>
				<CollectionImage
					alt={`${collection.name} collection`}
					loading="lazy"
					src={collection.cardImageUrl ?? collection.heroImageUrl}
				/>
			</div>
			<div className={styles.cardContent}>
				<p>{collection.eyebrow ?? "Avelis collection"}</p>
				<h2>{collection.name}</h2>
				<span>
					{collection.shortDescription ?? collection.description}
				</span>
				<footer>
					<small>
						{collection.productCount}{" "}
						{collection.productCount === 1 ? "fragrance" : "fragrances"}
					</small>
					<strong>
						View collection
						<ArrowRight aria-hidden="true" />
					</strong>
				</footer>
			</div>
		</Link>
	);
}

function CollectionsLoading() {
	return (
		<div aria-busy="true" aria-label="Loading collections" role="status">
			<div className={styles.loadingHero}>
				<Skeleton />
				<Skeleton />
				<Skeleton />
			</div>
			<div className={styles.loadingGrid}>
				{Array.from({ length: 4 }, (_, index) => (
					<div key={index}>
						<Skeleton />
						<Skeleton />
						<Skeleton />
					</div>
				))}
			</div>
		</div>
	);
}

export function CollectionsPage() {
	const collectionsQuery = useCollections();
	const collections = collectionsQuery.data ?? [];
	const featured = collections.find((collection) => collection.isFeatured);
	const gridCollections = featured
		? collections.filter((collection) => collection.id !== featured.id)
		: collections;

	useEffect(() => {
		const previousTitle = document.title;
		document.title = "Perfume Collections | AVELIS";
		return () => {
			document.title = previousTitle;
		};
	}, []);

	return (
		<div className={styles.page}>
			<header className={styles.hero}>
				<div className={styles.container}>
					<p>THE AVELIS COLLECTIONS</p>
					<h1>Worlds composed in scent</h1>
					<span>
						Each Avelis collection explores a distinct atmosphere through
						fragrance, material and form.
					</span>
				</div>
			</header>

			{collectionsQuery.isLoading ? <CollectionsLoading /> : null}

			{collectionsQuery.isError ? (
				<section className={styles.state} role="alert">
					<p>Collections unavailable</p>
					<h2>The compositions could not be shown.</h2>
					<span>Please try the collection catalogue again.</span>
					<Button onClick={() => void collectionsQuery.refetch()}>
						<RefreshCcw aria-hidden="true" />
						Try again
					</Button>
				</section>
			) : null}

			{collectionsQuery.isSuccess && collections.length === 0 ? (
				<section className={styles.state}>
					<p>The collection archive</p>
					<h2>Collections are being composed.</h2>
					<span>Return soon to discover the next AVELIS worlds.</span>
				</section>
			) : null}

			{featured ? (
				<section
					aria-labelledby="featured-collection-title"
					className={styles.featured}
					style={accentStyle(featured)}
				>
					<div className={styles.featuredMedia}>
						<CollectionImage
							alt={`${featured.name} collection`}
							mobileSrc={featured.mobileImageUrl}
							src={featured.heroImageUrl ?? featured.cardImageUrl}
						/>
					</div>
					<div className={styles.featuredContent}>
						<p>{featured.eyebrow ?? "Featured collection"}</p>
						<h2 id="featured-collection-title">{featured.name}</h2>
						<span>{featured.shortDescription ?? featured.description}</span>
						<small>
							{featured.productCount}{" "}
							{featured.productCount === 1 ? "fragrance" : "fragrances"}
						</small>
						<Link to={`/collections/${featured.slug}`}>
							Explore collection
							<ArrowRight aria-hidden="true" />
						</Link>
					</div>
				</section>
			) : null}

			{gridCollections.length > 0 ? (
				<section
					aria-labelledby="collection-grid-title"
					className={styles.archive}
				>
					<div className={styles.archiveHeading}>
						<p>Explore the archive</p>
						<h2 id="collection-grid-title">Distinct atmospheres</h2>
					</div>
					<div className={styles.grid}>
						{gridCollections.map((collection) => (
							<CollectionCard collection={collection} key={collection.id} />
						))}
					</div>
				</section>
			) : null}

			{collections.length > 0 ? (
				<aside className={styles.statement}>
					<p>Fragrance is not a final note. It is a place you return to.</p>
				</aside>
			) : null}
		</div>
	);
}
