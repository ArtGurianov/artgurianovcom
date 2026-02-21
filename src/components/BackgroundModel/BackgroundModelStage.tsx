"use client";

import { Environment, Lightformer, PerspectiveCamera, Stage } from "@react-three/drei";
import { Rig } from "./Rig";
import dynamic from "next/dynamic";
import { BackSide } from "three";

const BackgroundModelObject = dynamic(
  () => import("@/components/BackgroundModel/BackgroundModelObject"),
  {
    ssr: false,
  }
);

export const BackgroundModelStage = () => {
  return (
    <Stage
      adjustCamera={false}
      environment={null}
      intensity={1}
      preset="soft"
      shadows={false}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 32]} />
      <Environment resolution={256}>
        <mesh scale={100}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshBasicMaterial color="#1f2430" side={BackSide} />
        </mesh>
        <Lightformer
          color="#ffffff"
          intensity={14}
          position={[8, 3, 4]}
          rotation={[0, -Math.PI / 3, 0]}
          scale={[6, 6, 1]}
        />
        <Lightformer
          color="#f8fbff"
          intensity={10}
          position={[-7, 2, 2]}
          rotation={[0, Math.PI / 3, 0]}
          scale={[5, 4, 1]}
        />
        <Lightformer
          color="#ffd8b2"
          intensity={6}
          position={[0, -5, -6]}
          rotation={[0, Math.PI, 0]}
          scale={[12, 2, 1]}
        />
      </Environment>
      <BackgroundModelObject />
      <Rig />
    </Stage>
  );
};
