"use client";

import { useBreakpoint } from "@/lib/hooks/useBreakpoint";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface DialogSheetProps {
  className?: string;
  children: ReactNode;
  trigger: ReactNode;
  title: string;
  /**
   * When true, the content wrapper stretches to the full height of the scroll
   * region (`h-full`), so children can spread to the available space (e.g. an
   * iframe). Leave off for content that should hug its own height (e.g. forms).
   */
  fillHeight?: boolean;
}

// The scroll region fills the space left after the header via flex (both
// DialogContent and SheetContent are flex columns with a definite height),
// rather than guessing the header height with a fixed calc. The child selector
// lets `h-full` children resolve a height through Radix's injected
// `display:table` viewport wrapper.
const SCROLL_AREA_CLASS =
  "flex-1 min-h-0 [&_[data-slot=scroll-area-viewport]>div]:h-full";

const DialogWrapper = ({
  className,
  children,
  trigger,
  title,
  fillHeight,
}: DialogSheetProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={cn("py-8 px-4", className)}>
        <DialogHeader>
          <DialogTitle className="text-center font-serif text-4xl my-4 text-muted">
            {title}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {`Dialog content for ${title}`}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className={SCROLL_AREA_CLASS}>
          <div
            className={cn(
              "py-4 px-3 bg-primary/20 border border-primary",
              fillHeight && "h-full"
            )}
          >
            {children}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

const SheetWrapper = ({
  className,
  children,
  trigger,
  title,
  fillHeight,
}: DialogSheetProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className={cn("px-2 py-2", className)}>
        <SheetHeader className="flex justify-center items-center">
          <SheetTitle className="text-center font-serif text-4xl text-muted">
            {title}
          </SheetTitle>
          <SheetDescription className="sr-only">
            {`Sheet content for ${title}`}
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className={SCROLL_AREA_CLASS}>
          <div
            className={cn(
              "py-4 px-3 bg-primary/20 border border-primary",
              fillHeight && "h-full"
            )}
          >
            {children}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export const DialogSheet = (props: DialogSheetProps) => {
  const isWindowOverSM = useBreakpoint("sm");

  const Comp = isWindowOverSM ? DialogWrapper : SheetWrapper;
  return <Comp {...props} />;
};
