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
    console.log(devicePosition.x, devicePosition.y);
  }, [devicePosition.x, devicePosition.y]);

  useEffect(() => {
    const updateDevicePosition = (ev: DeviceOrientationEvent) => {
      setDevicePosition({ x: ev.beta || 0, y: ev.gamma || 0 });
    };
    window.addEventListener("deviceorientation", updateDevicePosition);
    return () => {
      window.removeEventListener("deviceorientation", updateDevicePosition);
    };
  }, []);

  return devicePosition;
};
