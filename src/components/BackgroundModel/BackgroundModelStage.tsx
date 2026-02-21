"use client";

import { Environment, Lightformer, PerspectiveCamera, Stage } from "@react-three/drei";
import BackgroundModelObject from "./BackgroundModelObject";
import { Rig } from "./Rig";
import { DoubleSide } from "three";

export const BackgroundModelStage = () => {
  return (
    <Stage
      adjustCamera={false}
      environment={null}
      intensity={1}
      preset="soft"
      shadows={{
        type: "contact",
        opacity: 0.9,
        blur: 1.4,
        far: 18,
        resolution: 512,
        color: "#000000",
        frames: Infinity,
      }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 32]} />
      <Environment resolution={256}>
        <mesh scale={100}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshBasicMaterial color="#261b20" side={DoubleSide} />
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
        <Lightformer
          color="#411232"
          intensity={3}
          position={[2, -1, 7]}
          rotation={[0, Math.PI / 6, 0]}
          scale={[4, 4, 1]}
        />
      </Environment>
      <BackgroundModelObject />
      <Rig />
    </Stage>
  );
};
