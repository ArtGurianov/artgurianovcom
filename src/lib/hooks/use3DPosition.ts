import {
  useHyroscopePosition,
  useIsMobile,
  useMousePosition,
} from "@/lib/hooks";

export const use3DPosition = (): { x: number; y: number } => {
  const { isMobile, isInitialized } = useIsMobile();
  const { x: xMobile, y: yMobile } = useHyroscopePosition();
  const { x: xMouse, y: yMouse } = useMousePosition();

  if (!isInitialized || !window) {
    return { x: 0, y: 0 };
  }

  return {
    x: isMobile ? xMobile : xMouse,
    y: isMobile ? yMobile : yMouse,
  };
};
