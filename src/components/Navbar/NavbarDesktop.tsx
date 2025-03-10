"use client";

import { ROUTER_CONFIG } from "@/lib/routing/routerConfig";
import { NAVBAR_ORDER, NAVBAR_TITLES } from "./config";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NavbarDesktop() {
  return (
    <div className="absolute mt-8 rounded-full -translate-x-1/2 left-1/2 shadow-lg shadow-muted/20 overflow-clip">
      <div className="relative">
        <div className="-z-10 absolute w-full h-full bg-metal opacity-90" />
        <ul className="h-full flex px-8">
          {NAVBAR_ORDER.map((each) => (
            <li key={each}>
              <Button variant="link" className="px-4 h-full">
                <Link
                  href={ROUTER_CONFIG[each].urlPath}
                  className="text-xl font-serif"
                >
                  {NAVBAR_TITLES[each]}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
