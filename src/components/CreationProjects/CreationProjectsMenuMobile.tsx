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

export const CreationProjectsMenuMobile = (
  props: CreationProjectsListProps
) => {
  const [isOpen, setIsOpen] = useState(false);

  const onChangeSlideAndClose = (slideIndex: number) => {
    props.onChangeSlide(slideIndex);
    setIsOpen(false);
  };

  const t = useTranslations("CREATION");

  const projectId =
    props.currentSlide > 0 ? props.data[props.currentSlide - 1].id : "default";

  return (
    <>
      <Drawer open={isOpen} onClose={() => setIsOpen(false)} autoFocus={isOpen}>
        <DrawerContent className="pb-8">
          <DrawerHeader>
            <DrawerTitle className="text-center font-serif text-4xl my-4 text-muted">
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
        style={{
          color: `var(--${projectId}-accent-foreground)`,
        }}
      >
        {t("mobile-list-btn")}
      </Button>
    </>
  );
};
