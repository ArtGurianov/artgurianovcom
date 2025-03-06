import { useEffect, useState } from "react";
import { isMotionDevice } from "@/lib/utils";
import { useDevicePosition, useMousePosition } from "@/lib/hooks";

export const useNormalizedPosition = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  const { x: xMobile, y: yMobile } = useDevicePosition();
  const { x: xMouse, y: yMouse } = useMousePosition();

  useEffect(() => {
    const isMobile = isMotionDevice();
    setIsMobile(isMobile);
  }, []);

  const isInitialized = typeof isMobile === "boolean";

  if (!isInitialized || !window) {
    return { x: 0, y: 0 };
  }

  return {
    x: isMobile ? xMobile / 180 : (xMouse / window.innerWidth) * 2 - 1,
    y: isMobile ? yMobile / 90 : (yMouse / window.innerHeight) * 2 - 1,
  };
};
