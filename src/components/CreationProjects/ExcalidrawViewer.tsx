"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import "@excalidraw/excalidraw/index.css";
import type { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types";
import { cn } from "@/lib/utils";

const Excalidraw = dynamic(
  async () => {
    const mod = await import("@excalidraw/excalidraw");
    return mod.Excalidraw;
  },
  { ssr: false }
);

interface ExcalidrawViewerProps {
  projectKey: string;
  diagram: string;
  loadingText: string;
  errorText: string;
  /**
   * Renders a clean, static thumbnail: hides the bottom UI bar (via the
   * `excalidraw-preview` class, see globals.css) and keeps the diagram fitted
   * and centered as the container resizes (e.g. during the dialog animation).
   */
  previewMode?: boolean;
}

export const ExcalidrawViewer = ({
  projectKey,
  diagram,
  loadingText,
  errorText,
  previewMode = false,
}: ExcalidrawViewerProps) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState(false);
  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    setData(null);
    setError(false);

    fetch(`/diagrams/${projectKey}/${diagram}.excalidraw`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load diagram");
        return res.json();
      })
      .then((json) => {
        if (cancelled) return;
        setData({
          elements: json.elements,
          appState: json.appState,
          files: json.files,
          scrollToContent: true,
        });
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [projectKey, diagram]);

  useEffect(() => {
    if (!excalidrawAPI || !data) return;

    const fit = () =>
      excalidrawAPI.scrollToContent(undefined, { fitToContent: true });

    fit();

    // In preview mode the container keeps resizing (dialog open animation,
    // responsive layout), so re-fit to keep the diagram centered. The
    // full-screen viewer is interactive, so we only fit once on mount.
    if (!previewMode || !containerRef.current) return;

    const observer = new ResizeObserver(() => fit());
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [excalidrawAPI, data, previewMode]);

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center text-white">
        {errorText}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-full w-full items-center justify-center text-white">
        {loadingText}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("h-full w-full", previewMode && "excalidraw-preview")}
    >
      <Excalidraw
        initialData={data}
        viewModeEnabled
        UIOptions={{
          canvasActions: { loadScene: false },
        }}
        excalidrawAPI={(api) => setExcalidrawAPI(api)}
      />
    </div>
  );
};
