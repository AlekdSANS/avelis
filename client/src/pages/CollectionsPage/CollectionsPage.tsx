import { ArrowDown, ArrowRight, RefreshCcw } from "lucide-react";
import {
	useEffect,
	useRef,
	type CSSProperties,
} from "react";
import { Link } from "react-router-dom";

import {
	Button,
	ButtonLink,
} from "../../components/ui/Button/Button";
import { Skeleton } from "../../components/ui/Skeleton/Skeleton";
import { CollectionEditorialCard } from "../../features/collections/components/CollectionEditorialCard";
import { CollectionImage } from "../../features/collections/components/CollectionImage";
import {
	getCollectionArtwork,
	getCollectionArtworkStyle,
} from "../../features/collections/data/collectionArtwork";
import { useCollections } from "../../features/collections/hooks/useCollections";
import { fragranceFamilies } from "../../features/homepage/data/homepageContent";
import { useFeaturedTheme } from "../../features/homepage/hooks/useFeaturedTheme";
import { useDocumentMetadata } from "../../hooks/useDocumentMetadata";
import type { Collection } from "../../types/collection";
import styles from "./CollectionsPage.module.scss";

type CollectionsPageStyle = CSSProperties & {
	"--collections-accent": string;
	"--collections-accent-dark": string;
	"--collections-accent-soft": string;
	"--collections-hero-bg": string;
	"--collections-text": string;
};

const archivePriority: Record<string, number> = {
	"refill-ritual": 10,
	"nocturne-reserve": 20,
	"floral-light": 30,
	"water-and-air": 40,
	"signature-woods": 50,
};

function formatIndex(value: number) {
	return String(value).padStart(2, "0");
}

function getArchiveCollections(collections: Collection[]) {
	return [...collections].sort((first, second) => {
		const firstPriority = archivePriority[first.slug] ?? 100;
		const secondPriority = archivePriority[second.slug] ?? 100;

		return firstPriority - secondPriority;
	});
}

function CollectionsLoading() {
	return (
		<div aria-busy="true" aria-label="Loading collections" role="status">
			<div className={styles.loadingFeature}>
				<Skeleton />
				<div>
					<Skeleton />
					<Skeleton />
					<Skeleton />
				</div>
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
	const theme = useFeaturedTheme();
	const pageRef = useRef<HTMLDivElement>(null);
	const heroImageRef = useRef<HTMLDivElement>(null);
	const collections = collectionsQuery.data ?? [];
	const featured =
		collections.find((collection) => collection.slug === "water-and-air") ??
		collections.find((collection) => collection.isFeatured) ??
		collections[0];
	const archiveCollections = getArchiveCollections(collections);
	const featuredArtwork = featured
		? getCollectionArtwork(
				featured,
				collections.findIndex((collection) => collection.id === featured.id),
			)
		: null;
	const featuredIndex = featured
		? collections.findIndex((collection) => collection.id === featured.id) + 1
		: 1;
	const pageStyle: CollectionsPageStyle = {
		"--collections-accent": theme.accent,
		"--collections-accent-dark": theme.accentDark,
		"--collections-accent-soft": theme.accentSoft,
		"--collections-hero-bg": theme.heroBackground,
		"--collections-text": theme.textColor,
	};

	useDocumentMetadata({
		title: "Perfume Collections | AVELIS",
		description:
			"Explore AVELIS perfume collections, each composed around a distinct atmosphere, material palette and fragrance story.",
		canonicalPath: "/collections",
	});

	useEffect(() => {
		const image = heroImageRef.current;

		if (
			!image ||
			window.matchMedia("(prefers-reduced-motion: reduce)").matches
		) {
			return;
		}

		let frame = 0;
		const updateImagePosition = () => {
			frame = 0;
			const progress = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
			image.style.setProperty("--hero-shift", `${Math.round(progress * 20)}px`);
		};
		const handleScroll = () => {
			if (frame === 0) {
				frame = window.requestAnimationFrame(updateImagePosition);
			}
		};

		updateImagePosition();
		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", handleScroll);
			if (frame !== 0) {
				window.cancelAnimationFrame(frame);
			}
		};
	}, []);

	useEffect(() => {
		const root = pageRef.current;

		if (!root || !collectionsQuery.isSuccess) {
			return;
		}

		const revealElements = Array.from(
			root.querySelectorAll<HTMLElement>("[data-collection-reveal]"),
		);

		if (
			window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
			!("IntersectionObserver" in window)
		) {
			revealElements.forEach((element) => {
				element.dataset.collectionReveal = "revealed";
			});
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						(entry.target as HTMLElement).dataset.collectionReveal =
							"revealed";
						observer.unobserve(entry.target);
					}
				});
			},
			{ rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
		);

		revealElements.forEach((element) => observer.observe(element));

		return () => observer.disconnect();
	}, [collectionsQuery.isSuccess]);

	return (
		<div className={styles.page} ref={pageRef} style={pageStyle}>
			<header className={styles.hero}>
				<div className={styles.heroInner}>
					<div className={styles.heroCopy}>
						<p className={styles.eyebrow}>THE AVELIS COLLECTIONS</p>
						<h1>Worlds composed in scent</h1>
						<p className={styles.heroDescription}>
							Each Avelis collection explores a distinct atmosphere through
							fragrance, material and form.
						</p>
					</div>

					<div className={styles.heroMedia} ref={heroImageRef}>
						<CollectionImage
							alt={theme.imageAlt}
							fetchPriority="high"
							height="941"
							src={theme.image}
							width="1672"
						/>
						<div className={styles.heroCaption}>
							<span>Campaign study</span>
							<strong>{theme.title}</strong>
						</div>
					</div>

					<a className={styles.scrollCue} href="#collection-archive">
						Explore the archive
						<ArrowDown aria-hidden="true" />
					</a>
				</div>
			</header>

			{collectionsQuery.isLoading ? <CollectionsLoading /> : null}

			{collectionsQuery.isError ? (
				<section className={styles.state} role="alert">
					<p className={styles.eyebrow}>Collections unavailable</p>
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
					<p className={styles.eyebrow}>The collection archive</p>
					<h2>Collections are being composed.</h2>
					<span>Return soon to discover the next AVELIS worlds.</span>
				</section>
			) : null}

			{featured && featuredArtwork ? (
				<section
					aria-labelledby="featured-collection-title"
					className={styles.featured}
					data-collection-reveal="pending"
					style={getCollectionArtworkStyle(featuredArtwork)}
				>
					<div className={styles.featuredMedia}>
						<CollectionImage
							alt={featuredArtwork.imageAlt}
							src={featuredArtwork.image}
						/>
					</div>

					<div className={styles.featuredContent}>
						<div className={styles.featuredIndex}>
							<span>
								{formatIndex(featuredIndex)} / {formatIndex(collections.length)}
							</span>
							<span>FEATURED WORLD</span>
						</div>
						<p className={styles.featuredEyebrow}>
							{featured.eyebrow ?? "Luminous compositions"}
						</p>
						<h2 id="featured-collection-title">{featured.name}</h2>
						<p className={styles.featuredDescription}>
							{featured.slug === "water-and-air"
								? "Transparent musks, mineral brightness and pale florals suspended in cool light."
								: (featured.shortDescription ?? featured.description)}
						</p>
						<ul aria-label={`${featured.name} representative notes`}>
							{featuredArtwork.notes.map((note) => (
								<li key={note}>{note}</li>
							))}
						</ul>
						<div className={styles.featuredFooter}>
							<small>
								{featured.productCount}{" "}
								{featured.productCount === 1 ? "fragrance" : "fragrances"}
							</small>
							<Link to={`/collections/${featured.slug}`}>
								Explore collection
								<ArrowRight aria-hidden="true" />
							</Link>
						</div>
					</div>
				</section>
			) : null}

			{collections.length > 0 ? (
				<nav aria-label="Explore by fragrance family" className={styles.taxonomy}>
					<div className={styles.taxonomyInner}>
						{fragranceFamilies.map((family) => (
							<Link key={family.name} to={`/shop?family=${family.query}`}>
								{family.name}
							</Link>
						))}
					</div>
				</nav>
			) : null}

			{archiveCollections.length > 0 ? (
				<section
					aria-labelledby="collection-archive-title"
					className={styles.archive}
					id="collection-archive"
				>
					<header
						className={styles.archiveHeading}
						data-collection-reveal="pending"
					>
						<div>
							<p className={styles.eyebrow}>THE COLLECTION ARCHIVE</p>
							<h2 id="collection-archive-title">Distinct atmospheres</h2>
						</div>
						<p>
							Move through cool light, suspended petals, shadowed woods and
							the quiet ritual of return.
						</p>
					</header>

					<div className={styles.archiveGrid}>
						{archiveCollections.map((collection, index) => (
							<CollectionEditorialCard
								collection={collection}
								index={index + 1}
								key={collection.id}
								total={archiveCollections.length}
							/>
						))}
					</div>
				</section>
			) : null}

			{collections.length > 0 ? (
				<section
					aria-labelledby="collections-cta-title"
					className={styles.closing}
					data-collection-reveal="pending"
				>
					<div className={styles.closingInner}>
						<p className={styles.eyebrow}>NOT SURE WHERE TO BEGIN?</p>
						<h2 id="collections-cta-title">Follow the atmosphere</h2>
						<p>
							Move through mood, material and memory to discover the
							collection that feels closest to you.
						</p>
						<div className={styles.closingActions}>
							<ButtonLink to="/fragrance-guide">Find your scent</ButtonLink>
							<Link className={styles.textLink} to="/shop">
								Explore all fragrances
								<ArrowRight aria-hidden="true" />
							</Link>
						</div>
					</div>
				</section>
			) : null}
		</div>
	);
}
