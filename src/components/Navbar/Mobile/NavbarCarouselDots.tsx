"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

interface NavbarCarouselDotsProps {
  quantity: number;
  activeIndex: number;
  onNavigate: (_: number) => void;
}

export const NavbarCarouselDots = ({
  quantity,
  activeIndex,
  onNavigate,
}: NavbarCarouselDotsProps) => {
  return (
    <div className="h-12 w-screen self-start flex items-center justify-center gap-2">
      <ChevronLeft
        className="text-background/60 h-6 w-6"
        onClick={() => {
          if (activeIndex > 0) {
            onNavigate(activeIndex - 1);
          }
        }}
      />
      {Array.from({ length: quantity }).map((_, index) => (
        <Button
          variant="ghost"
          size="reset"
          key={`dot-${index}`}
          className={cn("h-4 w-4 border-2 border-background/30", {
            "bg-background/40 rotate-45": activeIndex === index,
          })}
          onClick={() => onNavigate(index)}
        />
      ))}
      <ChevronRight
        className="text-background/60 h-6 w-6"
        onClick={() => {
          if (activeIndex < 4) {
            onNavigate(activeIndex + 1);
          }
        }}
      />
    </div>
  );
};
