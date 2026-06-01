"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from "@/components/ui/carousel";
import { CreationProjectsItem } from "./CreationProjectsItem";
import { useCallback, useEffect, useMemo, useState } from "react";
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

const getProjectIdFromHash = () => {
  if (typeof window === "undefined") return "";

  try {
    return decodeURIComponent(window.location.hash.slice(1))
      .trim()
      .toLowerCase();
  } catch {
    return "";
  }
};

export const CreationProjects = ({ data }: CreationProjectsProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  const projectSlideById = useMemo(
    () =>
      new Map(
        data.map((project, index) => [project.id.toLowerCase(), index + 1])
      ),
    [data]
  );

  const isWindowOverSM = useBreakpoint("sm");
  const MenuComponent = isWindowOverSM
    ? CreationProjectsList
    : CreationProjectsMenuMobile;

  const t = useTranslations("CREATION");

  const getSlideFromHash = useCallback(() => {
    const projectId = getProjectIdFromHash();
    if (!projectId) return 0;

    return projectSlideById.get(projectId) ?? 0;
  }, [projectSlideById]);

  const replaceHashForSlide = useCallback(
    (slideIndex: number) => {
      if (typeof window === "undefined") return;

      const project = slideIndex > 0 ? data[slideIndex - 1] : undefined;
      const nextHash = project ? `#${encodeURIComponent(project.id)}` : "";

      if (window.location.hash === nextHash) return;

      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}${nextHash}`
      );
    },
    [data]
  );

  const changeSlide = useCallback(
    (target: number) => {
      setCurrentSlide(target);
      replaceHashForSlide(target);
      api?.scrollTo(target);
    },
    [api, replaceHashForSlide]
  );

  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = (updatedApi: CarouselApi) => {
      if (!updatedApi) return;

      const selectedSlide = updatedApi.selectedScrollSnap();
      setCurrentSlide(selectedSlide);
      replaceHashForSlide(selectedSlide);
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api, replaceHashForSlide]);

  useEffect(() => {
    if (!api) {
      return;
    }

    const scrollToHashSlide = () => {
      const target = getSlideFromHash();
      changeSlide(target);
    };

    scrollToHashSlide();
    window.addEventListener("hashchange", scrollToHashSlide);

    return () => {
      window.removeEventListener("hashchange", scrollToHashSlide);
    };
  }, [api, changeSlide, getSlideFromHash]);

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
                <span className="text-foreground/90">{`${currentSlide + 1}. ${data[currentSlide].title}`}</span>
              </CarouselNext>
            ) : (
              <Button
                variant="outline"
                size="lg"
                onClick={() => changeSlide(0)}
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
                <span className="text-foreground/90">{t("start-over")}</span>
              </Button>
            )}
          </div>
        </div>
      </Carousel>
      <MenuComponent
        data={data}
        currentSlide={currentSlide}
        onChangeSlide={changeSlide}
      />
    </>
  );
};
