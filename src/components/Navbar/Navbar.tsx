"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Loader } from "@/components/common/Loader";
import { useBreakpoint } from "@/lib/hooks/useBreakpoint";

const NavbarMobile = dynamic(() => import("./Mobile/NavbarMobile"), {
  ssr: false,
});
const NavbarDesktop = dynamic(() => import("./Desktop/NavbarDesktop"), {
  ssr: false,
});

export const Navbar = () => {
  const isWindowOverSM = useBreakpoint("sm");

  return (
    <>
      <Suspense fallback={<Loader isInline />}>
        {isWindowOverSM ? <NavbarDesktop /> : <NavbarMobile />}
      </Suspense>
    </>
  );
};
