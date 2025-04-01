import { usePathname } from "next/navigation";
import { ROUTER_CONFIG } from "../../config/routing/routerConfig";
import { NAVBAR_ROUTE_IDS, NavbarRouteId } from "./config";

export const useNavbarRouteId = () => {
  const pathname = usePathname();

  for (const routeId of NAVBAR_ROUTE_IDS) {
    if (pathname.startsWith(ROUTER_CONFIG[routeId as NavbarRouteId].urlPath)) {
      return routeId;
    }
  }

  return null;
};
