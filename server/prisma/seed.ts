import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import {
	CollectionStatus,
	FragranceNoteType,
	PrismaClient,
	ProductFormat,
	ProductImageType,
} from "../src/generated/prisma/client.js";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
	throw new Error("DATABASE_URL is required to seed the database.");
}

const prisma = new PrismaClient({
	adapter: new PrismaPg({ connectionString }),
});

type NoteSet = {
	top: string[];
	heart: string[];
	base: string[];
};

type VariantPrice = {
	price: string;
	compareAtPrice?: string;
	stock: number;
};

type ProductSeed = {
	slug: string;
	name: string;
	subtitle: string;
	description: string;
	fragranceFamily: string;
	concentration: string;
	gender: string;
	longevity: string;
	season: string[];
	occasion: string[];
	isFeatured?: boolean;
	isNew?: boolean;
	isLimited?: boolean;
	skuPrefix: string;
	collections: string[];
	notes: NoteSet;
	variants: {
		bottle50: VariantPrice;
		bottle100: VariantPrice;
		refill50: VariantPrice;
		refill100: VariantPrice;
		refill150: VariantPrice;
	};
	mainImage?: string;
};

const collections = [
	{
		slug: "chromatic-woods",
		name: "Chromatic Woods",
		eyebrow: "Wood, seen in colour",
		shortDescription:
			"Five vivid studies of timber, mineral light, spice and smoke.",
		description:
			"Chromatic Woods moves from peach-lit sandalwood to mineral blue cypress, glowing red cedar, nocturnal resins and the quiet smoke of ash.",
		cardImageUrl: "/images/hero/home_hero_peach.png",
		heroImageUrl: "/images/hero/home_hero_peach.png",
		accentColor: "#B89878",
		status: CollectionStatus.PUBLISHED,
		isFeatured: true,
		sortOrder: 10,
		publishedAt: new Date("2026-07-22T12:00:00.000Z"),
	},
	{
		slug: "resonance",
		name: "Resonance",
		eyebrow: "Compositions in motion",
		shortDescription:
			"Four fragrances shaped by rhythm, tension and a lingering echo.",
		description:
			"Resonance translates musical gesture into scent: a lyrical floral, a bright tremor of citrus, textured distortion and an after-dark nocturne.",
		cardImageUrl: "/images/hero/home_hero_red.png",
		heroImageUrl: "/images/hero/home_hero_red.png",
		accentColor: "#7C4A43",
		status: CollectionStatus.PUBLISHED,
		isFeatured: false,
		sortOrder: 20,
		publishedAt: new Date("2026-07-22T12:00:00.000Z"),
	},
	{
		slug: "gift-sets",
		name: "Gift Sets",
		eyebrow: "Objects of consideration",
		shortDescription:
			"Seven curated fragrance rituals composed for thoughtful giving.",
		description:
			"Gift Sets pair complementary compositions and presentation objects, from intimate duos to a complete four-season wardrobe.",
		cardImageUrl: "/images/placeholders/collection_placeholder.png",
		heroImageUrl: "/images/placeholders/collection_placeholder.png",
		accentColor: "#B89878",
		status: CollectionStatus.PUBLISHED,
		isFeatured: false,
		sortOrder: 30,
		publishedAt: new Date("2026-07-22T12:00:00.000Z"),
	},
	{
		slug: "tidal-waves",
		name: "Tidal Waves",
		eyebrow: "The pull of open water",
		shortDescription:
			"Salt, foam, mineral air and the darkening depth below.",
		description:
			"Tidal Waves follows water from sunlit seafoam to the still pressure of the abyss, composed with salt, translucent florals, kelp and mineral woods.",
		cardImageUrl: "/images/hero/home_hero_frost.png",
		heroImageUrl: "/images/hero/home_hero_frost.png",
		accentColor: "#6D91A6",
		status: CollectionStatus.PUBLISHED,
		isFeatured: false,
		sortOrder: 40,
		publishedAt: new Date("2026-07-22T12:00:00.000Z"),
	},
	{
		slug: "questbound",
		name: "Questbound",
		eyebrow: "Maps, materials, memory",
		shortDescription:
			"Three far-reaching compositions of leather, oak and cold starlight.",
		description:
			"Questbound is a compact trilogy about departure and return: a gilded promise, the warmth of an oak cask and Polaris held above a winter route.",
		cardImageUrl: "/images/placeholders/collection_placeholder.png",
		heroImageUrl: "/images/placeholders/collection_placeholder.png",
		accentColor: "#77785F",
		status: CollectionStatus.PUBLISHED,
		isFeatured: false,
		sortOrder: 50,
		publishedAt: new Date("2026-07-22T12:00:00.000Z"),
	},
	{
		slug: "the-glass-garden",
		name: "The Glass Garden",
		eyebrow: "Petals under glass",
		shortDescription:
			"Five floral portraits balancing translucence, bloom and thorn.",
		description:
			"The Glass Garden frames flowers as structure rather than ornament: luminous petalia, cool iris, white camellia, night bloom and a rose edged with shadow.",
		cardImageUrl: "/images/hero/home_hero_peach.png",
		heroImageUrl: "/images/hero/home_hero_peach.png",
		accentColor: "#C7A7A2",
		status: CollectionStatus.PUBLISHED,
		isFeatured: false,
		sortOrder: 60,
		publishedAt: new Date("2026-07-22T12:00:00.000Z"),
	},
];

type CatalogueProductDefinition = {
	slug: string;
	name: string;
	subtitle: string;
	description: string;
	fragranceFamily: string;
	skuPrefix: string;
	collection: string;
	notes: NoteSet;
	isFeatured?: boolean;
	isLimited?: boolean;
	mainImage?: string;
};

function createCatalogueProduct(
	definition: CatalogueProductDefinition,
	index: number,
): ProductSeed {
	const priceStep = (index % 7) * 20;
	const bottle50 = 329 + priceStep;
	const bottle100 = bottle50 + 180;
	const refill50 = bottle50 - 90;
	const refill100 = bottle50 + 50;
	const refill150 = bottle50 + 210;
	const { collection, ...productDefinition } = definition;

	return {
		...productDefinition,
		collections: [collection],
		concentration: "Eau de Parfum",
		gender: "Unisex",
		longevity: "7-10 hours",
		season: ["spring", "summer", "autumn", "winter"],
		occasion: ["day", "evening"],
		variants: {
			bottle50: { price: `${bottle50}.00`, stock: 36 + (index % 9) },
			bottle100: {
				price: `${bottle100}.00`,
				compareAtPrice: `${bottle100 + 50}.00`,
				stock: 24 + (index % 7),
			},
			refill50: { price: `${refill50}.00`, stock: 42 + (index % 8) },
			refill100: { price: `${refill100}.00`, stock: 30 + (index % 6) },
			refill150: {
				price: `${refill150}.00`,
				compareAtPrice: `${refill150 + 50}.00`,
				stock: 18 + (index % 5),
			},
		},
	};
}

const catalogueDefinitions: CatalogueProductDefinition[] = [
	{
		slug: "peachwood",
		name: "Peachwood",
		subtitle: "Velvet peach, blonde woods, and tea steam.",
		description:
			"A soft-focus woody fruity fragrance where ripe peach and osmanthus settle into sandalwood, cedar, and airy musk.",
		fragranceFamily: "Woody Fruity",
		isFeatured: true,
		skuPrefix: "PCH",
		collection: "chromatic-woods",
		notes: {
			top: ["white peach", "bergamot", "green tea"],
			heart: ["osmanthus", "orris", "apricot skin"],
			base: ["sandalwood", "cedarwood", "white musk"],
		},
		mainImage: "/images/hero/home_hero_peach.png",
	},
	{
		slug: "azurewood",
		name: "Azurewood",
		subtitle: "Juniper water, blue cypress, and mineral amber.",
		description:
			"A cool aromatic wood scent with crisp juniper, salt air, blue cypress, and a clean ambergris-style finish.",
		fragranceFamily: "Aromatic Woody",
		isFeatured: true,
		skuPrefix: "AZW",
		collection: "chromatic-woods",
		notes: {
			top: ["juniper berry", "lemon zest", "sea salt"],
			heart: ["blue cypress", "lavender", "violet leaf"],
			base: ["driftwood", "mineral amber", "clean musk"],
		},
		mainImage: "/images/hero/home_hero_frost.png",
	},
	{
		slug: "redwood",
		name: "Redwood",
		subtitle: "Sequoia bark, saffron heat, and dark plum.",
		description:
			"A resonant woody amber built around red cedar, plum, saffron, incense, and polished patchouli.",
		fragranceFamily: "Woody Amber",
		isFeatured: true,
		skuPrefix: "RDW",
		collection: "chromatic-woods",
		notes: {
			top: ["saffron", "black pepper", "dark plum"],
			heart: ["red cedar", "incense", "rosewood"],
			base: ["patchouli", "labdanum", "smoked amber"],
		},
		mainImage: "/images/hero/home_hero_red.png",
	},
	{
		slug: "midnightwood",
		name: "Midnightwood",
		subtitle: "Black tea, midnight cedar, and a trace of suede.",
		description:
			"A deep woody composition where black tea and violet leaf settle into midnight cedar, suede and resinous amber.",
		fragranceFamily: "Woody Amber",
		isFeatured: true,
		isLimited: true,
		skuPrefix: "MDW",
		collection: "chromatic-woods",
		notes: {
			top: ["black tea", "violet leaf", "pink pepper"],
			heart: ["midnight cedar", "suede", "pale incense"],
			base: ["labdanum", "tonka bean", "dark musk"],
		},
		mainImage: "/images/hero/home_hero_red.png",
	},
	{
		slug: "ashwood",
		name: "Ashwood",
		subtitle: "Silver ash, incense air, and mineral woods.",
		description:
			"A quiet, mineral wood scent where silver ash and elemi hover over incense, vetiver root and skin-close musk.",
		fragranceFamily: "Dry Woods",
		isFeatured: true,
		isLimited: true,
		skuPrefix: "ASH",
		collection: "chromatic-woods",
		notes: {
			top: ["elemi", "juniper", "silver pepper"],
			heart: ["ash wood", "pale incense", "orris"],
			base: ["vetiver root", "mineral musk", "dry cedar"],
		},
		mainImage: "/images/hero/home_hero_frost.png",
	},
	{
		slug: "serenade",
		name: "Serenade",
		subtitle: "Orange blossom, soft rose, and sandalwood.",
		description:
			"A lyrical floral progression from luminous citrus to rosewater, orange blossom and a warm sandalwood close.",
		fragranceFamily: "Floral",
		skuPrefix: "SER",
		collection: "resonance",
		notes: {
			top: ["bergamot", "mandarin", "pear leaf"],
			heart: ["orange blossom", "rosewater", "jasmine tea"],
			base: ["sandalwood", "white musk", "benzoin"],
		},
	},
	{
		slug: "tremolo",
		name: "Tremolo",
		subtitle: "Citron pulse, aromatic herbs, and pale woods.",
		description:
			"A quick bright rhythm of citron and shiso over lavender, cedar and a clean mineral finish.",
		fragranceFamily: "Fresh Aromatic",
		skuPrefix: "TRE",
		collection: "resonance",
		notes: {
			top: ["citron", "shiso", "green mandarin"],
			heart: ["lavender", "rosemary", "violet leaf"],
			base: ["pale cedar", "mineral amber", "clean musk"],
		},
	},
	{
		slug: "distortion",
		name: "Distortion",
		subtitle: "Saffron static, smoked plum, and hot resin.",
		description:
			"A deliberately textured amber where saffron, smoked fruit and metallic spice bend into labdanum and dark woods.",
		fragranceFamily: "Spicy Amber",
		skuPrefix: "DIS",
		collection: "resonance",
		notes: {
			top: ["saffron", "metallic pepper", "smoked plum"],
			heart: ["myrrh", "rose oxide", "incense"],
			base: ["labdanum", "dark cedar", "amber musk"],
		},
	},
	{
		slug: "nocturne",
		name: "Nocturne",
		subtitle: "Black violet, incense, and suede shadow.",
		description:
			"An after-dark floral amber of black violet, incense, suede and a restrained trail of smoked vetiver.",
		fragranceFamily: "Floral Amber",
		isLimited: true,
		skuPrefix: "NOC",
		collection: "resonance",
		notes: {
			top: ["black violet", "bergamot rind", "clove leaf"],
			heart: ["incense", "suede", "cistus"],
			base: ["vetiver smoke", "patchouli", "ambergris accord"],
		},
	},
	{ slug: "love-within", name: "Love Within", subtitle: "Rose, pear and a soft musk embrace.", description: "An intimate floral pairing of rosewater, pear skin and sandalwood musk.", fragranceFamily: "Floral", skuPrefix: "LWI", collection: "gift-sets", notes: { top: ["pear skin", "bergamot", "pink pepper"], heart: ["rosewater", "peony", "iris"], base: ["sandalwood", "white musk", "benzoin"] } },
	{ slug: "rosemary", name: "Rosemary", subtitle: "Aromatic leaves, citrus and clean cedar.", description: "A fresh aromatic composition built around rosemary, lemon rind and pale cedar.", fragranceFamily: "Fresh Aromatic", skuPrefix: "ROS", collection: "gift-sets", notes: { top: ["lemon rind", "juniper", "mint"], heart: ["rosemary", "lavender", "sage"], base: ["pale cedar", "moss", "clean musk"] } },
	{ slug: "excalibur-stone", name: "Excalibur Stone", subtitle: "Cold metal, stone and weathered oak.", description: "Mineral woods and aromatic smoke arranged as a precise, sculptural gift composition.", fragranceFamily: "Woody", skuPrefix: "EXC", collection: "gift-sets", notes: { top: ["cold metal accord", "bergamot", "pepper"], heart: ["wet stone", "oak", "sage"], base: ["vetiver", "leather", "mineral musk"] } },
	{ slug: "moon-and-sun", name: "Moon & Sun", subtitle: "Two luminous moods in one ritual.", description: "A bright citrus-floral opening paired with an ambered, skin-close evening trail.", fragranceFamily: "Floral Amber", skuPrefix: "MAS", collection: "gift-sets", notes: { top: ["mandarin", "neroli", "pear"], heart: ["jasmine", "heliotrope", "orange blossom"], base: ["amber", "tonka bean", "musk"] } },
	{ slug: "the-four-seasons", name: "The Four Seasons", subtitle: "A complete wardrobe from bloom to ember.", description: "Four olfactory climates gathered into a versatile year-round fragrance set.", fragranceFamily: "Fresh Woody", skuPrefix: "TFS", collection: "gift-sets", notes: { top: ["citrus", "green leaf", "pear"], heart: ["rose", "tea", "cedar"], base: ["amber", "moss", "musk"] } },
	{ slug: "secret-letter", name: "Secret Letter", subtitle: "Ink, violet and folded cedar paper.", description: "A powdery woody composition recalling violet ink, cedar paper and quiet amber.", fragranceFamily: "Powdery Woody", skuPrefix: "SLE", collection: "gift-sets", notes: { top: ["violet leaf", "black tea", "bergamot"], heart: ["orris", "paper accord", "rose"], base: ["cedar", "amber", "musk"] } },
	{ slug: "alchemists-cabinet", name: "Alchemist's Cabinet", subtitle: "Cacao, spice and polished apothecary woods.", description: "A modern gourmand of bitter cacao, cardamom and resinous cabinet woods.", fragranceFamily: "Gourmand Amber", skuPrefix: "ALC", collection: "gift-sets", notes: { top: ["cardamom", "orange peel", "black pepper"], heart: ["cacao", "coffee flower", "myrrh"], base: ["vanilla", "benzoin", "polished oak"] } },
	{ slug: "seafoam", name: "Seafoam", subtitle: "Neroli foam, salt air and white musk.", description: "A bright aquatic fragrance with citrus foam, sea salt and transparent musk.", fragranceFamily: "Aquatic Fresh", skuPrefix: "SEA", collection: "tidal-waves", notes: { top: ["neroli", "lemon", "sea salt"], heart: ["water mint", "jasmine", "seafoam accord"], base: ["white musk", "driftwood", "ambergris accord"] } },
	{ slug: "salt-veil", name: "Salt Veil", subtitle: "Mineral salt, pale florals and skin musk.", description: "A sheer salt veil carried by ambrette, wet stone and translucent petals.", fragranceFamily: "Aquatic Floral", skuPrefix: "SVE", collection: "tidal-waves", notes: { top: ["sea salt", "yuzu", "rainwater accord"], heart: ["muguet", "ambrette", "wet stone"], base: ["skin musk", "pale cedar", "mineral amber"] } },
	{ slug: "sirens-wake", name: "Siren's Wake", subtitle: "Green fig, marine flowers and dark water.", description: "A magnetic aquatic floral where green fig and marine blossom trail into mossy woods.", fragranceFamily: "Aquatic Floral", skuPrefix: "SIW", collection: "tidal-waves", notes: { top: ["green fig", "mandarin", "salt spray"], heart: ["marine blossom", "violet leaf", "jasmine"], base: ["oakmoss", "driftwood", "musk"] } },
	{ slug: "undertow", name: "Undertow", subtitle: "Kelp, black tea and submerged woods.", description: "A darker current of aromatic tea, kelp and waterlogged cedar over mineral amber.", fragranceFamily: "Aquatic Woody", skuPrefix: "UND", collection: "tidal-waves", notes: { top: ["black tea", "juniper", "salt"], heart: ["kelp", "violet leaf", "cypress"], base: ["submerged cedar", "mineral amber", "musk"] } },
	{ slug: "abyss", name: "Abyss", subtitle: "Ink-dark water, incense and oceanic woods.", description: "A limited deep-water composition of mineral smoke, incense and resonant marine woods.", fragranceFamily: "Aquatic Amber", skuPrefix: "ABY", collection: "tidal-waves", isLimited: true, notes: { top: ["black pepper", "ozonic air", "salt"], heart: ["incense", "seaweed", "iris"], base: ["dark driftwood", "labdanum", "ambergris accord"] } },
	{ slug: "gilded-oath", name: "Gilded Oath", subtitle: "Saffron leather, amber and burnished woods.", description: "A warm, confident composition of saffron, leather and luminous resinous woods.", fragranceFamily: "Spicy Woody", skuPrefix: "GIO", collection: "questbound", notes: { top: ["saffron", "bergamot", "black pepper"], heart: ["leather", "rose", "cedar"], base: ["amber", "labdanum", "sandalwood"] } },
	{ slug: "oak-cask", name: "Oak Cask", subtitle: "Toasted oak, dried fruit and vanilla resin.", description: "A rounded woody gourmand with toasted oak, dried plum and restrained vanilla resin.", fragranceFamily: "Gourmand Woody", skuPrefix: "OAK", collection: "questbound", notes: { top: ["dried plum", "orange peel", "clove"], heart: ["toasted oak", "cacao husk", "tobacco leaf"], base: ["vanilla resin", "benzoin", "sandalwood"] } },
	{ slug: "polaris", name: "Polaris", subtitle: "Frozen air, juniper and northern pine.", description: "A clean, directional fresh wood scent lit by juniper, pine needle and mineral musk.", fragranceFamily: "Fresh Woody", skuPrefix: "POL", collection: "questbound", notes: { top: ["juniper", "grapefruit", "frozen air accord"], heart: ["pine needle", "lavender", "violet leaf"], base: ["white cedar", "mineral musk", "amber"] } },
	{ slug: "petalia", name: "Petalia", subtitle: "Peony light, pear and clean woods.", description: "A translucent floral study of peony, pear skin and softly polished woods.", fragranceFamily: "Floral", skuPrefix: "PET", collection: "the-glass-garden", notes: { top: ["pear skin", "bergamot", "green sap"], heart: ["peony", "rosewater", "muguet"], base: ["blonde woods", "white musk", "ambrette"] } },
	{ slug: "iris-veil", name: "Iris Veil", subtitle: "Iris concrete, carrot seed and silver musk.", description: "A softly diffused powdery floral built from iris, carrot seed and silver musk.", fragranceFamily: "Powdery Floral", skuPrefix: "IRV", collection: "the-glass-garden", notes: { top: ["aldehydes", "pear", "violet leaf"], heart: ["iris concrete", "orris butter", "carrot seed"], base: ["silver musk", "sandalwood", "ambrette"] } },
	{ slug: "white-camellia", name: "White Camellia", subtitle: "Tea petals, citrus and pale cedar.", description: "A clean white floral with tea-like petals, luminous citrus and a pale cedar frame.", fragranceFamily: "Fresh Floral", skuPrefix: "WCA", collection: "the-glass-garden", notes: { top: ["bergamot", "white tea", "lemon leaf"], heart: ["camellia", "jasmine", "muguet"], base: ["pale cedar", "white musk", "vetiver"] } },
	{ slug: "night-bloom", name: "Night Bloom", subtitle: "Moonlit jasmine, plum skin and amber.", description: "A nocturnal floral where jasmine and plum skin gather over a warm amber base.", fragranceFamily: "Floral Amber", skuPrefix: "NBL", collection: "the-glass-garden", notes: { top: ["plum skin", "pink pepper", "mandarin"], heart: ["night jasmine", "tuberose", "violet"], base: ["amber", "sandalwood", "musk"] } },
	{ slug: "thorned-rose", name: "Thorned Rose", subtitle: "Rose stem, blackcurrant and dark moss.", description: "A limited rose portrait sharpened by green stem, blackcurrant and shadowed moss.", fragranceFamily: "Floral Woody", skuPrefix: "THR", collection: "the-glass-garden", isLimited: true, notes: { top: ["blackcurrant", "rose stem", "pink pepper"], heart: ["damask rose", "geranium", "violet"], base: ["oakmoss", "patchouli", "dark cedar"] } },
];

const products: ProductSeed[] = catalogueDefinitions.map(createCatalogueProduct);

const legacyCollectionSlugs = [
	"signature-woods",
	"water-and-air",
	"floral-light",
	"nocturne-reserve",
	"refill-ritual",
];

const legacyProductSlugs = [
	"bluewood",
	"white-ember",
	"tidal-veil",
	"magnolia-glass",
	"velvet-current",
	"amber-bloom",
	"cedar-nocturne",
	"quiet-fig",
	"saffron-mist",
	"orris-rain",
];

function imagePath(slug: string, name: string) {
	return `/images/products/${slug}/${slug}-${name}.webp`;
}

function imageRows(productId: string, product: ProductSeed) {
	return [
		{
			productId,
			url: product.mainImage ?? imagePath(product.slug, "main"),
			alt: `${product.name} bottle`,
			position: 0,
			isPrimary: true,
			imageType: ProductImageType.MAIN,
		},
		{
			productId,
			url: imagePath(product.slug, "gallery-01"),
			alt: `${product.name} fragrance composition`,
			position: 1,
			isPrimary: false,
			imageType: ProductImageType.GALLERY,
		},
		{
			productId,
			url: imagePath(product.slug, "hover"),
			alt: `${product.name} bottle detail`,
			position: 2,
			isPrimary: false,
			imageType: ProductImageType.HOVER,
		},
		{
			productId,
			url: imagePath(product.slug, "refill"),
			alt: `${product.name} refill pouch`,
			position: 3,
			isPrimary: false,
			imageType: ProductImageType.REFILL,
		},
	];
}

function variantRows(productId: string, product: ProductSeed) {
	return [
		{
			productId,
			format: ProductFormat.BOTTLE,
			volumeMl: 50,
			price: product.variants.bottle50.price,
			compareAtPrice: product.variants.bottle50.compareAtPrice ?? null,
			sku: `AVE-${product.skuPrefix}-BOT-050`,
			stock: product.variants.bottle50.stock,
		},
		{
			productId,
			format: ProductFormat.BOTTLE,
			volumeMl: 100,
			price: product.variants.bottle100.price,
			compareAtPrice: product.variants.bottle100.compareAtPrice ?? null,
			sku: `AVE-${product.skuPrefix}-BOT-100`,
			stock: product.variants.bottle100.stock,
		},
		{
			productId,
			format: ProductFormat.REFILL,
			volumeMl: 50,
			price: product.variants.refill50.price,
			compareAtPrice: product.variants.refill50.compareAtPrice ?? null,
			sku: `AVE-${product.skuPrefix}-REF-050`,
			stock: product.variants.refill50.stock,
		},
		{
			productId,
			format: ProductFormat.REFILL,
			volumeMl: 100,
			price: product.variants.refill100.price,
			compareAtPrice: product.variants.refill100.compareAtPrice ?? null,
			sku: `AVE-${product.skuPrefix}-REF-100`,
			stock: product.variants.refill100.stock,
		},
		{
			productId,
			format: ProductFormat.REFILL,
			volumeMl: 150,
			price: product.variants.refill150.price,
			compareAtPrice: product.variants.refill150.compareAtPrice ?? null,
			sku: `AVE-${product.skuPrefix}-REF-150`,
			stock: product.variants.refill150.stock,
		},
	];
}

async function upsertCollections() {
	const collectionIds = new Map<string, string>();

	for (const collection of collections) {
		const editorial = collection.slug === "chromatic-woods" ? {
			storyHeadline: "Timber, refracted through five kinds of light.",
			storyBody: "The collection begins with the grain rather than the tree. Cedar, sandalwood and cypress are treated as surfaces that catch colour, warmth and mineral shadow.\n\nEach composition moves at its own hour: peach at dawn, blue at the edge of rain, red at ember-light, nocturnal resin and the pale smoke left after fire.",
			storyImageUrl: collection.heroImageUrl,
			materialNotes: ["Cedar grain", "Mineral pigment", "Smoked glass", "Sandalwood dust"],
			campaignLabel: "chromatic-woods-editorial-2026",
		} : {};
		const collectionData = { ...collection, ...editorial };
		const saved = await prisma.collection.upsert({
			where: { slug: collection.slug },
			update: collectionData,
			create: collectionData,
		});

		collectionIds.set(collection.slug, saved.id);
	}

	return collectionIds;
}

async function upsertJournalArticles() {
	const articles = [
		{
			slug: "how-a-fragrance-changes-on-skin",
			title: "How a fragrance changes on skin",
			eyebrow: "The wearing ritual",
			excerpt: "A practical field note on evaporation, warmth and why the same composition never tells exactly the same story twice.",
			body: "A fragrance is not a fixed object. The first minutes belong to the most volatile materials: citrus peel, herbs, aldehydes and bright spices. They travel quickly, creating the opening gesture before giving way to the heart.\n\nSkin temperature, humidity and the natural oils on the body influence that movement. This is why testing on paper is useful for structure, while testing on skin reveals character. Give a composition at least two hours before deciding.\n\nApply without rubbing, then notice it at intervals rather than continuously. The most useful question is not whether it stays identical, but whether each stage feels coherent with the next.",
			coverImageUrl: "/images/hero/home_hero_frost.png",
			authorName: "AVELIS Editorial",
			tags: ["Education", "Ritual"],
			readingTimeMinutes: 4,
			status: "PUBLISHED" as const,
			isFeatured: true,
			publishedAt: new Date("2026-08-01T09:00:00.000Z"),
			seoTitle: "How perfume changes on skin",
			seoDescription: "Understand perfume evaporation, skin chemistry and how to test a fragrance over time.",
		},
		{
			slug: "a-quiet-guide-to-woods",
			title: "A quiet guide to woods",
			eyebrow: "Materials",
			excerpt: "Cedar, sandalwood, vetiver and patchouli each create a different kind of structure. Here is how to recognise their grain.",
			body: "Woody is a family, but not a single sensation. Cedar can feel dry and architectural; sandalwood is rounder, warmer and almost tactile. Vetiver brings root, earth and a clean mineral edge. Patchouli can move from damp soil to dark velvet.\n\nLook for the role a wood plays rather than only its name. It may be the frame beneath florals, the lasting trace after citrus, or the central subject of the composition.\n\nThe Chromatic Woods collection makes those roles visible by placing texture and colour around the material, allowing each wood to hold a distinct atmosphere.",
			coverImageUrl: "/images/hero/home_hero_peach.png",
			authorName: "AVELIS Editorial",
			tags: ["Materials", "Woods"],
			readingTimeMinutes: 3,
			status: "PUBLISHED" as const,
			isFeatured: false,
			publishedAt: new Date("2026-07-26T09:00:00.000Z"),
			seoTitle: "A guide to woody fragrance materials",
			seoDescription: "Learn the character of cedar, sandalwood, vetiver and patchouli in perfume.",
		},
	];
	for (const article of articles) await prisma.journalArticle.upsert({ where: { slug: article.slug }, update: article, create: article });
}

async function retireLegacyCatalogue() {
	await Promise.all([
		prisma.collection.updateMany({
			where: { slug: { in: legacyCollectionSlugs } },
			data: {
				status: CollectionStatus.ARCHIVED,
				isFeatured: false,
				publishedAt: null,
			},
		}),
		prisma.product.updateMany({
			where: { slug: { in: legacyProductSlugs } },
			data: {
				isActive: false,
				isFeatured: false,
				isLimited: false,
			},
		}),
	]);
}

async function upsertNote(name: string) {
	return prisma.note.upsert({
		where: { name },
		update: {},
		create: { name },
	});
}

async function seedProduct(
	product: ProductSeed,
	collectionIds: Map<string, string>,
	productSortOrder: number,
) {
	const savedProduct = await prisma.product.upsert({
		where: { slug: product.slug },
		update: {
			name: product.name,
			subtitle: product.subtitle,
			description: product.description,
			fragranceFamily: product.fragranceFamily,
			concentration: product.concentration,
			gender: product.gender,
			longevity: product.longevity,
			season: product.season,
			occasion: product.occasion,
			isFeatured: product.isFeatured ?? false,
			isNew: product.isNew ?? false,
			isLimited: product.isLimited ?? false,
			isActive: true,
		},
		create: {
			slug: product.slug,
			name: product.name,
			subtitle: product.subtitle,
			description: product.description,
			fragranceFamily: product.fragranceFamily,
			concentration: product.concentration,
			gender: product.gender,
			longevity: product.longevity,
			season: product.season,
			occasion: product.occasion,
			isFeatured: product.isFeatured ?? false,
			isNew: product.isNew ?? false,
			isLimited: product.isLimited ?? false,
			isActive: true,
		},
	});

	for (const variant of variantRows(savedProduct.id, product)) {
		await prisma.productVariant.upsert({
			where: {
				productId_format_volumeMl: {
					productId: savedProduct.id,
					format: variant.format,
					volumeMl: variant.volumeMl,
				},
			},
			update: {
				price: variant.price,
				compareAtPrice: variant.compareAtPrice,
				sku: variant.sku,
				stock: variant.stock,
			},
			create: variant,
		});
	}

	await prisma.productImage.deleteMany({
		where: { productId: savedProduct.id },
	});
	await prisma.productImage.createMany({
		data: imageRows(savedProduct.id, product),
	});

	await prisma.productNote.deleteMany({
		where: { productId: savedProduct.id },
	});

	for (const [type, notes] of Object.entries(product.notes)) {
		for (const [position, noteName] of notes.entries()) {
			const note = await upsertNote(noteName);
			await prisma.productNote.create({
				data: {
					productId: savedProduct.id,
					noteId: note.id,
					type:
						type === "top"
							? FragranceNoteType.TOP
							: type === "heart"
								? FragranceNoteType.HEART
								: FragranceNoteType.BASE,
					position,
				},
			});
		}
	}

	await prisma.productCollection.deleteMany({
		where: { productId: savedProduct.id },
	});

	await prisma.productCollection.createMany({
		data: product.collections.map((slug) => ({
			productId: savedProduct.id,
			collectionId: collectionIds.get(slug) ?? "",
			sortOrder: productSortOrder,
		})),
		skipDuplicates: true,
	});
}

async function main() {
	await retireLegacyCatalogue();
	const collectionIds = await upsertCollections();

	for (const [index, product] of products.entries()) {
		await seedProduct(product, collectionIds, index * 10);
	}
	await upsertJournalArticles();

	const [productCount, variantCount, imageCount] = await Promise.all([
		prisma.product.count({
			where: { slug: { in: products.map((product) => product.slug) } },
		}),
		prisma.productVariant.count({
			where: { product: { slug: { in: products.map((product) => product.slug) } } },
		}),
		prisma.productImage.count({
			where: { product: { slug: { in: products.map((product) => product.slug) } } },
		}),
	]);

	console.log(
		`Seeded ${productCount} AVELIS products, ${variantCount} variants, and ${imageCount} product images.`,
	);
}

main()
	.catch((error) => {
		console.error(error);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
