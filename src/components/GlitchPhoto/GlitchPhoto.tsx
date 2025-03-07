"use client";

import { useInitialAnimation } from "@/components/InitialAnimation";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { GlitchPhotoSvgUrl } from "../svg";

export const GlitchPhoto = () => {
  const initialAnimationStatus = useInitialAnimation();

  return (
    <AnimatePresence>
      {initialAnimationStatus === "ended" ? (
        <motion.div
          initial={{ x: "-100%", y: "20%", rotate: "-45deg" }}
          animate={{ x: 0, y: 0, rotate: 0 }}
          transition={{
            ease: "easeIn",
            duration: 1.5,
            delay: 0,
          }}
          className="absolute left-0 bottom-0 h-2/3 z-20"
        >
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={GlitchPhotoSvgUrl}
              alt="glitch-photo"
              width="0"
              height="0"
              sizes="100vh"
              className="h-full w-auto -translate-x-1/4 rotate-12 translate-y-4"
              priority
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
