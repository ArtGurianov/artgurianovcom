"use client";

import { Button } from "@/components/ui/button";

interface CreationProjectsNavProps {}

export const CreationProjectsNav = ({}: CreationProjectsNavProps) => {
  return (
    <div className="sticky flex gap-4 bottom-8 right-8">
      <Button>{"Prev"}</Button>
      <Button>{"Next"}</Button>
    </div>
  );
};
