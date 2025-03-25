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
import Image from "next/image";

interface CreationProjectsProps {
  data: CreationProjectData[];
}

export const CreationProjects = ({ data }: CreationProjectsProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", (updatedApi) => {
      setCurrentSlide(updatedApi.selectedScrollSnap());
    });
  }, [api]);

  return (
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
          <CarouselItem key={each.index}>
            <CreationProjectsItem {...each} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0">
        {currentSlide < data.length ? (
          <div className="relative">
            <CarouselNext variant="outline" size="lg">
              <Image
                src={ArrowUpSvgUrl}
                className="rotate-180"
                alt="arrow-down"
                width="0"
                height="0"
                sizes="100vh"
                priority
              />
              {`${currentSlide + 1}. ${data[currentSlide].title}`}
            </CarouselNext>
            {currentSlide !== 0 ? (
              <Button
                variant="ghost"
                size="reset"
                className="absolute right-0 translate-x-full h-full px-2"
                onClick={() => {
                  setCurrentSlide(0);
                  api?.scrollTo(0);
                }}
              >
                <Image
                  src={DoubleArrowUpSvgUrl}
                  alt="arrow-down"
                  width="0"
                  height="0"
                  sizes="100vh"
                  className="hover:scale-125"
                  priority
                />
              </Button>
            ) : null}
          </div>
        ) : (
          <div className="relative">
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                setCurrentSlide(0);
                api?.scrollTo(0);
              }}
            >
              <Image
                src={DoubleArrowUpSvgUrl}
                alt="arrow-down"
                width="0"
                height="0"
                sizes="100vh"
                priority
              />
              {`Start over`}
            </Button>
          </div>
        )}
      </div>
    </Carousel>
  );
};
