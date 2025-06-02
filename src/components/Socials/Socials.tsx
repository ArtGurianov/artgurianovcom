"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { SocialsCard } from "./SocialsCard";
import { useBreakpoint } from "@/lib/hooks/useBreakpoint";
import { useEffect, useState } from "react";
import { useClickOutside } from "@/lib/hooks";
import { useTranslations } from "next-intl";
import Autoscroll from "embla-carousel-auto-scroll";
import { SOCIALS_DATA, SOCIALS_IDS, SocialsId } from "@/config/socials";

const SOCIALS_ORDER: SocialsId[] = [
  SOCIALS_IDS.YOUTUBE,
  SOCIALS_IDS.MEDIUM,
  SOCIALS_IDS.TWITTER,
  SOCIALS_IDS.TELEGRAM,
  SOCIALS_IDS.HABR,
  SOCIALS_IDS.INSTAGRAM,
];

export const Socials = () => {
  const isWindowOverSM = useBreakpoint("sm");

  const [activeId, setActiveId] = useState<SocialsId | null>(null);
  const handleChangeActiveId = (value: SocialsId | null) => {
    setActiveId(value);
  };
  const containerRef = useClickOutside<HTMLDivElement>(() => {
    setActiveId(null);
  });

  const [api, setApi] = useState<CarouselApi>();
  useEffect(() => {
    if (!api || !activeId || isWindowOverSM) {
      return;
    }
    const activeIndex = SOCIALS_ORDER.findIndex((each) => each === activeId);
    if (activeIndex !== -1) api.scrollTo(activeIndex);
  }, [api, activeId, isWindowOverSM]);

  const t = useTranslations("SOCIALS");

  return (
    <div className="h-32 w-full md:h-full md:px-4">
      <Carousel
        setApi={setApi}
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
                id={id}
                activeId={activeId}
                onChangeActiveId={handleChangeActiveId}
                description={t(`descriptions.${id}`)}
                {...SOCIALS_DATA[id]}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
