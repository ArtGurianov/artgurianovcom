"use client";

import { useEffect, useState } from "react";
import { MenuSvgUrl } from "@/components/svg";
import { Button } from "@/components/ui/button";
import { useCurrentRouteId } from "@/lib/hooks/useCurrentRouteId";
import {
  NAVBAR_DESCRIPTIONS,
  NAVBAR_ICONS,
  NAVBAR_ORDER,
  NAVBAR_TITLES,
} from "../config";
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

export default function NavbarMobile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentRouteId = useCurrentRouteId();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", (updatedApi) => {
      setCurrentSlide(updatedApi.selectedScrollSnap());
      console.log(updatedApi.selectedScrollSnap());
    });
  }, [api]);

  return (
    <>
      <div className="absolute mt-8 rounded-full -translate-x-1/2 left-1/2 shadow-lg shadow-muted/20 overflow-clip">
        <div className="relative">
          <div className="-z-10 absolute w-full h-full bg-metal opacity-30" />
          <Button
            className="hover:no-underline font-serif pl-6 pr-4 gap-1 text-2xl"
            size="lg"
            variant="link"
            onClick={() => {
              setIsMenuOpen(true);
            }}
          >
            <span>
              {currentRouteId ? NAVBAR_TITLES[currentRouteId] : "Menu"}
            </span>
            <Image
              src={MenuSvgUrl}
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
            <Carousel setApi={setApi} className="grow">
              <CarouselContent>
                {NAVBAR_ORDER.map((each) => (
                  <CarouselItem key={each}>
                    <div className="w-screen h-full flex flex-col justify-center">
                      <div className="grow flex flex-col justify-center items-center">
                        <Image
                          src={NAVBAR_ICONS[each]}
                          alt="nav-icon"
                          width="0"
                          height="0"
                          sizes="100vh"
                          className="w-full px-8 opacity-70"
                          priority
                        />
                        <h2 className="text-6xl font-serif text-secondary text-center mt-6">
                          {NAVBAR_TITLES[each]}
                        </h2>
                        <p className="text-2xl text-center text-wrap text-secondary/90 mt-2">
                          {NAVBAR_DESCRIPTIONS[each]}
                        </p>
                      </div>
                      <div className="w-full flex justify-center px-8">
                        <Button
                          size="lg"
                          variant="secondary"
                          className="py-8 w-full font-mono bg-secondary/30 mt-8"
                          onClick={() => {
                            setIsMenuOpen(false);
                          }}
                        >
                          <Link href={ROUTER_CONFIG[each].urlPath}>
                            {"visit"}
                          </Link>
                        </Button>
                      </div>
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
