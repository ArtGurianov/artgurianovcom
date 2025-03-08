"use client";

import { useRequestPermission } from "@/lib/hooks/useRequestPermission";
import { BackgroundModelRequestDialog } from "./BackgroundModelRequestDialog";
import { AnimatePresence } from "framer-motion";
import { BackgroundModelStage } from "./BackgroundModelStage";
import { Suspense, useEffect, useState } from "react";
import { Loader } from "@/components/Loader";
import { Canvas } from "@react-three/fiber";
import { Initializer } from "@/components/common/Initializer";

export function BackgroundModel() {
  const { isRequestVisible, handleHideRequest } = useRequestPermission();

  const [isModelLoading, setIsModelLoading] = useState(false);

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
    <>
      <div
        className="absolute z-30 opacity-30"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <div className="relative w-full h-full">
          {isModelLoading ? (
            <Loader
              isFullHeight
              isFullWidth
              className="absolute p-16 sm:p-48"
            />
          ) : null}
          <Canvas gl={{ antialias: true }} dpr={[1, 1.5]}>
            <Suspense
              fallback={
                <Initializer onLoadingStatusChange={setIsModelLoading} />
              }
            >
              <BackgroundModelStage />
            </Suspense>
          </Canvas>
        </div>
      </div>
      <AnimatePresence>
        {isRequestVisible ? (
          <BackgroundModelRequestDialog onHideRequest={handleHideRequest} />
        ) : null}
      </AnimatePresence>
    </>
  );
}
