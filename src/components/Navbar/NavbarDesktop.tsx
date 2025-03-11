"use client";

import { AppRouteId, ROUTER_CONFIG } from "@/lib/routing/routerConfig";
import { NAVBAR_ORDER, NAVBAR_TITLES } from "./config";
import { NavbarButton } from "./NavbarButton";
import { useCurrentRouteId } from "@/lib/hooks/useCurrentRouteId";
import { useState } from "react";

export default function NavbarDesktop() {
  const currentRouteId = useCurrentRouteId();
  const [hoveredRouteId, setHoveredRouteId] = useState<AppRouteId | null>(null);

  return (
    <div className="absolute mt-8 rounded-full -translate-x-1/2 left-1/2 shadow-lg shadow-muted/20 overflow-clip">
      <div className="relative">
        <div className="-z-10 absolute w-full h-full bg-metal opacity-30" />
        <ul className="h-full flex px-8">
          {NAVBAR_ORDER.map((each) => (
            <li key={each}>
              <NavbarButton
                onMouseEnter={() => {
                  setHoveredRouteId(each);
                }}
                onMouseLeave={() => {
                  setHoveredRouteId(null);
                }}
                isActive={
                  (currentRouteId === each && !hoveredRouteId) ||
                  hoveredRouteId === each
                }
                urlPath={ROUTER_CONFIG[each].urlPath}
                title={NAVBAR_TITLES[each]}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
