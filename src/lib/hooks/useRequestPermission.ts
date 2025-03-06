import { useEffect, useState } from "react";
import { use3DPosition } from "./use3DPosition";
import { useIsMobile } from "./useIsMobile";

export interface DeviceOrientationEventIOS extends DeviceOrientationEvent {
  requestPermission?: () => Promise<"granted" | "denied">;
}

export const useRequestPermission = () => {
  const [isRequestVisible, setIsRequestVisible] = useState(false);
  const handleHideRequest = () => {
    setIsRequestVisible(false);
  };

  const { x, y } = use3DPosition();
  const { isMobile } = useIsMobile();
  const isPermissionGranted = isMobile && (x !== 0 || y !== 0);

  const [isPermissionRequested, setIsPermissionRequested] = useState(false);
  useEffect(() => {
    if (
      !!window.DeviceOrientationEvent &&
      typeof (
        window.DeviceOrientationEvent as unknown as DeviceOrientationEventIOS
      ).requestPermission === "function"
    ) {
      setIsPermissionRequested(true);
    }
  }, []);

  useEffect(() => {
    if (isPermissionRequested) {
      setIsRequestVisible(isPermissionGranted ? false : true);
    }
  }, [isPermissionGranted, isPermissionRequested]);

  return { isRequestVisible, handleHideRequest };
};
