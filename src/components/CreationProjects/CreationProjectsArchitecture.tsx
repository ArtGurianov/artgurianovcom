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
  const selected = diagrams[selectedIndex];

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
        <div className="flex min-w-0 max-w-[calc(80vw-2.5rem)] shrink-0 gap-1 overflow-x-auto sm:w-44 sm:min-w-44 sm:max-w-none sm:flex-col sm:gap-2 sm:overflow-x-visible sm:overflow-y-auto sm:min-h-0 sm:pr-2">
          {diagrams.map((diagram, index) => (
            <Button
              key={diagram.embedUrl}
              variant="link"
              size="reset"
              className={cn(
                "shrink-0 justify-start whitespace-nowrap px-2 py-1 font-mono text-sm text-muted/70 sm:w-full sm:whitespace-normal sm:text-start",
                {
                  "underline text-muted/90": selectedIndex === index,
                }
              )}
              onClick={() => setSelectedIndex(index)}
            >
              {diagram.title}
            </Button>
          ))}
        </div>
        <div className="relative min-h-0 min-w-0 flex-1 border border-primary/40 bg-background">
          <div className="absolute inset-0 h-full w-full opacity-30">
            <Loader isFullHeight isFullWidth />
          </div>
          <iframe
            src={selected.embedUrl}
            title={selected.title}
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
    </DialogSheet>
  );
};
