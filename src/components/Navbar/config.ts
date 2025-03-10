import { APP_ROUTES, AppRoute } from "@/lib/routing/routerConfig";

export const NAVBAR_ORDER: AppRoute[] = [
  APP_ROUTES.IDENTITY,
  APP_ROUTES.CREATION,
  APP_ROUTES.WISDOM,
  APP_ROUTES.PUBLICITY,
  APP_ROUTES.LABOUR,
];

export const NAVBAR_TITLES: Record<AppRoute, string> = {
  [APP_ROUTES.IDENTITY]: "Identity",
  [APP_ROUTES.CREATION]: "Creation",
  [APP_ROUTES.PUBLICITY]: "Publicity",
  [APP_ROUTES.WISDOM]: "Wisdom",
  [APP_ROUTES.LABOUR]: "Labour",
};
