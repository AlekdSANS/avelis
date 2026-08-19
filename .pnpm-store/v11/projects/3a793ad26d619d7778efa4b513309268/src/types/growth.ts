export type ReviewStatus = "PENDING" | "APPROVED" | "REJECTED";
export interface Review { id: string; rating: number; title: string | null; content: string | null; status: ReviewStatus; verifiedPurchase: boolean; reviewerName: string; product: { id: string; slug: string; name: string }; createdAt: string; updatedAt: string; }
export type JournalStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";
export interface JournalArticle { id: string; slug: string; title: string; eyebrow: string | null; excerpt: string; body: string; coverImageUrl: string | null; authorName: string; tags: string[]; readingTimeMinutes: number; status: JournalStatus; isFeatured: boolean; publishedAt: string | null; seoTitle: string | null; seoDescription: string | null; createdAt: string; updatedAt: string; }
export type JournalArticleInput = Omit<JournalArticle, "id" | "publishedAt" | "createdAt" | "updatedAt">;
