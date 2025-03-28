"use client";

import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { cn, getTruncatedString } from "@/lib/utils";
import { useBreakpoint } from "@/lib/hooks/useBreakpoint";

interface TruncatedStringProps {
  className?: string;
  value: string;
}

export const TruncatedStringDrawer = ({
  value,
  className,
}: TruncatedStringProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <span
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {getTruncatedString(value)}
      </span>
      <Drawer open={isOpen} onClose={() => setIsOpen(false)} autoFocus={isOpen}>
        <DrawerContent className={className}>
          <DrawerHeader>
            <DrawerTitle className="text-center font-serif text-4xl my-4 text-card">
              {"Description"}
            </DrawerTitle>
          </DrawerHeader>
          {value}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export const TruncatedStringTooltip = ({
  value,
  className,
}: TruncatedStringProps) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger className={cn("underline", className)}>
          {getTruncatedString(value)}
        </TooltipTrigger>
        <TooltipContent>{value}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const TruncatedString = (props: TruncatedStringProps) => {
  const breakpoint = useBreakpoint();
  const Cmp =
    breakpoint === "xs" ? TruncatedStringDrawer : TruncatedStringTooltip;
  return <Cmp {...props} />;
};
