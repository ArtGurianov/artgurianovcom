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
import { TooltipPopover } from "@/components/common/TooltipPopover/TooltipPopover";
import { useTranslations } from "next-intl";

export interface TruncatedStringProps
  extends Omit<TruncateStringProps, "value"> {
  className?: string;
  children: string;
  withExpandBtn?: boolean;
}

interface TruncatedStringDrawerProps extends TruncatedStringProps {
  title?: string;
}

export const TruncatedStringDrawer = ({
  children,
  className,
  maxLen,
  cutFrom,
  title,
  withExpandBtn = true,
}: TruncatedStringDrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("INLINE_INFO");

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
            <DrawerTitle className="text-center font-serif text-4xl my-4 text-muted">
              {title || t("mobile-drawer-label")}
            </DrawerTitle>
          </DrawerHeader>
          <span className="px-4 pb-8 text-center">{children}</span>
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
      trigger={
        <>
          {truncateString({ value: children, maxLen, cutFrom })}
          {withExpandBtn ? <span className="underline">{"👁️"}</span> : null}
        </>
      }
      className={cn("underline cursor-pointer", className)}
    >
      {children}
    </TooltipPopover>
  );
};

export const TruncatedString = (props: TruncatedStringProps) => {
  const isWindowOverSM = useBreakpoint("sm");
  const Cmp = isWindowOverSM ? TruncatedStringTooltip : TruncatedStringDrawer;
  return <Cmp {...props} />;
};

export const TruncatedStringMobile = (props: TruncatedStringDrawerProps) => {
  const isWindowOverSM = useBreakpoint("sm");
  const Comp = isWindowOverSM ? AnyFragment : TruncatedStringDrawer;

  return <Comp {...props} />;
};
