"use client";

import { useEffect, useState } from "react";
import { MenuOpenSvgUrl } from "@/components/svg";
import { Button } from "@/components/ui/button";
import { useCurrentRouteId } from "@/lib/hooks/useCurrentRouteId";
import { NAVBAR_ICONS, NAVBAR_ORDER } from "../config";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Link from "next/link";
import { ROUTER_CONFIG } from "@/lib/routing/routerConfig";
import { NavbarCarouselDots } from "./NavbarCarouselDots";
import { useTranslations } from "next-intl";

export default function NavbarMobile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentRouteId = useCurrentRouteId();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  const t = useTranslations("NAVBAR");

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
      <div className="absolute my-8 rounded-full shadow-lg shadow-muted/20 overflow-clip self-center">
        <div className="relative">
          <div className="-z-10 absolute w-full h-full bg-btn-metal opacity-40" />
          <Button
            className="hover:no-underline font-serif pl-6 pr-4 gap-1 text-2xl h-12"
            size="lg"
            variant="link"
            onClick={() => {
              setCurrentSlide(0);
              setIsMenuOpen(true);
            }}
          >
            <span>
              {currentRouteId ? t(`${currentRouteId}.title`) : "Menu"}
            </span>
            <Image
              src={MenuOpenSvgUrl}
              alt="nav-icon"
              width="0"
              height="0"
              sizes="100vh"
              className="h-full"
              priority
            />
          </Button>
        </div>
      </div>

      <Dialog open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DialogContent
          className="h-full w-full border-none bg-transparent"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader className="sr-only">
            <DialogTitle>{"Navigation menu"}</DialogTitle>
            <DialogDescription>
              {"Swipe to navigate between pages"}
            </DialogDescription>
          </DialogHeader>
          <div className="w-full h-full flex flex-col justify-between items-center">
            <Carousel setApi={setApi} className="grow self-stretch">
              <CarouselContent>
                {NAVBAR_ORDER.map((each) => (
                  <CarouselItem key={each}>
                    <div className="w-screen h-full flex flex-col justify-center px-8">
                      <div className="grow flex flex-col justify-center items-center">
                        <div className="relative aspect-square self-stretch flex justify-center items-center">
                          <Image
                            src={NAVBAR_ICONS[each]}
                            alt="nav-icon"
                            width="0"
                            height="0"
                            sizes="100vh"
                            className="absolute w-full opacity-70 p-8"
                            priority
                          />
                        </div>
                        <h2 className="text-6xl font-serif text-secondary text-center mt-6">
                          {t(`${each}.title`)}
                        </h2>
                        <p className="text-2xl text-center text-wrap text-secondary/90 mt-2">
                          {t(`${each}.description`)}
                        </p>
                      </div>
                      <Button
                        size="lg"
                        variant="secondary"
                        className="py-8 w-full font-mono bg-secondary/30 mt-8"
                        onClick={() => {
                          setIsMenuOpen(false);
                        }}
                      >
                        <Link href={ROUTER_CONFIG[each].urlPath}>
                          {t(`mobile-visit-btn`)}
                        </Link>
                      </Button>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <NavbarCarouselDots
              activeIndex={currentSlide}
              quantity={NAVBAR_ORDER.length}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
