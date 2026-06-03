"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "@excalidraw/excalidraw/index.css";
import type { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types";

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
}

export const ExcalidrawViewer = ({
  projectKey,
  diagram,
  loadingText,
  errorText,
}: ExcalidrawViewerProps) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState(false);
  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI | null>(null);

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
    if (excalidrawAPI && data) {
      excalidrawAPI.scrollToContent(undefined, { fitToContent: true });
    }
  }, [excalidrawAPI, data]);

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
    <Excalidraw
      initialData={data}
      viewModeEnabled
      UIOptions={{
        canvasActions: { loadScene: false },
      }}
      excalidrawAPI={(api) => setExcalidrawAPI(api)}
    />
  );
};
