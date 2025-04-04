"use client";

import { ElementType, ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MotionTag } from "@/lib/types/MotionTags";

interface MountedGuardProps {
  className?: string;
  children: ReactNode;
  tag?: MotionTag;
}

export const MountedGuard = ({
  children,
  className,
  tag = "div",
}: MountedGuardProps) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  const Comp = motion[tag];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 1,
        delay: 0,
      }}
    >
      {children}
    </Comp>
  );
};
