import { productFilterOptions } from "../../products/data/productFilterOptions.ts";
import type { ProductVariantFormat } from "../../../types/product";

export type GuideFamilyName = (typeof productFilterOptions.families)[number];

export type GuideFamily = {
  character: string;
  description: string;
  name: GuideFamilyName;
  occasion: string;
};

const familyDetails: Record<
  GuideFamilyName,
  Omit<GuideFamily, "name">
> = {
  Woody: {
    description:
      "Dry timber, polished bark and earthy roots create a composed sense of depth.",
    character: "Grounded · refined · quiet",
    occasion: "Focused days and understated evenings",
  },
  Floral: {
    description:
      "Petals and green stems can feel translucent, soft or richly expressive.",
    character: "Luminous · expressive · soft",
    occasion: "Everyday wear and close celebrations",
  },
  Amber: {
    description:
      "Resins, warm spice and smooth sweetness gather into an enveloping glow.",
    character: "Warm · deep · enveloping",
    occasion: "Evenings and cooler weather",
  },
  Fresh: {
    description:
      "Citrus peel, aromatic leaves and clear air bring lift and immediacy.",
    character: "Bright · clean · energetic",
    occasion: "Daytime, travel and warmer weather",
  },
  Spicy: {
    description:
      "Pepper, seed and aromatic bark add radiance, contrast and measured heat.",
    character: "Vivid · textured · confident",
    occasion: "Creative days and evening occasions",
  },
  Gourmand: {
    description:
      "Familiar sweetness is tempered by woods, spice and tactile warmth.",
    character: "Comforting · rounded · intimate",
    occasion: "Cooler days and unhurried evenings",
  },
  Aquatic: {
    description:
      "Salt air, mineral facets and transparent florals suggest open water.",
    character: "Sheer · cool · expansive",
    occasion: "Warm days and effortless daily wear",
  },
  Powdery: {
    description:
      "Iris-like softness, pale woods and musks create a close, diffused trail.",
    character: "Soft · composed · skin-close",
    occasion: "Quiet days and intimate settings",
  },
};

export const guideFamilies: GuideFamily[] = productFilterOptions.families.map(
  (name) => ({
    name,
    ...familyDetails[name],
  }),
);

export const noteLayers = [
  {
    key: "TOP",
    index: "01",
    name: "Top notes",
    timing: "The opening",
    description:
      "The first impression — bright, immediate and often the first to soften.",
  },
  {
    key: "HEART",
    index: "02",
    name: "Heart notes",
    timing: "The character",
    description:
      "The central character of the fragrance as it settles and opens on skin.",
  },
  {
    key: "BASE",
    index: "03",
    name: "Base notes",
    timing: "The lasting foundation",
    description:
      "The deeper foundation that remains as the lighter notes gradually fade.",
  },
] as const;

export const concentrations = [
  {
    name: "Eau de Toilette",
    intensity: "Lighter",
    longevity: "A more fleeting trail",
    character: "Airy and immediate",
    context: "An easy choice for daytime or warmer settings.",
  },
  {
    name: "Eau de Parfum",
    intensity: "Balanced",
    longevity: "A sustained presence",
    character: "Fuller and versatile",
    context: "A considered balance for everyday and evening wear.",
  },
  {
    name: "Extrait de Parfum",
    intensity: "Most concentrated",
    longevity: "A slower impression",
    character: "Deep and close",
    context: "Suited to moments when a more resonant composition feels right.",
  },
] as const;

export type FormatGuideItem = {
  format: ProductVariantFormat;
  eyebrow: string;
  name: string;
  description: string;
  detail: string;
  action: string;
};

export const formatGuideItems: FormatGuideItem[] = [
  {
    format: "BOTTLE",
    eyebrow: "The complete object",
    name: "Bottle",
    description:
      "The complete AVELIS presentation, composed as both a fragrance vessel and a quiet display object.",
    detail: "Choose a bottle when beginning with a fragrance.",
    action: "Shop bottles",
  },
  {
    format: "REFILL",
    eyebrow: "A considered return",
    name: "Refill",
    description:
      "Made to replenish an existing AVELIS fragrance while keeping the original bottle in use.",
    detail: "Uses less presentation packaging than purchasing another bottle.",
    action: "Shop refills",
  },
];

export const scentCharacters = [
  {
    name: "Fresh and luminous",
    description: "Citrus brightness, neroli and an impression of clear air.",
    filter: { note: "neroli" },
    action: "Explore luminous scents",
  },
  {
    name: "Warm and enveloping",
    description: "Amber warmth, softly sweet resins and measured spice.",
    filter: { family: "Amber" },
    action: "Explore warm scents",
  },
  {
    name: "Deep and grounded",
    description: "Cedar, polished woods and roots with a composed dry finish.",
    filter: { family: "Woody" },
    action: "Explore grounded scents",
  },
  {
    name: "Soft and floral",
    description: "Petals, clean woods and light that feels diffused rather than sweet.",
    filter: { family: "Floral" },
    action: "Explore floral scents",
  },
  {
    name: "Bold and unusual",
    description: "Saffron, smoke and contrast for a more distinctive presence.",
    filter: { note: "saffron" },
    action: "Explore distinctive scents",
  },
] as const;
