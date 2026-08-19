import { trackGrowth } from "./analytics";
export type ExperimentVariant = "control" | "finder-first";
const STORAGE_KEY = "avelis.experiments.v1";
function hash(value: string) { let result = 2166136261; for (const char of value) result = Math.imul(result ^ char.charCodeAt(0), 16777619); return result >>> 0; }
function visitorId() { const key = "avelis.visitor.v1"; const existing = localStorage.getItem(key); if (existing) return existing; const created = crypto.randomUUID(); localStorage.setItem(key, created); return created; }
export function getHomepageGrowthVariant(): ExperimentVariant { const stored = localStorage.getItem(STORAGE_KEY) as ExperimentVariant | null; const variant = stored === "control" || stored === "finder-first" ? stored : hash(visitorId()) % 2 === 0 ? "control" : "finder-first"; localStorage.setItem(STORAGE_KEY, variant); return variant; }
export function trackExperimentImpression(variant: ExperimentVariant) { trackGrowth({ event: "experiment_impression", experiment_id: "homepage-growth-cta-v1", variant_id: variant }); }
export function trackExperimentConversion(variant: ExperimentVariant) { trackGrowth({ event: "experiment_conversion", experiment_id: "homepage-growth-cta-v1", variant_id: variant }); }
