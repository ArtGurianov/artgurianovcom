"use client";

import { ProjectKey } from "@/config/projects";
import { DialogSheet } from "@/components/common/DialogSheet/DialogSheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useState, useEffect, useCallback } from "react";
import { ExcalidrawViewer } from "./ExcalidrawViewer";
import { X } from "lucide-react";

interface CreationProjectsArchitectureProps {
  projectKey: ProjectKey;
  diagrams: string[];
}

export const CreationProjectsArchitecture = ({
  projectKey,
  diagrams,
}: CreationProjectsArchitectureProps) => {
  const t = useTranslations("CREATION");
  const [selectedDiagram, setSelectedDiagram] = useState<string | null>(null);

  const handleSelect = (fileName: string) => {
    setSelectedDiagram(fileName);
  };

  const handleClose = useCallback(() => {
    setSelectedDiagram(null);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (selectedDiagram) {
      window.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedDiagram, handleClose]);

  const trigger = (
    <div className="flex justify-center">
      <Button variant="outline" size="sm" className="w-4/5 border rounded-none">
        {t("architecture")}
      </Button>
    </div>
  );

  return (
    <>
      <DialogSheet
        trigger={trigger}
        title={t("architecture")}
        className="w-[80vw]"
        fillHeight
      >
        <div className="flex h-full w-full min-w-0 flex-col gap-4 sm:flex-row">
          <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto sm:w-44 sm:min-w-44 sm:flex-none sm:pr-2">
            {diagrams.map((fileName) => (
              <Button
                key={fileName}
                variant="link"
                size="reset"
                className={cn(
                  "w-full justify-start whitespace-normal px-2 py-1 text-start font-mono text-sm text-muted/70",
                  {
                    "underline text-muted/90": selectedDiagram === fileName,
                  }
                )}
                onClick={() => handleSelect(fileName)}
              >
                {t(`projects.${projectKey}.diagrams.${fileName}`)}
              </Button>
            ))}
          </div>
          <div className="flex shrink-0 items-center justify-center sm:min-h-0 sm:min-w-0 sm:shrink sm:flex-1">
            <div className="relative aspect-video w-full max-h-full bg-background border border-primary/40 sm:h-full sm:w-auto sm:max-w-full flex items-center justify-center">
              <span className="text-muted/50 text-sm font-mono">
                Select a diagram to view
              </span>
            </div>
          </div>
        </div>
      </DialogSheet>

      {selectedDiagram ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/90">
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
            aria-label="Close diagram viewer"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="flex-1 min-h-0">
            <ExcalidrawViewer
              projectKey={projectKey}
              diagram={selectedDiagram}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};
