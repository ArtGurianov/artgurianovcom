"use client";

import { ValueOf } from "@/lib/types";
import { useState } from "react";
import Image from "next/image";

export const SOCIAL_MEDIA_IDS = {
  YOUTUBE: "YOUTUBE",
  TELEGRAM: "TELEGRAM",
  INSTAGRAM: "INSTAGRAM",
  HABR: "HABR",
  MEDIUM: "MEDIUM",
  TWITTER: "TWITTER",
} as const;
export type SocialMediaId = ValueOf<typeof SOCIAL_MEDIA_IDS>;

interface SocialMediaDataItem {
  imagePath: string;
  url: string;
  description: string;
  language: "ru" | "en";
  isAvailable: boolean;
}

const SOCIAL_MEDIA_DATA: Record<SocialMediaId, SocialMediaDataItem> = {
  [SOCIAL_MEDIA_IDS.YOUTUBE]: {
    imagePath: "/socials/youtube.png",
    url: "youtube.com",
    description: "Youtube channel with full coding tutorials and short hints.",
    language: "en",
    isAvailable: false,
  },
  [SOCIAL_MEDIA_IDS.TWITTER]: {
    imagePath: "/socials/twitter.png",
    url: "x.com",
    description:
      "Twitter channel with thoughts and posts about mentality of an engineer.",
    language: "en",
    isAvailable: false,
  },
  [SOCIAL_MEDIA_IDS.HABR]: {
    imagePath: "/socials/habr.png",
    url: "habr.com",
    description: "Habr tech blog with text format of coding tutorials.",
    language: "ru",
    isAvailable: false,
  },
  [SOCIAL_MEDIA_IDS.MEDIUM]: {
    imagePath: "/socials/medium.png",
    url: "medium.com",
    description: "Medium tech blog with text format of coding tutorials.",
    language: "en",
    isAvailable: false,
  },
  [SOCIAL_MEDIA_IDS.TELEGRAM]: {
    imagePath: "/socials/telegram.png",
    url: "telegram.com",
    description:
      "Telegram channel with thoughts and posts about mentality of an engineer.",
    language: "ru",
    isAvailable: false,
  },
  [SOCIAL_MEDIA_IDS.INSTAGRAM]: {
    imagePath: "/socials/instagram.png",
    url: "instagram.com",
    description:
      "Personal instagram with lifestyle of an independend nomad SaaS enterpreneur.",
    language: "ru",
    isAvailable: false,
  },
};

interface SocialsCardProps {
  socialMediaId: SocialMediaId;
}

export const SocialsCard = ({ socialMediaId }: SocialsCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  console.log(SOCIAL_MEDIA_DATA[socialMediaId]);

  return (
    <div className="group flex justify-center items-center h-full md:w-full md:h-auto relative aspect-3/2 border-2 rounded-2xl border-dashed overflow-hidden">
      <Image
        src={SOCIAL_MEDIA_DATA[socialMediaId].imagePath}
        alt={`Image for ${socialMediaId}`}
        width="0"
        height="0"
        sizes="100vh"
        className="h-full md:w-full md:h-auto"
        priority
      />
      <div className="absolute h-full w-full -translate-y-full bg-green-300 group-hover:translate-y-0 transition-all ease-in-out duration-300"></div>
    </div>
  );
};
