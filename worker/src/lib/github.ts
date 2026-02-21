import { WorkerEnv } from "../env";

export interface GitHubDispatchPayload {
  contentType: string;
}

export const dispatchContentRebuild = async (
  env: WorkerEnv,
  payload: GitHubDispatchPayload
) => {
  const eventType = env.GITHUB_DISPATCH_EVENT || "contentful-rebuild";
  const response = await fetch(
    `https://api.github.com/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/dispatches`,
    {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "artgurianovcom-api-worker",
      },
      body: JSON.stringify({
        event_type: eventType,
        client_payload: {
          contentType: payload.contentType,
          timestamp: Date.now(),
        },
      }),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub dispatch failed: ${response.status} ${text}`);
  }
};
