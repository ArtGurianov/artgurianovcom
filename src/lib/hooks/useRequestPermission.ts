import { useEffect, useState } from "react";
import { use3DMotionMeta } from "./use3DPosition";

export interface DeviceOrientationEventIOS extends DeviceOrientationEvent {
  requestPermission?: () => Promise<"granted" | "denied">;
}

export const useRequestPermission = () => {
  const [isRequestVisible, setIsRequestVisible] = useState(false);
  const [isRequestDismissed, setIsRequestDismissed] = useState(false);
  const handleHideRequest = () => {
    setIsRequestDismissed(true);
    setIsRequestVisible(false);
  };

  const { isPermissionGranted, shouldRequestPermission } = use3DMotionMeta();

  useEffect(() => {
    setIsRequestVisible(
      shouldRequestPermission && !isPermissionGranted && !isRequestDismissed
    );
  }, [isPermissionGranted, isRequestDismissed, shouldRequestPermission]);

  return { isRequestVisible, handleHideRequest };
};
