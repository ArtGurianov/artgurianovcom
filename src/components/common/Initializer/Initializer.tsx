import { useEffect } from "react";

interface InitializerProps {
  onLoadingStatusChange: (_: boolean) => void;
}

export const Initializer = ({ onLoadingStatusChange }: InitializerProps) => {
  useEffect(() => {
    onLoadingStatusChange(true);
    return () => onLoadingStatusChange(false);
  }, []);
  return null;
};
