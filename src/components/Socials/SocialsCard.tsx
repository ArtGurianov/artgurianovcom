import { ValueOf } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRef, useState } from "react";

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
  activeId: SocialMediaId | null;
  onChangeActiveId: (_: SocialMediaId | null) => void;
}

export const SocialsCard = ({
  socialMediaId,
  activeId,
  onChangeActiveId,
}: SocialsCardProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={containerRef}
      className="h-full w-full relative border-2 rounded-2xl border-dashed bg-gradient-to-br from-primary/30 via-primary-10 to-primary/60 overflow-clip"
      onMouseOver={() => {
        onChangeActiveId(socialMediaId);
      }}
      onMouseOut={() => {
        onChangeActiveId(null);
      }}
      onClick={() => {
        onChangeActiveId(socialMediaId);
      }}
    >
      <Image
        src={SOCIAL_MEDIA_DATA[socialMediaId].imagePath}
        alt={`Image for ${socialMediaId}`}
        width="0"
        height="0"
        sizes="100vh"
        className={cn(
          "h-full w-full object-contain shrink-0 transition-all ease-in-out duration-300",
          {
            "-translate-y-full": socialMediaId === activeId,
            "translate-y-0": socialMediaId !== activeId,
          }
        )}
        priority
      />
      <div
        className={cn(
          "text-sm md:text-normal w-full h-full shrink-0 flex flex-col justify-center items-center transition-all ease-in-out duration-300",
          {
            "-translate-y-full": socialMediaId === activeId,
            "translate-y-0": socialMediaId !== activeId,
          }
        )}
      >
        <span className="text-center">
          {SOCIAL_MEDIA_DATA[socialMediaId].description}
        </span>
        <span className="text-center">
          {SOCIAL_MEDIA_DATA[socialMediaId].language}
        </span>
        <span className="text-center">
          {SOCIAL_MEDIA_DATA[socialMediaId].url}
        </span>
      </div>
    </div>
  );
};
