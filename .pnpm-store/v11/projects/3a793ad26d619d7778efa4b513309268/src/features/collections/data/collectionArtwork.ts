import type { CSSProperties } from "react";

import type { Collection } from "../../../types/collection";

export type CollectionLayoutVariant =
	| "landscape-wide"
	| "portrait"
	| "image-left"
	| "image-right"
	| "text-overlay"
	| "split-panel";

type CollectionPalette = {
	accent: string;
	background: string;
	ink: string;
	muted: string;
	soft: string;
};

export type CollectionArtwork = {
	image: string | null;
	imageAlt: string;
	layoutVariant: CollectionLayoutVariant;
	notes: [string, string, string];
	objectPosition: string;
	palette: CollectionPalette;
};

type CollectionArtworkConfig = Omit<CollectionArtwork, "imageAlt"> & {
	imageAlt: string;
};

export type CollectionArtworkStyle = CSSProperties & {
	"--art-accent": string;
	"--art-background": string;
	"--art-ink": string;
	"--art-muted": string;
	"--art-object-position": string;
	"--art-soft": string;
};

const neutralPalette: CollectionPalette = {
	accent: "#81715f",
	background: "#eee7dd",
	ink: "#2e2721",
	muted: "#756b63",
	soft: "#f8f4ee",
};

export const collectionArtworkBySlug: Record<
	string,
	CollectionArtworkConfig
> = {
	"gift-sets": {
		image: null,
		imageAlt:
			"AVELIS gift vessels arranged with warm stone, paper and natural cork.",
		layoutVariant: "image-left",
		notes: ["Curated rituals", "Tactile paper", "Quiet woods"],
		objectPosition: "54% 48%",
		palette: {
			accent: "#77785f",
			background: "#ddd8cc",
			ink: "#2f3028",
			muted: "#68685c",
			soft: "#f2efe8",
		},
	},
	resonance: {
		image: "/images/hero/home_hero_red.png",
		imageAlt:
			"Redwood perfume bottle beneath shadowed crimson magnolia branches.",
		layoutVariant: "text-overlay",
		notes: ["Rhythm", "Tension", "Lingering echo"],
		objectPosition: "63% 48%",
		palette: {
			accent: "#c98b7c",
			background: "#2c2625",
			ink: "#fbf2eb",
			muted: "#d8c8c0",
			soft: "#4b3a37",
		},
	},
	"the-glass-garden": {
		image: "/images/hero/home_hero_peach.png",
		imageAlt:
			"Peachwood perfume bottle surrounded by luminous peach magnolia petals.",
		layoutVariant: "portrait",
		notes: ["Iris", "Camellia", "Thorned rose"],
		objectPosition: "67% 46%",
		palette: {
			accent: "#b54d49",
			background: "#ead6cf",
			ink: "#3a2020",
			muted: "#7f625e",
			soft: "#fbf3ef",
		},
	},
	"tidal-waves": {
		image: "/images/hero/home_hero_frost.png",
		imageAlt:
			"Azurewood perfume bottle in cool light beneath pale blue magnolia branches.",
		layoutVariant: "image-right",
		notes: ["Sea salt", "Mineral water", "Driftwood"],
		objectPosition: "63% 48%",
		palette: {
			accent: "#5d8eb8",
			background: "#dce9f3",
			ink: "#20313f",
			muted: "#627583",
			soft: "#f0f6fb",
		},
	},
	"chromatic-woods": {
		image: "/images/hero/home_hero_peach.png",
		imageAlt:
			"Peachwood perfume bottle resting on sculptural driftwood in warm light.",
		layoutVariant: "split-panel",
		notes: ["Coloured woods", "Soft resin", "Mineral light"],
		objectPosition: "60% 52%",
		palette: {
			accent: "#a8734f",
			background: "#e8d5c4",
			ink: "#34241d",
			muted: "#755e51",
			soft: "#f8efe7",
		},
	},
	peachwood: {
		image: "/images/hero/home_hero_peach.png",
		imageAlt:
			"Peachwood perfume bottle beneath peach magnolia branches on driftwood.",
		layoutVariant: "landscape-wide",
		notes: ["White peach", "Magnolia", "Blonde woods"],
		objectPosition: "62% 50%",
		palette: {
			accent: "#a85f35",
			background: "#efd8c6",
			ink: "#2e211b",
			muted: "#765e52",
			soft: "#faf2ea",
		},
	},
	azurewood: {
		image: "/images/hero/home_hero_frost.png",
		imageAlt:
			"Azurewood perfume bottle beneath pale blue magnolia branches on driftwood.",
		layoutVariant: "image-right",
		notes: ["Juniper water", "Blue cypress", "Mineral amber"],
		objectPosition: "63% 48%",
		palette: {
			accent: "#315f8c",
			background: "#dce9f3",
			ink: "#1d2b38",
			muted: "#617583",
			soft: "#f0f6fb",
		},
	},
	questbound: {
		image: "/images/placeholders/collection_placeholder.png",
		imageAlt: "Sculptural AVELIS vessels arranged as objects for a long journey.",
		layoutVariant: "image-left",
		notes: ["Gilded leather", "Oak cask", "Cold starlight"],
		objectPosition: "54% 48%",
		palette: {
			accent: "#77785f",
			background: "#ddd8cc",
			ink: "#2f3028",
			muted: "#68685c",
			soft: "#f2efe8",
		},
	},
	redwood: {
		image: "/images/hero/home_hero_red.png",
		imageAlt:
			"Redwood perfume bottle beneath deep red magnolia branches on driftwood.",
		layoutVariant: "text-overlay",
		notes: ["Saffron", "Red cedar", "Smoked amber"],
		objectPosition: "64% 48%",
		palette: {
			accent: "#cf8a7d",
			background: "#342725",
			ink: "#fbf1ed",
			muted: "#dbc9c2",
			soft: "#513a36",
		},
	},
};

const fallbackVariants: CollectionLayoutVariant[] = [
	"landscape-wide",
	"portrait",
	"image-left",
	"image-right",
	"split-panel",
];

export function getCollectionArtwork(
	collection: Collection,
	index = 0,
): CollectionArtwork {
	const configuredArtwork = collectionArtworkBySlug[collection.slug];

	if (configuredArtwork) {
		return configuredArtwork;
	}

	return {
		image: collection.heroImageUrl ?? collection.cardImageUrl,
		imageAlt: `${collection.name} fragrance collection campaign.`,
		layoutVariant:
			fallbackVariants[index % fallbackVariants.length] ?? "landscape-wide",
		notes: ["Material", "Atmosphere", "Memory"],
		objectPosition: "center",
		palette: {
			...neutralPalette,
			accent: collection.accentColor ?? neutralPalette.accent,
		},
	};
}

export function getCollectionArtworkStyle(
	artwork: CollectionArtwork,
): CollectionArtworkStyle {
	return {
		"--art-accent": artwork.palette.accent,
		"--art-background": artwork.palette.background,
		"--art-ink": artwork.palette.ink,
		"--art-muted": artwork.palette.muted,
		"--art-object-position": artwork.objectPosition,
		"--art-soft": artwork.palette.soft,
	};
}
