import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface NotificationContainerDescriptionProps {
  children: ReactNode;
  className?: string;
}

export const NotificationContainerDescription = ({
  children,
  className,
}: NotificationContainerDescriptionProps) => {
  return (
    <span className={cn("font-mono text-lg text-center", className)}>
      {children}
    </span>
  );
};
