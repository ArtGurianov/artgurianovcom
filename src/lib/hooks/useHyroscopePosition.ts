import { useEffect, useState } from "react";
import { Coordinates3D } from "./use3DPosition";

export const useHyroscopePosition = () => {
  const [devicePosition, setDevicePosition] = useState<Coordinates3D>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const updateDevicePosition = (ev: DeviceOrientationEvent) => {
      setDevicePosition({
        x: Math.round((ev.gamma || 0) * 100) / 100 / 90,
        y: Math.round((ev.beta || 0) * 100) / 100 / 180,
      });
    };
    window.addEventListener("deviceorientation", updateDevicePosition);
    return () => {
      window.removeEventListener("deviceorientation", updateDevicePosition);
    };
  }, []);

  return devicePosition;
};
