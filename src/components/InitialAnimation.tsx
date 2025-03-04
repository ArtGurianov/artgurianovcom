"use client";

import Image from "next/image";
import { ArtLoaderUrl } from "./svg";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
      localStorage.setItem(LOCAL_STORAGE_KEY, nowTimestampMs.toString());
      setIsShowingAnimation(true);
      const newTimeoutId = setTimeout(hideAnimation, ANIMATION_DURATION_MS);
      setTimeoutId(newTimeoutId);
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
          className="absolute top-0 bottom-0 right-0 left-0 bg-white z-50 flex justify-center items-center"
        >
          <Image
            src={ArtLoaderUrl}
            alt="loading"
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
