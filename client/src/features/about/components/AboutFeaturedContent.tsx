import { CollectionCard } from "../../collections/components/CollectionCard";
import { useCollections } from "../../collections/hooks/useCollections";
import { Skeleton } from "../../../components/ui/Skeleton/Skeleton";
import styles from "../../../pages/AboutPage/AboutPage.module.scss";

function FeaturedCollectionsLoading() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading selected collections"
      className={styles.featuredGrid}
      role="status"
    >
      {Array.from({ length: 3 }, (_, index) => (
        <div className={styles.featuredSkeleton} key={index}>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ))}
    </div>
  );
}

export function AboutFeaturedContent() {
  const collectionsQuery = useCollections();
  const selectedCollections = [...(collectionsQuery.data ?? [])]
    .sort(
      (left, right) => Number(right.isFeatured) - Number(left.isFeatured),
    )
    .slice(0, 3);

  if (
    collectionsQuery.isError ||
    (collectionsQuery.isSuccess && selectedCollections.length === 0)
  ) {
    return null;
  }

  return (
    <section
      aria-labelledby="about-collections-title"
      className={styles.featuredCollections}
    >
      <header className={styles.featuredHeader}>
        <div>
          <p className={styles.eyebrow}>Selected collections</p>
          <h2 id="about-collections-title">Explore the worlds of Avelis</h2>
        </div>
        <p>
          Each collection gives its own atmosphere a palette, material language
          and family of fragrances.
        </p>
      </header>

      {collectionsQuery.isLoading ? <FeaturedCollectionsLoading /> : null}

      {selectedCollections.length > 0 ? (
        <div className={styles.featuredGrid}>
          {selectedCollections.map((collection) => (
            <CollectionCard
              collection={collection}
              headingLevel={3}
              key={collection.id}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
