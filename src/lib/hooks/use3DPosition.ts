import {
  useHyroscopePosition,
  useIsMobile,
  useMousePosition,
} from "@/lib/hooks";
import { useEffect, useRef, useState } from "react";

export interface Coordinates3D {
  x: number;
  y: number;
}

export const use3DPosition = (): Coordinates3D => {
  const [finalPosition, setFinalPosition] = useState<Coordinates3D>({
    x: 0,
    y: 0,
  });

  const { isMobile, isInitialized } = useIsMobile();
  const { x: xMobile, y: yMobile } = useHyroscopePosition();
  const { x: xMouse, y: yMouse } = useMousePosition();
  const x = isMobile ? xMobile : xMouse;
  const y = isMobile ? yMobile : yMouse;

  const backslideIntervalId = useRef<NodeJS.Timeout | undefined>(undefined);
  const handleAnimateBackslide = () => {
    const intervalId = setInterval(() => {
      setFinalPosition((prev) => ({
        x: Math.abs(prev.x) > 0.01 ? prev.x * 0.99 : 0,
        y: Math.abs(prev.y) > 0.01 ? prev.y * 0.99 : 0,
      }));
    }, 10);
    backslideIntervalId.current = intervalId;
  };

  const throttleTimeoutId = useRef<NodeJS.Timeout | undefined>(undefined);
  const updateThrottleTimeout = () => {
    if (throttleTimeoutId?.current) {
      clearTimeout(throttleTimeoutId.current);
    }
    const timeoutId = setTimeout(() => {
      handleAnimateBackslide();
    }, 0.5);
    throttleTimeoutId.current = timeoutId;
  };

  useEffect(() => {
    setFinalPosition({ x, y });
    updateThrottleTimeout();
    if (backslideIntervalId?.current) {
      clearInterval(backslideIntervalId.current);
    }
  }, [x, y]);

  if (!isInitialized || !window) {
    return { x: 0, y: 0 };
  }

  return finalPosition;
};
