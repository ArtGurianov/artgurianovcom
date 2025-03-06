import { useEffect, useState } from "react";

export const useDevicePosition = () => {
  const [devicePosition, setDevicePosition] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
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
