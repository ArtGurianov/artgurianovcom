"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { use3DPosition } from "@/lib/hooks";

interface LabourCardProps {
  label: string;
  description: string;
  href: string;
  bgImagePath: string;
}

export const LabourCard = ({
  label,
  description,
  href,
  bgImagePath,
}: LabourCardProps) => {
  const { x, y } = use3DPosition();

  return (
    <Button
      variant="ghost"
      size="reset"
      className="relative w-full md:w-1/2 grow border-2 border-primary shadow-lg rounded-xl overflow-clip"
    >
      <Link className="absolute w-full h-full" href={href}>
        <Image
          alt="background image for studio page"
          className="h-full w-full object-cover scale-110 transition-all"
          style={{ translate: `${x * 5}% ${y * 5}%` }}
          src={bgImagePath}
          width={0}
          height={0}
          sizes="100vw"
          fill
          priority
        />
        <div
          className="absolute z-10 w-full h-full bg-background/50 hover:bg-secondary/50"
          style={{ boxShadow: "0 0 100px rgba(0,0,0,0.9) inset" }}
        />
        <span className="absolute bottom-1/2 left-0 z-20 w-full text-border/80 font-mono text-center text-wrap text-6xl">
          {label}
        </span>
        <span className="absolute bottom-4 md:bottom-8 left-0 z-20 text-border/80 bg-gradient-to-r from-background/10 via-background/50 to-background/10 w-full font-semibold font-mono text-center text-wrap text-xl py-2 px-4">
          {description}
        </span>
      </Link>
    </Button>
  );
};
