"use client";

import { useInitialAnimation } from "@/components/InitialAnimation";
import { AnimatePresence, motion } from "framer-motion";
import { GlitchPhotoSvgUrl } from "@/components/svg";
import Image from "next/image";

export const GlitchPhoto = () => {
  const initialAnimationStatus = useInitialAnimation();

  return (
    <div className="overflow-clip w-full sm:w-auto sm:h-full">
      <AnimatePresence>
        {initialAnimationStatus === "ended" ? (
          <motion.div
            initial={{ x: "-100%", y: "20%", rotate: "-30deg" }}
            animate={{ x: "-20%", y: "5%", rotate: "12deg" }}
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
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
