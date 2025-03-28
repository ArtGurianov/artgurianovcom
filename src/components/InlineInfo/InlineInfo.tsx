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
    <div className={cn("border-2 flex rounded-full overflow-clip", className)}>
      <span className="flex border-r-2 px-2 bg-muted/80 justify-center items-center">
        {label}
      </span>
      <div className="flex gap-1 bg-muted/20 grow px-2 items-center justify-center">
        <div className="flex grow justify-center items-center">{children}</div>
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
