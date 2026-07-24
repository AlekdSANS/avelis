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
