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
import { cn, truncateString, TruncateStringProps } from "@/lib/utils";
import { useBreakpoint } from "@/lib/hooks/useBreakpoint";
import { AnyFragment } from "@/components/common/AnyFragment/AnyFragment";

export interface TruncatedStringProps
  extends Omit<TruncateStringProps, "value"> {
  className?: string;
  children: string;
}

export const TruncatedStringDrawer = ({
  children,
  className,
  maxLen,
  cutFrom,
}: TruncatedStringProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <span
        className="cursor-pointer"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {truncateString({ value: children, maxLen, cutFrom })}
      </span>
      <Drawer open={isOpen} onClose={() => setIsOpen(false)} autoFocus={isOpen}>
        <DrawerContent className={className}>
          <DrawerHeader>
            <DrawerTitle className="text-center font-serif text-4xl my-4 text-card">
              {"Description"}
            </DrawerTitle>
          </DrawerHeader>
          {children}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export const TruncatedStringTooltip = ({
  children,
  className,
  maxLen,
  cutFrom,
}: TruncatedStringProps) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger className={cn("underline cursor-pointer", className)}>
          {truncateString({ value: children, maxLen, cutFrom })}
        </TooltipTrigger>
        <TooltipContent>{children}</TooltipContent>
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

export const TruncatedStringMobile = (props: TruncatedStringProps) => {
  const breakpoint = useBreakpoint();
  const Comp = breakpoint === "xs" ? TruncatedStringDrawer : AnyFragment;

  return <Comp {...props} />;
};
