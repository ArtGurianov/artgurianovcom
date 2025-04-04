"use client";

import { Suspense } from "react";
import { Loader } from "@/components/common/Loader";
import { useBreakpoint } from "@/lib/hooks/useBreakpoint";
import { NavigateBack } from "./NavigateBack";
import { NavbarDesktop } from "./Desktop/NavbarDesktop";
import { NavbarMobile } from "./Mobile/NavbarMobile";
import { MountedGuard } from "@/components/common/MountedGuard/MountedGuard";

export const Navbar = () => {
  const isWindowOverSM = useBreakpoint("sm");

  return (
    <MountedGuard className="absolute w-full z-20 flex justify-center items-center my-8">
      <div className="relative">
        {isWindowOverSM ? (
          <>
            <NavigateBack />
            <div className="rounded-full shadow-lg shadow-muted/20 overflow-clip">
              <NavbarDesktop />
            </div>
          </>
        ) : (
          <>
            <NavigateBack />
            <div className="rounded-full shadow-lg shadow-muted/20 overflow-clip">
              <Suspense fallback={<Loader isInline />}>
                <NavbarMobile />
              </Suspense>
            </div>
          </>
        )}
      </div>
    </MountedGuard>
  );
};
