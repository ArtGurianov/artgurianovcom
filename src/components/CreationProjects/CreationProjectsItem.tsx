import { CreationProjectData } from "@/app/(main)/creation/page";
import { InlineInfo } from "@/components/InlineInfo/InlineInfo";
import { CONTENTFUL_PALETTE_CLASSNAME_IDS } from "@/config/contentful/colorPalettes";
import { CONTENTFUL_PRODUCT_TYPES_DATA } from "@/config/contentful/productTypes";
import { CONTENTFUL_PRODUCT_STATUSES_DATA } from "@/config/contentful/productStatuses";
import { Button } from "@/components/ui/button";
import { QuoteIcon } from "lucide-react";
import { TruncatedStringMobile } from "@/components/TruncatedString/TruncatedString";
import Link from "next/link";
import Image from "next/image";

export const CreationProjectsItem = ({
  title,
  description,
  externalLink,
  statusId,
  type,
  techStack,
  colorPaletteId,
  bgUrl,
}: CreationProjectData) => {
  return (
    <div className={"relative w-full h-full"}>
      <div className="absolute w-full h-full">
        {bgUrl ? (
          <Image
            alt={`background image for ${title} project`}
            className="h-full w-full object-cover opacity-70"
            src={`https:${bgUrl}`}
            width={0}
            height={0}
            sizes="100vw"
            fill
            priority
          />
        ) : (
          <div
            className={`w-full h-full opacity-70`}
            {...(colorPaletteId !== CONTENTFUL_PALETTE_CLASSNAME_IDS.DEFAULT
              ? {
                  style: {
                    backgroundColor: `var(--${colorPaletteId}-background)`,
                  },
                }
              : {})}
          />
        )}
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 flex flex-col gap-8 w-full px-4 justify-center items-center">
        <span
          className="text-4xl w-full text-center text-card font-serif"
          {...(colorPaletteId !== CONTENTFUL_PALETTE_CLASSNAME_IDS.DEFAULT
            ? {
                style: {
                  color: `var(--${colorPaletteId}-accent-foreground)`,
                },
              }
            : {})}
        >
          {title}
        </span>
        <div className="flex flex-wrap gap-4 md:gap-6 flex-row px-2 md:px-12 justify-center items-stretch md:items-center">
          <InlineInfo
            label="Type"
            description={CONTENTFUL_PRODUCT_TYPES_DATA[type].description}
          >
            {CONTENTFUL_PRODUCT_TYPES_DATA[type].title}
          </InlineInfo>
          <InlineInfo
            label="Status"
            description={CONTENTFUL_PRODUCT_STATUSES_DATA[statusId].description}
          >
            {CONTENTFUL_PRODUCT_STATUSES_DATA[statusId].title}
          </InlineInfo>
          <InlineInfo label="Site">
            {externalLink ? (
              <Button variant="link" size="reset">
                <Link href={externalLink}>{"link"}</Link>
              </Button>
            ) : (
              <span>{"Coming soon"}</span>
            )}
          </InlineInfo>
        </div>
        <h2 className="w-full inline-flex gap-2 sm:max-w-[340px] md:max-w-[420px] lg:max-w-[720px] justify-center items-center bg-card/20 px-6 py-4 shadow-muted/40 shadow-xl">
          <span className="h-4 w-4 shrink-0 self-start">
            <QuoteIcon
              width={24}
              height={24}
              className="rotate-180 h-full w-full"
            />
          </span>
          <span className="text-center font-mono">
            <TruncatedStringMobile maxLen={64}>
              {description}
            </TruncatedStringMobile>
          </span>
          <span className="h-4 w-4 shrink-0 self-end">
            <QuoteIcon width={24} height={24} className="h-full w-full" />
          </span>
        </h2>
        {techStack?.length > 0 ? (
          <div className="flex flex-wrap gap-4 justify-center items-center  sm:max-w-[340px] md:max-w-[420px] lg:max-w-[720px]">
            <span className="font-mono text-card text-2xl">{"Stack:"}</span>
            {techStack.map((each) => (
              <span
                key={each}
                className="text-center px-4 py-1 rounded-full bg-card/10"
              >
                {each}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};
