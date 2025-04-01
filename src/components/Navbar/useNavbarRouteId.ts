import { usePathname } from "next/navigation";
import {
  APP_ROUTE_IDS,
  ROUTER_CONFIG,
} from "../../config/routing/routerConfig";
import { NAVBAR_ROUTE_IDS, NavbarRouteId } from "./config";

export const useNavbarRouteId = () => {
  const pathname = usePathname();
  if (pathname === "/") return APP_ROUTE_IDS.IDENTITY;

  for (const routeId of NAVBAR_ROUTE_IDS) {
    if (
      routeId !== APP_ROUTE_IDS.IDENTITY &&
      pathname.startsWith(ROUTER_CONFIG[routeId as NavbarRouteId].urlPath)
    ) {
      return routeId;
    }
  }

  return null;
};
