import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import type { Collection } from "../../../types/collection";
import { getCollectionAccentStyle } from "../utils/collectionAccent";
import { CollectionImage } from "./CollectionImage";
import styles from "./CollectionCard.module.scss";

type CollectionCardProps = {
  collection: Collection;
  headingLevel?: 2 | 3;
};

export function CollectionCard({
  collection,
  headingLevel = 2,
}: CollectionCardProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <Link
      aria-label={`View ${collection.name} collection`}
      className={styles.card}
      style={getCollectionAccentStyle(collection)}
      to={`/collections/${collection.slug}`}
    >
      <div className={styles.media}>
        <CollectionImage
          alt={`${collection.name} collection`}
          loading="lazy"
          src={collection.cardImageUrl ?? collection.heroImageUrl}
        />
      </div>
      <div className={styles.content}>
        <p>{collection.eyebrow ?? "Avelis collection"}</p>
        <Heading>{collection.name}</Heading>
        <span>{collection.shortDescription ?? collection.description}</span>
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
