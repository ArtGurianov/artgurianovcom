import { ValueOf } from "@/lib/types";

export const CONTENTFUL_PALETTE_CLASSNAME_IDS = {
  DEFAULT: "default",
  DARK: "dark",
  LIGHT: "light",
  NEON: "neon",
  CYBER: "cyber",
  RAINBOW: "rainbow",
} as const;
export type ColorPaletteId = ValueOf<typeof CONTENTFUL_PALETTE_CLASSNAME_IDS>;
