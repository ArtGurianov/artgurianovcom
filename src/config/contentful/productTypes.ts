import { ValueOf } from "@/lib/types";

interface ProductTypeData {
  title: string;
  description?: string;
}

export const CONTENTFUL_PRODUCT_TYPE_IDS = {
  WEB3_SAAS: "web3-saas",
  WEB3_DAO: "web3-dao",
  WEB_APP: "web-app",
  MOBILE_APP: "mobile-app",
} as const;
export type ContentfulProductTypeId = ValueOf<
  typeof CONTENTFUL_PRODUCT_TYPE_IDS
>;

export const CONTENTFUL_PRODUCT_TYPES_DATA: Record<
  ContentfulProductTypeId,
  ProductTypeData
> = {
  [CONTENTFUL_PRODUCT_TYPE_IDS.WEB3_DAO]: {
    title: "Web3 DAO",
    description: "DAO stands for Decentralized Autonomous Organisation.",
  },
  [CONTENTFUL_PRODUCT_TYPE_IDS.WEB3_SAAS]: {
    title: "Web3 SaaS",
    description: "SaaS stands for Software as a Service",
  },
  [CONTENTFUL_PRODUCT_TYPE_IDS.WEB_APP]: {
    title: "Web App",
  },
  [CONTENTFUL_PRODUCT_TYPE_IDS.MOBILE_APP]: {
    title: "Mobile App",
  },
} as const;
