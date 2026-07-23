export type FeaturedProduct = {
  badges: string[];
  collectionLabel: string;
  description: string;
  family: string;
  image: string;
  imageAlt: string;
  name: string;
  price: number;
  slug: string;
};

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

export const featuredProducts: FeaturedProduct[] = [
  {
    badges: ["New"],
    collectionLabel: "New collection 01",
    description: "Soft peach and magnolia settle into a warm, polished wood accord.",
    family: "Floral woody",
    image: "/images/hero/home_hero_peach.png",
    imageAlt: "Peachwood perfume bottle with peach magnolia.",
    name: "Peachwood",
    price: 499,
    slug: "peachwood",
  },
  {
    badges: ["New"],
    collectionLabel: "New collection 01",
    description: "Cool petals and pale woods composed with a crystalline, mineral clarity.",
    family: "Fresh woody",
    image: "/images/hero/home_hero_frost.png",
    imageAlt: "Bluewood perfume bottle with pale blue magnolia.",
    name: "Bluewood",
    price: 499,
    slug: "bluewood",
  },
  {
    badges: ["New"],
    collectionLabel: "New collection 01",
    description: "Red blossoms, glowing spice and warm woods shaped with confident depth.",
    family: "Spicy woody",
    image: "/images/hero/home_hero_red.png",
    imageAlt: "Redwood perfume bottle with deep red magnolia.",
    name: "Redwood",
    price: 519,
    slug: "redwood",
  },
  {
    badges: ["New", "Limited"],
    collectionLabel: "Atelier edition",
    description: "A forthcoming amber-musk study balancing soft smoke and clean warmth.",
    family: "Amber musk",
    image: "/images/placeholders/product_placeholder.png",
    imageAlt: "Placeholder artwork for the forthcoming White Ember fragrance.",
    name: "White Ember",
    price: 459,
    slug: "white-ember",
  },
];

export const collectionFeatures: CollectionFeature[] = [
  {
    image: "/images/placeholders/collection_placeholder.png",
    imageAlt: "Placeholder image for the New Arrivals collection.",
    imagePosition: "center",
    slug: "new-arrivals",
    title: "New Arrivals",
  },
  {
    image: "/images/placeholders/collection_placeholder.png",
    imageAlt: "Placeholder image for the Best Sellers collection.",
    imagePosition: "center",
    slug: "best-sellers",
    title: "Best Sellers",
  },
  {
    image: "/images/placeholders/collection_placeholder.png",
    imageAlt: "Placeholder image for the Seasonal Scents collection.",
    imagePosition: "center",
    slug: "seasonal-scents",
    title: "Seasonal Scents",
  },
  {
    image: "/images/placeholders/collection_placeholder.png",
    imageAlt: "Placeholder image for the Limited Editions collection.",
    imagePosition: "center",
    slug: "limited-editions",
    title: "Limited Editions",
  },
  {
    image: "/images/placeholders/collection_placeholder.png",
    imageAlt: "Placeholder image for the Everyday Fragrances collection.",
    imagePosition: "center",
    slug: "everyday-fragrances",
    title: "Everyday Fragrances",
  },
  {
    image: "/images/placeholders/collection_placeholder.png",
    imageAlt: "Placeholder image for the Gift Sets collection.",
    imagePosition: "center",
    slug: "gift-sets",
    title: "Gift Sets",
  },
];

export const fragranceFamilies: FragranceFamily[] = [
  { name: "Floral", description: "Petals, stems and luminous bloom.", query: "floral" },
  { name: "Woody", description: "Dry timber, soft moss and quiet depth.", query: "woody" },
  { name: "Amber", description: "Resinous warmth with a golden glow.", query: "amber" },
  { name: "Fresh", description: "Clear air, citrus peel and cool water.", query: "fresh" },
  { name: "Spicy", description: "Radiant heat, seed and aromatic bark.", query: "spicy" },
  { name: "Gourmand", description: "Textural sweetness with modern restraint.", query: "gourmand" },
];
