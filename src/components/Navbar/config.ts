import { APP_ROUTE_IDS, AppRouteId } from "@/lib/routing/routerConfig";
import {
  CreationSvgUrl,
  IdentitySvgUrl,
  LabourSvgUrl,
  PublicitySvgUrl,
  WisdomSvgUrl,
} from "../svg";

export const NAVBAR_ORDER: AppRouteId[] = [
  APP_ROUTE_IDS.IDENTITY,
  APP_ROUTE_IDS.CREATION,
  APP_ROUTE_IDS.WISDOM,
  APP_ROUTE_IDS.PUBLICITY,
  APP_ROUTE_IDS.LABOUR,
];

export const NAVBAR_TITLES: Record<AppRouteId, string> = {
  [APP_ROUTE_IDS.IDENTITY]: "Identity",
  [APP_ROUTE_IDS.CREATION]: "Creation",
  [APP_ROUTE_IDS.PUBLICITY]: "Publicity",
  [APP_ROUTE_IDS.WISDOM]: "Wisdom",
  [APP_ROUTE_IDS.LABOUR]: "Labour",
};

export const NAVBAR_ICONS: Record<AppRouteId, string> = {
  [APP_ROUTE_IDS.IDENTITY]: IdentitySvgUrl,
  [APP_ROUTE_IDS.CREATION]: CreationSvgUrl,
  [APP_ROUTE_IDS.PUBLICITY]: PublicitySvgUrl,
  [APP_ROUTE_IDS.WISDOM]: WisdomSvgUrl,
  [APP_ROUTE_IDS.LABOUR]: LabourSvgUrl,
};

export const NAVBAR_DESCRIPTIONS: Record<AppRouteId, string> = {
  [APP_ROUTE_IDS.IDENTITY]: "Starting from introduction and biography.",
  [APP_ROUTE_IDS.CREATION]:
    "Sharing the products that I built as a SaaS enterpreneur.",
  [APP_ROUTE_IDS.PUBLICITY]:
    "Listing my media resources dedicated coding and life of a nomad engineer.",
  [APP_ROUTE_IDS.WISDOM]:
    "Revealing professional experience for you to learn and adopt.",
  [APP_ROUTE_IDS.LABOUR]:
    "Offering my tech expertise to bootstrap or enhance your projects.",
};
