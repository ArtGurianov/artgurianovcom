"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { SOCIAL_MEDIA_IDS, SocialMediaId, SocialsCard } from "./SocialsCard";
import { useBreakpoint } from "@/lib/hooks/useBreakpoint";
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
  const isWindowOverSM = useBreakpoint("sm");

  return (
    <div className="h-32 w-full md:h-full md:px-4">
      <Carousel
        className="w-full h-full"
        orientation={isWindowOverSM ? "vertical" : "horizontal"}
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
        <CarouselContent className="gap-4 py-0 md:py-4 px-4 md:px-0">
          {SOCIALS_ORDER.map((id) => (
            <CarouselItem key={id} className="aspect-3/2 basis-1/3">
              <SocialsCard key={id} socialMediaId={id} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
