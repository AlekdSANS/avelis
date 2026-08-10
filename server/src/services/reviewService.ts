import { prisma } from "../lib/prisma.js";
import type { ReviewCreateInput, ReviewModerationInput } from "../schemas/growthSchemas.js";
import { HttpError } from "../utils/httpError.js";

const reviewSelect = {
  id: true, rating: true, title: true, content: true, status: true,
  verifiedPurchase: true, createdAt: true, updatedAt: true,
  user: { select: { firstName: true, lastName: true } },
  product: { select: { id: true, slug: true, name: true } },
} as const;

function mapReview(review: Awaited<ReturnType<typeof prisma.review.findFirst>> extends never ? never : any) {
  return {
    id: review.id,
    rating: review.rating,
    title: review.title,
    content: review.content,
    status: review.status,
    verifiedPurchase: review.verifiedPurchase,
    reviewerName: `${review.user.firstName} ${review.user.lastName.slice(0, 1)}.`,
    product: review.product,
    createdAt: review.createdAt.toISOString(),
    updatedAt: review.updatedAt.toISOString(),
  };
}

export async function listProductReviews(slug: string) {
  const product = await prisma.product.findFirst({ where: { slug, isActive: true }, select: { id: true } });
  if (!product) throw new HttpError(404, "Product not found");
  const reviews = await prisma.review.findMany({
    where: { productId: product.id, status: "APPROVED" }, select: reviewSelect,
    orderBy: [{ verifiedPurchase: "desc" }, { createdAt: "desc" }],
  });
  return { data: reviews.map(mapReview) };
}

export async function submitProductReview(slug: string, userId: string, input: ReviewCreateInput) {
  const product = await prisma.product.findFirst({ where: { slug, isActive: true }, select: { id: true } });
  if (!product) throw new HttpError(404, "Product not found");
  const existing = await prisma.review.findUnique({ where: { userId_productId: { userId, productId: product.id } } });
  if (existing) throw new HttpError(409, "You have already reviewed this fragrance");
  const verifiedPurchase = await prisma.orderItem.count({ where: {
    productId: product.id,
    order: { userId, paymentStatus: "PAID", status: { notIn: ["CANCELLED", "REFUNDED"] } },
  } }) > 0;
  const review = await prisma.review.create({
    data: { userId, productId: product.id, rating: input.rating, title: input.title ?? null, content: input.content ?? null, verifiedPurchase }, select: reviewSelect,
  });
  return { data: mapReview(review), message: "Review submitted for moderation" };
}

export async function listAdminReviews() {
  const reviews = await prisma.review.findMany({ select: reviewSelect, orderBy: [{ status: "asc" }, { createdAt: "desc" }] });
  return { data: reviews.map(mapReview) };
}

export async function moderateReview(id: string, input: ReviewModerationInput) {
  const found = await prisma.review.findUnique({ where: { id }, select: { id: true } });
  if (!found) throw new HttpError(404, "Review not found");
  const review = await prisma.review.update({
    where: { id }, data: { status: input.status, moderatedAt: new Date() }, select: reviewSelect,
  });
  return { data: mapReview(review) };
}
