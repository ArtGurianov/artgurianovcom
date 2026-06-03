import { PROJECT_STATUSES, PROJECT_TYPES } from "./constants";
import { ProjectConfig } from "./types";

export const SKROW_KEY = "skrow";

export const SKROW_CONFIG: ProjectConfig = {
  key: SKROW_KEY,
  title: "Skrow",
  backgroundFileName: "skrow_bg.png",
  status: PROJECT_STATUSES.WIP,
  type: PROJECT_TYPES.WEB3_SAAS,
  techStack: [
    "React",
    "NextJS",
    "Solidity",
    "Wagmi",
    "Viem",
    "Tailwind"
  ],
  colors: {
    card: "hsla(273,34%,59%,0.596)",
    mutedForeground: "#61938b",
    accentForeground: "#655e1d",
  },
};
