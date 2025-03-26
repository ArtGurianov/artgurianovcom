import { ROUTER_CONFIG } from "@/lib/routing/routerConfig";
import { ValueOf } from "@/lib/types";

export const CONTENT_TYPE_IDS = {
  project: "project",
} as const;
export type ContentTypeId = ValueOf<typeof CONTENT_TYPE_IDS>;
export const CONTENT_TYPE_IDS_LIST = Object.values(CONTENT_TYPE_IDS);

export const WEBHOOK_REBUILD_CONFIG: Record<
  ContentTypeId,
  Array<{ path: string; type: "page" | "layout" }>
> = {
  [CONTENT_TYPE_IDS.project]: [
    {
      path: ROUTER_CONFIG.CREATION.urlPath,
      type: "page",
    },
  ],
} as const;
