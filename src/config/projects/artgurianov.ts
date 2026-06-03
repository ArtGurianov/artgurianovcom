import { PROJECT_STATUSES, PROJECT_TYPES } from "./constants";
import { ProjectConfig } from "./types";

export const ARTGURIANOV_KEY = "artgurianov";

export const ARTGURIANOV_CONFIG: ProjectConfig = {
  key: ARTGURIANOV_KEY,
  title: "ArtGurianov",
  externalLinkUrl: "https://artgurianov.com",
  status: PROJECT_STATUSES.WIP,
  type: PROJECT_TYPES.WEB_APP,
  techStack: [
    "React",
    "NextJS",
    "Contentful",
    "Typescript",
    "NextIntl",
    "OpenNext",
    "Cloudflare Pages",
    "Cloudflare Workers",
    "Cloudflare D1",
    "Hono",
    "Github Workflows"
  ],
  colors: {
    background: "#9a6992a9",
    card: "hsla(318,11%,53%,0.2)",
    mutedForeground: "#343c35",
    accentForeground: "#6e4260",
  },
};
