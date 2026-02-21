"use client";

import { useRequestPermission } from "@/lib/hooks/useRequestPermission";
import { BackgroundModelRequestDialog } from "./BackgroundModelRequestDialog";
import { AnimatePresence } from "framer-motion";
import { BackgroundModelStage } from "./BackgroundModelStage";
import { Suspense, useCallback, useState } from "react";
import { Loader } from "@/components/common/Loader";
import { Canvas } from "@react-three/fiber";
import { BackgroundModelErrorBoundary } from "./BackgroundModelErrorBoundary";

export function BackgroundModel() {
  const { isRequestVisible, handleHideRequest } = useRequestPermission();

  const [isModelLoading, setIsModelLoading] = useState(true);
  const handleStageReady = useCallback(() => {
    setIsModelLoading(false);
  }, []);

  return (
    <>
      <div className="absolute z-30 opacity-30 w-full h-full">
        <div className="relative w-full h-full">
          {isModelLoading ? (
            <Loader
              isFullHeight
              isFullWidth
              className="absolute p-16 sm:p-48"
            />
          ) : null}
          <BackgroundModelErrorBoundary>
            <Canvas
              dpr={[1, 1.5]}
              frameloop="always"
              gl={{ antialias: false, powerPreference: "high-performance" }}
            >
              <Suspense fallback={null}>
                <BackgroundModelStage onReady={handleStageReady} />
              </Suspense>
            </Canvas>
          </BackgroundModelErrorBoundary>
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
