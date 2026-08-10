import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import type { Collection } from "../../../types/collection";
import {
	getCollectionArtwork,
	getCollectionArtworkStyle,
	type CollectionLayoutVariant,
} from "../data/collectionArtwork";
import { CollectionImage } from "./CollectionImage";
import styles from "./CollectionEditorialCard.module.scss";

type CollectionEditorialCardProps = {
	collection: Collection;
	index: number;
	total: number;
	variant?: CollectionLayoutVariant;
};

function formatIndex(value: number) {
	return String(value).padStart(2, "0");
}

export function CollectionEditorialCard({
	collection,
	index,
	total,
	variant,
}: CollectionEditorialCardProps) {
	const artwork = getCollectionArtwork(collection, index - 1);
	const resolvedVariant = variant ?? artwork.layoutVariant;
	const initials = collection.name
		.split(/\s+/)
		.map((word) => word[0])
		.join("")
		.slice(0, 3);

	return (
		<article
			className={`${styles.card} ${styles[resolvedVariant]}`}
			data-collection-reveal="pending"
			style={getCollectionArtworkStyle(artwork)}
		>
			<Link
				aria-label={`View ${collection.name} collection`}
				className={styles.cardLink}
				to={`/collections/${collection.slug}`}
			>
				<div className={styles.media}>
					{artwork.image ? (
						<CollectionImage
							alt={artwork.imageAlt}
							loading="lazy"
							src={artwork.image}
						/>
					) : (
						<div
							aria-label={artwork.imageAlt}
							className={styles.artPlaceholder}
							role="img"
						>
							<span>{initials}</span>
						</div>
					)}
				</div>

				<div className={styles.content}>
					<div className={styles.meta}>
						<span>
							{formatIndex(index)} / {formatIndex(total)}
						</span>
						<span>AVELIS COLLECTION</span>
					</div>

					<h3>{collection.name}</h3>
					<p>{collection.shortDescription ?? collection.description}</p>

					<ul aria-label={`${collection.name} representative notes`}>
						{artwork.notes.map((note) => (
							<li key={note}>{note}</li>
						))}
					</ul>

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
		</article>
	);
}
