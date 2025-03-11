"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface GreetingAnimationProviderProps {
  children: ReactNode;
}

export const GreetingAnimationContext = createContext<{
  isImageLoaded: boolean;
  onImageLoaded: () => void;
} | null>(null);

export const GreetingAnimationProvider = ({
  children,
}: GreetingAnimationProviderProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const handleImageLoaded = () => {
    setIsImageLoaded(true);
  };

  return (
    <GreetingAnimationContext.Provider
      value={{
        isImageLoaded,
        onImageLoaded: handleImageLoaded,
      }}
    >
      {children}
    </GreetingAnimationContext.Provider>
  );
};

export const useGreetingAnimation = () => {
  const value = useContext(GreetingAnimationContext);
  if (!value) {
    throw new Error("GreetingAnimationContext used outside of its provider.");
  }
  return {
    isImageLoaded: value.isImageLoaded,
    onImageLoaded: value.onImageLoaded,
  };
};
