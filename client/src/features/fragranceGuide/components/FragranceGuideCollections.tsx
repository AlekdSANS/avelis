import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Skeleton } from "../../../components/ui/Skeleton/Skeleton";
import { CollectionImage } from "../../collections/components/CollectionImage";
import { getCollectionImageSrc } from "../../collections/data/collectionImages";
import { useCollections } from "../../collections/hooks/useCollections";
import { GuideSectionHeading } from "./GuideSectionHeading";
import styles from "../../../pages/FragranceGuidePage/FragranceGuidePage.module.scss";

export function FragranceGuideCollections() {
  const collectionsQuery = useCollections();
  const collections = (collectionsQuery.data ?? [])
    .filter((collection) => collection.productCount > 0)
    .slice(0, 3);

  if (collectionsQuery.isError) {
    return null;
  }

  if (collectionsQuery.isSuccess && collections.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="guide-collections-title"
      className={styles.section}
    >
      <div className={styles.inner}>
        <GuideSectionHeading
          description="Collections gather fragrances around a shared material palette or atmosphere, offering another way into the AVELIS catalogue."
          eyebrow="Compositions in context"
          heading="Explore fragrance worlds"
          id="guide-collections-title"
        />

        {collectionsQuery.isLoading ? (
          <div
            aria-busy="true"
            aria-label="Loading fragrance collections"
            className={styles.guideCollectionGrid}
          >
            {Array.from({ length: 3 }, (_, index) => (
              <div className={styles.collectionSkeleton} key={index}>
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.guideCollectionGrid}>
            {collections.map((collection) => (
              <Link
                className={styles.guideCollectionCard}
                key={collection.id}
                to={`/collections/${collection.slug}`}
              >
                <div className={styles.guideCollectionMedia}>
                  <CollectionImage
                    alt={`${collection.name} collection`}
                    loading="lazy"
                    src={getCollectionImageSrc(collection.slug)}
                  />
                </div>
                <div className={styles.guideCollectionCopy}>
                  <p>{collection.eyebrow ?? "AVELIS collection"}</p>
                  <h3>{collection.name}</h3>
                  <span>
                    {collection.shortDescription ?? collection.description}
                  </span>
                  <strong>
                    View collection
                    <ArrowUpRight aria-hidden="true" />
                  </strong>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
