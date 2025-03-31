"use client";

import { CreationProjectData } from "@/app/(main)/creation/page";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CreationProjectsListProps {
  data: CreationProjectData[];
  currentSlide: number;
  onChangeSlide: (_: number) => void;
}

export const CreationProjectsList = ({
  data,
  currentSlide,
  onChangeSlide,
}: CreationProjectsListProps) => {
  return (
    <ul className="relative sm:absolute flex flex-col sm:right-8 sm:top-1/2 sm:-translate-y-1/2 justify-center">
      {data.map((each, index) => (
        <li key={each.title} className="w-full text-center sm:text-end">
          <Button
            variant="link"
            size="lg"
            className={cn("font-mono text-muted/70", {
              "underline text-muted/90": currentSlide === index + 1,
            })}
            {...(currentSlide > 0
              ? {
                  style: {
                    color:
                      currentSlide === index + 1
                        ? `var(--${data[currentSlide - 1].id}-accent-foreground)`
                        : `var(--${data[currentSlide - 1].id}-foreground)`,
                  },
                }
              : {})}
            onClick={() => {
              onChangeSlide(index + 1);
            }}
          >
            {each.title}
          </Button>
        </li>
      ))}
    </ul>
  );
};
