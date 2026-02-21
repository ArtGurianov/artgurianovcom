import { use3DPositionFrameRef } from "@/lib/hooks";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Vector3 } from "three";

export const Rig = () => {
  const { camera } = useThree();
  const vec = useRef(new Vector3());

  const positionRef = use3DPositionFrameRef();

  return useFrame(() => {
    const { x, y } = positionRef.current;
    camera.position.lerp(vec.current.set(x, y, camera.position.z), 0.05);
    camera.lookAt(0, 0, 0);
  });
};
