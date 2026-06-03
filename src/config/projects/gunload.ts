import { PROJECT_STATUSES, PROJECT_TYPES } from "./constants";
import { ProjectConfig } from "./types";

export const GUNLOAD_KEY = "gunload";

export const GUNLOAD_CONFIG: ProjectConfig = {
  key: GUNLOAD_KEY,
  title: "Gunload",
  backgroundFileName: "gunload_bg.png",
  status: PROJECT_STATUSES.WIP,
  type: PROJECT_TYPES.WEB3_SAAS,
  techStack: [],
  colors: {
    card: "hsla(63,64%,62%,0.5)",
    mutedForeground: "#b37f06",
    accentForeground: "#0b590f",
  },
};
