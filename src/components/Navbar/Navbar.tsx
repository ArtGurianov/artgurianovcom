"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Loader } from "@/components/common/Loader";
import { useBreakpoint } from "@/lib/hooks/useBreakpoint";
import { NavigateBack } from "./NavigateBack";

const NavbarMobile = dynamic(() => import("./Mobile/NavbarMobile"), {
  ssr: false,
});
const NavbarDesktop = dynamic(() => import("./Desktop/NavbarDesktop"), {
  ssr: false,
});

export const Navbar = () => {
  const isWindowOverSM = useBreakpoint("sm");

  return (
    <div className="absolute w-full z-20 flex justify-center items-center my-8">
      <div className="relative">
        <NavigateBack />
        <div className="rounded-full shadow-lg shadow-muted/20 overflow-clip">
          <Suspense fallback={<Loader isInline />}>
            {isWindowOverSM ? <NavbarDesktop /> : <NavbarMobile />}
          </Suspense>
        </div>
      </div>
    </div>
  );
};
