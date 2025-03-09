"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Loader } from "@/components/Loader";
import { BREAKPOINTS, useBreakpoint } from "@/lib/hooks/useBreakpoint";

const NavbarMobile = dynamic(() => import("./NavbarMobile"), {
  ssr: false,
});
const NavbarDesktop = dynamic(() => import("./NavbarDesktop"), {
  ssr: false,
});

export const Navbar = () => {
  const breakpoint = useBreakpoint();

  return (
    <>
      <Suspense fallback={<Loader isInline />}>
        {breakpoint === BREAKPOINTS.xs ? <NavbarMobile /> : <NavbarDesktop />}
      </Suspense>
    </>
  );
};
