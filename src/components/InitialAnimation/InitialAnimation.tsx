"use client";

import Image from "next/image";

import { AnimatePresence, motion } from "framer-motion";
import { ArtLoaderUrl } from "@/components/svg";
import { useInitialAnimation } from "./InitialAnimationContext";

export const InitialAnimation = () => {
  const initialAnimationStatus = useInitialAnimation();

  return (
    <AnimatePresence>
      {initialAnimationStatus === "showing" ? (
        <motion.div
          transition={{
            duration: 1.5,
            delay: 0,
          }}
          exit={{ opacity: 0 }}
          className="fixed top-0 bottom-0 right-0 left-0 bg-white z-50 flex justify-center items-center"
          style={{ boxShadow: "0 0 200px rgba(0,0,0,0.9) inset" }}
        >
          <Image
            src={ArtLoaderUrl}
            alt="intro"
            width="0"
            height="0"
            sizes="100vh"
            className="h-full w-auto"
            priority
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
