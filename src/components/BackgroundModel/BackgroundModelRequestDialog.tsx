"use client";

import { Button } from "@/components/ui/button";
import { DeviceOrientationEventIOS } from "@/lib/hooks/useRequestPermission";
import { motion } from "framer-motion";

interface BackgroundModelRequestDialogProps {
  onHideRequest: () => void;
}

export const BackgroundModelRequestDialog = ({
  onHideRequest,
}: BackgroundModelRequestDialogProps) => {
  return (
    <motion.div
      initial={{ y: "-100%" }}
      animate={{ y: "0%" }}
      transition={{
        ease: "easeInOut",
        duration: 0.5,
        delay: 0,
      }}
      exit={{ y: "-100%" }}
      className="h-48 absolute z-40 top-0 left-0 right-0 flex flex-col justify-center items-center bg-white gap-8"
    >
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
              requestPermission().finally(() => {
                onHideRequest();
              });
            }
          }}
        >
          {"Yes"}
        </Button>
        <Button
          variant="default"
          onClick={() => {
            onHideRequest();
          }}
        >
          {"No"}
        </Button>
      </div>
    </motion.div>
  );
};
