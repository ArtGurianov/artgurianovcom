declare global {
  interface CloudflareEnv {
    DB: any;
    NEXT_TAG_CACHE_D1: any;
    NEXT_INC_CACHE_KV: any;
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
