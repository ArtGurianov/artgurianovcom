"use client";

import { SOCIAL_MEDIA_IDS, SocialMediaId, SocialsCard } from "./SocialsCard";

const SOCIALS_ORDER: SocialMediaId[] = [
  SOCIAL_MEDIA_IDS.YOUTUBE,
  SOCIAL_MEDIA_IDS.MEDIUM,
  SOCIAL_MEDIA_IDS.TWITTER,
  SOCIAL_MEDIA_IDS.TELEGRAM,
  SOCIAL_MEDIA_IDS.HABR,
  SOCIAL_MEDIA_IDS.INSTAGRAM,
];

export const Socials = () => {
  return (
    <div className="flex md:flex-col gap-4">
      {SOCIALS_ORDER.map((id) => (
        <SocialsCard key={id} socialMediaId={id} />
      ))}
    </div>
  );
};
