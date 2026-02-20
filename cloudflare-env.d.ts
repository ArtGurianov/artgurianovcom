import type { D1Database, KVNamespace } from "@cloudflare/workers-types";

declare global {
  interface CloudflareEnv {
    DB: D1Database;
    NEXT_TAG_CACHE_D1: D1Database;
    NEXT_INC_CACHE_KV: KVNamespace;
    NEXT_PUBLIC_APP_LOCALE: string;
    NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY: string;
    RECAPTCHA_SECRET_KEY: string;
    CONTENTFUL_SPACE_ID: string;
    CONTENTFUL_ACCESS_TOKEN: string;
    BLEADIO_URL: string;
    BLEADIO_API_KEY: string;
  }
}

export {};
