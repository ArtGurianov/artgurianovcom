import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PageContentProps {
  children: ReactNode;
  className?: string;
}

export const PageContent = ({ children, className }: PageContentProps) => {
  return (
    <div
      className={cn(
        "w-full flex flex-col gap-2 mt-[var(--nav-size)] px-4",
        className
      )}
    >
      {children}
    </div>
  );
};
