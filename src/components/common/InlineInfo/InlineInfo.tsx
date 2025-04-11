import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { AlertCircleIcon } from "lucide-react";
import { TooltipPopover } from "@/components/common/TooltipPopover/TooltipPopover";

interface InlineInfoProps {
  className?: string;
  children?: ReactNode;
  label: string;
  description?: string | null;
}

export const InlineInfo = ({
  className,
  children,
  label,
  description,
}: InlineInfoProps) => {
  return (
    <div
      className={cn(
        "flex rounded-md overflow-clip border border-muted/40 shadow-card/30 shadow-lg",
        className
      )}
    >
      <span className="flex px-2 bg-muted/20 justify-center items-center border-r border-muted/40 font-medium text-muted/80">
        {label}
      </span>
      <div className="flex gap-1 grow px-2 items-center justify-center">
        {children ? (
          <div className="flex grow justify-center items-center text-center">
            {children}
          </div>
        ) : null}
        {description ? (
          <TooltipPopover
            trigger={<AlertCircleIcon size={16} className="text-muted" />}
          >
            {description}
          </TooltipPopover>
        ) : null}
      </div>
    </div>
  );
};
