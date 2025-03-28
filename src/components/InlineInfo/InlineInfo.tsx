import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AlertCircleIcon } from "lucide-react";

interface InlineInfoProps {
  className?: string;
  children: ReactNode;
  label: string;
  description?: string;
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
        "flex rounded-full overflow-clip border border-muted/40",
        className
      )}
    >
      <span className="flex px-2 bg-muted/20 justify-center items-center border-r border-muted/40">
        {label}
      </span>
      <div className="flex gap-1 grow px-2 items-center justify-center">
        <div className="flex grow justify-center items-center text-center">
          {children}
        </div>
        {description ? (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger>
                <AlertCircleIcon size={16} className="text-muted" />
              </TooltipTrigger>
              <TooltipContent>{description}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : null}
      </div>
    </div>
  );
};
