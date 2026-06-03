import { PROJECT_STATUSES, PROJECT_TYPES } from "./constants";
import { ProjectConfig } from "./types";

export const MYDAOGS_KEY = "mydaogs";

export const MYDAOGS_CONFIG: ProjectConfig = {
  key: MYDAOGS_KEY,
  title: "MyDAOgs",
  externalLinkUrl: "https://mydaogs.xyz",
  backgroundFileName: "mydaogs_bg.png",
  status: PROJECT_STATUSES.TESTNET,
  type: PROJECT_TYPES.WEB3_DAO,
  techStack: [
    "React",
    "NextJS",
    "Contentful",
    "Typescript",
    "Solidity",
    "Tailwind",
    "Framer",
    "Turborepo"
  ],
  colors: {
    card: "hsla(194,29%,35%,0.2)",
    mutedForeground: "#963939",
    accentForeground: "#6a150e",
  },
};
