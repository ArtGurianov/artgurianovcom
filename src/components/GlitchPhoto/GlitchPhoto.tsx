"use client";

import { useInitialAnimation } from "@/components/InitialAnimation";

export const GlitchPhoto = () => {
  const initialAnimationStatus = useInitialAnimation();

  return (
    <>
      {initialAnimationStatus === "ended" ? (
        <div className="absolute z-20 bg-black h-2/3 w-96 left-0 bottom-0"></div>
      ) : null}
    </>
  );
};
