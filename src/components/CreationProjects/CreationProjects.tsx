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
import Image from "next/image";

export const CreationProjects = () => {
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

  {
    /* {projectsData.map((each) => (
        <li key={each.fields.title}>
          <div>{each.fields.title}</div>
        </li>
      ))} */
  }

  {
    /* {Array.from({ length: 10 }).map((_, index) => (
        <li key={index} id={index.toString()} className="w-full h-full">
          <CreationProjectsItem
            index={index}
            title={""}
            description={""}
            externalLink={""}
            status={""}
            bgUrl={""}
          />
        </li>
      ))} */
  }

  return (
    <Carousel
      setApi={setApi}
      className="grow"
      orientation="vertical"
      plugins={[WheelGesturesPlugin()]}
    >
      <CarouselContent>
        <CarouselItem key={"intro"}>
          <div className="bg-pink-600 flex w-full h-full"></div>
        </CarouselItem>
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem key={index}>
            <CreationProjectsItem
              index={index}
              title={""}
              description={""}
              externalLink={""}
              status={""}
              bgUrl={""}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 mb-2">
        <div className="relative">
          <CarouselNext className="h-full font-mono text-foreground bg-primary/50 border-2">
            <Image
              src={ArrowUpSvgUrl}
              className="rotate-180"
              alt="arrow-down"
              width="0"
              height="0"
              sizes="100vh"
              priority
            />
            {`${currentSlide + 1}. next`}
          </CarouselNext>
          {currentSlide !== 0 ? (
            <Button
              variant="ghost"
              className="absolute right-0 translate-x-full px-2 h-full"
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
            </Button>
          ) : null}
        </div>
      </div>
    </Carousel>
  );
};
