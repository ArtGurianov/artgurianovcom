"use client";

import { Environment, PerspectiveCamera, Stage } from "@react-three/drei";
import { Rig } from "./Rig";
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
      <PerspectiveCamera makeDefault position={[0, 0, 32]} />
      <Environment path="/" files="texture.hdr" />
      <BackgroundModelObject />
      <Rig />
    </Stage>
  );
};
