import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import {
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
		slug: "signature-woods",
		name: "Signature Woods",
		description: "Polished woods, resins, and soft spices shaped for everyday depth.",
		imageUrl: "/images/collections/signature-woods.webp",
	},
	{
		slug: "water-and-air",
		name: "Water & Air",
		description: "Transparent musks, cool florals, and mineral brightness.",
		imageUrl: "/images/collections/water-and-air.webp",
	},
	{
		slug: "floral-light",
		name: "Floral Light",
		description: "Modern petals with glassy texture, fruit, and clean woods.",
		imageUrl: "/images/collections/floral-light.webp",
	},
	{
		slug: "nocturne-reserve",
		name: "Nocturne Reserve",
		description: "Evening compositions with amber, smoke, suede, and dark woods.",
		imageUrl: "/images/collections/nocturne-reserve.webp",
	},
	{
		slug: "refill-ritual",
		name: "Refill Ritual",
		description: "AVELIS scents offered with lower-waste refill formats.",
		imageUrl: "/images/placeholders/collection_placeholder.png",
	},
];

const products: ProductSeed[] = [
	{
		slug: "peachwood",
		name: "Peachwood",
		subtitle: "Velvet peach, blonde woods, and tea steam.",
		description:
			"A soft-focus woody fruity fragrance where ripe peach and osmanthus settle into sandalwood, cedar, and airy musk.",
		fragranceFamily: "Woody Fruity",
		concentration: "Eau de Parfum",
		gender: "Unisex",
		longevity: "8-10 hours",
		season: ["spring", "summer", "early autumn"],
		occasion: ["day", "office", "weekend"],
		isFeatured: true,
		skuPrefix: "PCH",
		collections: ["signature-woods", "floral-light", "refill-ritual"],
		notes: {
			top: ["white peach", "bergamot", "green tea"],
			heart: ["osmanthus", "orris", "apricot skin"],
			base: ["sandalwood", "cedarwood", "white musk"],
		},
		variants: {
			bottle50: { price: "349.00", stock: 48 },
			bottle100: { price: "529.00", compareAtPrice: "579.00", stock: 31 },
			refill50: { price: "259.00", stock: 55 },
			refill100: { price: "399.00", stock: 40 },
			refill150: { price: "559.00", compareAtPrice: "609.00", stock: 22 },
		},
		mainImage: "/images/hero/home_hero_peach.png",
	},
	{
		slug: "bluewood",
		name: "Bluewood",
		subtitle: "Juniper water, blue cypress, and mineral amber.",
		description:
			"A cool aromatic wood scent with crisp juniper, salt air, blue cypress, and a clean ambergris-style finish.",
		fragranceFamily: "Aromatic Woody",
		concentration: "Eau de Parfum",
		gender: "Unisex",
		longevity: "7-9 hours",
		season: ["spring", "summer"],
		occasion: ["day", "travel", "office"],
		isFeatured: true,
		skuPrefix: "BLW",
		collections: ["signature-woods", "water-and-air", "refill-ritual"],
		notes: {
			top: ["juniper berry", "lemon zest", "sea salt"],
			heart: ["blue cypress", "lavender", "violet leaf"],
			base: ["driftwood", "mineral amber", "clean musk"],
		},
		variants: {
			bottle50: { price: "369.00", stock: 44 },
			bottle100: { price: "549.00", compareAtPrice: "599.00", stock: 27 },
			refill50: { price: "269.00", stock: 50 },
			refill100: { price: "419.00", stock: 34 },
			refill150: { price: "589.00", compareAtPrice: "639.00", stock: 19 },
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
		concentration: "Eau de Parfum",
		gender: "Unisex",
		longevity: "9-12 hours",
		season: ["autumn", "winter"],
		occasion: ["evening", "dinner", "special occasions"],
		isFeatured: true,
		isLimited: true,
		skuPrefix: "RDW",
		collections: ["signature-woods", "nocturne-reserve", "refill-ritual"],
		notes: {
			top: ["saffron", "black pepper", "dark plum"],
			heart: ["red cedar", "incense", "rosewood"],
			base: ["patchouli", "labdanum", "smoked amber"],
		},
		variants: {
			bottle50: { price: "389.00", stock: 36 },
			bottle100: { price: "589.00", compareAtPrice: "649.00", stock: 24 },
			refill50: { price: "289.00", stock: 42 },
			refill100: { price: "439.00", stock: 29 },
			refill150: { price: "619.00", compareAtPrice: "679.00", stock: 15 },
		},
		mainImage: "/images/hero/home_hero_red.png",
	},
	{
		slug: "white-ember",
		name: "White Ember",
		subtitle: "Cashmere smoke, white tea, and glowing woods.",
		description:
			"A luminous smoky scent that pairs white tea and cardamom with cashmere woods, pale incense, and tonka.",
		fragranceFamily: "Soft Amber",
		concentration: "Eau de Parfum",
		gender: "Unisex",
		longevity: "8-11 hours",
		season: ["autumn", "winter", "spring"],
		occasion: ["evening", "home", "creative work"],
		skuPrefix: "WHE",
		collections: ["water-and-air", "nocturne-reserve", "refill-ritual"],
		notes: {
			top: ["white tea", "cardamom", "pink pepper"],
			heart: ["cashmere wood", "pale incense", "iris milk"],
			base: ["tonka bean", "white amber", "cedar ash"],
		},
		variants: {
			bottle50: { price: "419.00", stock: 32 },
			bottle100: { price: "629.00", compareAtPrice: "689.00", stock: 18 },
			refill50: { price: "309.00", stock: 39 },
			refill100: { price: "469.00", stock: 26 },
			refill150: { price: "659.00", compareAtPrice: "719.00", stock: 13 },
		},
	},
	{
		slug: "tidal-veil",
		name: "Tidal Veil",
		subtitle: "Neroli mist, rainwater musk, and sea glass.",
		description:
			"A sheer aquatic floral with neroli, wet stone, transparent jasmine, and a soft musky trail.",
		fragranceFamily: "Aquatic Floral",
		concentration: "Eau de Parfum",
		gender: "Unisex",
		longevity: "6-8 hours",
		season: ["spring", "summer"],
		occasion: ["day", "holiday", "gym bag"],
		isNew: true,
		skuPrefix: "TDV",
		collections: ["water-and-air", "floral-light", "refill-ritual"],
		notes: {
			top: ["neroli", "rainwater accord", "yuzu"],
			heart: ["jasmine sambac", "sea glass accord", "water mint"],
			base: ["ambrette", "white musk", "pale cedar"],
		},
		variants: {
			bottle50: { price: "359.00", stock: 46 },
			bottle100: { price: "539.00", compareAtPrice: "589.00", stock: 33 },
			refill50: { price: "259.00", stock: 58 },
			refill100: { price: "409.00", stock: 43 },
			refill150: { price: "579.00", compareAtPrice: "629.00", stock: 25 },
		},
	},
	{
		slug: "magnolia-glass",
		name: "Magnolia Glass",
		subtitle: "Magnolia petal, pear skin, and clean woods.",
		description:
			"A crystalline floral fragrance where magnolia and pear shimmer over muguet, vetiver, and musk.",
		fragranceFamily: "Transparent Floral",
		concentration: "Eau de Parfum",
		gender: "Unisex",
		longevity: "7-9 hours",
		season: ["spring", "summer"],
		occasion: ["day", "wedding guest", "office"],
		isFeatured: true,
		skuPrefix: "MGL",
		collections: ["floral-light", "water-and-air", "refill-ritual"],
		notes: {
			top: ["pear skin", "mandarin", "green sap"],
			heart: ["magnolia", "muguet", "jasmine tea"],
			base: ["vetiver", "white musk", "blonde woods"],
		},
		variants: {
			bottle50: { price: "379.00", stock: 40 },
			bottle100: { price: "569.00", compareAtPrice: "619.00", stock: 28 },
			refill50: { price: "279.00", stock: 47 },
			refill100: { price: "429.00", stock: 36 },
			refill150: { price: "599.00", compareAtPrice: "649.00", stock: 21 },
		},
	},
	{
		slug: "velvet-current",
		name: "Velvet Current",
		subtitle: "Blackcurrant velvet, rose water, and moss.",
		description:
			"A textured fruity floral with cassis, rose water, violet, and mossy woods for a polished evening signature.",
		fragranceFamily: "Fruity Floral",
		concentration: "Eau de Parfum",
		gender: "Unisex",
		longevity: "8-10 hours",
		season: ["spring", "autumn", "winter"],
		occasion: ["evening", "date", "gallery opening"],
		skuPrefix: "VLC",
		collections: ["floral-light", "nocturne-reserve", "refill-ritual"],
		notes: {
			top: ["blackcurrant", "pink pepper", "mandarin leaf"],
			heart: ["rose water", "violet", "plum velvet"],
			base: ["oakmoss", "sandalwood", "skin musk"],
		},
		variants: {
			bottle50: { price: "399.00", stock: 35 },
			bottle100: { price: "609.00", compareAtPrice: "669.00", stock: 20 },
			refill50: { price: "299.00", stock: 41 },
			refill100: { price: "459.00", stock: 27 },
			refill150: { price: "639.00", compareAtPrice: "699.00", stock: 16 },
		},
	},
	{
		slug: "amber-bloom",
		name: "Amber Bloom",
		subtitle: "Orange blossom, honeyed amber, and vanilla resin.",
		description:
			"A golden floral amber with orange blossom and broom flower wrapped in benzoin, vanilla, and soft woods.",
		fragranceFamily: "Floral Amber",
		concentration: "Eau de Parfum",
		gender: "Unisex",
		longevity: "8-11 hours",
		season: ["autumn", "winter", "spring"],
		occasion: ["dinner", "events", "weekend"],
		skuPrefix: "AMB",
		collections: ["floral-light", "nocturne-reserve", "refill-ritual"],
		notes: {
			top: ["orange blossom", "bergamot", "ginger flower"],
			heart: ["broom flower", "honey accord", "heliotrope"],
			base: ["benzoin", "vanilla resin", "amber woods"],
		},
		variants: {
			bottle50: { price: "389.00", stock: 39 },
			bottle100: { price: "589.00", compareAtPrice: "649.00", stock: 23 },
			refill50: { price: "289.00", stock: 44 },
			refill100: { price: "439.00", stock: 31 },
			refill150: { price: "619.00", compareAtPrice: "679.00", stock: 18 },
		},
	},
	{
		slug: "cedar-nocturne",
		name: "Cedar Nocturne",
		subtitle: "Atlas cedar, black tea, and suede shadow.",
		description:
			"A dry, elegant evening wood fragrance with black tea, clove leaf, atlas cedar, suede, and vetiver smoke.",
		fragranceFamily: "Dry Woods",
		concentration: "Eau de Parfum",
		gender: "Unisex",
		longevity: "9-12 hours",
		season: ["autumn", "winter"],
		occasion: ["evening", "formal", "late work"],
		isLimited: true,
		skuPrefix: "CDN",
		collections: ["signature-woods", "nocturne-reserve", "refill-ritual"],
		notes: {
			top: ["black tea", "clove leaf", "bergamot rind"],
			heart: ["atlas cedar", "suede", "cistus"],
			base: ["vetiver smoke", "patchouli", "ambergris accord"],
		},
		variants: {
			bottle50: { price: "429.00", stock: 30 },
			bottle100: { price: "659.00", compareAtPrice: "719.00", stock: 17 },
			refill50: { price: "319.00", stock: 37 },
			refill100: { price: "489.00", stock: 24 },
			refill150: { price: "689.00", compareAtPrice: "749.00", stock: 12 },
		},
	},
	{
		slug: "quiet-fig",
		name: "Quiet Fig",
		subtitle: "Fig leaf, almond milk, and sunlit cedar.",
		description:
			"A calm green fig scent with creamy almond milk, fig pulp, iris, cedar, and a mineral musk drydown.",
		fragranceFamily: "Green Woody",
		concentration: "Eau de Parfum",
		gender: "Unisex",
		longevity: "7-9 hours",
		season: ["spring", "summer", "early autumn"],
		occasion: ["day", "weekend", "home"],
		skuPrefix: "QFG",
		collections: ["signature-woods", "water-and-air", "refill-ritual"],
		notes: {
			top: ["fig leaf", "bergamot", "green pepper"],
			heart: ["fig pulp", "almond milk", "iris"],
			base: ["sunlit cedar", "mineral musk", "tonka husk"],
		},
		variants: {
			bottle50: { price: "349.00", stock: 43 },
			bottle100: { price: "519.00", compareAtPrice: "569.00", stock: 30 },
			refill50: { price: "249.00", stock: 53 },
			refill100: { price: "389.00", stock: 39 },
			refill150: { price: "549.00", compareAtPrice: "599.00", stock: 24 },
		},
	},
	{
		slug: "saffron-mist",
		name: "Saffron Mist",
		subtitle: "Saffron vapor, rose dust, and ambered woods.",
		description:
			"A plush spicy amber centered on saffron, rose dust, myrrh, cedarwood, and a long amber-musk trail.",
		fragranceFamily: "Spicy Amber",
		concentration: "Eau de Parfum",
		gender: "Unisex",
		longevity: "10-12 hours",
		season: ["autumn", "winter"],
		occasion: ["evening", "formal", "special occasions"],
		isNew: true,
		isLimited: true,
		skuPrefix: "SFM",
		collections: ["nocturne-reserve", "signature-woods", "refill-ritual"],
		notes: {
			top: ["saffron", "pink pepper", "mandarin smoke"],
			heart: ["rose dust", "myrrh", "cinnamon bark"],
			base: ["amber woods", "benzoin", "velvet musk"],
		},
		variants: {
			bottle50: { price: "459.00", stock: 26 },
			bottle100: { price: "699.00", compareAtPrice: "769.00", stock: 14 },
			refill50: { price: "349.00", stock: 32 },
			refill100: { price: "529.00", stock: 21 },
			refill150: { price: "749.00", compareAtPrice: "819.00", stock: 10 },
		},
	},
	{
		slug: "orris-rain",
		name: "Orris Rain",
		subtitle: "Iris concrete, pear rain, and silver musk.",
		description:
			"A powdery-clean iris fragrance with pear, violet leaf, orris butter, carrot seed, and silver musk.",
		fragranceFamily: "Powdery Floral",
		concentration: "Eau de Parfum",
		gender: "Unisex",
		longevity: "8-10 hours",
		season: ["spring", "autumn"],
		occasion: ["office", "day", "quiet evenings"],
		skuPrefix: "ORS",
		collections: ["floral-light", "water-and-air", "refill-ritual"],
		notes: {
			top: ["pear rain", "violet leaf", "aldehydes"],
			heart: ["orris butter", "iris concrete", "carrot seed"],
			base: ["silver musk", "sandalwood", "ambrette"],
		},
		variants: {
			bottle50: { price: "409.00", stock: 34 },
			bottle100: { price: "619.00", compareAtPrice: "679.00", stock: 19 },
			refill50: { price: "299.00", stock: 40 },
			refill100: { price: "469.00", stock: 26 },
			refill150: { price: "659.00", compareAtPrice: "719.00", stock: 14 },
		},
	},
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
		const saved = await prisma.collection.upsert({
			where: { slug: collection.slug },
			update: collection,
			create: collection,
		});

		collectionIds.set(collection.slug, saved.id);
	}

	return collectionIds;
}

async function upsertNote(name: string) {
	return prisma.note.upsert({
		where: { name },
		update: {},
		create: { name },
	});
}

async function seedProduct(product: ProductSeed, collectionIds: Map<string, string>) {
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
		})),
		skipDuplicates: true,
	});
}

async function main() {
	const collectionIds = await upsertCollections();

	for (const product of products) {
		await seedProduct(product, collectionIds);
	}

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
