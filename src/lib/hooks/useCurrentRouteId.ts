import { usePathname } from "next/navigation";
import { ROUTER_CONFIG } from "../routing/routerConfig";

export const useCurrentRouteId = () => {
  const pathname = usePathname();

  for (const { urlPath, routeId } of Object.values(ROUTER_CONFIG)) {
    if (pathname === urlPath) {
      return routeId;
    }
  }

  throw new Error("Route id not found");
};
