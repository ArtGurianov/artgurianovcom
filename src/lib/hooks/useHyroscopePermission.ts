import { useEffect, useState } from "react";
import { use3DPosition } from "./use3DPosition";
import { useIsMobile } from "./useIsMobile";

export interface DeviceOrientationEventIOS extends DeviceOrientationEvent {
  requestPermission?: () => Promise<"granted" | "denied">;
}

export const useHyroscopePermission = () => {
  const [isPermissionRequested, setIsPermissionRequested] = useState(false);

  const { x, y } = use3DPosition();
  const { isMobile } = useIsMobile();

  const isPermissionGranted =
    typeof isMobile === "boolean"
      ? !!isMobile && (typeof x === "number" || typeof y === "number")
      : null;

  useEffect(() => {
    if (
      !!window.DeviceOrientationEvent &&
      typeof (
        window.DeviceOrientationEvent as unknown as DeviceOrientationEventIOS
      ).requestPermission === "function" &&
      isPermissionGranted === false
    ) {
      setIsPermissionRequested(true);
    }
  }, [isPermissionGranted]);

  return { isPermissionRequested, isPermissionGranted };
};
