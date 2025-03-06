"use client";

import Image from "next/image";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArtLoaderUrl } from "@/components/svg";

const SHOW_ANIMATION_TIMEOUT_MS = 60 * 60 * 1000;
const LOCAL_STORAGE_KEY = "INITIAL_ANIMATION_SHOWED_AT";
const ANIMATION_DURATION_MS = 7_500;

export const InitialAnimation = () => {
  const [isShowingAnimation, setIsShowingAnimation] = useState(false);
  const hideAnimation = () => {
    setIsShowingAnimation(false);
  };
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>();

  useEffect(() => {
    const nowTimestampMs = new Date().getTime();
    const showedAt = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (
      !showedAt ||
      Number(showedAt) + SHOW_ANIMATION_TIMEOUT_MS < nowTimestampMs
    ) {
      const newTimeoutId = setTimeout(hideAnimation, ANIMATION_DURATION_MS);
      setIsShowingAnimation(true);
      setTimeoutId(newTimeoutId);
      localStorage.setItem(LOCAL_STORAGE_KEY, nowTimestampMs.toString());
    }

    return clearTimeout(timeoutId);
  }, []);

  return (
    <AnimatePresence>
      {isShowingAnimation ? (
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
