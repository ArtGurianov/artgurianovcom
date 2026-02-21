import { ApiErrorCode, ApiResponse } from "@shared/types/api";
import { Context } from "hono";
import { WorkerEnv } from "../env";

export const ok = <T>(c: Context<{ Bindings: WorkerEnv }>, data: T | null = null) =>
  c.json<ApiResponse<T>>(
    {
      success: true,
      data,
      errorCode: null,
    },
    200
  );

export const fail = (
  c: Context<{ Bindings: WorkerEnv }>,
  errorCode: ApiErrorCode,
  status = 400
) =>
  c.json<ApiResponse>(
    {
      success: false,
      data: null,
      errorCode,
    },
    status
  );
