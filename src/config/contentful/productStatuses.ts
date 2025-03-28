import { ValueOf } from "@/lib/types";

interface ProductStatusData {
  title: string;
  description?: string;
}

export const CONTENTFUL_PRODUCT_STATUS_IDS = {
  WIP: "WIP",
  TESTNET: "TESTNET",
  RELEASED: "RELEASED",
} as const;
export type ContentfulProductStatusId = ValueOf<
  typeof CONTENTFUL_PRODUCT_STATUS_IDS
>;

export const CONTENTFUL_PRODUCT_STATUSES_DATA: Record<
  ContentfulProductStatusId,
  ProductStatusData
> = {
  [CONTENTFUL_PRODUCT_STATUS_IDS.WIP]: {
    title: "WIP",
    description: "Work In Progress",
  },
  [CONTENTFUL_PRODUCT_STATUS_IDS.TESTNET]: {
    title: "TESTNET",
    description: "Released on the Test network",
  },
  [CONTENTFUL_PRODUCT_STATUS_IDS.RELEASED]: {
    title: "RELEASED",
  },
} as const;
