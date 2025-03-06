"use client";

import { Suspense, useEffect, useState } from "react";
import { Environment, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

interface DeviceOrientationEventIOS extends DeviceOrientationEvent {
  requestPermission?: () => Promise<"granted" | "denied">;
}

const BackgroundModelObject = dynamic(
  () => import("@/components/BackgroundModel/BackgroundModelObject"),
  {
    ssr: false,
  }
);

const LOCAL_STORAGE_KEY = "ORIENTATION_PERMISSION_GRANTED";

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

  const [showRequest, setShowRequest] = useState(false);
  useEffect(() => {
    const permissionGranted = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (
      !!window.DeviceOrientationEvent &&
      typeof (
        window.DeviceOrientationEvent as unknown as DeviceOrientationEventIOS
      ).requestPermission === "function" &&
      permissionGranted !== "true"
    ) {
      setShowRequest(true);
    }
  }, []);

  return (
    <>
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
      {showRequest ? (
        <div className="h-48 absolute z-40 bottom-0 left-0 right-0 flex flex-col justify-center items-center bg-white gap-8">
          <span className="font-mono text-2xl">
            {"Allow access to hyroscrope?"}
          </span>
          <div className="flex gap-8 justify-center items-center">
            <Button
              variant="default"
              onClick={() => {
                const requestPermission = (
                  window.DeviceOrientationEvent as unknown as DeviceOrientationEventIOS
                ).requestPermission;
                if (typeof requestPermission === "function") {
                  requestPermission()
                    .then((data) => {
                      if (data === "granted") {
                        localStorage.setItem(LOCAL_STORAGE_KEY, "true");
                      }
                    })
                    .finally(() => {
                      setShowRequest(false);
                    });
                }
              }}
            >
              {"Yes"}
            </Button>
            <Button
              variant="default"
              onClick={() => {
                setShowRequest(false);
              }}
            >
              {"No"}
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
