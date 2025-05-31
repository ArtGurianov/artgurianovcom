"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

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
      <ChevronLeft className="text-background/60" />
      {Array.from({ length: quantity }).map((_, index) => (
        <div
          key={`dot-${index}`}
          className={cn("h-4 w-4 border-2 border-background/30", {
            "bg-background/40 rotate-45": activeIndex === index,
          })}
        />
      ))}
      <ChevronRight className="text-background/60" />
    </div>
  );
};
