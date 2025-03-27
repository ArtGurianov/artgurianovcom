"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from "@/components/ui/carousel";
import { CreationProjectsItem } from "./CreationProjectsItem";
import { useEffect, useState } from "react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { Button } from "@/components/ui/button";
import { ArrowUpSvgUrl, DoubleArrowUpSvgUrl } from "@/components/svg";
import { CreationProjectsIntro } from "./CreationProjectsIntro";
import { CreationProjectData } from "@/app/(main)/creation/page";
import { useTranslations } from "next-intl";
import { CreationProjectsList } from "./CreationProjectsList";
import { useBreakpoint } from "@/lib/hooks/useBreakpoint";
import { CreationProjectsMenuMobile } from "./CreationProjectsMenuMobile";
import Image from "next/image";

interface CreationProjectsProps {
  data: CreationProjectData[];
}

export const CreationProjects = ({ data }: CreationProjectsProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  const breakpoint = useBreakpoint();
  const MenuComponent =
    breakpoint === "xs" ? CreationProjectsMenuMobile : CreationProjectsList;

  const t = useTranslations("CREATION");

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", (updatedApi) => {
      setCurrentSlide(updatedApi.selectedScrollSnap());
    });
  }, [api]);

  return (
    <>
      <Carousel
        setApi={setApi}
        className="grow"
        orientation="vertical"
        plugins={[WheelGesturesPlugin()]}
      >
        <CarouselContent>
          <CarouselItem key={"intro"}>
            <CreationProjectsIntro />
          </CarouselItem>
          {data.map((each) => (
            <CarouselItem key={each.title}>
              <CreationProjectsItem {...each} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0">
          <div className="relative">
            {currentSlide < data.length ? (
              <CarouselNext variant="outline" size="lg">
                <Image
                  src={ArrowUpSvgUrl}
                  className="rotate-180 opacity-80"
                  alt="arrow-down"
                  width="0"
                  height="0"
                  sizes="100vh"
                  priority
                />
                <span className="text-muted">{`${currentSlide + 1}. ${data[currentSlide].title}`}</span>
              </CarouselNext>
            ) : (
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setCurrentSlide(0);
                  api?.scrollTo(0);
                }}
              >
                <Image
                  className="opacity-80"
                  src={DoubleArrowUpSvgUrl}
                  alt="arrow-down"
                  width="0"
                  height="0"
                  sizes="100vh"
                  priority
                />
                <span className="text-muted">{t("start-over")}</span>
              </Button>
            )}
          </div>
        </div>
      </Carousel>
      <MenuComponent
        data={data}
        currentSlide={currentSlide}
        onChangeSlide={(target: number) => {
          setCurrentSlide(target);
          api?.scrollTo(target);
        }}
      />
    </>
  );
};
