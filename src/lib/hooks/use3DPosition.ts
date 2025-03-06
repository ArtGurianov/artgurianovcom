import {
  useHyroscopePosition,
  useIsMobile,
  useMousePosition,
} from "@/lib/hooks";

export const use3DPosition = (): { x: number | null; y: number | null } => {
  const { isMobile, isInitialized } = useIsMobile();
  const { x: xMobile, y: yMobile } = useHyroscopePosition();
  const { x: xMouse, y: yMouse } = useMousePosition();

  if (!isInitialized || !window) {
    return { x: null, y: null };
  }

  return {
    x: isMobile ? xMobile : xMouse,
    y: isMobile ? yMobile : yMouse,
  };
};
