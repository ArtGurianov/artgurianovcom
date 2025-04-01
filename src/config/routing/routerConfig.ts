import { ValueOf } from "../../lib/types";

export const APP_ROUTE_IDS = {
  IDENTITY: "IDENTITY",
  CREATION: "CREATION",
  PUBLICITY: "PUBLICITY",
  WISDOM: "WISDOM",
  LABOUR: "LABOUR",
  WISDOM_MENTORSHIP: "WISDOM_MENTORSHIP",
  WISDOM_CHECKLIST: "WISDOM_CHECKLIST",
  WISDOM_COURSE: "WISDOM_COURSE",
} as const;
export type AppRouteId = ValueOf<typeof APP_ROUTE_IDS>;

export const ROUTER_CONFIG: Record<
  AppRouteId,
  {
    routeId: AppRouteId;
    urlPath: string;
    routerPath: string;
  }
> = {
  [APP_ROUTE_IDS.IDENTITY]: {
    routeId: APP_ROUTE_IDS.IDENTITY,
    urlPath: "/",
    routerPath: "/(main)",
  },
  [APP_ROUTE_IDS.CREATION]: {
    routeId: APP_ROUTE_IDS.CREATION,
    urlPath: "/creation",
    routerPath: "/(main)/creation",
  },
  [APP_ROUTE_IDS.PUBLICITY]: {
    routeId: APP_ROUTE_IDS.PUBLICITY,
    urlPath: "/publicity",
    routerPath: "/(main)/publicity",
  },
  [APP_ROUTE_IDS.WISDOM]: {
    routeId: APP_ROUTE_IDS.WISDOM,
    urlPath: "/wisdom",
    routerPath: "/(main)/wisdom",
  },
  [APP_ROUTE_IDS.LABOUR]: {
    routeId: APP_ROUTE_IDS.LABOUR,
    urlPath: "/labour",
    routerPath: "/(main)/labour",
  },
  [APP_ROUTE_IDS.WISDOM_MENTORSHIP]: {
    routeId: APP_ROUTE_IDS.WISDOM_MENTORSHIP,
    urlPath: "/wisdom/mentorship",
    routerPath: "/(main)/wisdom/mentorship",
  },
  [APP_ROUTE_IDS.WISDOM_CHECKLIST]: {
    routeId: APP_ROUTE_IDS.WISDOM_CHECKLIST,
    urlPath: "/wisdom/checklist",
    routerPath: "/(main)/wisdom/checklist",
  },
  [APP_ROUTE_IDS.WISDOM_COURSE]: {
    routeId: APP_ROUTE_IDS.WISDOM_COURSE,
    urlPath: "/wisdom/course",
    routerPath: "/(main)/wisdom/course",
  },
};
