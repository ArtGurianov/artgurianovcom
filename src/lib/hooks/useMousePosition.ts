import { useEffect, useState } from "react";
import { Coordinates3D } from "./use3DPosition";

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<Coordinates3D>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({
        x: (ev.clientX / window.innerWidth) * 2 - 1,
        y: (ev.clientY / window.innerHeight) * 2 - 1,
      });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return mousePosition;
};
