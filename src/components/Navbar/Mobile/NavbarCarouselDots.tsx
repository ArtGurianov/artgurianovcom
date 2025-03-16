"use client";

import { cn } from "@/lib/utils";

interface NavbarCarouselDotsProps {
  quantity: number;
  activeIndex: number;
}

export const NavbarCarouselDots = ({
  quantity,
  activeIndex,
}: NavbarCarouselDotsProps) => {
  return (
    <div className="h-12 w-screen self-start flex items-center justify-center gap-2">
      {Array.from({ length: quantity }).map((_, index) => (
        <div
          key={`dot-${index}`}
          className={cn("h-3 w-3 border-2 border-background/30", {
            "bg-background/40 rotate-45": activeIndex === index,
          })}
        />
      ))}
    </div>
  );
};
