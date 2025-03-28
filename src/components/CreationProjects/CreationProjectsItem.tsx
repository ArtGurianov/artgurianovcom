import { CreationProjectData } from "@/app/(main)/creation/page";
import Image from "next/image";
import { InlineInfo } from "@/components/InlineInfo/InlineInfo";
import { CONTENTFUL_PALETTE_CLASSNAME_IDS } from "@/config/contentful/colorPalettes";
import { CONTENTFUL_PRODUCT_TYPES_DATA } from "@/config/contentful/productTypes";
import { CONTENTFUL_PRODUCT_STATUSES_DATA } from "@/config/contentful/productStatuses";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
      <div className="absolute top-1/2 -translate-y-1/2 flex flex-col gap-8 w-full justify-center items-center">
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
        <div className="flex gap-4 md:gap-6 flex-col md:flex-row px-12 justify-center items-stretch md:items-center">
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
      </div>
    </div>
  );
};
