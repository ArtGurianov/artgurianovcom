import { ValueOf } from "@/lib/types";

export const COLOR_PALETTE_IDS = {
  DEFAULT: "DEFAULT",
  DARK: "DARK",
  LIGHT: "LIGHT",
  NEON: "NEON",
  CYBER: "CYBER",
  RAINBOW: "RAINBOW",
} as const;
export type ColorPaletteId = ValueOf<typeof COLOR_PALETTE_IDS>;

export interface ColorPalette {
  background: string;
  foreground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  border: string;
  card: string;
  cardForeground: string;
  accent: string;
  accentForeground: string;
  muted: string;
  mutedForeground: string;
}

export const COLOR_PALETTES: Record<ColorPaletteId, ColorPalette> = {
  [COLOR_PALETTE_IDS.DEFAULT]: {
    background: "#d3d7d4",
    foreground: "#000c02",
    primary: "#6e4260",
    primaryForeground: "#eaf2e3",
    secondary: "#d5bccd",
    secondaryForeground: "#eaf2e3",
    border: "#000c02",
    card: "#4c5f3c",
    cardForeground: "#eaf2e3",
    accent: "#9bb388",
    accentForeground: "#d3d7d4",
    muted: "#343c35",
    mutedForeground: "#dff1d1",
  },
  [COLOR_PALETTE_IDS.DARK]: {
    background: "#d3d7d4",
    foreground: "#000c02",
    primary: "#6e4260",
    primaryForeground: "#eaf2e3",
    secondary: "#d5bccd",
    secondaryForeground: "#eaf2e3",
    border: "#000c02",
    card: "#4c5f3c",
    cardForeground: "#eaf2e3",
    accent: "#9bb388",
    accentForeground: "#d3d7d4",
    muted: "#343c35",
    mutedForeground: "#dff1d1",
  },
  [COLOR_PALETTE_IDS.LIGHT]: {
    background: "#d3d7d4",
    foreground: "#000c02",
    primary: "#6e4260",
    primaryForeground: "#eaf2e3",
    secondary: "#d5bccd",
    secondaryForeground: "#eaf2e3",
    border: "#000c02",
    card: "#4c5f3c",
    cardForeground: "#eaf2e3",
    accent: "#9bb388",
    accentForeground: "#d3d7d4",
    muted: "#343c35",
    mutedForeground: "#dff1d1",
  },
  [COLOR_PALETTE_IDS.NEON]: {
    background: "#d3d7d4",
    foreground: "#000c02",
    primary: "#6e4260",
    primaryForeground: "#eaf2e3",
    secondary: "#d5bccd",
    secondaryForeground: "#eaf2e3",
    border: "#000c02",
    card: "#4c5f3c",
    cardForeground: "#eaf2e3",
    accent: "#9bb388",
    accentForeground: "#d3d7d4",
    muted: "#343c35",
    mutedForeground: "#dff1d1",
  },
  [COLOR_PALETTE_IDS.CYBER]: {
    background: "#d3d7d4",
    foreground: "#000c02",
    primary: "#6e4260",
    primaryForeground: "#eaf2e3",
    secondary: "#d5bccd",
    secondaryForeground: "#eaf2e3",
    border: "#000c02",
    card: "#4c5f3c",
    cardForeground: "#eaf2e3",
    accent: "#9bb388",
    accentForeground: "#d3d7d4",
    muted: "#343c35",
    mutedForeground: "#dff1d1",
  },
  [COLOR_PALETTE_IDS.RAINBOW]: {
    background: "#d3d7d4",
    foreground: "#000c02",
    primary: "#6e4260",
    primaryForeground: "#eaf2e3",
    secondary: "#d5bccd",
    secondaryForeground: "#eaf2e3",
    border: "#000c02",
    card: "#4c5f3c",
    cardForeground: "#eaf2e3",
    accent: "#9bb388",
    accentForeground: "#d3d7d4",
    muted: "#343c35",
    mutedForeground: "#dff1d1",
  },
} as const;
