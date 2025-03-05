"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group, Mesh } from "three";

useGLTF.preload("/3DModel.glb");

export default function BackgroundModelObject() {
  const groupRef = useRef<Group | null>(null);
  const { nodes, materials } = useGLTF("/3DModel.glb");

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Asset_1 as Mesh).geometry}
        material={materials["Material.001"]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}
