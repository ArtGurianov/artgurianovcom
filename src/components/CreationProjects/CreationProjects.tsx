"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CreationProjectsItem } from "./CreationProjectsItem";
import { useEffect, useState } from "react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

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
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
};
