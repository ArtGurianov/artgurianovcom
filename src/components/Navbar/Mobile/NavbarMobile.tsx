"use client";

import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { MenuSvgUrl } from "@/components/svg";
import { Button } from "@/components/ui/button";
import { useCurrentRouteId } from "@/lib/hooks/useCurrentRouteId";
import { NAVBAR_TITLES } from "../config";
import Image from "next/image";

export default function NavbarMobile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentRouteId = useCurrentRouteId();

  return (
    <>
      <div className="absolute mt-8 rounded-full -translate-x-1/2 left-1/2 shadow-lg shadow-muted/20 overflow-clip">
        <div className="relative">
          <div className="-z-10 absolute w-full h-full bg-metal opacity-30" />
          <Button
            className="hover:no-underline font-serif pl-6 pr-4 gap-1 text-2xl"
            size="lg"
            variant="link"
            onClick={() => {
              setIsMenuOpen(true);
            }}
          >
            <span className="translate-px">
              {currentRouteId ? NAVBAR_TITLES[currentRouteId] : "Menu"}
            </span>
            <Image
              src={MenuSvgUrl}
              alt="nav-icon"
              width="0"
              height="0"
              sizes="100vh"
              className="h-full"
              priority
            />
          </Button>
        </div>
      </div>

      <Drawer open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
              <Button asChild variant="outline">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
