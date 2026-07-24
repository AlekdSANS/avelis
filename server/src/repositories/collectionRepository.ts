import { prisma } from "../lib/prisma.js";
import { productSelect } from "../utils/productMapper.js";

export async function findCollections() {
	return prisma.collection.findMany({
		select: {
			id: true,
			slug: true,
			name: true,
			description: true,
			imageUrl: true,
			_count: {
				select: {
					products: {
						where: {
							product: {
								isActive: true,
							},
						},
					},
				},
			},
		},
		orderBy: [{ name: "asc" }],
	});
}

export async function findCollectionBySlug(slug: string) {
	return prisma.collection.findUnique({
		where: { slug },
		select: {
			id: true,
			slug: true,
			name: true,
			description: true,
			imageUrl: true,
			products: {
				where: {
					product: {
						isActive: true,
					},
				},
				select: {
					product: {
						select: productSelect,
					},
				},
				orderBy: [{ productId: "asc" }],
			},
		},
	});
}
