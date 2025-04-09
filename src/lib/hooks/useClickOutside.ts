import { useCallback, useEffect, useRef } from "react";

export const useClickOutside = <T extends HTMLElement>(
  callback: (_: MouseEvent) => void = () => {}
) => {
  const ref = useRef<T | null>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
        callback(event);
      }
    },
    [ref, callback]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  return ref;
};
