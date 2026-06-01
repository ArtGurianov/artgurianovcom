"use client";

import { CreationProjectDiagram } from "@/app/(main)/creation/page";
import { DialogSheet } from "@/components/common/DialogSheet/DialogSheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useState } from "react";

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
      <Button variant="outline" size="sm">
        {t("architecture")}
      </Button>
    </div>
  );

  return (
    <DialogSheet
      trigger={trigger}
      title={t("architecture")}
      className="w-full max-w-none sm:w-[min(96vw,1200px)]"
    >
      <div className="flex flex-col sm:flex-row gap-4 h-full">
        <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto sm:max-h-full shrink-0">
          {diagrams.map((diagram, index) => (
            <Button
              key={diagram.embedUrl}
              variant="link"
              size="reset"
              className={cn(
                "whitespace-nowrap text-sm font-mono text-muted/70 px-2 py-1",
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
        <div className="relative w-full min-h-[60vh] sm:min-h-0 sm:h-[calc(96vh-var(--spacing)*36-2rem)]">
          <iframe
            src={selected.embedUrl}
            width="100%"
            height="100%"
            style={{ border: "none" }}
            title={selected.title}
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
