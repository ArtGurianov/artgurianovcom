export interface WorkerEnv {
  DB: D1Database;
  RECAPTCHA_SECRET_KEY: string;
  BLEADIO_URL?: string;
  BLEADIO_API_KEY?: string;
  CONTENTFUL_WEBHOOK_SECRET: string;
  ALLOWED_ORIGINS: string;
  GITHUB_TOKEN: string;
  GITHUB_OWNER: string;
  GITHUB_REPO: string;
  GITHUB_DISPATCH_EVENT?: string;
}
