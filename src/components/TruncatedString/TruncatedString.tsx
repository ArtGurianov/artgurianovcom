"use client";

import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { cn, truncateString, TruncateStringProps } from "@/lib/utils";
import { useBreakpoint } from "@/lib/hooks/useBreakpoint";
import { AnyFragment } from "@/components/common/AnyFragment/AnyFragment";
import { TooltipPopover } from "@/components/TooltipPopover/TooltipPopover";

export interface TruncatedStringProps
  extends Omit<TruncateStringProps, "value"> {
  className?: string;
  children: string;
  withExpandBtn?: boolean;
}

export const TruncatedStringDrawer = ({
  children,
  className,
  maxLen,
  cutFrom,
  withExpandBtn = true,
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
        {withExpandBtn ? <span className="underline">{"👁️"}</span> : null}
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
  withExpandBtn = true,
}: TruncatedStringProps) => {
  return (
    <TooltipPopover
      content={children}
      className={cn("underline cursor-pointer", className)}
    >
      {truncateString({ value: children, maxLen, cutFrom })}
      {withExpandBtn ? <span className="underline">{"👁️"}</span> : null}
    </TooltipPopover>
  );
};

export const TruncatedString = (props: TruncatedStringProps) => {
  const isWindowOverSM = useBreakpoint("sm");
  const Cmp = isWindowOverSM ? TruncatedStringTooltip : TruncatedStringDrawer;
  return <Cmp {...props} />;
};

export const TruncatedStringMobile = (props: TruncatedStringProps) => {
  const isWindowOverSM = useBreakpoint("sm");
  const Comp = isWindowOverSM ? AnyFragment : TruncatedStringDrawer;

  return <Comp {...props} />;
};
