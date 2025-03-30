import { ValueOf } from "@/lib/types";

export const CONTENTFUL_PRODUCT_TYPE_IDS = {
  WEB3_SAAS: "web3-saas",
  WEB3_DAO: "web3-dao",
  WEB_APP: "web-app",
  MOBILE_APP: "mobile-app",
} as const;
export type ContentfulProductTypeId = ValueOf<
  typeof CONTENTFUL_PRODUCT_TYPE_IDS
>;
