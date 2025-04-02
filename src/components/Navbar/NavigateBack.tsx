"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const NavigateBack = () => {
  const pathname = usePathname();
  const particles = pathname.slice(1).split("/");

  if (particles.length < 2) return <></>;

  return (
    <div className="absolute flex justify-center items-center -translate-x-full pr-6 h-full">
      <Button size={"default"} className="rounded font-mono px-2">
        <Link href={`/${particles.slice(0, -1).join("/")}`}>{"<<_"}</Link>
      </Button>
    </div>
  );
};
