import { ValueOf } from "@/lib/types";

export const PROJECT_STATUSES = {
  "WIP": "WIP",
  "TESTNET": "TESTNET",
  "RELEASED": "RELEASED"
} as const;

export const PROJECT_TYPES = {
  "WEB3_SAAS": "WEB3_SAAS",
  "WEB3_DAO": "WEB3_DAO",
  "WEB_APP": "WEB_APP",
  "MOBILE_APP": "MOBILE_APP"
} as const;

export const TYPE_TO_I18N: Record<
  ValueOf<typeof PROJECT_TYPES>,
  "web3-saas" | "web3-dao" | "web-app" | "mobile-app"
> = {
  [PROJECT_TYPES.WEB3_SAAS]: "web3-saas",
  [PROJECT_TYPES.WEB3_DAO]: "web3-dao",
  [PROJECT_TYPES.WEB_APP]: "web-app",
  [PROJECT_TYPES.MOBILE_APP]: "mobile-app",
};
