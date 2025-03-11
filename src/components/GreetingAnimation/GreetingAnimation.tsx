"use client";

import { GreetingAnimationText } from "../GreetingAnimation/GreetingAnimationText/GreetingAnimationText";
import { GreetingAnimationPhoto } from "./GreetingAnimationPhoto/GreetingAnimationPhoto";
import { GreetingAnimationProvider } from "./GreetingAnimationContext";

export const GreetingAnimation = () => {
  return (
    <GreetingAnimationProvider>
      <GreetingAnimationPhoto />
      <GreetingAnimationText />
    </GreetingAnimationProvider>
  );
};
