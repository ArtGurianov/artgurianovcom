"use client";

import { Environment, Stage } from "@react-three/drei";
import dynamic from "next/dynamic";

const BackgroundModelObject = dynamic(
  () => import("@/components/BackgroundModel/BackgroundModelObject"),
  {
    ssr: false,
  }
);

export const BackgroundModelStage = () => {
  return (
    <Stage environment={null}>
      <Environment path="/" files="texture.hdr" />
      <directionalLight intensity={2} position={[0, 3, 2]} />
      <BackgroundModelObject />
    </Stage>
  );
};
