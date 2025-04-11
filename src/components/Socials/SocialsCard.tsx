"use client";

import { cn } from "@/lib/utils";
import { SocialsDataItem, SocialsId } from "./Socials";
import { InlineInfo } from "@/components/common/InlineInfo/InlineInfo";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

interface SocialsCardProps extends SocialsDataItem {
  id: SocialsId;
  activeId: SocialsId | null;
  onChangeActiveId: (_: SocialsId | null) => void;
  description: string;
}

export const SocialsCard = ({
  imagePath,
  url,
  language,
  id,
  activeId,
  onChangeActiveId,
  description,
  isAvailable,
}: SocialsCardProps) => {
  const t = useTranslations("SOCIALS");

  return (
    <div
      className="h-full w-full relative border-2 rounded-2xl border-dashed bg-gradient-to-br from-primary/30 via-primary-10 to-primary/60 overflow-clip"
      onMouseOver={() => {
        onChangeActiveId(id);
      }}
      onMouseOut={() => {
        onChangeActiveId(null);
      }}
      onClick={() => {
        onChangeActiveId(id);
      }}
    >
      <Image
        src={imagePath}
        alt={`Image for ${id}`}
        width="0"
        height="0"
        sizes="100vh"
        className={cn(
          "h-full w-full object-contain shrink-0 transition-all ease-in-out duration-300",
          {
            "-translate-y-full": id === activeId,
            "translate-y-0": id !== activeId,
          }
        )}
        priority
      />
      <div
        className={cn(
          "p-2 text-xs md:text-normal w-full h-full shrink-0 flex flex-col gap-2 md:gap-4 justify-center items-center transition-all ease-in-out duration-300",
          {
            "-translate-y-full": id === activeId,
            "translate-y-0": id !== activeId,
          }
        )}
      >
        <span className="md:text-lg text-center bg-accent/40 px-1 py-2 rounded-md text-muted">
          {description}
        </span>
        <div className="flex gap-2">
          <InlineInfo label={t("lang")}>{language}</InlineInfo>
          <InlineInfo
            label={t("link")}
            description={!isAvailable ? t("coming-soon") : null}
          >
            {isAvailable ? (
              <Button disabled={!isAvailable} variant="link" size="reset">
                <Link href={url}>{"🔗"}</Link>
              </Button>
            ) : null}
          </InlineInfo>
        </div>
      </div>
    </div>
  );
};
