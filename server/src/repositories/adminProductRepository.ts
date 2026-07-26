import type { Prisma } from "../generated/prisma/client.js";
import { LOW_STOCK_THRESHOLD } from "../config/admin.js";
import { prisma } from "../lib/prisma.js";
import type {
	AdminProductCreateInput,
	AdminProductListQuery,
	AdminProductStatusInput,
	AdminProductUpdateInput,
} from "../schemas/adminProductSchemas.js";
import {
	adminProductListSelect,
	type AdminProductListRecord,
} from "../utils/adminProductMapper.js";
import { productSelect } from "../utils/productMapper.js";

const insensitive = "insensitive" as const;

export function buildAdminProductWhere(
	query: AdminProductListQuery,
): Prisma.ProductWhereInput {
	const and: Prisma.ProductWhereInput[] = [];

	if (query.search !== undefined) {
		and.push({
			OR: [
				{ name: { contains: query.search, mode: insensitive } },
				{ slug: { contains: query.search, mode: insensitive } },
				{
					variants: {
						some: {
							sku: { contains: query.search, mode: insensitive },
						},
					},
				},
			],
		});
	}

	switch (query.status) {
		case "active":
			and.push({ isActive: true });
			break;
		case "inactive":
			and.push({ isActive: false });
			break;
		case "featured":
			and.push({ isFeatured: true });
			break;
		case "new":
			and.push({ isNew: true });
			break;
		case "limited":
			and.push({ isLimited: true });
			break;
		case "all":
			break;
	}

	if (query.family !== undefined) {
		and.push({
			fragranceFamily: {
				equals: query.family,
				mode: insensitive,
			},
		});
	}

	if (query.concentration !== undefined) {
		and.push({
			concentration: {
				equals: query.concentration,
				mode: insensitive,
			},
		});
	}

	if (query.format !== "all") {
		and.push({
			variants: {
				some: {
					format: query.format,
				},
			},
		});
	}

	if (query.collection !== undefined) {
		and.push({
			collections: {
				some: {
					collection: {
						slug: query.collection,
					},
				},
			},
		});
	}

	switch (query.stock) {
		case "in-stock":
			and.push({ variants: { some: { stock: { gt: 0 } } } });
			break;
		case "low-stock":
			and.push({
				variants: {
					some: {
						stock: {
							gt: 0,
							lte: LOW_STOCK_THRESHOLD,
						},
					},
				},
			});
			break;
		case "out-of-stock":
			and.push({
				variants: {
					some: {},
					every: {
						stock: 0,
					},
				},
			});
			break;
		case "all":
			break;
	}

	return and.length > 0 ? { AND: and } : {};
}

function getAdminProductOrderBy(
	sort: AdminProductListQuery["sort"],
): Prisma.ProductOrderByWithRelationInput[] {
	switch (sort) {
		case "oldest":
			return [{ createdAt: "asc" }, { id: "asc" }];
		case "name-asc":
			return [{ name: "asc" }, { id: "asc" }];
		case "name-desc":
			return [{ name: "desc" }, { id: "asc" }];
		case "newest":
		default:
			return [{ createdAt: "desc" }, { id: "asc" }];
	}
}

async function findAggregateSortedProductIds(
	query: AdminProductListQuery,
	where: Prisma.ProductWhereInput,
) {
	const skip = (query.page - 1) * query.limit;
	const isPriceSort =
		query.sort === "price-asc" || query.sort === "price-desc";
	const direction =
		query.sort === "price-asc" || query.sort === "stock-asc"
			? "asc"
			: "desc";

	if (isPriceSort) {
		const rows = await prisma.productVariant.groupBy({
			by: ["productId"],
			where: {
				product: where,
			},
			_min: { price: true },
			orderBy: [
				{ _min: { price: direction } },
				{ productId: "asc" },
			],
			skip,
			take: query.limit,
		});

		return rows.map((row) => row.productId);
	}

	const rows = await prisma.productVariant.groupBy({
		by: ["productId"],
		where: {
			product: where,
		},
		_sum: { stock: true },
		orderBy: [
			{ _sum: { stock: direction } },
			{ productId: "asc" },
		],
		skip,
		take: query.limit,
	});

	return rows.map((row) => row.productId);
}

export function countAdminProducts(query: AdminProductListQuery) {
	return prisma.product.count({
		where: buildAdminProductWhere(query),
	});
}

export async function findAdminProducts(
	query: AdminProductListQuery,
): Promise<AdminProductListRecord[]> {
	const where = buildAdminProductWhere(query);
	const usesAggregateSort =
		query.sort.startsWith("price-") || query.sort.startsWith("stock-");

	if (usesAggregateSort) {
		const productIds = await findAggregateSortedProductIds(query, where);
		if (productIds.length === 0) {
			return [];
		}

		const products = await prisma.product.findMany({
			where: {
				id: { in: productIds },
			},
			select: adminProductListSelect,
		});
		const positionById = new Map(productIds.map((id, index) => [id, index]));

		return products.sort(
			(left, right) =>
				(positionById.get(left.id) ?? 0) - (positionById.get(right.id) ?? 0),
		);
	}

	return prisma.product.findMany({
		where,
		select: adminProductListSelect,
		orderBy: getAdminProductOrderBy(query.sort),
		skip: (query.page - 1) * query.limit,
		take: query.limit,
	});
}

export function findAdminProductById(id: string) {
	return prisma.product.findUnique({
		where: { id },
		select: productSelect,
	});
}

export function findAdminProductReferenceNotes() {
	return prisma.note.findMany({
		select: {
			id: true,
			name: true,
			isActive: true,
		},
		orderBy: [{ name: "asc" }, { id: "asc" }],
	});
}

export function findAdminProductReferenceCollections() {
	return prisma.collection.findMany({
		select: {
			id: true,
			name: true,
			slug: true,
			status: true,
		},
		orderBy: [{ sortOrder: "asc" }, { name: "asc" }, { id: "asc" }],
	});
}

export function updateAdminProductStatus(
	id: string,
	input: AdminProductStatusInput,
) {
	const data: Prisma.ProductUpdateInput = {};

	if (input.isActive !== undefined) {
		data.isActive = input.isActive;
	}
	if (input.isFeatured !== undefined) {
		data.isFeatured = input.isFeatured;
	}
	if (input.isNew !== undefined) {
		data.isNew = input.isNew;
	}
	if (input.isLimited !== undefined) {
		data.isLimited = input.isLimited;
	}

	return prisma.product.update({
		where: { id },
		data,
		select: adminProductListSelect,
	});
}

export function deactivateAdminProduct(id: string) {
	return prisma.product.update({
		where: { id },
		data: { isActive: false },
		select: adminProductListSelect,
	});
}

type TransactionClient = Parameters<
	Parameters<typeof prisma.$transaction>[0]
>[0];

async function validateReferencedRelations(
	tx: TransactionClient,
	notes: AdminProductCreateInput["notes"] | undefined,
	collectionIds: AdminProductCreateInput["collectionIds"] | undefined,
	productId?: string,
) {
	if (notes !== undefined) {
		const noteIds = [...new Set(notes.map((note) => note.noteId))];
		const existingNotes =
			noteIds.length === 0
				? []
				: await tx.note.findMany({
						where: { id: { in: noteIds } },
						select: { id: true, isActive: true },
					});

		if (existingNotes.length !== noteIds.length) {
			throw new Error("ADMIN_PRODUCT_NOTE_NOT_FOUND");
		}

		const inactiveIds = existingNotes
			.filter((note) => !note.isActive)
			.map((note) => note.id);
		if (inactiveIds.length > 0) {
			const existingRelations =
				productId === undefined
					? []
					: await tx.productNote.findMany({
							where: {
								productId,
								noteId: { in: inactiveIds },
							},
							select: { noteId: true, type: true },
						});
			const inactiveIdSet = new Set(inactiveIds);
			const existingRelationKeys = new Set(
				existingRelations.map(
					(relation) => `${relation.noteId}:${relation.type}`,
				),
			);
			const includesNewInactiveRelation = notes
				.filter((note) => inactiveIdSet.has(note.noteId))
				.some(
					(note) =>
						!existingRelationKeys.has(`${note.noteId}:${note.type}`),
				);
			if (includesNewInactiveRelation) {
				throw new Error("ADMIN_PRODUCT_INACTIVE_NOTE");
			}
		}
	}

	if (collectionIds !== undefined) {
		const existingCollections =
			collectionIds.length === 0
				? []
				: await tx.collection.findMany({
						where: { id: { in: collectionIds } },
						select: { id: true, status: true },
					});

		if (existingCollections.length !== collectionIds.length) {
			throw new Error("ADMIN_PRODUCT_COLLECTION_NOT_FOUND");
		}

		const inactiveIds = existingCollections
			.filter((collection) => collection.status !== "PUBLISHED")
			.map((collection) => collection.id);
		if (inactiveIds.length > 0) {
			const existingRelationCount =
				productId === undefined
					? 0
					: await tx.productCollection.count({
							where: {
								productId,
								collectionId: { in: inactiveIds },
							},
						});
			if (existingRelationCount !== inactiveIds.length) {
				throw new Error("ADMIN_PRODUCT_INACTIVE_COLLECTION");
			}
		}
	}
}

async function validateUniqueFields(
	tx: TransactionClient,
	params: {
		slug?: string;
		skus?: string[];
		productId?: string;
		currentVariantIds?: string[];
	},
) {
	if (params.slug !== undefined) {
		const productWithSlug = await tx.product.findFirst({
			where: {
				slug: params.slug,
				...(params.productId === undefined
					? {}
					: { id: { not: params.productId } }),
			},
			select: { id: true },
		});

		if (productWithSlug !== null) {
			throw new Error("ADMIN_PRODUCT_DUPLICATE_SLUG");
		}
	}

	if (params.skus !== undefined && params.skus.length > 0) {
		const variantWithSku = await tx.productVariant.findFirst({
			where: {
				sku: { in: params.skus },
				...(params.currentVariantIds === undefined ||
				params.currentVariantIds.length === 0
					? {}
					: { id: { notIn: params.currentVariantIds } }),
			},
			select: { id: true },
		});

		if (variantWithSku !== null) {
			throw new Error("ADMIN_PRODUCT_DUPLICATE_SKU");
		}
	}
}

function createProductData(input: AdminProductCreateInput) {
	return {
		name: input.name,
		slug: input.slug,
		subtitle: input.subtitle,
		description: input.description,
		fragranceFamily: input.fragranceFamily,
		concentration: input.concentration,
		gender: input.gender,
		longevity: input.longevity,
		season: input.season,
		occasion: input.occasion,
		isActive: input.isActive,
		isFeatured: input.isFeatured,
		isNew: input.isNew,
		isLimited: input.isLimited,
		variants: {
			create: input.variants.map((variant) => ({
				format: variant.format,
				volumeMl: variant.volumeMl,
				price: variant.price,
				compareAtPrice: variant.compareAtPrice,
				sku: variant.sku,
				stock: variant.stock,
			})),
		},
		images: {
			create: input.images.map((image) => ({
				url: image.url,
				storageKey: image.storageKey ?? null,
				mimeType: image.mimeType ?? null,
				sizeBytes: image.sizeBytes ?? null,
				alt: image.alt,
				position: image.position,
				isPrimary: image.isPrimary,
				imageType: image.imageType,
			})),
		},
		notes: {
			create: input.notes.map((note) => ({
				type: note.type,
				position: note.position,
				note: {
					connect: {
						id: note.noteId,
					},
				},
			})),
		},
		collections: {
			create: input.collectionIds.map((collectionId) => ({
				collection: {
					connect: {
						id: collectionId,
					},
				},
			})),
		},
	} satisfies Prisma.ProductCreateInput;
}

export function createAdminProductRecord(input: AdminProductCreateInput) {
	return prisma.$transaction(async (tx) => {
		await validateReferencedRelations(tx, input.notes, input.collectionIds);
		await validateUniqueFields(tx, {
			slug: input.slug,
			skus: input.variants.map((variant) => variant.sku),
		});

		return tx.product.create({
			data: createProductData(input),
			select: productSelect,
		});
	});
}

function buildProductScalarUpdate(
	input: AdminProductUpdateInput,
): Prisma.ProductUpdateInput {
	const data: Prisma.ProductUpdateInput = {
		updatedAt: new Date(),
	};

	if (input.name !== undefined) data.name = input.name;
	if (input.slug !== undefined) data.slug = input.slug;
	if (input.subtitle !== undefined) data.subtitle = input.subtitle;
	if (input.description !== undefined) data.description = input.description;
	if (input.fragranceFamily !== undefined) {
		data.fragranceFamily = input.fragranceFamily;
	}
	if (input.concentration !== undefined) {
		data.concentration = input.concentration;
	}
	if (input.gender !== undefined) data.gender = input.gender;
	if (input.longevity !== undefined) data.longevity = input.longevity;
	if (input.season !== undefined) data.season = input.season;
	if (input.occasion !== undefined) data.occasion = input.occasion;
	if (input.isActive !== undefined) data.isActive = input.isActive;
	if (input.isFeatured !== undefined) data.isFeatured = input.isFeatured;
	if (input.isNew !== undefined) data.isNew = input.isNew;
	if (input.isLimited !== undefined) data.isLimited = input.isLimited;

	return data;
}

async function reconcileVariants(
	tx: TransactionClient,
	productId: string,
	variants: NonNullable<AdminProductUpdateInput["variants"]>,
	currentVariantIds: string[],
) {
	const preservedIds = variants.flatMap((variant) =>
		variant.id === undefined ? [] : [variant.id],
	);
	const currentIdSet = new Set(currentVariantIds);

	if (preservedIds.some((id) => !currentIdSet.has(id))) {
		throw new Error("ADMIN_PRODUCT_INVALID_VARIANT_ID");
	}

	for (const [index, variant] of variants.entries()) {
		if (variant.id === undefined) {
			continue;
		}

		await tx.productVariant.update({
			where: { id: variant.id },
			data: {
				sku: `__AVELIS_ADMIN_TMP__${variant.id}`,
				volumeMl: -(index + 1),
			},
		});
	}

	await tx.productVariant.deleteMany({
		where: {
			productId,
			...(preservedIds.length > 0
				? { id: { notIn: preservedIds } }
				: {}),
		},
	});

	for (const variant of variants) {
		const data = {
			format: variant.format,
			volumeMl: variant.volumeMl,
			price: variant.price,
			compareAtPrice: variant.compareAtPrice,
			sku: variant.sku,
			stock: variant.stock,
		};

		if (variant.id === undefined) {
			await tx.productVariant.create({
				data: {
					...data,
					productId,
				},
			});
		} else {
			await tx.productVariant.update({
				where: { id: variant.id },
				data,
			});
		}
	}
}

async function reconcileImages(
	tx: TransactionClient,
	productId: string,
	images: NonNullable<AdminProductUpdateInput["images"]>,
	currentImages: Array<{ id: string; storageKey: string | null }>,
) {
	const preservedIds = images.flatMap((image) =>
		image.id === undefined ? [] : [image.id],
	);
	const currentIdSet = new Set(currentImages.map((image) => image.id));

	if (preservedIds.some((id) => !currentIdSet.has(id))) {
		throw new Error("ADMIN_PRODUCT_INVALID_IMAGE_ID");
	}

	await tx.productImage.deleteMany({
		where: {
			productId,
			...(preservedIds.length > 0
				? { id: { notIn: preservedIds } }
				: {}),
		},
	});

	for (const image of images) {
		const data = {
			url: image.url,
			storageKey: image.storageKey ?? null,
			mimeType: image.mimeType ?? null,
			sizeBytes: image.sizeBytes ?? null,
			alt: image.alt,
			position: image.position,
			isPrimary: image.isPrimary,
			imageType: image.imageType,
		};

		if (image.id === undefined) {
			await tx.productImage.create({
				data: {
					...data,
					productId,
				},
			});
		} else {
			await tx.productImage.update({
				where: { id: image.id },
				data,
			});
		}
	}

	const preservedStorageKeys = new Set(
		images.flatMap((image) =>
			image.storageKey === undefined ? [] : [image.storageKey],
		),
	);

	return currentImages.flatMap((image) =>
		image.storageKey !== null && !preservedStorageKeys.has(image.storageKey)
			? [image.storageKey]
			: [],
	);
}

export function updateAdminProductRecord(
	id: string,
	input: AdminProductUpdateInput,
) {
	return prisma.$transaction(async (tx) => {
		const currentProduct = await tx.product.findUnique({
			where: { id },
			select: {
				id: true,
				variants: { select: { id: true } },
				images: { select: { id: true, storageKey: true } },
			},
		});

		if (currentProduct === null) {
			throw new Error("ADMIN_PRODUCT_NOT_FOUND");
		}

		const currentVariantIds = currentProduct.variants.map(
			(variant) => variant.id,
		);
		let removedStorageKeys: string[] = [];

		await validateReferencedRelations(
			tx,
			input.notes,
			input.collectionIds,
			id,
		);
		await validateUniqueFields(tx, {
			...(input.slug === undefined ? {} : { slug: input.slug }),
			...(input.variants === undefined
				? {}
				: { skus: input.variants.map((variant) => variant.sku) }),
			productId: id,
			currentVariantIds,
		});

		await tx.product.update({
			where: { id },
			data: buildProductScalarUpdate(input),
		});

		if (input.variants !== undefined) {
			await reconcileVariants(
				tx,
				id,
				input.variants,
				currentVariantIds,
			);
		}

		if (input.images !== undefined) {
			removedStorageKeys = await reconcileImages(
				tx,
				id,
				input.images,
				currentProduct.images,
			);
		}

		if (input.notes !== undefined) {
			await tx.productNote.deleteMany({ where: { productId: id } });
			if (input.notes.length > 0) {
				await tx.productNote.createMany({
					data: input.notes.map((note) => ({
						productId: id,
						noteId: note.noteId,
						type: note.type,
						position: note.position,
					})),
				});
			}
		}

		if (input.collectionIds !== undefined) {
			await tx.productCollection.deleteMany({ where: { productId: id } });
			if (input.collectionIds.length > 0) {
				await tx.productCollection.createMany({
					data: input.collectionIds.map((collectionId) => ({
						productId: id,
						collectionId,
					})),
				});
			}
		}

		const product = await tx.product.findUniqueOrThrow({
			where: { id },
			select: productSelect,
		});

		return { product, removedStorageKeys };
	});
}
