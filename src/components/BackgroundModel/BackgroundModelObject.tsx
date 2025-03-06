"use client";

import { use3DPosition } from "@/lib/hooks";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { Mesh } from "three";

useGLTF.preload("/3DModel.glb");

export default function BackgroundModelObject() {
  const { nodes, materials } = useGLTF("/3DModel.glb");

  const { x, y } = use3DPosition();
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(x || 0, y || 0, 22);
  }, [x, y]);

  return (
    <group dispose={null}>
      <mesh
        rotation={[y || 0, x || 0, 0]}
        castShadow
        receiveShadow
        geometry={(nodes.Asset_1 as Mesh).geometry}
        material={materials["Material.001"]}
      />
    </group>
  );
}
