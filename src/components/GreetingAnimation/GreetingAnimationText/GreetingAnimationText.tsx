"use client";

import { AnimatePresence, motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useInitialAnimation } from "@/components/InitialAnimation";
import { useGreetingAnimation } from "../GreetingAnimationContext";
import { useTranslations } from "next-intl";

export const GreetingAnimationText = () => {
  const initialAnimationStatus = useInitialAnimation();
  const { isImageLoaded } = useGreetingAnimation();

  const t = useTranslations("IDENTITY");

  return (
    <AnimatePresence>
      {initialAnimationStatus === "ended" && isImageLoaded ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1.5,
            delay: 1,
          }}
          className="absolute bottom-0 left-1/2 w-3/4 h-1/2 flex justify-center items-center"
        >
          <TypeAnimation
            sequence={[2000, t("greetingAnimation"), () => {}]}
            wrapper="span"
            cursor={true}
            repeat={1}
            className="pr-4 text-muted text-lg sm:text-xl inline-block font-mono text-end w-full whitespace-pre-line"
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
