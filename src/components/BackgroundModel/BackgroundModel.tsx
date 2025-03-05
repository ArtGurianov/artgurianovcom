"use client";

import { Suspense, useEffect, useState } from "react";
import { Environment, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic";

const BackgroundModelObject = dynamic(
  () => import("@/components/BackgroundModel/BackgroundModelObject"),
  {
    ssr: false,
  }
);

export function BackgroundModel() {
  const [size, setSize] = useState(0);
  const handleResize = () => {
    setSize(Math.min(window.innerWidth, window.innerHeight));
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="absolute z-30 opacity-30"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <Canvas gl={{ antialias: true }} dpr={[1, 1.5]}>
        <Stage environment={null}>
          <Environment path="/" files="texture.hdr" />
          <directionalLight intensity={2} position={[0, 3, 2]} />
          <Suspense fallback="loading...">
            <BackgroundModelObject />
          </Suspense>
        </Stage>
      </Canvas>
    </div>
  );
}
