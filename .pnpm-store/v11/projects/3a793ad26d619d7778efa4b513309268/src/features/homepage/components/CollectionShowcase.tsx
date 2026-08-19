import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { collectionFeatures } from "../data/homepageContent";
import styles from "./HomepageSections.module.scss";

export function CollectionShowcase() {
	return (
		<section
			aria-labelledby="collection-showcase-title"
			className={styles.collectionSection}
		>
			<div className={styles.inner}>
				<header className={styles.sectionHeader}>
					<div>
						<h2 id="collection-showcase-title">Explore the collection</h2>
					</div>
					<Link className={styles.textLink} to="/collections">
						View all collections
						<ArrowRight aria-hidden="true" />
					</Link>
				</header>

				<div className={styles.collectionGrid}>
					{collectionFeatures.map((collection) => (
						<Link
							className={styles.collectionCard}
							key={collection.slug}
							to={`/collections/${collection.slug}`}
						>
							<div className={styles.collectionImage}>
								<img
									alt={collection.imageAlt}
									loading="lazy"
									src={collection.image}
									style={{ objectPosition: collection.imagePosition }}
								/>
							</div>
							<div className={styles.collectionLabel}>
								<h3>{collection.title}</h3>
								<ArrowRight aria-hidden="true" />
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
