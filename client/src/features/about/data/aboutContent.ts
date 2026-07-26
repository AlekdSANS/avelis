export const scentAndFormSteps = [
  {
    index: "01",
    title: "Atmosphere",
    description:
      "Each fragrance begins with a clear mood: filtered light, mineral air, the warmth of timber or a flower held just before full bloom. This atmosphere gives the composition its direction.",
  },
  {
    index: "02",
    title: "Composition",
    description:
      "Notes build the internal character through contrast, texture and pace. Bright openings, resonant hearts and grounded bases are considered as parts of one continuous experience.",
  },
  {
    index: "03",
    title: "Form",
    description:
      "The bottle translates that character into silhouette, colour and surface. Its sculptural presence belongs to the fragrance from the beginning; it is not decoration added afterward.",
  },
] as const;

export const materialDetails = [
  {
    title: "Light",
    description: "Frosted and translucent finishes soften colour and reveal depth.",
  },
  {
    title: "Line",
    description: "Organic asymmetry and flowing contours resist perfect repetition.",
  },
  {
    title: "Texture",
    description: "Botanical, mineral and wood references bring tactility to the image.",
  },
  {
    title: "Palette",
    description: "Warm neutrals are punctuated by the distinctive tone of each scent.",
  },
] as const;

export const formatDetails = [
  {
    eyebrow: "The primary object",
    title: "Bottle",
    sizes: "50 ml · 100 ml",
    description:
      "The sculptural bottle is the complete AVELIS presentation: a fragrance vessel designed to remain visible and to become part of the daily ritual.",
    action: "Shop bottles",
    to: "/shop?format=BOTTLE",
  },
  {
    eyebrow: "The continuing ritual",
    title: "Refill",
    sizes: "100 ml · 150 ml",
    description:
      "The refill renews the same fragrance while keeping the original bottle in use. It avoids repeating the full presentation and preserves the relationship with the primary object.",
    action: "Shop refills",
    to: "/shop?format=REFILL",
  },
] as const;

export const brandPrinciples = [
  {
    title: "Individuality over convention",
    description:
      "A fragrance should clarify a personal presence, not prescribe a role.",
  },
  {
    title: "Atmosphere over trend",
    description:
      "Compositions begin with an enduring feeling rather than a passing category.",
  },
  {
    title: "Form with purpose",
    description:
      "Every visual choice should strengthen the character of the scent it holds.",
  },
  {
    title: "Repetition without waste",
    description:
      "Refill formats continue the ritual without repeating the complete object.",
  },
  {
    title: "Luxury through restraint",
    description:
      "Space, material and careful proportion can speak more clearly than excess.",
  },
] as const;
