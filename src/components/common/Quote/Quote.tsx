import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface QuoteProps {
  children: ReactNode;
  className?: string;
}

export const Quote = ({ children, className }: QuoteProps) => {
  return (
    <span
      className={cn(
        "border-l-4 border-muted px-6 py-4 bg-linear-to-r from-primary/20 via-primary/20 to-primary/0 text-start",
        className
      )}
    >
      {children}
    </span>
  );
};
