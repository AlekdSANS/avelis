export type CollectionFeature = {
  image: string;
  imageAlt: string;
  imagePosition: string;
  slug: string;
  title: string;
};

export type FragranceFamily = {
  description: string;
  image: string;
  imagePosition: string;
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
  {
    name: "Floral",
    description: "Petals, stems and luminous bloom.",
    image: "/images/fragrance-guide/families/floral.jpg",
    imagePosition: "center 42%",
    query: "floral",
  },
  {
    name: "Woody",
    description: "Dry timber, soft moss and quiet depth.",
    image: "/images/fragrance-guide/families/woody.jpg",
    imagePosition: "center",
    query: "woody",
  },
  {
    name: "Amber",
    description: "Resinous warmth with a golden glow.",
    image: "/images/fragrance-guide/families/amber.jpg",
    imagePosition: "center",
    query: "amber",
  },
  {
    name: "Fresh",
    description: "Clear air, citrus peel and cool water.",
    image: "/images/fragrance-guide/families/fresh.jpg",
    imagePosition: "62% center",
    query: "fresh",
  },
  {
    name: "Spicy",
    description: "Radiant heat, seed and aromatic bark.",
    image: "/images/fragrance-guide/families/spicy.jpg",
    imagePosition: "58% center",
    query: "spicy",
  },
  {
    name: "Gourmand",
    description: "Textural sweetness with modern restraint.",
    image: "/images/fragrance-guide/families/gourmand.jpg",
    imagePosition: "center",
    query: "gourmand",
  },
  {
    name: "Aquatic",
    description: "Salt air, mineral facets and transparent florals.",
    image: "/images/fragrance-guide/families/aquatic.jpg",
    imagePosition: "center",
    query: "aquatic",
  },
  {
    name: "Powdery",
    description: "Iris softness, pale woods and skin-close musk.",
    image: "/images/fragrance-guide/families/powdery.jpg",
    imagePosition: "center 35%",
    query: "powdery",
  },
];
