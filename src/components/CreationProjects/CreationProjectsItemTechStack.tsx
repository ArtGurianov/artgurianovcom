"use client";

import { motion } from "framer-motion";
import { ReactElement, useEffect, useRef, useState } from "react";

interface CreationProjectsItemTechStackProps {
  data: string[];
}

export const CreationProjectsItemTechStack = ({
  data,
}: CreationProjectsItemTechStackProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const elementsRef = useRef<HTMLDivElement | null>(null);
  const [{ containerWidth, elementsWidth }, setMeasurements] = useState({
    containerWidth: 0,
    elementsWidth: 0,
  });

  useEffect(() => {
    setMeasurements({
      containerWidth: containerRef.current?.scrollWidth || 0,
      elementsWidth: elementsRef.current?.scrollWidth || 0,
    });
  }, []);

  const elements = (
    <>
      {data.map((slide) => (
        <span
          key={slide}
          className="text-center px-4 py-px rounded-full bg-muted/30 shadow-md shadow-muted/30 font-serif text-background/80"
        >
          {slide}
        </span>
      ))}
    </>
  );

  let displaySlider: ReactElement = (
    <div className="flex gap-4 after:content-[''] w-full justify-center items-center pb-2">
      {elements}
    </div>
  );
  if (containerWidth && elementsWidth && containerWidth <= elementsWidth) {
    displaySlider = (
      <motion.div
        className="flex gap-4 after:content-[''] pb-2"
        animate={{
          x: ["0%", elementsWidth * -1],
          transition: {
            ease: "linear",
            duration: 2 * data.length,
            repeat: Infinity,
          },
        }}
      >
        {elements}
        {elements}
      </motion.div>
    );
  }

  return (
    <>
      <div
        ref={containerRef}
        className="flex w-full sm:max-w-[340px] md:max-w-[420px] lg:max-w-[720px] overflow-hidden"
      >
        {displaySlider}
      </div>
      {/* INVISIBLE - ONLY FOR SIZE MEASUREMENTS */}
      <div
        ref={elementsRef}
        className="-z-50 absolute flex gap-4 after:content-[''] invisible"
      >
        {elements}
      </div>
    </>
  );
};
