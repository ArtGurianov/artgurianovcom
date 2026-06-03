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
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

// The body fills the space left after the header via flex (both DialogContent
// and SheetContent are flex columns with a definite height), rather than
// guessing the header height with a fixed calc.
//
// Two modes:
// - default (hug): content can be taller than the available space and the
//   ScrollArea scrolls it (e.g. long forms).
// - fillHeight: content is clamped to exactly the available height and manages
//   its own internal scrolling. We deliberately do NOT use ScrollArea here:
//   Radix wraps the viewport content in a `display:table` div, on which
//   `height:100%` is only a minimum, so it grows to content instead of
//   clamping — which would let everything scroll together. A plain
//   `overflow-hidden` flex box gives children a definite height to resolve
//   `h-full`/`flex-1`/`min-h-0` against.
const DialogSheetBody = ({
  children,
  fillHeight,
}: {
  children: ReactNode;
  fillHeight?: boolean;
}) => {
  if (fillHeight) {
    return (
      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="h-full py-4 px-3 bg-primary/20 border border-primary">
          {children}
        </div>
      </div>
    );
  }
  return (
    <ScrollArea className="flex-1 min-h-0">
      <div className="py-4 px-3 bg-primary/20 border border-primary">
        {children}
      </div>
    </ScrollArea>
  );
};

const DialogWrapper = ({
  className,
  children,
  trigger,
  title,
  fillHeight,
  open,
  onOpenChange,
}: DialogSheetProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
        <DialogSheetBody fillHeight={fillHeight}>{children}</DialogSheetBody>
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
  open,
  onOpenChange,
}: DialogSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
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
        <DialogSheetBody fillHeight={fillHeight}>{children}</DialogSheetBody>
      </SheetContent>
    </Sheet>
  );
};

export const DialogSheet = (props: DialogSheetProps) => {
  const isWindowOverSM = useBreakpoint("sm");

  const Comp = isWindowOverSM ? DialogWrapper : SheetWrapper;
  return <Comp {...props} />;
};
