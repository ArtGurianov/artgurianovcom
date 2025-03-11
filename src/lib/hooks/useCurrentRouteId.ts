import { usePathname } from "next/navigation";
import { ROUTER_CONFIG } from "../routing/routerConfig";

export const useCurrentRouteId = () => {
  const pathname = usePathname();

  for (const { urlPath, routeId } of Object.values(ROUTER_CONFIG)) {
    if (pathname === urlPath) {
      return routeId;
    }
  }

  return null;
};
