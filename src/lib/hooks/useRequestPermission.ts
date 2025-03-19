import { useEffect, useState } from "react";
import { useHyroscopePosition } from "./useHyroscopePosition";

export interface DeviceOrientationEventIOS extends DeviceOrientationEvent {
  requestPermission?: () => Promise<"granted" | "denied">;
}

export const useRequestPermission = () => {
  const [isRequestVisible, setIsRequestVisible] = useState(false);
  const handleHideRequest = () => {
    setIsRequestVisible(false);
  };

  const { isPermissionGranted } = useHyroscopePosition();

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
