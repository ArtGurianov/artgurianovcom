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
}

const DialogWrapper = ({
  className,
  children,
  trigger,
  title,
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
        <ScrollArea className="h-[calc(96vh-var(--spacing)*36)]">
          <div className="py-4 px-3 bg-primary/20 border border-primary">
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
}: DialogSheetProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className={cn("px-2 py-2", className)}>
        <SheetHeader>
          <SheetTitle className="text-center font-serif text-4xl text-muted">
            {title}
          </SheetTitle>
          <SheetDescription className="sr-only">
            {`Sheet content for ${title}`}
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-var(--spacing)*36)]">
          <div className="py-4 px-3 bg-primary/20 border border-primary">
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
