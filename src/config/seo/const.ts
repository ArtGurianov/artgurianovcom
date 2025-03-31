export type AppLocale = "en-US" | "ru-RU";
export const SEO_KEYWORDS: Record<AppLocale, string[]> = {
  "en-US": ["web3", "saas", "pet project", "full stack", "develop", "startup"],
  "ru-RU": ["web3", "saas", "пет проект", "фулстек", "разработка", "стартап"],
} as const;
