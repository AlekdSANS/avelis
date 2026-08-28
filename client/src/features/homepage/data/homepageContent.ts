export type CollectionFeature = {
  image: string;
  imageAlt: string;
  imagePosition: string;
  slug: string;
  title: string;
};

export type FragranceFamily = {
  description: string;
  name: string;
  query: string;
};

export const collectionFeatures: CollectionFeature[] = [
  {
	image: "/images/hero/home_hero_peach.png",
	imageAlt: "Peachwood fragrance composition representing Chromatic Woods.",
	imagePosition: "center",
	slug: "chromatic-woods",
	title: "Chromatic Woods",
  },
  {
	image: "/images/hero/home_hero_red.png",
	imageAlt: "Red-toned fragrance composition representing Resonance.",
	imagePosition: "center",
	slug: "resonance",
	title: "Resonance",
  },
  {
	image: "/images/placeholders/collection_placeholder.png",
	imageAlt: "Sculptural fragrance presentation representing Gift Sets.",
	imagePosition: "center",
	slug: "gift-sets",
	title: "Gift Sets",
  },
  {
	image: "/images/hero/home_hero_frost.png",
	imageAlt: "Cool mineral fragrance composition representing Tidal Waves.",
	imagePosition: "center",
	slug: "tidal-waves",
	title: "Tidal Waves",
  },
  {
	image: "/images/placeholders/collection_placeholder.png",
	imageAlt: "Sculptural fragrance presentation representing Questbound.",
	imagePosition: "center",
	slug: "questbound",
	title: "Questbound",
  },
  {
	image: "/images/hero/home_hero_peach.png",
	imageAlt: "Botanical fragrance composition representing The Glass Garden.",
	imagePosition: "center",
	slug: "the-glass-garden",
	title: "The Glass Garden",
  },
];

export const fragranceFamilies: FragranceFamily[] = [
  { name: "Floral", description: "Petals, stems and luminous bloom.", query: "floral" },
  { name: "Woody", description: "Dry timber, soft moss and quiet depth.", query: "woody" },
  { name: "Amber", description: "Resinous warmth with a golden glow.", query: "amber" },
  { name: "Fresh", description: "Clear air, citrus peel and cool water.", query: "fresh" },
  { name: "Spicy", description: "Radiant heat, seed and aromatic bark.", query: "spicy" },
  { name: "Gourmand", description: "Textural sweetness with modern restraint.", query: "gourmand" },
  { name: "Aquatic", description: "Salt air, mineral facets and transparent florals.", query: "aquatic" },
  { name: "Powdery", description: "Iris softness, pale woods and skin-close musk.", query: "powdery" },
];
