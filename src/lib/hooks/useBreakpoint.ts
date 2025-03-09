import { ValueOf } from "../types";
import { useWindowSize } from "./useWindowSize";

const WINDOW_WIDTH_SIZES = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
  xxl: "xxl",
} as const;

type WindowWidthSize = ValueOf<typeof WINDOW_WIDTH_SIZES>;

const WINDOW_SIZES_MAP: Record<WindowWidthSize, number> = {
  [WINDOW_WIDTH_SIZES.xs]: 0,
  [WINDOW_WIDTH_SIZES.sm]: 640,
  [WINDOW_WIDTH_SIZES.md]: 768,
  [WINDOW_WIDTH_SIZES.lg]: 1024,
  [WINDOW_WIDTH_SIZES.xl]: 1280,
  [WINDOW_WIDTH_SIZES.xxl]: 1536,
};

const TAILWIND_SIZES_ORDER: Array<ValueOf<typeof WINDOW_WIDTH_SIZES>> = [
  WINDOW_WIDTH_SIZES.xs,
  WINDOW_WIDTH_SIZES.sm,
  WINDOW_WIDTH_SIZES.md,
  WINDOW_WIDTH_SIZES.lg,
  WINDOW_WIDTH_SIZES.xl,
  WINDOW_WIDTH_SIZES.xxl,
];

export const useBreakpoint = (): ValueOf<typeof WINDOW_WIDTH_SIZES> => {
  const { width } = useWindowSize();
  let size: ValueOf<typeof WINDOW_WIDTH_SIZES> = "xs";
  TAILWIND_SIZES_ORDER.forEach((value) => {
    if (width > WINDOW_SIZES_MAP[value]) {
      size = value;
    }
  });
  return size;
};
