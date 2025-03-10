import { ValueOf } from "../types";

export const APP_ROUTES = {
  IDENTITY: "IDENTITY",
  CREATION: "CREATION",
  PUBLICITY: "PUBLICITY",
  WISDOM: "WISDOM",
  LABOUR: "LABOUR",
} as const;
export type AppRoute = ValueOf<typeof APP_ROUTES>;

export const ROUTER_CONFIG: Record<
  AppRoute,
  {
    routeId: string;
    urlPath: string;
  }
> = {
  [APP_ROUTES.IDENTITY]: {
    routeId: APP_ROUTES.IDENTITY,
    urlPath: "/",
  },
  [APP_ROUTES.CREATION]: {
    routeId: APP_ROUTES.CREATION,
    urlPath: "/creation",
  },
  [APP_ROUTES.PUBLICITY]: {
    routeId: APP_ROUTES.PUBLICITY,
    urlPath: "/publicity",
  },
  [APP_ROUTES.WISDOM]: {
    routeId: APP_ROUTES.WISDOM,
    urlPath: "/wisdom",
  },
  [APP_ROUTES.LABOUR]: {
    routeId: APP_ROUTES.LABOUR,
    urlPath: "/labour",
  },
};
