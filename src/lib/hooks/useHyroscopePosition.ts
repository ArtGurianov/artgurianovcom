import { useEffect, useState } from "react";

export const useHyroscopePosition = () => {
  const [devicePosition, setDevicePosition] = useState<{
    x: number | null;
    y: number | null;
  }>({
    x: null,
    y: null,
  });

  useEffect(() => {
    const updateDevicePosition = (ev: DeviceOrientationEvent) => {
      setDevicePosition({ x: (ev.gamma || 0) / 90, y: (ev.beta || 0) / 90 });
    };
    window.addEventListener("deviceorientation", updateDevicePosition);
    return () => {
      window.removeEventListener("deviceorientation", updateDevicePosition);
    };
  }, []);

  return devicePosition;
};
