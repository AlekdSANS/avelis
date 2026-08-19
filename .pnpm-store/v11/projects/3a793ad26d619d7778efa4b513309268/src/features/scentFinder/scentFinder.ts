import type { Product } from "../../types";

export interface ScentProfile { family: string; season: string; occasion: string; intensity: string; note: string; }

const intensityTerms: Record<string, string[]> = {
  intimate: ["eau de toilette", "soft", "light"],
  balanced: ["eau de parfum", "moderate"],
  expressive: ["parfum", "extrait", "long"],
};

export function scoreScent(product: Product, profile: ScentProfile) {
  let score = 0;
  const reasons: string[] = [];
  if (product.fragranceFamily.toLowerCase().includes(profile.family)) { score += 5; reasons.push(`${product.fragranceFamily} character`); }
  if (product.season.some((value) => value.toLowerCase() === profile.season)) { score += 3; reasons.push(`made for ${profile.season}`); }
  if (product.occasion.some((value) => value.toLowerCase().includes(profile.occasion))) { score += 3; reasons.push(`suited to ${profile.occasion}`); }
  if (product.notes.some((value) => value.name.toLowerCase().includes(profile.note))) { score += 4; reasons.push(`${profile.note} in the composition`); }
  const intensity = `${product.concentration} ${product.longevity ?? ""}`.toLowerCase();
  if ((intensityTerms[profile.intensity] ?? []).some((term) => intensity.includes(term))) { score += 2; reasons.push(`${profile.intensity} presence`); }
  return { product, score, reasons };
}

export function findScents(products: Product[], profile: ScentProfile) {
  return products.map((product) => scoreScent(product, profile)).sort((a, b) => b.score - a.score || Number(b.product.isFeatured) - Number(a.product.isFeatured)).slice(0, 3);
}
