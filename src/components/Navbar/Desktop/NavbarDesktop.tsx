"use client";

import { useState } from "react";
import { AppRouteId, ROUTER_CONFIG } from "@/lib/routing/routerConfig";
import { NAVBAR_ICONS, NAVBAR_ORDER } from "../config";
import { NavbarDesktopButton } from "./NavbarDesktopButton";
import { useCurrentRouteId } from "@/lib/hooks/useCurrentRouteId";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function NavbarDesktop() {
  const currentRouteId = useCurrentRouteId();
  const [hoveredRouteId, setHoveredRouteId] = useState<AppRouteId | null>(null);

  const t = useTranslations("NAVBAR");

  return (
    <div className="absolute z-20 my-8 rounded-full shadow-lg shadow-muted/20 overflow-clip self-center">
      <Popover open={!!hoveredRouteId}>
        <PopoverAnchor>
          <div className="relative overflow-clip rounded-full shadow-lg shadow-muted/20">
            <div className="-z-10 absolute h-full w-full bg-nav-metal opacity-50" />
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
                    title={t(`${each}.title`)}
                    icon={NAVBAR_ICONS[each]}
                  />
                </li>
              ))}
            </ul>
          </div>
        </PopoverAnchor>
        <PopoverContent
          bgOpacity={60}
          sideOffset={16}
          withArrow={false}
          className="flex w-[var(--radix-popover-trigger-width)] gap-4 items-center justify-center"
        >
          {hoveredRouteId ? (
            <>
              <Image
                src={NAVBAR_ICONS[hoveredRouteId]}
                alt="nav-icon"
                width="0"
                height="0"
                sizes="100vh"
                className="h-full opacity-80"
                priority
              />
              <p className="text-xl flex-1 text-center">
                {t(`${hoveredRouteId}.description`)}
              </p>
            </>
          ) : null}
        </PopoverContent>
      </Popover>
    </div>
  );
}
