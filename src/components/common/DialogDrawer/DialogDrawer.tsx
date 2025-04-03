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
      <DialogContent className={cn("p-8", className)}>
        <DialogHeader>
          <DialogTitle className="text-center font-serif text-4xl my-4 text-muted">
            {title}
          </DialogTitle>
        </DialogHeader>
        {children}
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
      <DrawerContent className={cn("p-8", className)}>
        <DrawerHeader>
          <DrawerTitle className="text-center font-serif text-4xl my-4 text-muted">
            {title}
          </DrawerTitle>
        </DrawerHeader>
        <div className="overflow-y-auto px-1">{children}</div>
      </DrawerContent>
    </Drawer>
  );
};

export const DialogDrawer = (props: DialogDrawerProps) => {
  const isWindowOverSM = useBreakpoint("sm");

  const Comp = isWindowOverSM ? DialogWrapper : DrawerWrapper;
  return <Comp {...props} />;
};
