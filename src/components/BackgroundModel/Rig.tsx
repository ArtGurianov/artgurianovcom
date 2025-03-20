import { use3DPosition } from "@/lib/hooks";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";

export const Rig = () => {
  const { camera } = useThree();
  const vec = new Vector3();

  const { x, y } = use3DPosition();

  return useFrame(() => {
    camera.position.lerp(vec.set(x, y, camera.position.z), 0.05);
    camera.lookAt(0, 0, 0);
  });
};
