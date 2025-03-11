"use client";

import { useInitialAnimation } from "@/components/InitialAnimation";
import { GlitchPhotoSvgUrl } from "@/components/svg";
import { AnimatePresence, motion } from "framer-motion";
import { useGreetingAnimation } from "../GreetingAnimationContext";
import Image from "next/image";

const ANIMATION_VARIANTS = {
  show: { x: "-20%", y: "5%", rotate: "12deg" },
  hide: { x: "-100%", y: "20%", rotate: "-30deg" },
};

export const GreetingAnimationPhoto = () => {
  const initialAnimationStatus = useInitialAnimation();
  const { isImageLoaded, onImageLoaded } = useGreetingAnimation();

  return (
    <div className="overflow-clip w-full sm:w-auto sm:h-full">
      <AnimatePresence>
        {initialAnimationStatus === "ended" ? (
          <motion.div
            initial={"hide"}
            variants={ANIMATION_VARIANTS}
            animate={isImageLoaded ? "show" : "hide"}
            transition={{
              ease: "easeIn",
              duration: 1,
              delay: 0,
            }}
            className="w-full h-full"
          >
            <div className="relative w-full h-full">
              <Image
                src={GlitchPhotoSvgUrl}
                alt="glitch-photo"
                width="0"
                height="0"
                sizes="100vh"
                className="h-full w-auto"
                priority
                onLoad={onImageLoaded}
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
