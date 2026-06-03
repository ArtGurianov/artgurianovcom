"use client";

import { ProjectKey } from "@/config/projects";
import { DialogSheet } from "@/components/common/DialogSheet/DialogSheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

// Lazy so the Excalidraw library AND its 141KB stylesheet only load when the
// architecture dialog is opened — not on every /creation visit.
const ExcalidrawViewer = dynamic(
  () => import("./ExcalidrawViewer").then((m) => m.ExcalidrawViewer),
  { ssr: false }
);

interface CreationProjectsArchitectureProps {
  projectKey: ProjectKey;
  diagrams: string[];
}

export const CreationProjectsArchitecture = ({
  projectKey,
  diagrams,
}: CreationProjectsArchitectureProps) => {
  const t = useTranslations("CREATION");
  const [dialogOpen, setDialogOpen] = useState(false);
  // Diagram shown in the in-dialog preview pane (defaults to the first one).
  const [previewDiagram, setPreviewDiagram] = useState<string | null>(
    diagrams[0] ?? null
  );
  // Diagram shown in the fullscreen overlay (null = closed).
  const [fullscreenDiagram, setFullscreenDiagram] = useState<string | null>(
    null
  );

  const openFullscreen = (fileName: string) => {
    setFullscreenDiagram(fileName);
    // Close the dialog while fullscreen is up to avoid nested-modal focus traps.
    setDialogOpen(false);
  };

  const closeFullscreen = useCallback(() => {
    setFullscreenDiagram(null);
    // Restore the dialog so the user returns to the list/preview.
    setDialogOpen(true);
  }, []);

  useEffect(() => {
    if (!fullscreenDiagram) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeFullscreen();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [fullscreenDiagram, closeFullscreen]);

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
        open={dialogOpen}
        onOpenChange={setDialogOpen}
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
                    "underline text-muted/90": previewDiagram === fileName,
                  }
                )}
                onClick={() => setPreviewDiagram(fileName)}
              >
                {t(`projects.${projectKey}.diagrams.${fileName}`)}
              </Button>
            ))}
          </div>
          <div className="flex shrink-0 items-center justify-center sm:min-h-0 sm:min-w-0 sm:shrink sm:flex-1">
            <div className="relative aspect-video w-full max-h-full bg-background border border-primary/40 sm:h-full sm:w-auto sm:max-w-full">
              {previewDiagram ? (
                <div className="absolute inset-0">
                  <ExcalidrawViewer
                    projectKey={projectKey}
                    diagram={previewDiagram}
                    loadingText={t("diagram-loading")}
                    errorText={t("diagram-error")}
                    previewMode
                  />
                  {/* Excalidraw captures canvas pointer events, so a transparent
                      overlay sits on top to turn the whole preview into a
                      "click to expand" target. */}
                  <button
                    type="button"
                    onClick={() => openFullscreen(previewDiagram)}
                    aria-label={t("diagram-expand")}
                    title={t("diagram-expand")}
                    className="absolute inset-0 z-10 cursor-zoom-in"
                  />
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-muted/50 text-sm font-mono">
                    {t("diagram-placeholder")}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogSheet>

      {fullscreenDiagram
        ? createPortal(
            <div className="fixed inset-0 z-[60] flex flex-col bg-black/90">
              <button
                onClick={closeFullscreen}
                className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                aria-label={t("diagram-close")}
              >
                <X className="h-6 w-6" />
              </button>
              <div className="flex-1 min-h-0">
                <ExcalidrawViewer
                  projectKey={projectKey}
                  diagram={fullscreenDiagram}
                  loadingText={t("diagram-loading")}
                  errorText={t("diagram-error")}
                />
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
};
