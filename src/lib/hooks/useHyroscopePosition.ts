import { useEffect, useRef, useState } from "react";
import { Coordinates3D } from "./use3DPosition";

export const useHyroscopePosition = () => {
  const isPermissionGrantedRef = useRef(false);

  const [devicePosition, setDevicePosition] = useState<Coordinates3D>({
    x: 0,
    y: 0,
  });
  const oneStepGuardRef = useRef<Coordinates3D>({
    x: 0,
    y: 0,
  });
  const twoStepGuardRef = useRef<Coordinates3D>({
    x: 0,
    y: 0,
  });

  const updateDevicePosition = (ev: DeviceOrientationEvent) => {
    if (!isPermissionGrantedRef.current) {
      isPermissionGrantedRef.current = !!ev.gamma || !!ev.beta || !!ev.alpha;
    }

    const normalizedX = Math.round((ev.gamma || 0) * 100) / 100 / 90;
    const normalizedY = Math.round((ev.beta || 0) * 100) / 100 / 180;

    if (
      (normalizedX !== oneStepGuardRef.current.x &&
        normalizedX !== twoStepGuardRef.current.x) ||
      (normalizedY !== oneStepGuardRef.current.y &&
        normalizedY !== twoStepGuardRef.current.y)
    ) {
      twoStepGuardRef.current = {
        x: oneStepGuardRef.current.x,
        y: oneStepGuardRef.current.y,
      };
      oneStepGuardRef.current = { x: normalizedX, y: normalizedY };
      setDevicePosition({
        x: normalizedX,
        y: normalizedY,
      });
    }
  };

  useEffect(() => {
    window.addEventListener("deviceorientation", updateDevicePosition);
    return () => {
      window.removeEventListener("deviceorientation", updateDevicePosition);
    };
  }, []);

  return {
    ...devicePosition,
    isPermissionGranted: isPermissionGrantedRef.current,
  };
};
