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

  const isPermissionGranted = !!isMobile && (!!x || !!y);

  useEffect(() => {
    if (
      !!window.DeviceOrientationEvent &&
      typeof (
        window.DeviceOrientationEvent as unknown as DeviceOrientationEventIOS
      ).requestPermission === "function" &&
      !isPermissionGranted
    ) {
      setIsPermissionRequested(true);
    }
  }, [x, y, isPermissionGranted]);

  return { isPermissionRequested, isPermissionGranted };
};
