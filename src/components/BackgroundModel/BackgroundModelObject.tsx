"use client";

import { use3DPositionFrameRef } from "@/lib/hooks";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

useGLTF.preload("/3DModel.glb");

export default function BackgroundModelObject() {
  const { nodes } = useGLTF("/3DModel.glb");
  const meshRef = useRef<Mesh>(null);
  const positionRef = use3DPositionFrameRef();

  useFrame(() => {
    if (!meshRef.current) {
      return;
    }

    const { x, y } = positionRef.current;
    meshRef.current.rotation.set(y, x, 0);
  });

  return (
    <group dispose={null}>
      <mesh
        ref={meshRef}
        castShadow
        geometry={(nodes.Asset_1 as Mesh).geometry}
      >
        <meshPhysicalMaterial
          color="#fff4f2"
          metalness={1}
          roughness={0}
          clearcoat={1}
          clearcoatRoughness={0}
          envMapIntensity={12}
        />
      </mesh>
    </group>
  );
}
