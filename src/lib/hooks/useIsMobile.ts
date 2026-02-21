import { use3DMotionMeta } from "./use3DPosition";

export const useIsMobile = () => {
  const { isInitialized, isMobile } = use3DMotionMeta();

  return {
    isMobile: isInitialized ? isMobile : null,
    isInitialized,
  };
};
