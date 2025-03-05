"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

useGLTF.preload("/3DModel.glb");

export default function BackgroundModelObject() {
  const groupRef = useRef<any>(null);
  const { nodes, materials } = useGLTF("/3DModel.glb");

  useFrame(() => (groupRef.current.rotation.y += 0.01));

  return (
    <group ref={groupRef} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Asset_1 as any).geometry}
        material={materials["Material.001"]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}
