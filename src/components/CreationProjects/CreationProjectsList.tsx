"use client";

import { CreationProjectData } from "@/app/(main)/creation/page";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CreationProjectsListProps {
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
    <ul className="absolute flex flex-col right-8 top-1/2 -translate-y-1/2 justify-end">
      {data.map((each, index) => (
        <li key={each.title} className="w-full text-end">
          <Button
            variant="link"
            size="lg"
            className={cn("font-mono text-muted/70", {
              "underline text-muted/90": currentSlide === index + 1,
            })}
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
