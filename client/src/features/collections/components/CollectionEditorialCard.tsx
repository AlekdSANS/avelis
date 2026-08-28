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

function getVerticalTitleColumns(title: string) {
	const letters = Array.from(title.toUpperCase());
	const midpoint = Math.ceil(letters.length / 2);

	return [letters.slice(0, midpoint), letters.slice(midpoint)];
}

export function CollectionEditorialCard({
	collection,
	index,
	total,
	variant,
}: CollectionEditorialCardProps) {
	const artwork = getCollectionArtwork(collection, index - 1);
	const resolvedVariant = variant ?? artwork.layoutVariant;
	const verticalTitleColumns =
		collection.slug === "questbound"
			? getVerticalTitleColumns(collection.name)
			: null;

	return (
		<article
			className={`${styles.card} ${styles[resolvedVariant]}`}
			data-collection={collection.slug}
			data-collection-reveal="pending"
			style={getCollectionArtworkStyle(artwork)}
		>
			<Link
				aria-label={`View ${collection.name} collection`}
				className={styles.cardLink}
				to={`/collections/${collection.slug}`}
			>
				<div className={styles.media}>
					<CollectionImage
						alt={artwork.imageAlt}
						loading="lazy"
						src={artwork.image}
					/>
				</div>

				<div className={styles.content}>
					<div className={styles.meta}>
						<span>
							{formatIndex(index)} / {formatIndex(total)}
						</span>
						<span>AVELIS COLLECTION</span>
					</div>

					<div className={styles.body}>
						{verticalTitleColumns ? (
							<h3 aria-label={collection.name} className={styles.verticalTitle}>
								{verticalTitleColumns.map((column, columnIndex) => (
									<span
										aria-hidden="true"
										className={styles.verticalTitleColumn}
										key={`${collection.slug}-${columnIndex}`}
									>
										{column.map((letter, letterIndex) => (
											<span key={`${letter}-${letterIndex}`}>{letter}</span>
										))}
									</span>
								))}
							</h3>
						) : (
							<h3>{collection.name}</h3>
						)}
						<p>{collection.shortDescription ?? collection.description}</p>

						<ul aria-label={`${collection.name} representative notes`}>
							{artwork.notes.map((note) => (
								<li key={note}>{note}</li>
							))}
						</ul>
					</div>

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
