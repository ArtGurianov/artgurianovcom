import {
  Coordinates3D,
  use3DMotionMeta,
  use3DPositionReactive,
} from "./use3DPosition";

interface HyroscopePosition extends Coordinates3D {
  isPermissionGranted: boolean;
}

export const useHyroscopePosition = (): HyroscopePosition => {
  const position = use3DPositionReactive();
  const { isPermissionGranted } = use3DMotionMeta();

  return {
    ...position,
    isPermissionGranted,
  };
};
