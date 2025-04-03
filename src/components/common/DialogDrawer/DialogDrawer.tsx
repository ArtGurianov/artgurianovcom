"use client";

import { useBreakpoint } from "@/lib/hooks/useBreakpoint";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DialogDrawerProps {
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
}: DialogDrawerProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={cn("py-8 px-4", className)}>
        <DialogHeader>
          <DialogTitle className="text-center font-serif text-4xl my-4 text-muted">
            {title}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[calc(96vh-var(--spacing)*36)]">
          <div className="px-6">{children}</div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

const DrawerWrapper = ({
  className,
  children,
  trigger,
  title,
}: DialogDrawerProps) => {
  return (
    <Drawer
      preventScrollRestoration={false}
      disablePreventScroll
      noBodyStyles
      autoFocus
    >
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className={cn("py-8 px-4", className)}>
        <DrawerHeader>
          <DrawerTitle className="text-center font-serif text-4xl my-4 text-muted">
            {title}
          </DrawerTitle>
        </DrawerHeader>
        <ScrollArea className="h-[calc(100vh-var(--spacing)*96)]">
          <div className="px-6">{children}</div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

export const DialogDrawer = (props: DialogDrawerProps) => {
  const isWindowOverSM = useBreakpoint("sm");

  const Comp = isWindowOverSM ? DialogWrapper : DrawerWrapper;
  return <Comp {...props} />;
};
