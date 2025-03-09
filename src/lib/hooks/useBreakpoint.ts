import { ValueOf } from "@/lib/types";
import { useWindowSize } from "./useWindowSize";

export const BREAKPOINTS = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
  xxl: "xxl",
} as const;

type Breakpoint = ValueOf<typeof BREAKPOINTS>;

const WINDOW_SIZES_MAP: Record<Breakpoint, number> = {
  [BREAKPOINTS.xs]: 0,
  [BREAKPOINTS.sm]: 640,
  [BREAKPOINTS.md]: 768,
  [BREAKPOINTS.lg]: 1024,
  [BREAKPOINTS.xl]: 1280,
  [BREAKPOINTS.xxl]: 1536,
};

const BREAKPOINTS_ORDER: Array<ValueOf<typeof BREAKPOINTS>> = [
  BREAKPOINTS.xs,
  BREAKPOINTS.sm,
  BREAKPOINTS.md,
  BREAKPOINTS.lg,
  BREAKPOINTS.xl,
  BREAKPOINTS.xxl,
];

export const useBreakpoint = (): ValueOf<typeof BREAKPOINTS> => {
  const { width } = useWindowSize();
  let size: ValueOf<typeof BREAKPOINTS> = "xs";
  BREAKPOINTS_ORDER.forEach((value) => {
    if (width > WINDOW_SIZES_MAP[value]) {
      size = value;
    }
  });
  return size;
};
