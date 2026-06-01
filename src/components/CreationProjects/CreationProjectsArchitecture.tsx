"use client";

import { CreationProjectDiagram } from "@/app/(main)/creation/page";
import { DialogSheet } from "@/components/common/DialogSheet/DialogSheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Loader } from "../common/Loader";

interface CreationProjectsArchitectureProps {
  diagrams: CreationProjectDiagram[];
}

export const CreationProjectsArchitecture = ({
  diagrams,
}: CreationProjectsArchitectureProps) => {
  const t = useTranslations("CREATION");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const selected = diagrams[selectedIndex];

  const handleSelect = (index: number) => {
    if (index === selectedIndex) return;
    setSelectedIndex(index);
    setIsLoading(true);
  };

  const trigger = (
    <div className="flex justify-center">
      <Button variant="outline" size="sm" className="w-4/5 border rounded-none">
        {t("architecture")}
      </Button>
    </div>
  );

  return (
    <DialogSheet
      trigger={trigger}
      title={t("architecture")}
      className="w-[80vw]"
      fillHeight
    >
      <div className="flex h-full w-full min-w-0 flex-col gap-4 sm:flex-row">
        <div className="flex max-h-40 min-h-0 shrink-0 flex-col gap-2 overflow-y-auto sm:max-h-none sm:w-44 sm:min-w-44 sm:pr-2">
          {diagrams.map((diagram, index) => (
            <Button
              key={diagram.embedUrl}
              variant="link"
              size="reset"
              className={cn(
                "w-full justify-start whitespace-normal px-2 py-1 text-start font-mono text-sm text-muted/70",
                {
                  "underline text-muted/90": selectedIndex === index,
                }
              )}
              onClick={() => handleSelect(index)}
            >
              {diagram.title}
            </Button>
          ))}
        </div>
        <div className="flex min-h-0 min-w-0 flex-1 items-center justify-center">
          <div className="relative aspect-video w-full max-h-full bg-background border border-primary/40 sm:h-full sm:w-auto sm:max-w-full">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <Loader className="h-12 w-12" />
              </div>
            ) : null}
            <iframe
              key={selected.embedUrl}
              src={selected.embedUrl}
              title={selected.title}
              onLoad={() => setIsLoading(false)}
              className="absolute inset-0 h-full w-full"
              style={{ border: "none" }}
            />
            <a
              href={selected.embedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0"
              aria-label={`Open ${selected.title} in new tab`}
            />
          </div>
        </div>
      </div>
    </DialogSheet>
  );
};
