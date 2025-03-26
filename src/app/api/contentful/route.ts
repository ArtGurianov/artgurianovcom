import {
  CONTENT_TYPE_IDS_LIST,
  ContentTypeId,
  WEBHOOK_REBUILD_CONFIG,
} from "@/config/contentfulWebhookConfig";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const body = await request.json();
  const contentType = body?.sys?.contentType?.sys?.id;
  if (!contentType) {
    console.error(
      `Failed at parsing Contentful contentType from webhook rebuild call.`
    );
  }

  if (!CONTENT_TYPE_IDS_LIST.includes(contentType)) {
    console.error(`Unrecognized Contentful contentType: ${contentType}`);
  }

  for (const { path, type } of WEBHOOK_REBUILD_CONFIG[
    contentType as ContentTypeId
  ]) {
    revalidatePath(path, type);
  }

  return new Response(null, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
