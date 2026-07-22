export type FeaturedProduct = {
  badge?: string;
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
    badge: "New",
    family: "Floral woody",
    image: "/images/hero/home_hero_peach.png",
    imageAlt: "Peachwood perfume bottle with peach magnolia.",
    name: "Peachwood",
    price: 499,
    slug: "peachwood",
  },
  {
    family: "Fresh woody",
    image: "/images/hero/home_hero_frost.png",
    imageAlt: "Bluewood perfume bottle with pale blue magnolia.",
    name: "Bluewood",
    price: 499,
    slug: "bluewood",
  },
  {
    badge: "Limited",
    family: "Spicy woody",
    image: "/images/hero/home_hero_red.png",
    imageAlt: "Redwood perfume bottle with deep red magnolia.",
    name: "Redwood",
    price: 519,
    slug: "redwood",
  },
  {
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
    image: "/images/hero/home_hero_peach.png",
    imageAlt: "Peach-toned botanical perfume composition.",
    imagePosition: "42% center",
    slug: "new-arrivals",
    title: "New Arrivals",
  },
  {
    image: "/images/hero/home_hero_frost.png",
    imageAlt: "Blue botanical perfume composition.",
    imagePosition: "52% center",
    slug: "best-sellers",
    title: "Best Sellers",
  },
  {
    image: "/images/hero/home_hero_red.png",
    imageAlt: "Red botanical perfume composition.",
    imagePosition: "72% center",
    slug: "seasonal-scents",
    title: "Seasonal Scents",
  },
  {
    image: "/images/hero/home_hero_red.png",
    imageAlt: "Redwood perfume bottle in an editorial setting.",
    imagePosition: "50% 78%",
    slug: "limited-editions",
    title: "Limited Editions",
  },
  {
    image: "/images/hero/home_hero_frost.png",
    imageAlt: "Pale magnolia branches in quiet blue light.",
    imagePosition: "78% 22%",
    slug: "everyday-fragrances",
    title: "Everyday Fragrances",
  },
  {
    image: "/images/hero/home_hero_peach.png",
    imageAlt: "Peachwood perfume bottle in an editorial setting.",
    imagePosition: "50% 78%",
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
