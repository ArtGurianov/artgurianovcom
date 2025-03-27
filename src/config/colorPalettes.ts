import { ValueOf } from "@/lib/types";

export const COLOR_PALETTE_CLASSNAME_IDS = {
  DEFAULT: "default",
  DARK: "dark",
  LIGHT: "light",
  NEON: "neon",
  CYBER: "cyber",
  RAINBOW: "rainbow",
} as const;
export type ColorPaletteId = ValueOf<typeof COLOR_PALETTE_CLASSNAME_IDS>;
