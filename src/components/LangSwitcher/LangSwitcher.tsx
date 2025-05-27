"use client";

import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const LangSwitcher = () => {
  const pathname = usePathname();
  const locale = process.env.NEXT_PUBLIC_APP_LOCALE;

  return (
    <div className="absolute mt-4 right-6 flex flex-col lg:flex-row gap-0 justify-center items-center">
      <Button
        variant="link"
        className={cn(
          "px-2 font-sans text-foreground/80 hover:text-foreground/100",
          {
            "underline text-foreground/100": locale === "en-US",
          }
        )}
      >
        <Link
          className="h-full w-full"
          href={`https://artgurianov.com${pathname}`}
        >
          {"EN"}
        </Link>
      </Button>
      <Button
        variant="link"
        className={cn(
          "px-2 font-sans text-foreground/80 hover:text-foreground/100",
          {
            "underline text-foreground/100": locale === "ru-RU",
          }
        )}
      >
        <Link
          className="h-full w-full"
          href={`https://ru.artgurianov.com${pathname}`}
        >
          {"RU"}
        </Link>
      </Button>
    </div>
  );
};
