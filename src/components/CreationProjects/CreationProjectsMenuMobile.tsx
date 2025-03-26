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

export const CreationProjectsMenuMobile = (
  props: CreationProjectsListProps
) => {
  const [isOpen, setIsOpen] = useState(false);

  const onChangeSlideAndClose = (slideIndex: number) => {
    props.onChangeSlide(slideIndex);
    setIsOpen(false);
  };

  return (
    <>
      <Drawer open={isOpen} onClose={() => setIsOpen(false)} autoFocus={isOpen}>
        <DrawerContent className="pb-8">
          <DrawerHeader>
            <DrawerTitle className="text-center font-serif text-4xl my-4 text-card">
              {"PRODUCTS LIST"}
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
        className="underline absolute bottom-2 right-2 md:hidden text-card"
        onClick={() => setIsOpen(true)}
      >
        {"all"}
      </Button>
    </>
  );
};
