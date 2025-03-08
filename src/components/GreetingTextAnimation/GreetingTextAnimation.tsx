"use client";

import { AnimatePresence, motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useInitialAnimation } from "../InitialAnimation";

export const GreetingTextAnimation = () => {
  const initialAnimationStatus = useInitialAnimation();

  return (
    <AnimatePresence>
      {initialAnimationStatus === "ended" ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1.5,
            delay: 2,
          }}
          className="absolute bottom-0 left-1/2 w-3/4 h-1/2 flex justify-center items-center"
        >
          <TypeAnimation
            sequence={[
              2000,
              "- Greetings!\nI am Art Gurianov,\na full-cycle developer of web3 applications",
              () => {},
            ]}
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
