"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useState } from "react";
import {
  CreationProjectsList,
  CreationProjectsListProps,
} from "./CreationProjectsList";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { CONTENTFUL_PALETTE_CLASSNAME_IDS } from "@/config/contentful/colorPalettes";

export const CreationProjectsMenuMobile = (
  props: CreationProjectsListProps
) => {
  const [isOpen, setIsOpen] = useState(false);

  const onChangeSlideAndClose = (slideIndex: number) => {
    props.onChangeSlide(slideIndex);
    setIsOpen(false);
  };

  const t = useTranslations("CREATION");

  const colorPaletteId =
    props.currentSlide > 0
      ? props.data[props.currentSlide - 1].colorPaletteId
      : CONTENTFUL_PALETTE_CLASSNAME_IDS.DEFAULT;

  return (
    <>
      <Drawer open={isOpen} onClose={() => setIsOpen(false)} autoFocus={isOpen}>
        <DrawerContent className="pb-8">
          <DrawerHeader>
            <DrawerTitle className="text-center font-serif text-4xl my-4 text-card">
              {t("mobile-list-heading")}
            </DrawerTitle>
          </DrawerHeader>
          <CreationProjectsList
            {...props}
            onChangeSlide={onChangeSlideAndClose}
          />
        </DrawerContent>
      </Drawer>
      <Button
        variant="link"
        onClick={() => setIsOpen(true)}
        className="underline absolute bottom-2 right-2 md:hidden text-card"
        {...(colorPaletteId !== CONTENTFUL_PALETTE_CLASSNAME_IDS.DEFAULT
          ? {
              style: {
                color: `var(--${colorPaletteId}-accent-foreground)`,
              },
            }
          : {})}
      >
        {t("mobile-list-btn")}
      </Button>
    </>
  );
};
