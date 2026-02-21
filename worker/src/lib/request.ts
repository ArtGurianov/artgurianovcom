import { Context } from "hono";
import { WorkerEnv } from "../env";

export const parseJsonBody = async <T>(
  c: Context<{ Bindings: WorkerEnv }>,
  contextLabel: string
): Promise<T | null> => {
  try {
    return (await c.req.json()) as T;
  } catch (error) {
    console.warn("Malformed JSON request body", {
      context: contextLabel,
      path: c.req.path,
      method: c.req.method,
      error: error instanceof Error ? error.message : String(error),
    });
    return null;
  }
};
