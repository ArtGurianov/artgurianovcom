import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PageContentProps {
  children: ReactNode;
  className?: string;
}

export const PageContent = ({ children, className }: PageContentProps) => {
  return (
    <div className={cn("w-full mt-[var(--nav-size)]", className)}>
      {children}
    </div>
  );
};
