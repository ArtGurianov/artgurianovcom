import { ValueOf } from "@/lib/types";

export const CONTENTFUL_PRODUCT_STATUS_IDS = {
  WIP: "WIP",
  TESTNET: "TESTNET",
  RELEASED: "RELEASED",
} as const;
export type ContentfulProductStatusId = ValueOf<
  typeof CONTENTFUL_PRODUCT_STATUS_IDS
>;
