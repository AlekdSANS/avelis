import type { CSSProperties } from "react";

import type {
  ProductThemeMode,
  ProductThemePreset,
} from "../../../types/product";

export type ProductThemeColors = {
  background: string;
  surface: string;
  accent: string;
};

export type ProductThemeSettings = {
  themeMode: ProductThemeMode;
  themePreset: ProductThemePreset | null;
  themeBackground: string | null;
  themeSurface: string | null;
  themeAccent: string | null;
};

export const defaultProductTheme: ProductThemeColors = {
  background: "#F2EFE9",
  surface: "#F7F4EF",
  accent: "#30231E",
};

export const productThemePresets: Record<
  ProductThemePreset,
  ProductThemeColors & { label: string; description: string }
> = {
  MIDNIGHT: {
    label: "Midnight",
    description: "Inky plum with a luminous violet accent.",
    background: "#17151E",
    surface: "#24212D",
    accent: "#AFA0F5",
  },
  FOREST: {
    label: "Forest",
    description: "Soft mineral green with a deep botanical accent.",
    background: "#E7EBE4",
    surface: "#F0F3ED",
    accent: "#365544",
  },
  BURGUNDY: {
    label: "Burgundy",
    description: "Warm blush stone with a restrained wine accent.",
    background: "#F0E8E5",
    surface: "#F7F0ED",
    accent: "#6E2934",
  },
};

const darkText = "#302722";
const lightText = "#FFF9F2";

function parseHex(value: string) {
  const normalized = value.replace("#", "");
  return {
    red: Number.parseInt(normalized.slice(0, 2), 16),
    green: Number.parseInt(normalized.slice(2, 4), 16),
    blue: Number.parseInt(normalized.slice(4, 6), 16),
  };
}

function toHex(value: number) {
  return Math.round(value).toString(16).padStart(2, "0").toUpperCase();
}

function mixColors(foreground: string, background: string, amount: number) {
  const front = parseHex(foreground);
  const back = parseHex(background);
  return `#${toHex(front.red * amount + back.red * (1 - amount))}${toHex(
    front.green * amount + back.green * (1 - amount),
  )}${toHex(front.blue * amount + back.blue * (1 - amount))}`;
}

function luminance(value: string) {
  const rgb = parseHex(value);
  const channels = [rgb.red, rgb.green, rgb.blue].map((channel) => {
    const normalized = channel / 255;
    return normalized <= 0.04045
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  });
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function contrast(left: string, right: string) {
  const brighter = Math.max(luminance(left), luminance(right));
  const darker = Math.min(luminance(left), luminance(right));
  return (brighter + 0.05) / (darker + 0.05);
}

function readableText(backgrounds: string[]) {
  const darkScore = Math.min(
    ...backgrounds.map((background) => contrast(darkText, background)),
  );
  const lightScore = Math.min(
    ...backgrounds.map((background) => contrast(lightText, background)),
  );
  return darkScore >= lightScore ? darkText : lightText;
}

export function resolveProductTheme(
  settings: ProductThemeSettings,
): ProductThemeColors {
  if (settings.themeMode === "PRESET" && settings.themePreset !== null) {
    return productThemePresets[settings.themePreset];
  }

  if (
    settings.themeMode === "CUSTOM" &&
    settings.themeBackground !== null &&
    settings.themeSurface !== null &&
    settings.themeAccent !== null
  ) {
    return {
      background: settings.themeBackground,
      surface: settings.themeSurface,
      accent: settings.themeAccent,
    };
  }

  return defaultProductTheme;
}

export function createProductThemeStyle(
  settings: ProductThemeSettings,
): CSSProperties {
  const colors = resolveProductTheme(settings);
  const text = readableText([colors.background, colors.surface]);
  const onAccent = readableText([colors.accent]);

  return {
    "--color-bg": colors.background,
    "--color-surface": colors.surface,
    "--color-text": text,
    "--color-text-muted": mixColors(text, colors.background, 0.62),
    "--color-border": mixColors(text, colors.background, 0.2),
    "--color-olive": colors.accent,
    "--product-accent": colors.accent,
    "--product-on-accent": onAccent,
  } as CSSProperties;
}
