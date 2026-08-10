import { z } from "zod";

const optionalText = (max: number) => z.string().trim().max(max).nullable().optional();
const slug = z.string().trim().min(2).max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const reviewCreateSchema = z.object({
  rating: z.number().int().min(1).max(5),
  title: optionalText(120),
  content: optionalText(2000),
}).strict();

export const reviewModerationSchema = z.object({
  status: z.enum(["APPROVED", "REJECTED"]),
}).strict();

export const journalArticleSchema = z.object({
  slug,
  title: z.string().trim().min(3).max(180),
  eyebrow: optionalText(80),
  excerpt: z.string().trim().min(20).max(400),
  body: z.string().trim().min(50).max(30000),
  coverImageUrl: optionalText(500),
  authorName: z.string().trim().min(2).max(100).default("AVELIS Editorial"),
  tags: z.array(z.string().trim().min(1).max(40)).max(12).default([]),
  readingTimeMinutes: z.number().int().min(1).max(60).default(4),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  isFeatured: z.boolean().default(false),
  seoTitle: optionalText(180),
  seoDescription: optionalText(320),
}).strict();

export const journalArticleUpdateSchema = journalArticleSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  "At least one article field is required",
);

export type ReviewCreateInput = z.infer<typeof reviewCreateSchema>;
export type ReviewModerationInput = z.infer<typeof reviewModerationSchema>;
export type JournalArticleInput = z.infer<typeof journalArticleSchema>;
export type JournalArticleUpdateInput = z.infer<typeof journalArticleUpdateSchema>;
