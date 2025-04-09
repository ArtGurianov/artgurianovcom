"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { SOCIAL_MEDIA_IDS, SocialMediaId, SocialsCard } from "./SocialsCard";
import { useBreakpoint } from "@/lib/hooks/useBreakpoint";
import { useState } from "react";
import { useClickOutside } from "@/lib/hooks";
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
  const [activeId, setActiveId] = useState<SocialMediaId | null>(null);
  const handleChangeActiveId = (value: SocialMediaId | null) => {
    setActiveId(value);
  };
  const containerRef = useClickOutside<HTMLDivElement>(() => {
    setActiveId(null);
  });

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
        <CarouselContent
          ref={containerRef}
          className="gap-4 py-0 md:py-4 px-4 md:px-0"
        >
          {SOCIALS_ORDER.map((id) => (
            <CarouselItem
              key={id}
              className="aspect-3/2 basis-1/2 md:basis-1/3"
            >
              <SocialsCard
                key={id}
                socialMediaId={id}
                activeId={activeId}
                onChangeActiveId={handleChangeActiveId}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
