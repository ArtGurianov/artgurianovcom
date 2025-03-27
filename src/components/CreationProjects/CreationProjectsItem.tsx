import { CreationProjectData } from "@/app/(main)/creation/page";
import { COLOR_PALETTE_CLASSNAME_IDS } from "@/config/colorPalettes";
import Image from "next/image";

export const CreationProjectsItem = ({
  title,
  description,
  externalLink,
  status,
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
            {...(colorPaletteId !== COLOR_PALETTE_CLASSNAME_IDS.DEFAULT
              ? {
                  style: {
                    backgroundColor: `var(--${colorPaletteId}-background)`,
                  },
                }
              : {})}
          />
        )}
      </div>
      <span
        className="absolute text-4xl w-full text-center top-1/2 -translate-y-1/2 text-card font-serif"
        {...(colorPaletteId !== COLOR_PALETTE_CLASSNAME_IDS.DEFAULT
          ? {
              style: {
                color: `var(--${colorPaletteId}-accent-foreground)`,
              },
            }
          : {})}
      >
        {title}
      </span>
    </div>
  );
};
