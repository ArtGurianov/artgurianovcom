import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface HeadingProps {
  children: ReactNode;
  className?: string;
}

export const Heading = ({ children, className }: HeadingProps) => {
  return (
    <h1
      className={cn(
        "w-full text-center font-normal text-muted text-4xl font-mono mb-4",
        className
      )}
    >
      {children}
    </h1>
  );
};
