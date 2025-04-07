"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { SOCIAL_MEDIA_IDS, SocialMediaId, SocialsCard } from "./SocialsCard";
import Autoscroll from "embla-carousel-auto-scroll";

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
    <div className="h-full w-full px-4">
      <Carousel
        className="w-full h-full"
        orientation="vertical"
        plugins={[
          Autoscroll({
            startDelay: 0,
            speed: 1,
            stopOnMouseEnter: true,
            stopOnInteraction: false,
          }),
        ]}
        opts={{ loop: true }}
      >
        <CarouselContent className="gap-4 py-4">
          {SOCIALS_ORDER.map((id) => (
            <CarouselItem
              key={id}
              className="aspect-3/2 basis-full lg:basis-1/3"
            >
              <SocialsCard key={id} socialMediaId={id} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
