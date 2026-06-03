import { PROJECT_STATUSES, PROJECT_TYPES } from "./constants";
import { ProjectConfig } from "./types";

export const BLEAD_KEY = "blead";

export const BLEAD_CONFIG: ProjectConfig = {
  key: BLEAD_KEY,
  title: "bLead",
  externalLinkUrl: "https://www.blead.io",
  backgroundFileName: "blead_bg.png",
  status: PROJECT_STATUSES.RELEASED,
  type: PROJECT_TYPES.WEB3_SAAS,
  techStack: [
    "nextjs",
    "wagmi",
    "viem",
    "vercel",
    "tailwind"
  ],
  colors: {
    card: "hsla(153,53%,81%,0.306)",
    mutedForeground: "#380538",
    accentForeground: "#99e222",
  },
};
