import { ValueOf } from "@/lib/types";

export const SOCIALS_IDS = {
  YOUTUBE: "YOUTUBE",
  TELEGRAM: "TELEGRAM",
  INSTAGRAM: "INSTAGRAM",
  HABR: "HABR",
  MEDIUM: "MEDIUM",
  TWITTER: "TWITTER",
} as const;
export type SocialsId = ValueOf<typeof SOCIALS_IDS>;

export interface SocialsDataItem {
  imagePath: string;
  url: string;
  language: "ru" | "en";
  isAvailable: boolean;
}

export const SOCIALS_DATA: Record<SocialsId, SocialsDataItem> = {
  [SOCIALS_IDS.YOUTUBE]: {
    imagePath: "/socials/youtube.png",
    url: "https://youtube.com/artgurianov",
    language: "en",
    isAvailable: false,
  },
  [SOCIALS_IDS.TWITTER]: {
    imagePath: "/socials/twitter.png",
    url: "https://x.com/artgurianov",
    language: "en",
    isAvailable: false,
  },
  [SOCIALS_IDS.HABR]: {
    imagePath: "/socials/habr.png",
    url: "https://habr.com/artgurianov",
    language: "ru",
    isAvailable: false,
  },
  [SOCIALS_IDS.MEDIUM]: {
    imagePath: "/socials/medium.png",
    url: "https://medium.com/artgurianov",
    language: "en",
    isAvailable: false,
  },
  [SOCIALS_IDS.TELEGRAM]: {
    imagePath: "/socials/telegram.png",
    url: "https://t.me/bytehurt",
    language: "ru",
    isAvailable: true,
  },
  [SOCIALS_IDS.INSTAGRAM]: {
    imagePath: "/socials/instagram.png",
    url: "https://instagram.com/art.gzip",
    language: "ru",
    isAvailable: false,
  },
};
