"use client";

import useMousePosition from "@/lib/hooks/useMousePosition";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { Mesh } from "three";

useGLTF.preload("/3DModel.glb");

export default function BackgroundModelObject() {
  const { nodes, materials } = useGLTF("/3DModel.glb");

  const { x, y } = useMousePosition();
  const { camera } = useThree();

  useEffect(() => {
    if (x && y) {
      camera.position.set(
        (x / window.innerWidth) * -4 + 2,
        (y / window.innerHeight) * 4 - 2,
        22
      );
    }
  }, [x, y]);

  return (
    <group dispose={null}>
      <mesh
        rotation={[
          y ? (y / window.innerHeight) * 2 - 1 : 0,
          x ? (x / window.innerWidth) * 2 - 1 : 0,
          0,
        ]}
        castShadow
        receiveShadow
        geometry={(nodes.Asset_1 as Mesh).geometry}
        material={materials["Material.001"]}
      />
    </group>
  );
}
