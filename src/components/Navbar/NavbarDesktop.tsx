"use client";

import { useState } from "react";
import { AppRouteId, ROUTER_CONFIG } from "@/lib/routing/routerConfig";
import { NAVBAR_ICONS, NAVBAR_ORDER, NAVBAR_TITLES } from "./config";
import { NavbarDesktopButton } from "./NavbarDesktopButton";
import { useCurrentRouteId } from "@/lib/hooks/useCurrentRouteId";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";

export default function NavbarDesktop() {
  const currentRouteId = useCurrentRouteId();
  const [hoveredRouteId, setHoveredRouteId] = useState<AppRouteId | null>(null);

  return (
    <div className="mt-8 flex w-auto self-center">
      <Popover open={!!hoveredRouteId}>
        <PopoverAnchor>
          <div className="relative overflow-clip rounded-full shadow-lg shadow-muted/20">
            <div className="-z-10 absolute h-full w-full bg-metal opacity-40" />
            <ul className="h-full flex px-8">
              {NAVBAR_ORDER.map((each) => (
                <li key={each}>
                  <NavbarDesktopButton
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
                    icon={NAVBAR_ICONS[each]}
                  />
                </li>
              ))}
            </ul>
          </div>
        </PopoverAnchor>
        <PopoverContent
          sideOffset={12}
          className="w-[var(--radix-popover-trigger-width)]"
        >
          Place content for the popover here.
        </PopoverContent>
      </Popover>
    </div>
  );
}
