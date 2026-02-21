import {
  API_ERROR_CODES,
  ApiErrorCode,
  ApiResponse,
} from "@shared/types/api";
import { AppLocale } from "@/config/seo/const";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const APP_LOCALE = process.env.NEXT_PUBLIC_APP_LOCALE as AppLocale | undefined;

const UNKNOWN_ERROR_RESPONSE: ApiResponse = {
  success: false,
  data: null,
  errorCode: API_ERROR_CODES.UNKNOWN,
};

const API_ERROR_CODE_SET = new Set<ApiErrorCode>(Object.values(API_ERROR_CODES));

export const getAppLocaleFromEnv = (): AppLocale => {
  return APP_LOCALE === "ru-RU" ? "ru-RU" : "en-US";
};

export const postApi = async <T = null>(
  path: string,
  body: Record<string, unknown>
): Promise<ApiResponse<T>> => {
  if (!API_URL) {
    return UNKNOWN_ERROR_RESPONSE as ApiResponse<T>;
  }

  try {
    const response = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const parsed = (await response.json().catch(() => null)) as unknown;

    if (
      !parsed ||
      typeof parsed !== "object" ||
      !("success" in parsed) ||
      !("errorCode" in parsed) ||
      typeof parsed.success !== "boolean"
    ) {
      return UNKNOWN_ERROR_RESPONSE as ApiResponse<T>;
    }

    const normalized = parsed as ApiResponse<T>;

    if (normalized.success) {
      return {
        ...normalized,
        errorCode: null,
      };
    }

    if (
      typeof normalized.errorCode !== "string" ||
      !API_ERROR_CODE_SET.has(normalized.errorCode as ApiErrorCode)
    ) {
      return UNKNOWN_ERROR_RESPONSE as ApiResponse<T>;
    }

    return normalized;
  } catch {
    return UNKNOWN_ERROR_RESPONSE as ApiResponse<T>;
  }
};

const FORM_ERROR_MAP: Partial<Record<ApiErrorCode, string>> = {
  [API_ERROR_CODES.ALREADY_EXISTS]: "already-exists",
  [API_ERROR_CODES.RECAPTCHA_FAILED]: "recaptcha-failed",
  [API_ERROR_CODES.INVALID_PAYLOAD]: "incorrect-value",
  [API_ERROR_CODES.DB_ERROR]: "db-catch",
  [API_ERROR_CODES.UNKNOWN]: "generic-error",
  [API_ERROR_CODES.UNAUTHORIZED]: "generic-error",
  [API_ERROR_CODES.UPSTREAM_ERROR]: "generic-error",
};

export const getFormErrorTranslationKey = (
  errorCode: ApiErrorCode | null
): string => {
  if (!errorCode) {
    return "generic-error";
  }

  return FORM_ERROR_MAP[errorCode] || "generic-error";
};
